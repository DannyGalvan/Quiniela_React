/**
 * Vite equivalent of webpack's require.context()
 * Loads images from a directory and provides a function to access them by filename
 *
 * Usage:
 *   const logoImage = createImageLoader('../Banderas');
 *   const imageSrc = logoImage('./LOGO.png');
 */

export const createImageLoader = (globPattern) => {
  // Import all images from the directory with eager loading
  const modules = import.meta.glob('/src/Banderas/**/*', {
    eager: true,
    import: 'default'
  });

  // Return a function compatible with require.context
  return (filename) => {
    // Normalize filename (remove leading ./)
    const normalized = filename.startsWith('./') ? filename.slice(2) : filename;

    // Build the full path - look for the file in Banderas directory
    const fullPath = `/src/Banderas/${normalized}`;

    // Find the module by the full path
    const module = modules[fullPath];

    if (!module) {
      console.warn(`Image not found: ${fullPath}`);
      return '';
    }

    // Return the imported module (already the image URL)
    return module;
  };
};

