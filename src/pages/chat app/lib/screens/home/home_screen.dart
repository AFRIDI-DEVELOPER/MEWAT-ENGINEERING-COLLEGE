import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../config/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import '../../providers/theme_provider.dart';
import '../chat/chat_screen.dart';
import 'user_search_dialog.dart';
import 'profile_dialog.dart';

/// Home screen showing the list of recent conversations.
///
/// WhatsApp-style layout with chat list, FAB to start new chat,
/// dark mode toggle, and user info in the app bar.
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Initialize chat provider after frame renders
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _initializeChat();
    });
  }

  void _initializeChat() {
    final auth = context.read<AuthProvider>();
    if (auth.currentUser != null) {
      context.read<ChatProvider>().initialize(
            userId: auth.currentUser!.id,
            username: auth.currentUser!.username,
            isAnonymous: auth.currentUser!.isAnonymous,
          );
    }
  }

  /// Convenience getter for the AppColors extension.
  AppColors get _colors => Theme.of(context).extension<AppColors>()!;

  @override
  Widget build(BuildContext context) {
    final colors = _colors;
    return Scaffold(
      backgroundColor: colors.background,
      appBar: _buildAppBar(colors),
      body: _buildBody(colors),
      floatingActionButton: _buildFAB(colors),
    );
  }

  PreferredSizeWidget _buildAppBar(AppColors colors) {
    return AppBar(
      backgroundColor: colors.surface,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      title: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          final user = auth.currentUser;
          return Row(
            children: [
              // User avatar (Tappable for profile settings)
              GestureDetector(
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) => const ProfileDialog(),
                  );
                },
                child: CircleAvatar(
                  radius: 18,
                  backgroundColor: auth.isAnonymous
                      ? colors.primaryAccent.withOpacity(0.1)
                      : colors.secondaryAccent.withOpacity(0.1),
                  backgroundImage: user?.avatarUrl != null
                      ? NetworkImage(user!.avatarUrl!)
                      : null,
                  child: user?.avatarUrl == null
                      ? Text(
                          (user?.username ?? '?')[0].toUpperCase(),
                          style: TextStyle(
                            color: auth.isAnonymous
                                ? colors.primaryAccent
                                : colors.secondaryAccent,
                            fontWeight: FontWeight.w700,
                            fontSize: 16,
                          ),
                        )
                      : null,
                ),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    auth.currentUser?.username ?? 'User',
                    style: TextStyle(
                      color: colors.textPrimary,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: auth.isAnonymous
                              ? colors.primaryAccent
                              : colors.secondaryAccent,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        auth.isAnonymous ? 'Anonymous' : 'Verified',
                        style: TextStyle(
                          color: colors.textMuted,
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          );
        },
      ),
      actions: [
        // Refresh button
        IconButton(
          icon: Icon(
            Icons.refresh_rounded,
            color: colors.textMuted,
          ),
          onPressed: () {
            context.read<ChatProvider>().loadConversations();
          },
        ),
        // More menu with dark mode toggle + logout
        Consumer<ThemeProvider>(
          builder: (context, themeProvider, _) {
            return PopupMenuButton<String>(
              icon: Icon(
                Icons.more_vert_rounded,
                color: colors.textMuted,
              ),
              color: colors.surface,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              onSelected: (value) {
                if (value == 'logout') {
                  _logout();
                }
                // Theme toggle is handled inside its own widget
              },
              itemBuilder: (context) => [
                // Dark Mode Toggle
                PopupMenuItem(
                  enabled: false, // We handle tap via the Switch
                  child: Row(
                    children: [
                      Icon(
                        themeProvider.isDarkMode
                            ? Icons.dark_mode_rounded
                            : Icons.light_mode_rounded,
                        color: colors.primaryAccent,
                        size: 20,
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Dark Mode',
                          style: TextStyle(
                            color: colors.textPrimary,
                          ),
                        ),
                      ),
                      Transform.scale(
                        scale: 0.8,
                        child: Switch.adaptive(
                          value: themeProvider.isDarkMode,
                          activeColor: colors.primaryAccent,
                          onChanged: (_) {
                            themeProvider.toggleTheme();
                            Navigator.pop(context); // Close menu
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                const PopupMenuDivider(),
                // Logout
                PopupMenuItem(
                  value: 'logout',
                  child: Row(
                    children: [
                      Icon(
                        Icons.logout_rounded,
                        color: colors.error,
                        size: 20,
                      ),
                      const SizedBox(width: 10),
                      Text(
                        'Logout',
                        style: TextStyle(
                          color: colors.error,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _buildBody(AppColors colors) {
    return Consumer<ChatProvider>(
      builder: (context, chatProvider, _) {
        if (chatProvider.isLoadingConversations) {
          return Center(
            child: CircularProgressIndicator(
              color: colors.primaryAccent,
            ),
          );
        }

        if (chatProvider.conversations.isEmpty) {
          return _buildEmptyState(colors);
        }

        return ListView.builder(
          padding: const EdgeInsets.only(top: 8),
          itemCount: chatProvider.conversations.length,
          itemBuilder: (context, index) {
            final conversation = chatProvider.conversations[index];
            return _buildConversationTile(conversation, colors);
          },
        );
      },
    );
  }

  Widget _buildEmptyState(AppColors colors) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: colors.inputFill,
                border: Border.all(
                  color: colors.borderColor,
                  width: 2,
                ),
              ),
              child: Icon(
                Icons.chat_bubble_outline_rounded,
                size: 44,
                color: colors.textHint,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'No conversations yet',
              style: TextStyle(
                color: colors.textSecondary,
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Tap the + button to search for users\nand start a new private chat',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: colors.textMuted,
                fontSize: 14,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConversationTile(
    Map<String, dynamic> conversation,
    AppColors colors,
  ) {
    final partnerId = conversation['partner_id'] as String;
    final partnerName = conversation['partner_username'] as String? ?? partnerId;
    final partnerAvatarUrl = conversation['partner_avatar_url'] as String?;
    final lastMessage = conversation['last_message'] as String? ?? '';
    final lastTime = conversation['last_time'] as String?;

    String timeDisplay = '';
    if (lastTime != null) {
      final dt = DateTime.parse(lastTime);
      final now = DateTime.now();
      final diff = now.difference(dt);

      if (diff.inDays == 0) {
        timeDisplay = DateFormat('HH:mm').format(dt.toLocal());
      } else if (diff.inDays == 1) {
        timeDisplay = 'Yesterday';
      } else if (diff.inDays < 7) {
        timeDisplay = DateFormat('EEE').format(dt.toLocal());
      } else {
        timeDisplay = DateFormat('dd/MM/yy').format(dt.toLocal());
      }
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: () => _openChat(partnerId, partnerName, partnerAvatarUrl),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
            child: Row(
              children: [
                // Avatar
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Color(
                    (partnerName.hashCode & 0xFFFFFF) | 0xFF000000,
                  ).withOpacity(0.7),
                  backgroundImage: partnerAvatarUrl != null
                      ? NetworkImage(partnerAvatarUrl)
                      : null,
                  child: partnerAvatarUrl == null
                      ? Text(
                          partnerName[0].toUpperCase(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 20,
                          ),
                        )
                      : null,
                ),
                const SizedBox(width: 14),
                // Name and last message
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        partnerName,
                        style: TextStyle(
                          color: colors.textPrimary,
                          fontWeight: FontWeight.w600,
                          fontSize: 15,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        lastMessage.length > 45
                            ? '${lastMessage.substring(0, 45)}...'
                            : lastMessage,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: colors.textMuted,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
                // Time
                Text(
                  timeDisplay,
                  style: TextStyle(
                    color: colors.textHint,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFAB(AppColors colors) {
    return FloatingActionButton(
      onPressed: _showUserSearch,
      backgroundColor: colors.primaryAccent,
      foregroundColor: colors.background,
      elevation: 4,
      child: const Icon(Icons.chat_rounded, size: 24),
    );
  }

  void _showUserSearch() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => UserSearchDialog(
        onUserSelected: (userId, username, avatarUrl) {
          Navigator.pop(context); // Close bottom sheet
          _openChat(userId, username, avatarUrl);
        },
      ),
    );
  }

  void _openChat(String partnerId, String partnerName, String? partnerAvatarUrl) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ChatScreen(
          partnerId: partnerId,
          partnerName: partnerName,
          partnerAvatarUrl: partnerAvatarUrl,
        ),
      ),
    ).then((_) {
      // Refresh conversations when returning from chat
      context.read<ChatProvider>().loadConversations();
    });
  }

  Future<void> _logout() async {
    final colors = _colors;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: colors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        title: Text(
          'Logout',
          style: TextStyle(color: colors.textPrimary),
        ),
        content: Consumer<AuthProvider>(
          builder: (context, auth, _) {
            return Text(
              auth.isAnonymous
                  ? 'Your messages are stored only on this device. '
                      'Logging out will not delete them, but you won\'t '
                      'be able to receive new messages until you log back in.'
                  : 'Are you sure you want to logout?',
              style: TextStyle(
                color: colors.textSecondary,
                fontSize: 14,
              ),
            );
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(
              'Cancel',
              style: TextStyle(color: colors.textMuted),
            ),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(
              'Logout',
              style: TextStyle(color: colors.error),
            ),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      context.read<ChatProvider>().reset();
      await context.read<AuthProvider>().logout();
      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/auth');
      }
    }
  }
}
