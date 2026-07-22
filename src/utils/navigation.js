/**
 * Shared navigation utility functions.
 */

/**
 * Determines if a given pathname belongs to the Examination Cell or Dashboard.
 * These pages share the portal layout (hidden regular navbar, anti-gravity bg).
 */
export function isPortalPage(path) {
    if (!path) return false;
    // Include all portal-related routes here
    return path.startsWith('/examination-cell') || path.startsWith('/dashboard') || path.startsWith('/admin');
};
