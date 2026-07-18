import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/app_colors.dart';
import '../../models/user_model.dart';
import '../../providers/auth_provider.dart';

/// Bottom sheet dialog for searching and selecting users to chat with.
/// Fully theme-aware for light and dark modes.
class UserSearchDialog extends StatefulWidget {
  final Function(String userId, String username, String? avatarUrl) onUserSelected;

  const UserSearchDialog({
    super.key,
    required this.onUserSelected,
  });

  @override
  State<UserSearchDialog> createState() => _UserSearchDialogState();
}

class _UserSearchDialogState extends State<UserSearchDialog> {
  final _searchController = TextEditingController();
  List<UserModel> _results = [];
  bool _isSearching = false;
  String? _errorMessage;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).extension<AppColors>()!;
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return Container(
      margin: EdgeInsets.only(bottom: bottomInset),
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.7,
      ),
      decoration: BoxDecoration(
        color: colors.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: colors.textHint,
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          // Title
          Padding(
            padding: const EdgeInsets.all(20),
            child: Text(
              'New Chat',
              style: TextStyle(
                color: colors.textPrimary,
                fontSize: 18,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),

          // Search field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              controller: _searchController,
              autofocus: true,
              style: TextStyle(color: colors.textPrimary, fontSize: 15),
              onChanged: _onSearch,
              decoration: InputDecoration(
                hintText: 'Search by username...',
                hintStyle: TextStyle(
                  color: colors.textHint,
                  fontSize: 14,
                ),
                prefixIcon: Icon(
                  Icons.search_rounded,
                  color: colors.textMuted,
                ),
                suffixIcon: _isSearching
                    ? Padding(
                        padding: const EdgeInsets.all(14),
                        child: SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: colors.primaryAccent,
                          ),
                        ),
                      )
                    : _searchController.text.isNotEmpty
                        ? IconButton(
                            icon: Icon(
                              Icons.close_rounded,
                              color: colors.textMuted,
                            ),
                            onPressed: () {
                              _searchController.clear();
                              setState(() {
                                _results = [];
                                _errorMessage = null;
                              });
                            },
                          )
                        : null,
                filled: true,
                fillColor: colors.background,
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
                    color: colors.primaryAccent,
                    width: 1.5,
                  ),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 14,
                ),
              ),
            ),
          ),

          const SizedBox(height: 12),

          // Results
          Flexible(
            child: _buildResults(colors),
          ),
        ],
      ),
    );
  }

  Widget _buildResults(AppColors colors) {
    if (_errorMessage != null) {
      return Padding(
        padding: const EdgeInsets.all(24),
        child: Text(
          _errorMessage!,
          style: TextStyle(
            color: colors.textMuted,
            fontSize: 14,
          ),
        ),
      );
    }

    if (_searchController.text.isEmpty) {
      return Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.person_search_rounded,
              size: 48,
              color: colors.textHint,
            ),
            const SizedBox(height: 12),
            Text(
              'Type a username to find people',
              style: TextStyle(
                color: colors.textMuted,
                fontSize: 14,
              ),
            ),
          ],
        ),
      );
    }

    if (_results.isEmpty && !_isSearching) {
      return Padding(
        padding: const EdgeInsets.all(40),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.search_off_rounded,
              size: 48,
              color: colors.textHint,
            ),
            const SizedBox(height: 12),
            Text(
              'No users found',
              style: TextStyle(
                color: colors.textMuted,
                fontSize: 14,
              ),
            ),
          ],
        ),
      );
    }

    final currentUserId = context.read<AuthProvider>().currentUser?.id;

    return ListView.builder(
      shrinkWrap: true,
      padding: const EdgeInsets.symmetric(horizontal: 8),
      itemCount: _results.length,
      itemBuilder: (context, index) {
        final user = _results[index];

        // Don't show self
        if (user.id == currentUserId) return const SizedBox.shrink();

        return Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: () => widget.onUserSelected(user.id, user.username, user.avatarUrl),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              child: Row(
                children: [
                  // Avatar
                  CircleAvatar(
                    radius: 22,
                    backgroundColor: Color(
                      (user.username.hashCode & 0xFFFFFF) | 0xFF000000,
                    ).withOpacity(0.7),
                    backgroundImage: user.avatarUrl != null
                        ? NetworkImage(user.avatarUrl!)
                        : null,
                    child: user.avatarUrl == null
                        ? Text(
                            user.username[0].toUpperCase(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                              fontSize: 18,
                            ),
                          )
                        : null,
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user.username,
                          style: TextStyle(
                            color: colors.textPrimary,
                            fontWeight: FontWeight.w500,
                            fontSize: 15,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Icon(
                              user.isAnonymous
                                  ? Icons.visibility_off_rounded
                                  : Icons.verified_rounded,
                              size: 14,
                              color: user.isAnonymous
                                  ? colors.primaryAccent
                                  : colors.secondaryAccent,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              user.isAnonymous ? 'Anonymous' : 'Verified',
                              style: TextStyle(
                                color: colors.textMuted,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    Icons.arrow_forward_ios_rounded,
                    size: 16,
                    color: colors.textHint,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Future<void> _onSearch(String query) async {
    if (query.trim().length < 2) {
      setState(() {
        _results = [];
        _errorMessage = null;
      });
      return;
    }

    setState(() {
      _isSearching = true;
      _errorMessage = null;
    });

    try {
      final results =
          await context.read<AuthProvider>().searchUsers(query.trim());
      if (mounted) {
        setState(() {
          _results = results;
          _isSearching = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = 'Search failed. Please try again.';
          _isSearching = false;
        });
      }
    }
  }
}
