import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../config/app_colors.dart';
import '../../models/message_model.dart';

/// WhatsApp-style chat message bubble.
///
/// Sent messages: right-aligned with teal gradient.
/// Received messages: left-aligned with theme surface color.
/// Fully theme-aware for light and dark modes.
class MessageBubble extends StatelessWidget {
  final MessageModel message;
  final bool isMine;

  const MessageBubble({
    super.key,
    required this.message,
    required this.isMine,
  });

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).extension<AppColors>()!;

    return Align(
      alignment: isMine ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        margin: EdgeInsets.only(
          top: 2,
          bottom: 2,
          left: isMine ? 48 : 0,
          right: isMine ? 0 : 48,
        ),
        decoration: BoxDecoration(
          gradient: isMine
              ? LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [colors.sentBubbleStart, colors.sentBubbleEnd],
                )
              : null,
          color: isMine ? null : colors.receivedBubble,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(18),
            topRight: const Radius.circular(18),
            bottomLeft: Radius.circular(isMine ? 18 : 4),
            bottomRight: Radius.circular(isMine ? 4 : 18),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
          // Add a subtle border for received bubbles in light mode
          border: !isMine
              ? Border.all(
                  color: colors.borderColor.withOpacity(0.3),
                  width: 0.5,
                )
              : null,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              // Message text
              Text(
                message.messageText,
                style: TextStyle(
                  color: isMine
                      ? colors.sentBubbleText
                      : colors.receivedBubbleText,
                  fontSize: 15,
                  height: 1.35,
                ),
              ),
              const SizedBox(height: 4),
              // Timestamp and delivery status
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    DateFormat('HH:mm').format(message.createdAt.toLocal()),
                    style: TextStyle(
                      color: isMine
                          ? colors.sentBubbleText.withOpacity(0.6)
                          : colors.textMuted,
                      fontSize: 11,
                    ),
                  ),
                  if (isMine) ...[
                    const SizedBox(width: 4),
                    Icon(
                      message.isDelivered
                          ? Icons.done_all_rounded
                          : Icons.done_rounded,
                      size: 16,
                      color: message.isDelivered
                          ? colors.deliveredCheck
                          : colors.sentBubbleText.withOpacity(0.5),
                    ),
                  ],
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
