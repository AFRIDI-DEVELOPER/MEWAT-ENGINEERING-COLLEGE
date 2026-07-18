import 'package:flutter/material.dart';
import '../services/local_storage_service.dart';

/// Theme state management provider.
///
/// Manages light/dark mode toggle and persists preference in Hive.
/// Supports smooth animated transitions between themes.
class ThemeProvider extends ChangeNotifier {
  final LocalStorageService _localStorage;
  bool _isDarkMode;

  ThemeProvider(this._localStorage)
      : _isDarkMode = _localStorage.getThemePreference() ?? true; // Default: dark

  /// Whether the app is in dark mode.
  bool get isDarkMode => _isDarkMode;

  /// The current theme mode for MaterialApp.
  ThemeMode get themeMode => _isDarkMode ? ThemeMode.dark : ThemeMode.light;

  /// Toggle between light and dark mode.
  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    _localStorage.saveThemePreference(_isDarkMode);
    notifyListeners();
  }

  /// Explicitly set the theme mode.
  void setDarkMode(bool value) {
    if (_isDarkMode == value) return;
    _isDarkMode = value;
    _localStorage.saveThemePreference(_isDarkMode);
    notifyListeners();
  }
}
