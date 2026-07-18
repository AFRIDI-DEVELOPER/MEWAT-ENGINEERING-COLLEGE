import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import 'message_bubble.dart';

/// Individual chat conversation screen.
///
/// Displays real-time messages with auto-scroll, message input bar,
/// and WhatsApp-style layout. Fully theme-aware.
class ChatScreen extends StatefulWidget {
  final String partnerId;
  final String partnerName;
  final String? partnerAvatarUrl;

  const ChatScreen({
    super.key,
    required this.partnerId,
    required this.partnerName,
    this.partnerAvatarUrl,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  bool _isSending = false;
  Timer? _typingDebounce;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ChatProvider>().openChat(
            partnerId: widget.partnerId,
            partnerName: widget.partnerName,
            partnerAvatarUrl: widget.partnerAvatarUrl,
          );
    });
  }

  @override
  void dispose() {
    _typingDebounce?.cancel();
    _messageController.dispose();
    _scrollController.dispose();
    context.read<ChatProvider>().closeChat();
    super.dispose();
  }

  /// Called when text changes in the input field.
  /// Sends a typing event with debouncing (at most once per second).
  void _onTextChanged(String text) {
    if (text.isNotEmpty) {
      _typingDebounce?.cancel();
      _typingDebounce = Timer(const Duration(milliseconds: 500), () {
        context.read<ChatProvider>().sendTypingEvent();
      });
      // Send immediately on first keystroke
      if (_typingDebounce!.isActive) {
        context.read<ChatProvider>().sendTypingEvent();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).extension<AppColors>()!;

    return Scaffold(
      backgroundColor: colors.background,
      appBar: _buildAppBar(colors),
      body: Column(
        children: [
          // Privacy notice for anonymous chats
          Consumer<AuthProvider>(
            builder: (context, auth, _) {
              if (auth.isAnonymous) {
                return _buildPrivacyNotice(colors);
              }
              return const SizedBox.shrink();
            },
          ),

          // Messages list
          Expanded(
            child: _buildMessagesList(colors),
          ),

          // Typing indicator above input bar
          _buildTypingIndicator(colors),

          // Input bar
          _buildInputBar(colors),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(AppColors colors) {
    return AppBar(
      backgroundColor: colors.surface,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      leading: IconButton(
        icon: Icon(Icons.arrow_back_rounded, color: colors.textPrimary),
        onPressed: () => Navigator.pop(context),
      ),
      title: Row(
        children: [
          // Avatar
          CircleAvatar(
            radius: 18,
            backgroundColor: Color(
              (widget.partnerName.hashCode & 0xFFFFFF) | 0xFF000000,
            ).withOpacity(0.7),
            backgroundImage: widget.partnerAvatarUrl != null
                ? NetworkImage(widget.partnerAvatarUrl!)
                : null,
            child: widget.partnerAvatarUrl == null
                ? Text(
                    widget.partnerName[0].toUpperCase(),
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  )
                : null,
          ),
          const SizedBox(width: 12),
          Consumer<ChatProvider>(
            builder: (context, chatProvider, _) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.partnerName,
                    style: TextStyle(
                      color: colors.textPrimary,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 200),
                    child: chatProvider.isPartnerTyping
                        ? Text(
                            'typing...',
                            key: const ValueKey('typing'),
                            style: TextStyle(
                              color: colors.primaryAccent,
                              fontSize: 12,
                              fontWeight: FontWeight.w500,
                            ),
                          )
                        : Text(
                            'tap for info',
                            key: const ValueKey('info'),
                            style: TextStyle(
                              color: colors.textMuted,
                              fontSize: 12,
                            ),
                          ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPrivacyNotice(AppColors colors) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: colors.primaryAccent.withOpacity(0.06),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.lock_rounded,
            size: 14,
            color: colors.primaryAccent.withOpacity(0.6),
          ),
          const SizedBox(width: 6),
          Text(
            'Messages are stored locally and deleted from cloud after delivery',
            style: TextStyle(
              color: colors.primaryAccent.withOpacity(0.7),
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessagesList(AppColors colors) {
    return Consumer2<ChatProvider, AuthProvider>(
      builder: (context, chatProvider, authProvider, _) {
        if (chatProvider.isLoadingMessages) {
          return Center(
            child: CircularProgressIndicator(
              color: colors.primaryAccent,
            ),
          );
        }

        if (chatProvider.messages.isEmpty) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.forum_rounded,
                  size: 56,
                  color: colors.textHint,
                ),
                const SizedBox(height: 16),
                Text(
                  'No messages yet',
                  style: TextStyle(
                    color: colors.textMuted,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Say hello to ${widget.partnerName}!',
                  style: TextStyle(
                    color: colors.textHint,
                    fontSize: 13,
                  ),
                ),
              ],
            ),
          );
        }

        final currentUserId = authProvider.currentUser?.id ?? '';

        // Auto-scroll to bottom when messages change
        WidgetsBinding.instance.addPostFrameCallback((_) {
          _scrollToBottom();
        });

        return ListView.builder(
          controller: _scrollController,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          itemCount: chatProvider.messages.length,
          itemBuilder: (context, index) {
            final message = chatProvider.messages[index];
            final isMine = message.senderId == currentUserId;

            // Check if we should show a date separator
            bool showDate = false;
            if (index == 0) {
              showDate = true;
            } else {
              final prev = chatProvider.messages[index - 1];
              if (message.createdAt.day != prev.createdAt.day ||
                  message.createdAt.month != prev.createdAt.month ||
                  message.createdAt.year != prev.createdAt.year) {
                showDate = true;
              }
            }

            return Column(
              children: [
                if (showDate) _buildDateSeparator(message.createdAt, colors),
                MessageBubble(
                  message: message,
                  isMine: isMine,
                ),
              ],
            );
          },
        );
      },
    );
  }

  Widget _buildDateSeparator(DateTime date, AppColors colors) {
    final now = DateTime.now();
    String label;
    if (date.day == now.day &&
        date.month == now.month &&
        date.year == now.year) {
      label = 'Today';
    } else if (date.day == now.day - 1 &&
        date.month == now.month &&
        date.year == now.year) {
      label = 'Yesterday';
    } else {
      label = '${date.day}/${date.month}/${date.year}';
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: colors.inputFill,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: colors.textMuted,
            fontSize: 12,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }

  /// Build the typing indicator widget that shows above the input bar.
  Widget _buildTypingIndicator(AppColors colors) {
    return Consumer<ChatProvider>(
      builder: (context, chatProvider, _) {
        if (!chatProvider.isPartnerTyping) {
          return const SizedBox.shrink();
        }

        final name = chatProvider.partnerTypingUsername ?? widget.partnerName;
        return Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
          child: Row(
            children: [
              // Animated dots
              SizedBox(
                width: 28,
                height: 16,
                child: _TypingDots(color: colors.primaryAccent),
              ),
              const SizedBox(width: 8),
              Text(
                '$name is typing...',
                style: TextStyle(
                  color: colors.primaryAccent,
                  fontSize: 12,
                  fontStyle: FontStyle.italic,
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildInputBar(AppColors colors) {
    return Container(
      padding: EdgeInsets.only(
        left: 12,
        right: 8,
        top: 10,
        bottom: MediaQuery.of(context).viewPadding.bottom + 10,
      ),
      decoration: BoxDecoration(
        color: colors.surface,
        border: Border(
          top: BorderSide(
            color: colors.borderColor,
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          // Text input
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: colors.background,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(
                  color: colors.borderColor,
                ),
              ),
              child: TextField(
                controller: _messageController,
                maxLines: 4,
                minLines: 1,
                style: TextStyle(color: colors.textPrimary, fontSize: 15),
                textCapitalization: TextCapitalization.sentences,
                onChanged: _onTextChanged,
                decoration: InputDecoration(
                  hintText: 'Type a message...',
                  hintStyle: TextStyle(
                    color: colors.textHint,
                    fontSize: 15,
                  ),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 18,
                    vertical: 12,
                  ),
                ),
                onSubmitted: (_) => _sendMessage(),
              ),
            ),
          ),
          const SizedBox(width: 8),
          // Send button
          GestureDetector(
            onTap: _isSending ? null : _sendMessage,
            child: Container(
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [colors.primaryAccent, colors.primaryGradientEnd],
                ),
              ),
              child: Center(
                child: _isSending
                    ? SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: colors.background,
                        ),
                      )
                    : Icon(
                        Icons.send_rounded,
                        color: colors.background,
                        size: 22,
                      ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage() async {
    final text = _messageController.text.trim();
    if (text.isEmpty || _isSending) return;

    setState(() => _isSending = true);
    _messageController.clear();

    final success = await context.read<ChatProvider>().sendMessage(text);

    if (mounted) {
      setState(() => _isSending = false);
      if (success) {
        _scrollToBottom();
      } else {
        // Restore text if send failed
        _messageController.text = text;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to send message. Please check connection.'),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }
}

/// Animated typing dots widget (three bouncing dots).
class _TypingDots extends StatefulWidget {
  final Color color;
  const _TypingDots({required this.color});

  @override
  State<_TypingDots> createState() => _TypingDotsState();
}

class _TypingDotsState extends State<_TypingDots>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(3, (index) {
            final delay = index * 0.2;
            final value = ((_controller.value - delay) % 1.0).clamp(0.0, 1.0);
            final offset = (value < 0.5)
                ? Curves.easeOut.transform(value * 2) * -4
                : Curves.easeIn.transform((value - 0.5) * 2) * 4 - 4;

            return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 1.5),
              child: Transform.translate(
                offset: Offset(0, offset),
                child: Container(
                  width: 6,
                  height: 6,
                  decoration: BoxDecoration(
                    color: widget.color.withOpacity(0.7),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            );
          }),
        );
      },
    );
  }
}

