import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/app_colors.dart';
import '../../providers/auth_provider.dart';

/// Tab B: Phone sign up / login.
///
/// Requires username, password, and phone number with OTP verification.
/// Messages for phone accounts are saved permanently in the cloud.
class PhoneTab extends StatefulWidget {
  const PhoneTab({super.key});

  @override
  State<PhoneTab> createState() => _PhoneTabState();
}

class _PhoneTabState extends State<PhoneTab> {
  final _formKey = GlobalKey<FormState>();
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();

  bool _isRegisterMode = true;
  bool _obscurePassword = true;
  bool _otpSent = false;
  bool _isSendingOtp = false;

  @override
  void dispose() {
    _usernameController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    _otpController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).extension<AppColors>()!;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Cloud sync banner
            _buildCloudBanner(colors),

            const SizedBox(height: 24),

            // Username
            _buildInputField(
              colors: colors,
              controller: _usernameController,
              label: 'Username',
              hint: 'Choose a unique username',
              icon: Icons.person_outline_rounded,
              accentColor: colors.secondaryAccent,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Username is required';
                }
                if (value.trim().length < 3) {
                  return 'At least 3 characters';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Password
            _buildInputField(
              colors: colors,
              controller: _passwordController,
              label: 'Password',
              hint: 'At least 6 characters',
              icon: Icons.lock_outline_rounded,
              accentColor: colors.secondaryAccent,
              isPassword: true,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Password is required';
                }
                if (value.length < 6) {
                  return 'At least 6 characters';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Phone Number with OTP button
            _buildPhoneField(colors),
            const SizedBox(height: 16),

            // OTP Field (shown after sending OTP)
            if (_otpSent) ...[
              _buildInputField(
                colors: colors,
                controller: _otpController,
                label: 'Verification Code',
                hint: 'Enter the 6-digit code',
                icon: Icons.pin_rounded,
                accentColor: colors.secondaryAccent,
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (_isRegisterMode && _otpSent) {
                    if (value == null || value.isEmpty) {
                      return 'OTP is required';
                    }
                    if (value.length < 6) {
                      return 'Enter the 6-digit code';
                    }
                  }
                  return null;
                },
              ),
              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: _isSendingOtp ? null : _resendOtp,
                  child: Text(
                    'Resend Code',
                    style: TextStyle(
                      color: colors.secondaryAccent.withOpacity(0.8),
                      fontSize: 13,
                    ),
                  ),
                ),
              ),
            ],

            const SizedBox(height: 24),

            // Error message
            Consumer<AuthProvider>(
              builder: (context, auth, _) {
                if (auth.errorMessage != null) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: colors.errorSurface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: colors.errorBorder,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.error_outline_rounded,
                            color: colors.error,
                            size: 20,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              auth.errorMessage!,
                              style: TextStyle(
                                color: colors.error,
                                fontSize: 13,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }
                return const SizedBox.shrink();
              },
            ),

            // Submit button
            Consumer<AuthProvider>(
              builder: (context, auth, _) {
                return _buildSubmitButton(
                  colors: colors,
                  isLoading: auth.isLoading,
                  onPressed: () => _submit(auth),
                );
              },
            ),

            const SizedBox(height: 16),

            // Toggle
            _buildToggle(colors),
          ],
        ),
      ),
    );
  }

  Widget _buildCloudBanner(AppColors colors) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: colors.cloudBannerBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: colors.cloudBannerBorder,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: colors.secondaryAccent.withOpacity(0.15),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              Icons.cloud_done_rounded,
              color: colors.secondaryAccent,
              size: 22,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Cloud Sync Enabled',
                  style: TextStyle(
                    color: colors.secondaryAccent,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Your messages are saved in the cloud and synced '
                  'across all your devices. Phone verification required.',
                  style: TextStyle(
                    color: colors.textSecondary,
                    fontSize: 12,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPhoneField(AppColors colors) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Phone Number',
          style: TextStyle(
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                style: TextStyle(color: colors.textPrimary, fontSize: 15),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Phone number required';
                  }
                  return null;
                },
                decoration: InputDecoration(
                  hintText: '+91 XXXXXXXXXX',
                  hintStyle: TextStyle(
                    color: colors.textHint,
                    fontSize: 14,
                  ),
                  prefixIcon: Icon(
                    Icons.phone_rounded,
                    color: colors.secondaryAccent,
                    size: 20,
                  ),
                  filled: true,
                  fillColor: colors.inputFill,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(color: colors.borderColor),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(color: colors.borderColor),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(
                      color: colors.secondaryAccent,
                      width: 1.5,
                    ),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 16,
                  ),
                ),
              ),
            ),
            if (_isRegisterMode) ...[
              const SizedBox(width: 10),
              SizedBox(
                height: 54,
                child: ElevatedButton(
                  onPressed: _isSendingOtp ? null : _sendOtp,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: colors.secondaryAccent,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                  ),
                  child: _isSendingOtp
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                      : Text(_otpSent ? 'Resend' : 'Send OTP'),
                ),
              ),
            ],
          ],
        ),
      ],
    );
  }

  Widget _buildInputField({
    required AppColors colors,
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    required Color accentColor,
    bool isPassword = false,
    TextInputType? keyboardType,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          obscureText: isPassword && _obscurePassword,
          keyboardType: keyboardType,
          validator: validator,
          style: TextStyle(color: colors.textPrimary, fontSize: 15),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: colors.textHint,
              fontSize: 14,
            ),
            prefixIcon: Icon(icon, color: accentColor, size: 20),
            suffixIcon: isPassword
                ? IconButton(
                    icon: Icon(
                      _obscurePassword
                          ? Icons.visibility_off_rounded
                          : Icons.visibility_rounded,
                      color: colors.textMuted,
                      size: 20,
                    ),
                    onPressed: () {
                      setState(() => _obscurePassword = !_obscurePassword);
                    },
                  )
                : null,
            filled: true,
            fillColor: colors.inputFill,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: colors.borderColor),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: colors.borderColor),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(
                color: accentColor,
                width: 1.5,
              ),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide(color: colors.error),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 16,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSubmitButton({
    required AppColors colors,
    required bool isLoading,
    required VoidCallback onPressed,
  }) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      height: 54,
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          elevation: 0,
        ),
        child: Ink(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [colors.secondaryAccent, colors.secondaryGradientEnd],
            ),
            borderRadius: BorderRadius.circular(14),
          ),
          child: Container(
            alignment: Alignment.center,
            child: isLoading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(
                      strokeWidth: 2.5,
                      color: Colors.white,
                    ),
                  )
                : Text(
                    _isRegisterMode ? 'Create Verified Account' : 'Login',
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                  ),
          ),
        ),
      ),
    );
  }

  Widget _buildToggle(AppColors colors) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          _isRegisterMode
              ? 'Already have an account?'
              : "Don't have an account?",
          style: TextStyle(
            color: colors.textMuted,
            fontSize: 13,
          ),
        ),
        TextButton(
          onPressed: () {
            setState(() {
              _isRegisterMode = !_isRegisterMode;
              _otpSent = false;
            });
            context.read<AuthProvider>().clearError();
          },
          child: Text(
            _isRegisterMode ? 'Login' : 'Register',
            style: TextStyle(
              color: colors.secondaryAccent,
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _sendOtp() async {
    if (_phoneController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a phone number')),
      );
      return;
    }

    setState(() => _isSendingOtp = true);

    final auth = context.read<AuthProvider>();
    final success = await auth.sendOtp(_phoneController.text.trim());

    if (mounted) {
      setState(() {
        _isSendingOtp = false;
        if (success) _otpSent = true;
      });
    }
  }

  Future<void> _resendOtp() async {
    await _sendOtp();
  }

  Future<void> _submit(AuthProvider auth) async {
    if (!_formKey.currentState!.validate()) return;

    auth.clearError();

    bool success;
    if (_isRegisterMode) {
      // Verify OTP first (if sent)
      if (_otpSent) {
        final otpValid = await auth.verifyOtp(
          phoneNumber: _phoneController.text.trim(),
          otpCode: _otpController.text.trim(),
        );
        if (!otpValid) return;
      }

      success = await auth.registerWithPhone(
        username: _usernameController.text,
        password: _passwordController.text,
        phoneNumber: _phoneController.text.trim(),
      );
    } else {
      success = await auth.login(
        username: _usernameController.text,
        password: _passwordController.text,
      );
    }

    if (success && mounted) {
      Navigator.of(context).pushReplacementNamed('/home');
    }
  }
}
