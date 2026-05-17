/**
 * Shared navigation utility functions.
 */

/**
 * Determines if a given pathname belongs to the Student Portal or Dashboard.
 * @param {string} pathname - The current URL path.
 * @returns {boolean} - True if it's a portal/dashboard page.
 */
export const isPortalPage = (pathname) => {
    if (!pathname) return false;
    const path = pathname.toLowerCase();
    return path.startsWith('/student-portal') || path.startsWith('/dashboard') || path.startsWith('/admin');
};
