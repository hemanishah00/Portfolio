const config = {
  getImagePath: (imageName) => {
    // For GitHub Pages, use the repository name in the path
    const basePath = process.env.NODE_ENV === 'production' 
      ? process.env.PUBLIC_URL || '' 
      : '';
    return `${basePath}/${imageName}`;
  }
};

export default config; 