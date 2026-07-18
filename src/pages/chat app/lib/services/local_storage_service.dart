import 'package:hive_flutter/hive_flutter.dart';
import '../models/message_model.dart';

/// Service for managing local chat storage using Hive.
///
/// All messages for anonymous accounts are stored here permanently.
/// Verified phone accounts also cache messages locally for offline access.
class LocalStorageService {
  static const String _messagesBoxName = 'messages';
  static const String _sessionBoxName = 'session';
  static const String _conversationsBoxName = 'conversations';

  late Box<MessageModel> _messagesBox;
  late Box<dynamic> _sessionBox;
  late Box<dynamic> _conversationsBox;

  /// Initialize Hive and open all required boxes.
  Future<void> init() async {
    await Hive.initFlutter();

    // Register adapters
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(MessageModelAdapter());
    }

    // Open boxes
    _messagesBox = await Hive.openBox<MessageModel>(_messagesBoxName);
    _sessionBox = await Hive.openBox(_sessionBoxName);
    _conversationsBox = await Hive.openBox(_conversationsBoxName);
  }

  // ──────────────────────────────────────────────
  // MESSAGE STORAGE
  // ──────────────────────────────────────────────

  /// Save a message to local storage.
  Future<void> saveMessage(MessageModel message) async {
    await _messagesBox.put(message.id, message);

    // Update conversations index
    await _updateConversationIndex(message);
  }

  /// Retrieve all messages for a specific chat conversation.
  /// Returns messages sorted by creation time (ascending).
  List<MessageModel> getMessages(String currentUserId, String chatPartnerId) {
    final messages = _messagesBox.values.where((msg) {
      return (msg.senderId == currentUserId &&
              msg.receiverId == chatPartnerId) ||
          (msg.senderId == chatPartnerId && msg.receiverId == currentUserId);
    }).toList();

    messages.sort((a, b) => a.createdAt.compareTo(b.createdAt));
    return messages;
  }

  /// Get a list of recent conversations with the last message.
  /// Returns a list of maps with 'partner_id', 'partner_username', 'last_message', 'last_time'.
  Future<List<Map<String, dynamic>>> getRecentConversations(
    String currentUserId,
  ) async {
    final conversations = <String, Map<String, dynamic>>{};

    for (final msg in _messagesBox.values) {
      // Determine the chat partner
      final partnerId = msg.senderId == currentUserId
          ? msg.receiverId
          : msg.senderId;

      // Only include conversations involving the current user
      if (msg.senderId != currentUserId && msg.receiverId != currentUserId) {
        continue;
      }

      // Keep the most recent message per partner
      if (!conversations.containsKey(partnerId) ||
          msg.createdAt.isAfter(
            DateTime.parse(conversations[partnerId]!['last_time'] as String),
          )) {
        // Resolve the partner's username:
        // - If we sent the message, the partner is the receiver (username not in msg)
        //   so look up from cache
        // - If they sent the message, senderUsername might be available
        String partnerUsername;
        if (msg.senderId == currentUserId) {
          // We sent it — partner is receiver, look up from cache
          partnerUsername = _conversationsBox.get(
            'username_$partnerId',
            defaultValue: partnerId,
          ) as String;
        } else {
          // They sent it — use senderUsername if available, else cache
          partnerUsername = msg.senderUsername ??
              _conversationsBox.get(
                'username_$partnerId',
                defaultValue: partnerId,
              ) as String;
        }

        final partnerAvatarUrl = _conversationsBox.get('avatar_$partnerId') as String?;

        conversations[partnerId] = {
          'partner_id': partnerId,
          'partner_username': partnerUsername,
          'partner_avatar_url': partnerAvatarUrl,
          'last_message': msg.messageText,
          'last_time': msg.createdAt.toIso8601String(),
        };
      }
    }

    // Sort by most recent
    final result = conversations.values.toList();
    result.sort((a, b) {
      final timeA = DateTime.parse(a['last_time'] as String);
      final timeB = DateTime.parse(b['last_time'] as String);
      return timeB.compareTo(timeA);
    });

    return result;
  }

  /// Update the conversation index with partner username mapping.
  Future<void> _updateConversationIndex(MessageModel message) async {
    if (message.senderUsername != null) {
      await _conversationsBox.put(
        'username_${message.senderId}',
        message.senderUsername,
      );
    }
  }

  /// Store a partner's metadata for display in conversation list.
  Future<void> cacheUserMetadata(String partnerId, String username, String? avatarUrl) async {
    await _conversationsBox.put('username_$partnerId', username);
    if (avatarUrl != null) {
      await _conversationsBox.put('avatar_$partnerId', avatarUrl);
    }
  }

  // ──────────────────────────────────────────────
  // SESSION MANAGEMENT
  // ──────────────────────────────────────────────

  /// Save user session for auto-login.
  Future<void> saveSession(Map<String, dynamic> userData) async {
    await _sessionBox.put('current_user', userData);
  }

  /// Retrieve saved user session.
  Map<String, dynamic>? getSession() {
    final data = _sessionBox.get('current_user');
    if (data == null) return null;
    return Map<String, dynamic>.from(data as Map);
  }

  /// Clear user session (logout).
  Future<void> clearSession() async {
    await _sessionBox.delete('current_user');
  }

  // ──────────────────────────────────────────────
  // THEME PREFERENCES
  // ──────────────────────────────────────────────

  /// Save theme preference (true = dark, false = light).
  Future<void> saveThemePreference(bool isDarkMode) async {
    await _sessionBox.put('is_dark_mode', isDarkMode);
  }

  /// Retrieve saved theme preference. Returns null if not set.
  bool? getThemePreference() {
    return _sessionBox.get('is_dark_mode') as bool?;
  }

  // ──────────────────────────────────────────────
  // CLEANUP
  // ──────────────────────────────────────────────

  /// Clear all local data (messages + session + conversations).
  Future<void> clearAll() async {
    await _messagesBox.clear();
    await _sessionBox.clear();
    await _conversationsBox.clear();
  }

  /// Clear only messages (keep session).
  Future<void> clearMessages() async {
    await _messagesBox.clear();
    await _conversationsBox.clear();
  }
}
