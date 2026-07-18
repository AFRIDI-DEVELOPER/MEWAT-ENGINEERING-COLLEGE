import 'package:flutter/material.dart';

/// Custom theme extension that carries all app-specific colors
/// for both light and dark modes.
///
/// Usage: `Theme.of(context).extension<AppColors>()!`
@immutable
class AppColors extends ThemeExtension<AppColors> {
  // Backgrounds
  final Color background;
  final Color surface;
  final Color inputFill;
  final Color borderColor;

  // Accent colors
  final Color primaryAccent;     // Teal for anonymous
  final Color secondaryAccent;   // Blue for phone/verified
  final Color primaryGradientEnd;
  final Color secondaryGradientEnd;

  // Text colors
  final Color textPrimary;
  final Color textSecondary;
  final Color textMuted;
  final Color textHint;

  // Chat bubbles
  final Color sentBubbleStart;
  final Color sentBubbleEnd;
  final Color receivedBubble;
  final Color sentBubbleText;
  final Color receivedBubbleText;
  final Color deliveredCheck;

  // Status colors
  final Color error;
  final Color errorSurface;
  final Color errorBorder;

  // Banners
  final Color privacyBannerBg;
  final Color privacyBannerBorder;
  final Color cloudBannerBg;
  final Color cloudBannerBorder;

  const AppColors({
    required this.background,
    required this.surface,
    required this.inputFill,
    required this.borderColor,
    required this.primaryAccent,
    required this.secondaryAccent,
    required this.primaryGradientEnd,
    required this.secondaryGradientEnd,
    required this.textPrimary,
    required this.textSecondary,
    required this.textMuted,
    required this.textHint,
    required this.sentBubbleStart,
    required this.sentBubbleEnd,
    required this.receivedBubble,
    required this.sentBubbleText,
    required this.receivedBubbleText,
    required this.deliveredCheck,
    required this.error,
    required this.errorSurface,
    required this.errorBorder,
    required this.privacyBannerBg,
    required this.privacyBannerBorder,
    required this.cloudBannerBg,
    required this.cloudBannerBorder,
  });

  /// Dark theme colors — deep space palette.
  static const dark = AppColors(
    background: Color(0xFF000000),
    surface: Color(0xFF0A0A0A),
    inputFill: Color(0xFF111111),
    borderColor: Color(0xFF30363D),
    primaryAccent: Color(0xFF00D9A6),
    secondaryAccent: Color(0xFF58A6FF),
    primaryGradientEnd: Color(0xFF00B894),
    secondaryGradientEnd: Color(0xFF388BFD),
    textPrimary: Colors.white,
    textSecondary: Color(0xFFB0B8C4),
    textMuted: Color(0xFF6E7681),
    textHint: Color(0xFF3D4450),
    sentBubbleStart: Color(0xFF00A884),
    sentBubbleEnd: Color(0xFF008F6E),
    receivedBubble: Color(0xFF111111),
    sentBubbleText: Colors.white,
    receivedBubbleText: Color(0xFFE6EDF3),
    deliveredCheck: Color(0xFF53BDEB),
    error: Color(0xFFFF6B6B),
    errorSurface: Color(0xFF3D1F1F),
    errorBorder: Color(0xFF5C2828),
    privacyBannerBg: Color(0xFF0C2920),
    privacyBannerBorder: Color(0xFF1A4D3A),
    cloudBannerBg: Color(0xFF0C2240),
    cloudBannerBorder: Color(0xFF1A3D5C),
  );

  /// Light theme colors — clean ivory palette.
  static const light = AppColors(
    background: Color(0xFFF6F8FA),
    surface: Colors.white,
    inputFill: Color(0xFFF0F2F5),
    borderColor: Color(0xFFD8DEE4),
    primaryAccent: Color(0xFF00A884),
    secondaryAccent: Color(0xFF0969DA),
    primaryGradientEnd: Color(0xFF009473),
    secondaryGradientEnd: Color(0xFF0550AE),
    textPrimary: Color(0xFF1F2328),
    textSecondary: Color(0xFF57606A),
    textMuted: Color(0xFF8B949E),
    textHint: Color(0xFFAFB8C1),
    sentBubbleStart: Color(0xFF00A884),
    sentBubbleEnd: Color(0xFF009473),
    receivedBubble: Color(0xFFFFFFFF),
    sentBubbleText: Colors.white,
    receivedBubbleText: Color(0xFF1F2328),
    deliveredCheck: Color(0xFF53BDEB),
    error: Color(0xFFCF222E),
    errorSurface: Color(0xFFFFEBE9),
    errorBorder: Color(0xFFFFCDD2),
    privacyBannerBg: Color(0xFFDCFCE7),
    privacyBannerBorder: Color(0xFFA7F3D0),
    cloudBannerBg: Color(0xFFDBEAFE),
    cloudBannerBorder: Color(0xFFBFDBFE),
  );

