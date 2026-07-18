import 'dart:async';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:uuid/uuid.dart';
import '../models/message_model.dart';
import 'local_storage_service.dart';

/// Chat service handling real-time messaging with Supabase Realtime
/// and the "deliver-and-delete" pattern for anonymous accounts.
class ChatService {
  final SupabaseClient _client;
  final LocalStorageService _localStorage;
  final Uuid _uuid = const Uuid();

  RealtimeChannel? _messagesChannel;
  RealtimeChannel? _typingChannel;
  final StreamController<MessageModel> _incomingMessages =
      StreamController<MessageModel>.broadcast();
  final StreamController<Map<String, dynamic>> _typingEvents =
      StreamController<Map<String, dynamic>>.broadcast();

  /// Stream of incoming messages (for the UI to listen to).
  Stream<MessageModel> get incomingMessages => _incomingMessages.stream;

  /// Stream of typing events (for the UI to show "X is typing...").
  Stream<Map<String, dynamic>> get typingEvents => _typingEvents.stream;

  ChatService(this._client, this._localStorage);

  /// Send a message from [senderId] to [receiverId].
  ///
  /// Inserts the message into the Supabase `messages` table.
  /// The receiver picks it up via Realtime subscription.
  Future<MessageModel> sendMessage({
    required String senderId,
    required String receiverId,
    required String messageText,
    String? senderUsername,
  }) async {
    final messageId = _uuid.v4();
    final now = DateTime.now().toUtc();

    final message = MessageModel(
      id: messageId,
      senderId: senderId,
      receiverId: receiverId,
      messageText: messageText,
      createdAt: now,
      isDelivered: false,
      senderUsername: senderUsername,
    );

    try {
      // Insert into Supabase cloud database
      await _client.from('messages').insert(message.toJson());

      // Also save locally for the sender's chat history
      await _localStorage.saveMessage(message);

      return message;
    } catch (e) {
      throw 'Failed to send message: $e';
    }
  }

