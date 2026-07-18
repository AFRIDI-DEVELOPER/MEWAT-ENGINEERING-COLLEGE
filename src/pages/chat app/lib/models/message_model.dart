import 'package:hive/hive.dart';

part 'message_model.g.dart';

/// Data model representing a chat message.
/// Annotated with Hive type adapter for local storage.
@HiveType(typeId: 0)
class MessageModel extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String senderId;

  @HiveField(2)
  final String receiverId;

  @HiveField(3)
  final String messageText;

  @HiveField(4)
  final DateTime createdAt;

  @HiveField(5)
  final bool isDelivered;

  /// The username of the chat partner (cached for display).
  @HiveField(6)
  final String? senderUsername;

  MessageModel({
    required this.id,
    required this.senderId,
    required this.receiverId,
    required this.messageText,
    required this.createdAt,
    this.isDelivered = false,
    this.senderUsername,
  });

  /// Create from Supabase JSON response.
  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      id: json['id'] as String,
      senderId: json['sender_id'] as String,
      receiverId: json['receiver_id'] as String,
      messageText: json['message_text'] as String,
      createdAt: DateTime.parse(
        json['created_at'] as String? ?? DateTime.now().toIso8601String(),
      ),
      isDelivered: json['is_delivered'] as bool? ?? false,
      senderUsername: json['sender_username'] as String?,
    );
  }

  /// Convert to JSON for Supabase insert.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'sender_id': senderId,
      'receiver_id': receiverId,
      'message_text': messageText,
      'created_at': createdAt.toIso8601String(),
      'is_delivered': isDelivered,
    };
  }

  /// Create a copy with modified fields.
  MessageModel copyWith({
    String? id,
    String? senderId,
    String? receiverId,
    String? messageText,
    DateTime? createdAt,
    bool? isDelivered,
    String? senderUsername,
  }) {
    return MessageModel(
      id: id ?? this.id,
      senderId: senderId ?? this.senderId,
      receiverId: receiverId ?? this.receiverId,
      messageText: messageText ?? this.messageText,
      createdAt: createdAt ?? this.createdAt,
      isDelivered: isDelivered ?? this.isDelivered,
      senderUsername: senderUsername ?? this.senderUsername,
    );
  }

  /// Returns the chat partner's ID given the current user's ID.
  String chatPartnerId(String currentUserId) {
    return senderId == currentUserId ? receiverId : senderId;
  }

  @override
  String toString() =>
      'MessageModel(id: $id, from: $senderId, to: $receiverId, text: "${messageText.length > 30 ? '${messageText.substring(0, 30)}...' : messageText}")';
}