  @override
  AppColors copyWith({
    Color? background,
    Color? surface,
    Color? inputFill,
    Color? borderColor,
    Color? primaryAccent,
    Color? secondaryAccent,
    Color? primaryGradientEnd,
    Color? secondaryGradientEnd,
    Color? textPrimary,
    Color? textSecondary,
    Color? textMuted,
    Color? textHint,
    Color? sentBubbleStart,
    Color? sentBubbleEnd,
    Color? receivedBubble,
    Color? sentBubbleText,
    Color? receivedBubbleText,
    Color? deliveredCheck,
    Color? error,
    Color? errorSurface,
    Color? errorBorder,
    Color? privacyBannerBg,
    Color? privacyBannerBorder,
    Color? cloudBannerBg,
    Color? cloudBannerBorder,
  }) {
    return AppColors(
      background: background ?? this.background,
      surface: surface ?? this.surface,
      inputFill: inputFill ?? this.inputFill,
      borderColor: borderColor ?? this.borderColor,
      primaryAccent: primaryAccent ?? this.primaryAccent,
      secondaryAccent: secondaryAccent ?? this.secondaryAccent,
      primaryGradientEnd: primaryGradientEnd ?? this.primaryGradientEnd,
      secondaryGradientEnd: secondaryGradientEnd ?? this.secondaryGradientEnd,
      textPrimary: textPrimary ?? this.textPrimary,
      textSecondary: textSecondary ?? this.textSecondary,
      textMuted: textMuted ?? this.textMuted,
      textHint: textHint ?? this.textHint,
      sentBubbleStart: sentBubbleStart ?? this.sentBubbleStart,
      sentBubbleEnd: sentBubbleEnd ?? this.sentBubbleEnd,
      receivedBubble: receivedBubble ?? this.receivedBubble,
      sentBubbleText: sentBubbleText ?? this.sentBubbleText,
      receivedBubbleText: receivedBubbleText ?? this.receivedBubbleText,
      deliveredCheck: deliveredCheck ?? this.deliveredCheck,
      error: error ?? this.error,
      errorSurface: errorSurface ?? this.errorSurface,
      errorBorder: errorBorder ?? this.errorBorder,
      privacyBannerBg: privacyBannerBg ?? this.privacyBannerBg,
      privacyBannerBorder: privacyBannerBorder ?? this.privacyBannerBorder,
      cloudBannerBg: cloudBannerBg ?? this.cloudBannerBg,
      cloudBannerBorder: cloudBannerBorder ?? this.cloudBannerBorder,
    );
  }

  @override
  AppColors lerp(covariant ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) return this;
    return AppColors(
      background: Color.lerp(background, other.background, t)!,
      surface: Color.lerp(surface, other.surface, t)!,
      inputFill: Color.lerp(inputFill, other.inputFill, t)!,
      borderColor: Color.lerp(borderColor, other.borderColor, t)!,
      primaryAccent: Color.lerp(primaryAccent, other.primaryAccent, t)!,
      secondaryAccent: Color.lerp(secondaryAccent, other.secondaryAccent, t)!,
      primaryGradientEnd: Color.lerp(primaryGradientEnd, other.primaryGradientEnd, t)!,
      secondaryGradientEnd: Color.lerp(secondaryGradientEnd, other.secondaryGradientEnd, t)!,
      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      textMuted: Color.lerp(textMuted, other.textMuted, t)!,
      textHint: Color.lerp(textHint, other.textHint, t)!,
      sentBubbleStart: Color.lerp(sentBubbleStart, other.sentBubbleStart, t)!,
      sentBubbleEnd: Color.lerp(sentBubbleEnd, other.sentBubbleEnd, t)!,
      receivedBubble: Color.lerp(receivedBubble, other.receivedBubble, t)!,
      sentBubbleText: Color.lerp(sentBubbleText, other.sentBubbleText, t)!,
      receivedBubbleText: Color.lerp(receivedBubbleText, other.receivedBubbleText, t)!,
      deliveredCheck: Color.lerp(deliveredCheck, other.deliveredCheck, t)!,
      error: Color.lerp(error, other.error, t)!,
      errorSurface: Color.lerp(errorSurface, other.errorSurface, t)!,
      errorBorder: Color.lerp(errorBorder, other.errorBorder, t)!,
      privacyBannerBg: Color.lerp(privacyBannerBg, other.privacyBannerBg, t)!,
      privacyBannerBorder: Color.lerp(privacyBannerBorder, other.privacyBannerBorder, t)!,
      cloudBannerBg: Color.lerp(cloudBannerBg, other.cloudBannerBg, t)!,
      cloudBannerBorder: Color.lerp(cloudBannerBorder, other.cloudBannerBorder, t)!,
    );
  }
}
