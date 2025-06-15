const config = {
  getImagePath: (imageName) => {
    // In development, use root path. In production (GitHub Pages), use PUBLIC_URL
    if (process.env.NODE_ENV === 'development') {
      return `/${imageName}`;
    } else {
      // Production - use PUBLIC_URL for GitHub Pages
      const basePath = process.env.PUBLIC_URL || '';
      return `${basePath}/${imageName}`;
    }
  }
};

export default config; 