  /// Subscribe to incoming messages for [userId] via Supabase Realtime.
  ///
  /// When a new message arrives:
  /// 1. Save it to local Hive storage
  /// 2. Emit it on the [incomingMessages] stream
  /// 3. If receiver is anonymous → trigger cloud deletion (deliver-and-delete)
  void subscribeToMessages({
    required String userId,
    required bool isAnonymous,
  }) {
    // Unsubscribe from any existing channel
    unsubscribe();

    _messagesChannel = _client
        .channel('messages:receiver_id=eq.$userId')
        .onPostgresChanges(
          event: PostgresChangeEvent.insert,
          schema: 'public',
          table: 'messages',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'receiver_id',
            value: userId,
          ),
          callback: (payload) {
            _handleIncomingMessage(payload.newRecord, userId, isAnonymous);
          },
        )
        .subscribe();
  }

  // ──────────────────────────────────────────────
  // TYPING INDICATOR
  // ──────────────────────────────────────────────

  /// Subscribe to typing events for a specific chat conversation.
  /// Uses Supabase Realtime Broadcast to send/receive typing signals.
  void subscribeToTyping({
    required String currentUserId,
    required String partnerId,
  }) {
    // Unsubscribe from previous typing channel
    _typingChannel?.unsubscribe();

    // Create a deterministic channel name for this conversation pair
    final ids = [currentUserId, partnerId]..sort();
    final channelName = 'typing:${ids[0]}_${ids[1]}';

    _typingChannel = _client
        .channel(channelName)
        .onBroadcast(
          event: 'typing',
          callback: (payload) {
            final senderId = payload['user_id'] as String?;
            // Only emit if the event is from the partner, not ourselves
            if (senderId != null && senderId != currentUserId) {
              _typingEvents.add(payload);
            }
          },
        )
        .subscribe();
  }

  /// Broadcast a typing event to the chat partner.
  void sendTypingEvent({
    required String currentUserId,
    required String partnerId,
    required String username,
  }) {
    if (_typingChannel == null) return;

    _typingChannel!.sendBroadcastMessage(
      event: 'typing',
      payload: {
        'user_id': currentUserId,
        'username': username,
        'timestamp': DateTime.now().toIso8601String(),
      },
    );
  }

  /// Unsubscribe from the typing channel.
  void unsubscribeTyping() {
    _typingChannel?.unsubscribe();
    _typingChannel = null;
  }

  // ──────────────────────────────────────────────
  // MESSAGE HANDLING
  // ──────────────────────────────────────────────

  /// Handle an incoming message from the Realtime stream.
  Future<void> _handleIncomingMessage(
    Map<String, dynamic> record,
    String currentUserId,
    bool isAnonymous,
  ) async {
    try {
      final message = MessageModel.fromJson(record);

      // Lookup metadata if not already present
      String? senderUsername = message.senderUsername;
      String? senderAvatarUrl;
      if (senderUsername == null && isAnonymous) {
        final metadata = await _lookupUserMetadata(message.senderId);
        senderUsername = metadata?['username'];
        senderAvatarUrl = metadata?['avatar_url'];
      }

      // Create an updated message with the resolved username
      final updatedMessage = senderUsername != null
          ? message.copyWith(senderUsername: senderUsername)
          : message;

      // Step 1: Save to local storage (with username attached)
      await _localStorage.saveMessage(updatedMessage);

      // Step 2: Cache the sender's metadata for future lookups
      if (senderUsername != null) {
        await _localStorage.cacheUserMetadata(message.senderId, senderUsername, senderAvatarUrl);
      }

      // Step 3: Emit on stream for UI
      _incomingMessages.add(updatedMessage);

      // Step 4: Deliver-and-Delete for anonymous accounts
      if (isAnonymous) {
        await _deleteFromCloud(message.id, currentUserId);
      }
    } catch (e) {
      print('Error handling incoming message: $e');
    }
  }

  /// Look up a user's metadata by their ID from the Supabase users table.
  Future<Map<String, String?>?> _lookupUserMetadata(String userId) async {
    try {
      final response = await _client
          .from('users')
          .select('username, avatar_url')
          .eq('id', userId)
          .maybeSingle();

      if (response != null) {
        return {
          'username': response['username'] as String?,
          'avatar_url': response['avatar_url'] as String?,
        };
      }
    } catch (e) {
      print('Warning: Failed to look up metadata for $userId: $e');
    }
    return null;
  }

  /// Delete a message from the cloud after local delivery.
  /// Only called for anonymous accounts.
  Future<void> _deleteFromCloud(String messageId, String receiverId) async {
    try {
      await _client.rpc('delete_delivered_message', params: {
        'p_message_id': messageId,
        'p_receiver_id': receiverId,
      });
    } catch (e) {
      // Non-critical: message stays in cloud if delete fails
      print('Warning: Failed to delete message from cloud: $e');
    }
  }

  /// Load message history for a conversation.
  ///
  /// For anonymous users: loads from local Hive storage only.
  /// For verified phone users: loads from Supabase cloud.
  Future<List<MessageModel>> loadChatHistory({
    required String currentUserId,
    required String chatPartnerId,
    required bool isAnonymous,
  }) async {
    if (isAnonymous) {
      // Load from local storage
      return _localStorage.getMessages(currentUserId, chatPartnerId);
    }

    // Load from cloud for verified phone users
    try {
      final response = await _client
          .from('messages')
          .select()
          .or(
            'and(sender_id.eq.$currentUserId,receiver_id.eq.$chatPartnerId),'
            'and(sender_id.eq.$chatPartnerId,receiver_id.eq.$currentUserId)',
          )
          .order('created_at', ascending: true)
          .limit(200);

      return (response as List)
          .map((json) => MessageModel.fromJson(json as Map<String, dynamic>))
          .toList();
    } catch (e) {
      // Fallback to local storage
      print('Cloud fetch failed, falling back to local: $e');
      return _localStorage.getMessages(currentUserId, chatPartnerId);
    }
  }

  /// Get a list of recent conversations (unique chat partners).
  Future<List<Map<String, dynamic>>> getRecentConversations(
    String currentUserId,
  ) async {
    return _localStorage.getRecentConversations(currentUserId);
  }

  /// Unsubscribe from Realtime channels.
  void unsubscribe() {
    _messagesChannel?.unsubscribe();
    _messagesChannel = null;
    unsubscribeTyping();
  }

  /// Clean up resources.
  void dispose() {
    unsubscribe();
    _incomingMessages.close();
    _typingEvents.close();
  }
}
