import 'dart:convert';
import 'dart:io';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/user_model.dart';

/// Custom authentication service that bypasses Supabase Auth
/// and uses RPC functions for user registration and login.
class AuthService {
  final SupabaseClient _client;

  AuthService(this._client);

  /// Register a new user.
  ///
  /// Calls the `register_user` RPC function which hashes the password
  /// server-side using bcrypt (pgcrypto).
  ///
  /// Throws a descriptive error string on failure (e.g., duplicate username).
  Future<UserModel> register({
    required String username,
    required String password,
    String? phoneNumber,
    String accountType = 'anonymous',
  }) async {
    try {
      final response = await _client.rpc('register_user', params: {
        'p_username': username.trim().toLowerCase(),
        'p_password': password,
        'p_phone_number': phoneNumber,
        'p_account_type': accountType,
      });

      // The RPC returns a JSON object
      final data = _parseRpcResponse(response);
      return UserModel.fromJson(data);
    } on PostgrestException catch (e) {
      // Catch Supabase/PostgreSQL errors
      if (e.message.contains('already taken')) {
        throw 'Sorry, this username is already taken by someone else.';
      }
      if (e.message.contains('at least 3 characters')) {
        throw 'Username must be at least 3 characters long.';
      }
      if (e.message.contains('at least 6 characters')) {
        throw 'Password must be at least 6 characters long.';
      }
      throw 'Registration failed: ${e.message}';
    } catch (e) {
      if (e is String) rethrow;
      throw 'Registration failed: $e';
    }
  }

  /// Login with username and password.
  ///
  /// Calls the `login_user` RPC function which verifies the password
  /// against the bcrypt hash stored in the database.
  Future<UserModel> login({
    required String username,
    required String password,
  }) async {
    try {
      final response = await _client.rpc('login_user', params: {
        'p_username': username.trim().toLowerCase(),
        'p_password': password,
      });

      final data = _parseRpcResponse(response);
      return UserModel.fromJson(data);
    } on PostgrestException catch (e) {
      if (e.message.contains('Invalid username or password')) {
        throw 'Invalid username or password.';
      }
      throw 'Login failed: ${e.message}';
    } catch (e) {
      if (e is String) rethrow;
      throw 'Login failed: $e';
    }
  }

  /// Send OTP to a phone number for verification.
  /// Uses Supabase's built-in phone auth for this step.
  Future<void> sendPhoneOtp(String phoneNumber) async {
    try {
      await _client.auth.signInWithOtp(phone: phoneNumber);
    } catch (e) {
      throw 'Failed to send OTP: $e';
    }
  }

  /// Verify phone OTP.
  /// Returns true if verification succeeds.
  Future<bool> verifyPhoneOtp({
    required String phoneNumber,
    required String otpCode,
  }) async {
    try {
      final response = await _client.auth.verifyOTP(
        phone: phoneNumber,
        token: otpCode,
        type: OtpType.sms,
      );
      return response.session != null;
    } catch (e) {
      throw 'OTP verification failed: $e';
    }
  }

  /// Search for users by username (for starting new chats).
  Future<List<UserModel>> searchUsers(String query) async {
    try {
      final response = await _client.rpc('search_users', params: {
        'p_query': query.trim().toLowerCase(),
        'p_limit': 20,
      });

      if (response == null) return [];

      final List<dynamic> results =
          response is String ? jsonDecode(response) : response;
      return results
          .map((json) => UserModel.fromJson(json as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw 'Search failed: $e';
    }
  }

  /// Uploads an avatar image to storage and updates the user's profile.
  Future<String> updateAvatar({
    required String userId,
    required String imagePath,
  }) async {
    try {
      final file = File(imagePath);
      final fileExt = imagePath.split('.').last;
      final fileName = '${userId}_${DateTime.now().millisecondsSinceEpoch}.$fileExt';
      final storagePath = 'avatars/$fileName';

      // 1. Upload to Supabase Storage (avatars bucket)
      await _client.storage.from('avatars').upload(
            storagePath,
            file,
            fileOptions: const FileOptions(cacheControl: '3600', upsert: true),
          );

      // 2. Get the public URL
      final avatarUrl = _client.storage.from('avatars').getPublicUrl(storagePath);

      // 3. Update the user profile using the new RPC function
      await _client.rpc('update_user_avatar', params: {
        'p_user_id': userId,
        'p_avatar_url': avatarUrl,
      });

      return avatarUrl;
    } catch (e) {
      throw 'Failed to update avatar: $e';
    }
  }

  /// Parse the RPC response which may be a JSON string or a Map.
  Map<String, dynamic> _parseRpcResponse(dynamic response) {
    if (response is Map<String, dynamic>) {
      return response;
    }
    if (response is String) {
      return jsonDecode(response) as Map<String, dynamic>;
    }
    throw 'Unexpected response format from server.';
  }
}
