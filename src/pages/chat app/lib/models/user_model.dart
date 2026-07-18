/// Data model representing a user in the chat application.
class UserModel {
  final String id;
  final String username;
  final String? phoneNumber;
  final String accountType; // 'anonymous' or 'verified_phone'
  final String? avatarUrl;
  final DateTime createdAt;

  const UserModel({
    required this.id,
    required this.username,
    this.phoneNumber,
    required this.accountType,
    this.avatarUrl,
    required this.createdAt,
  });

  /// Whether this user has anonymous-type account (device-isolated messages).
  bool get isAnonymous => accountType == 'anonymous';

  /// Whether this user has a verified phone account (cloud-persisted messages).
  bool get isVerifiedPhone => accountType == 'verified_phone';

  /// Create a [UserModel] from a JSON map (Supabase RPC response).
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      username: json['username'] as String,
      phoneNumber: json['phone_number'] as String?,
      accountType: json['account_type'] as String? ?? 'anonymous',
      avatarUrl: json['avatar_url'] as String?,
      createdAt: DateTime.parse(
        json['created_at'] as String? ?? DateTime.now().toIso8601String(),
      ),
    );
  }

  /// Convert to JSON map for persistence.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'phone_number': phoneNumber,
      'account_type': accountType,
      'avatar_url': avatarUrl,
      'created_at': createdAt.toIso8601String(),
    };
  }

  @override
  String toString() => 'UserModel(id: $id, username: $username, type: $accountType)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserModel && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;
}
