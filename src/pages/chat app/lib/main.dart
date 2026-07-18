import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import 'config/supabase_config.dart';
import 'config/app_colors.dart';
import 'services/auth_service.dart';
import 'services/chat_service.dart';
import 'services/local_storage_service.dart';
import 'providers/auth_provider.dart';
import 'providers/chat_provider.dart';
import 'providers/theme_provider.dart';
import 'screens/auth/auth_screen.dart';
import 'screens/home/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock to portrait mode
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  // Initialize Supabase
  await Supabase.initialize(
    url: SupabaseConfig.supabaseUrl,
    anonKey: SupabaseConfig.supabaseAnonKey,
  );

  // Initialize local storage (Hive)
  final localStorage = LocalStorageService();
  await localStorage.init();

  // Create services
  final supabaseClient = Supabase.instance.client;
  final authService = AuthService(supabaseClient);
  final chatService = ChatService(supabaseClient, localStorage);

  // Create providers
  final authProvider = AuthProvider(authService, localStorage);
  final chatProvider = ChatProvider(chatService, localStorage);
  final themeProvider = ThemeProvider(localStorage);

  // Check for existing session
  await authProvider.initialize();

  // Set status bar style based on initial theme
  _updateSystemUI(themeProvider.isDarkMode);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: authProvider),
        ChangeNotifierProvider.value(value: chatProvider),
        ChangeNotifierProvider.value(value: themeProvider),
      ],
      child: const PrivacyChatApp(),
    ),
  );
}

/// Update system UI overlay based on theme mode.
void _updateSystemUI(bool isDarkMode) {
  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: isDarkMode ? Brightness.light : Brightness.dark,
      systemNavigationBarColor:
          isDarkMode ? const Color(0xFF000000) : const Color(0xFFF6F8FA),
      systemNavigationBarIconBrightness:
          isDarkMode ? Brightness.light : Brightness.dark,
    ),
  );
}

/// Root application widget.
class PrivacyChatApp extends StatelessWidget {
  const PrivacyChatApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, _) {
        // Update system UI when theme changes
        _updateSystemUI(themeProvider.isDarkMode);

        return MaterialApp(
          title: 'PrivacyChat',
          debugShowCheckedModeBanner: false,

          // Theme with smooth animated transitions
          theme: _buildLightTheme(),
          darkTheme: _buildDarkTheme(),
          themeMode: themeProvider.themeMode,
          themeAnimationDuration: const Duration(milliseconds: 400),
          themeAnimationCurve: Curves.easeInOut,

          // Initial route based on auth state
          initialRoute:
              context.read<AuthProvider>().isLoggedIn ? '/home' : '/auth',

          routes: {
            '/auth': (context) => const AuthScreen(),
            '/home': (context) => const HomeScreen(),
          },
        );
      },
    );
  }

  /// Build a premium dark theme using Material 3 design tokens.
  ThemeData _buildDarkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,

      // Attach our custom color extension
      extensions: const [AppColors.dark],

      // Color scheme
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFF00D9A6),
        onPrimary: Color(0xFF000000),
        secondary: Color(0xFF58A6FF),
        onSecondary: Colors.white,
        surface: Color(0xFF0A0A0A),
        onSurface: Colors.white,
        error: Color(0xFFFF6B6B),
        onError: Colors.white,
      ),

      // Scaffold
      scaffoldBackgroundColor: const Color(0xFF000000),

      // AppBar
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFF0A0A0A),
        foregroundColor: Colors.white,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),

      // Text theme using Google Fonts
      textTheme: GoogleFonts.interTextTheme(
        ThemeData.dark().textTheme,
      ),

      // Input decoration
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF111111),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF30363D)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF30363D)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(
            color: Color(0xFF00D9A6),
            width: 1.5,
          ),
        ),
        hintStyle: TextStyle(
          color: Colors.white.withOpacity(0.3),
        ),
      ),

      // Elevated button
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF00D9A6),
          foregroundColor: const Color(0xFF000000),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          elevation: 0,
          textStyle: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ),

      // Snackbar
      snackBarTheme: SnackBarThemeData(
        backgroundColor: const Color(0xFF111111),
        contentTextStyle: const TextStyle(color: Colors.white),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        behavior: SnackBarBehavior.floating,
      ),

      // Dialog
      dialogTheme: DialogThemeData(
        backgroundColor: const Color(0xFF111111),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),

      // FAB
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: Color(0xFF00D9A6),
        foregroundColor: Color(0xFF000000),
        elevation: 4,
      ),

      // Divider
      dividerTheme: const DividerThemeData(
        color: Color(0xFF21262D),
        thickness: 1,
      ),

      // Popup menu
      popupMenuTheme: PopupMenuThemeData(
        color: const Color(0xFF111111),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  /// Build a premium light theme using Material 3 design tokens.
  ThemeData _buildLightTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,

      // Attach our custom color extension
      extensions: const [AppColors.light],

      // Color scheme
      colorScheme: const ColorScheme.light(
        primary: Color(0xFF00A884),
        onPrimary: Colors.white,
        secondary: Color(0xFF0969DA),
        onSecondary: Colors.white,
        surface: Colors.white,
        onSurface: Color(0xFF1F2328),
        error: Color(0xFFCF222E),
        onError: Colors.white,
      ),

      // Scaffold
      scaffoldBackgroundColor: const Color(0xFFF6F8FA),

      // AppBar
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: Color(0xFF1F2328),
        elevation: 0,
        surfaceTintColor: Colors.transparent,
        shadowColor: Color(0x10000000),
      ),

      // Text theme using Google Fonts
      textTheme: GoogleFonts.interTextTheme(
        ThemeData.light().textTheme,
      ),

      // Input decoration
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF0F2F5),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFD8DEE4)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFD8DEE4)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(
            color: Color(0xFF00A884),
            width: 1.5,
          ),
        ),
        hintStyle: const TextStyle(
          color: Color(0xFFAFB8C1),
        ),
      ),

      // Elevated button
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF00A884),
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          elevation: 0,
          textStyle: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ),

      // Snackbar
      snackBarTheme: SnackBarThemeData(
        backgroundColor: const Color(0xFF1F2328),
        contentTextStyle: const TextStyle(color: Colors.white),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        behavior: SnackBarBehavior.floating,
      ),

      // Dialog
      dialogTheme: DialogThemeData(
        backgroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),

      // FAB
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: Color(0xFF00A884),
        foregroundColor: Colors.white,
        elevation: 4,
      ),

      // Divider
      dividerTheme: const DividerThemeData(
        color: Color(0xFFD8DEE4),
        thickness: 1,
      ),

      // Popup menu
      popupMenuTheme: PopupMenuThemeData(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        shadowColor: const Color(0x20000000),
      ),
    );
  }
}
