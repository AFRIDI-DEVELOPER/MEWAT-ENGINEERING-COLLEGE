import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/message_model.dart';
import '../services/chat_service.dart';
import '../services/local_storage_service.dart';

/// State management for chat functionality.
///
/// Manages active conversations, current chat messages,
/// Realtime subscriptions, and the deliver-and-delete orchestration.
class ChatProvider extends ChangeNotifier {
  final ChatService _chatService;
  final LocalStorageService _localStorage;

  // Current user info
  String? _currentUserId;
  String? _currentUsername;
  bool _isAnonymous = true;

  // Conversations list
  List<Map<String, dynamic>> _conversations = [];
  bool _isLoadingConversations = false;

  // Active chat
  String? _activeChatPartnerId;
  String? _activeChatPartnerName;
  List<MessageModel> _messages = [];
  bool _isLoadingMessages = false;

  // Typing indicator
  bool _isPartnerTyping = false;
  String? _partnerTypingUsername;
  Timer? _typingTimer;

  // Realtime subscription
  StreamSubscription<MessageModel>? _messageSubscription;
  StreamSubscription<Map<String, dynamic>>? _typingSubscription;

  ChatProvider(this._chatService, this._localStorage);

  // ──────────────────────────────────────────────
  // GETTERS
  // ──────────────────────────────────────────────

  List<Map<String, dynamic>> get conversations => _conversations;
  bool get isLoadingConversations => _isLoadingConversations;
  List<MessageModel> get messages => _messages;
  bool get isLoadingMessages => _isLoadingMessages;
  String? get activeChatPartnerId => _activeChatPartnerId;
  String? get activeChatPartnerName => _activeChatPartnerName;
  bool get isPartnerTyping => _isPartnerTyping;
  String? get partnerTypingUsername => _partnerTypingUsername;

  // ──────────────────────────────────────────────
  // INITIALIZATION
  // ──────────────────────────────────────────────

  /// Initialize chat provider with the current user's info.
  /// Subscribes to Realtime messages.
  void initialize({
    required String userId,
    required String username,
    required bool isAnonymous,
  }) {
    _currentUserId = userId;
    _currentUsername = username;
    _isAnonymous = isAnonymous;

    // Start listening for incoming messages
    _chatService.subscribeToMessages(
      userId: userId,
      isAnonymous: isAnonymous,
    );

    // Listen to the incoming messages stream
    _messageSubscription = _chatService.incomingMessages.listen((message) {
      _handleIncomingMessage(message);
    });

    // Load recent conversations
    loadConversations();
  }

  // ──────────────────────────────────────────────
  // CONVERSATIONS LIST
  // ──────────────────────────────────────────────

  /// Load the list of recent conversations.
  Future<void> loadConversations() async {
    if (_currentUserId == null) return;

    _isLoadingConversations = true;
    notifyListeners();

    try {
      _conversations =
          await _chatService.getRecentConversations(_currentUserId!);
    } catch (e) {
      print('Failed to load conversations: $e');
    }

    _isLoadingConversations = false;
    notifyListeners();
  }

  // ──────────────────────────────────────────────
  // ACTIVE CHAT
  // ──────────────────────────────────────────────

  /// Open a chat with a specific partner.
  /// Loads message history from local or cloud storage.
  Future<void> openChat({
    required String partnerId,
    required String partnerName,
    String? partnerAvatarUrl,
  }) async {
    _activeChatPartnerId = partnerId;
    _activeChatPartnerName = partnerName;
    _messages = [];
    _isLoadingMessages = true;
    _isPartnerTyping = false;
    _partnerTypingUsername = null;
    notifyListeners();

    // Cache the partner's metadata
    await _localStorage.cacheUserMetadata(partnerId, partnerName, partnerAvatarUrl);

    // Subscribe to typing events for this conversation
    if (_currentUserId != null) {
      _chatService.subscribeToTyping(
        currentUserId: _currentUserId!,
        partnerId: partnerId,
      );

      // Listen to typing events
      _typingSubscription?.cancel();
      _typingSubscription = _chatService.typingEvents.listen((event) {
        _handleTypingEvent(event);
      });
    }

    try {
      _messages = await _chatService.loadChatHistory(
        currentUserId: _currentUserId!,
        chatPartnerId: partnerId,
        isAnonymous: _isAnonymous,
      );
    } catch (e) {
      print('Failed to load chat history: $e');
    }

    _isLoadingMessages = false;
    notifyListeners();
  }

  /// Send a message in the current active chat.
  Future<bool> sendMessage(String text) async {
    if (_currentUserId == null || _activeChatPartnerId == null) return false;
    if (text.trim().isEmpty) return false;

    try {
      final message = await _chatService.sendMessage(
        senderId: _currentUserId!,
        receiverId: _activeChatPartnerId!,
        messageText: text.trim(),
        senderUsername: _currentUsername,
      );

      // Add to local messages list immediately
      _messages.add(message);
      notifyListeners();

      // Refresh conversations list
      loadConversations();

      return true;
    } catch (e) {
      print('Failed to send message: $e');
      return false;
    }
  }

  // ──────────────────────────────────────────────
  // TYPING INDICATOR
  // ──────────────────────────────────────────────

  /// Notify the partner that the current user is typing.
  void sendTypingEvent() {
    if (_currentUserId == null || _activeChatPartnerId == null) return;

    _chatService.sendTypingEvent(
      currentUserId: _currentUserId!,
      partnerId: _activeChatPartnerId!,
      username: _currentUsername ?? 'User',
    );
  }

  /// Handle a typing event from the partner.
  void _handleTypingEvent(Map<String, dynamic> event) {
    final username = event['username'] as String?;
    _isPartnerTyping = true;
    _partnerTypingUsername = username;
    notifyListeners();

    // Auto-hide typing indicator after 3 seconds of no typing events
    _typingTimer?.cancel();
    _typingTimer = Timer(const Duration(seconds: 3), () {
      _isPartnerTyping = false;
      _partnerTypingUsername = null;
      notifyListeners();
    });
  }

  /// Handle an incoming message from the Realtime stream.
  void _handleIncomingMessage(MessageModel message) {
    // If we're currently viewing this chat, add the message
    if (_activeChatPartnerId != null &&
        message.senderId == _activeChatPartnerId) {
      _messages.add(message);

      // Clear typing indicator when a message arrives
      _isPartnerTyping = false;
      _partnerTypingUsername = null;
      _typingTimer?.cancel();
    }

    // Refresh conversations list
    loadConversations();

    notifyListeners();
  }

  /// Close the active chat.
  void closeChat() {
    _activeChatPartnerId = null;
    _activeChatPartnerName = null;
    _messages = [];
    _isPartnerTyping = false;
    _partnerTypingUsername = null;
    _typingTimer?.cancel();
    _typingSubscription?.cancel();
    _chatService.unsubscribeTyping();
    notifyListeners();
  }

  // ──────────────────────────────────────────────
  // CLEANUP
  // ──────────────────────────────────────────────

  /// Reset chat state (called on logout).
  void reset() {
    _messageSubscription?.cancel();
    _typingSubscription?.cancel();
    _typingTimer?.cancel();
    _chatService.unsubscribe();
    _currentUserId = null;
    _currentUsername = null;
    _conversations = [];
    _messages = [];
    _activeChatPartnerId = null;
    _activeChatPartnerName = null;
    _isPartnerTyping = false;
    _partnerTypingUsername = null;
    notifyListeners();
  }

  @override
  void dispose() {
    _messageSubscription?.cancel();
    _typingSubscription?.cancel();
    _typingTimer?.cancel();
    _chatService.dispose();
    super.dispose();
  }
}
