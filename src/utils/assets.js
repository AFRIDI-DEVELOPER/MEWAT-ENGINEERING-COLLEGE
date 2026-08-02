/**
 * Resolves an asset path by prefixing it with the Vite base URL.
 * @param {string} path - The absolute path relative to the public directory (e.g., '/images/logo.png')
 * @returns {string} - The resolved path including the base URL.
 */
export const getAssetPath = (path) => {
  if (!path) return '';
  
  // If the path is already full (http/https/data) or doesn't start with /, return as is
  if (path.startsWith('http') || path.startsWith('data:') || !path.startsWith('/')) {
    return path;
  }

  // Use Vite's environment variable for the base path
  const base = import.meta.env.BASE_URL;
  
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${base}${cleanPath}`;
};
