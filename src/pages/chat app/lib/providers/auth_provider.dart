import 'package:flutter/foundation.dart';
import '../models/user_model.dart';
import '../services/auth_service.dart';
import '../services/local_storage_service.dart';

/// State management for authentication using ChangeNotifier (Provider).
///
/// Handles registration, login, logout, session persistence,
/// and exposes the current user to the widget tree.
class AuthProvider extends ChangeNotifier {
  final AuthService _authService;
  final LocalStorageService _localStorage;

  UserModel? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;
  bool _isInitialized = false;

  AuthProvider(this._authService, this._localStorage);

  // ──────────────────────────────────────────────
  // GETTERS
  // ──────────────────────────────────────────────

  UserModel? get currentUser => _currentUser;
  bool get isLoggedIn => _currentUser != null;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isInitialized => _isInitialized;
  bool get isAnonymous => _currentUser?.isAnonymous ?? true;

  // ──────────────────────────────────────────────
  // INITIALIZATION (Auto-login from saved session)
  // ──────────────────────────────────────────────

  /// Check for a saved session and auto-login.
  Future<void> initialize() async {
    final savedSession = _localStorage.getSession();
    if (savedSession != null) {
      try {
        _currentUser = UserModel.fromJson(savedSession);
      } catch (e) {
        // Corrupted session data, clear it
        await _localStorage.clearSession();
      }
    }
    _isInitialized = true;
    notifyListeners();
  }

  // ──────────────────────────────────────────────
  // REGISTRATION
  // ──────────────────────────────────────────────

  /// Register a new anonymous user (Tab A).
  Future<bool> registerAnonymous({
    required String username,
    required String password,
  }) async {
    return _executeAuth(() async {
      final user = await _authService.register(
        username: username,
        password: password,
        accountType: 'anonymous',
      );
      await _setCurrentUser(user);
    });
  }

  /// Register a new phone-verified user (Tab B).
  Future<bool> registerWithPhone({
    required String username,
    required String password,
    required String phoneNumber,
  }) async {
    return _executeAuth(() async {
      final user = await _authService.register(
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        accountType: 'verified_phone',
      );
      await _setCurrentUser(user);
    });
  }

  // ──────────────────────────────────────────────
  // LOGIN
  // ──────────────────────────────────────────────

  /// Login with username and password.
  Future<bool> login({
    required String username,
    required String password,
  }) async {
    return _executeAuth(() async {
      final user = await _authService.login(
        username: username,
        password: password,
      );
      await _setCurrentUser(user);
    });
  }

  // ──────────────────────────────────────────────
  // PHONE OTP
  // ──────────────────────────────────────────────

  /// Send OTP to phone number.
  Future<bool> sendOtp(String phoneNumber) async {
    return _executeAuth(() async {
      await _authService.sendPhoneOtp(phoneNumber);
    });
  }

  /// Verify phone OTP.
  Future<bool> verifyOtp({
    required String phoneNumber,
    required String otpCode,
  }) async {
    return _executeAuth(() async {
      final verified = await _authService.verifyPhoneOtp(
        phoneNumber: phoneNumber,
        otpCode: otpCode,
      );
      if (!verified) {
        throw 'OTP verification failed. Please try again.';
      }
    });
  }

  // ──────────────────────────────────────────────
  // USER SEARCH
  // ──────────────────────────────────────────────

  /// Search for users by username.
  Future<List<UserModel>> searchUsers(String query) async {
    try {
      return await _authService.searchUsers(query);
    } catch (e) {
      return [];
    }
  }

  // ──────────────────────────────────────────────
  // AVATAR UPLOAD
  // ──────────────────────────────────────────────

  /// Uploads a new avatar for the current user and updates the local session.
  Future<bool> uploadAvatar(String imagePath) async {
    if (_currentUser == null) return false;

    return _executeAuth(() async {
      final avatarUrl = await _authService.updateAvatar(
        userId: _currentUser!.id,
        imagePath: imagePath,
      );

      // Create a new UserModel with the updated avatar URL
      final updatedUser = UserModel(
        id: _currentUser!.id,
        username: _currentUser!.username,
        phoneNumber: _currentUser!.phoneNumber,
        accountType: _currentUser!.accountType,
        avatarUrl: avatarUrl,
        createdAt: _currentUser!.createdAt,
      );

      await _setCurrentUser(updatedUser);
    });
  }

  // ──────────────────────────────────────────────
  // LOGOUT
  // ──────────────────────────────────────────────

  /// Logout and clear session.
  Future<void> logout() async {
    _currentUser = null;
    _errorMessage = null;
    await _localStorage.clearSession();
    notifyListeners();
  }

  // ──────────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────────

  /// Clear any displayed error message.
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  /// Set the current user and persist session.
  Future<void> _setCurrentUser(UserModel user) async {
    _currentUser = user;
    await _localStorage.saveSession(user.toJson());
  }

  /// Execute an auth operation with loading state and error handling.
  Future<bool> _executeAuth(Future<void> Function() operation) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await operation();
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }
}
