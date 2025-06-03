import React from 'react';
import './RestaurantRecommendationProject.css';

const RestaurantRecommendationProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Restaurant Recommendation image failed to load, trying alternative paths...');
    const imagePaths = [
      '/ResRec.png',
      '/images/ResRec.png',
      'http://localhost:5000/images/ResRec.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('ResRec.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UmVzdGF1cmFudCBSZWNvbW1lbmRhdGlvbjwvdGV4dD48L3N2Zz4=';
      console.log('All Restaurant Recommendation image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/-Restaurant-Recommendation-System-using-the-Yelp-dataset', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://drive.google.com/file/d/1xIeiZcy1Z2PNJpnzcwwcA7b3zY2XFZSP/view?usp=drive_link', '_blank');
  };

  const handleReportClick = () => {
    window.open('https://drive.google.com/file/d/1iceV3TKc36lWkkqDMDPoI7kiyru900zT/view?usp=sharing', '_blank');
  };

  const handlePosterClick = () => {
    window.open('https://drive.google.com/file/d/1PBMGnNcjdRuc9BDQPmYwQ3rpUHBTcyxh/view?usp=sharing', '_blank');
  };

  return (
    <div className="restaurant-recommendation-project-container">
      <div className="restaurant-recommendation-project-content">
        {/* Header Section */}
        <div className="restaurant-recommendation-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to recommendation systems projects">
            ← Back
          </button>
          <div className="restaurant-recommendation-hero">
            <div className="restaurant-recommendation-image-container">
              <img 
                src="/ResRec.png"
                alt="Restaurant Recommendation System Project"
                className="restaurant-recommendation-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Restaurant Recommendation image loaded successfully!')}
              />
            </div>
            <div className="restaurant-recommendation-title-container">
              <h1 className="restaurant-recommendation-title">Restaurant Recommendation System</h1>
              <p className="restaurant-recommendation-subtitle">Using the Yelp Dataset with Collaborative Filtering</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="restaurant-recommendation-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Used collaborative filtering to recommend restaurants to users based on their past reviews. This comprehensive recommendation system leverages the Yelp dataset to provide personalized restaurant suggestions using multiple machine learning approaches and social network analysis.
            </p>
            
            <div className="methodology-section">
              <h4>Models Implemented and Performance Results:</h4>
              <div className="models-grid">
                <div className="model-item">
                  <h5><strong>1. Baseline Model</strong></h5>
                  <p><strong>MSE: 3.02</strong></p>
                  <p>A fundamental approach serving as the foundation for comparison with more sophisticated models.</p>
                </div>
                
                <div className="model-item">
                  <h5><strong>2. Matrix Factorization using SVD</strong></h5>
                  <p><strong>MSE: 0.92</strong></p>
                  <p>Singular Value Decomposition approach for dimensionality reduction and pattern recognition in user-item interactions.</p>
                </div>
                
                <div className="model-item">
                  <h5><strong>3. Collaborative Filtering (Linear)</strong></h5>
                  <p><strong>MSE: 0.99</strong></p>
                  <p>Linear regression-based collaborative filtering using residual matrix with latent space for items and users.</p>
                </div>
                
                <div className="model-item">
                  <h5><strong>4. Collaborative Filtering (Non-Linear)</strong></h5>
                  <p><strong>MSE: 1.4</strong></p>
                  <p>Neural network-based approach to capture non-linear relationships between user and item latent spaces.</p>
                </div>
              </div>
            </div>

            <div className="features-section">
              <h4>Key Features and Methodologies:</h4>
              <ul>
                <li><strong>Social Network Integration:</strong> Utilizes Yelp's social network data to recommend restaurants based on friends' ratings and preferences</li>
                <li><strong>Collaborative Filtering:</strong> Multiple approaches including linear and non-linear models for user preference prediction</li>
                <li><strong>Database Optimization:</strong> Efficient data querying to minimize RAM usage while processing large datasets</li>
                <li><strong>New User Recommendations:</strong> Special handling for users with limited rating history</li>
                <li><strong>Yelp Dataset Integration:</strong> Comprehensive use of business, user, and review data from Yelp</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="restaurant-recommendation-section">
          <h2 className="section-title">Resources</h2>
          <div className="section-content">
            <div className="resources-container">
              <button 
                className="resource-button github-button"
                onClick={handleGitHubClick}
                aria-label="View GitHub repository"
              >
                <span className="button-icon">🔗</span>
                View Code on GitHub
              </button>
              
              <button 
                className="resource-button video-button"
                onClick={handleVideoClick}
                aria-label="Request presentation video"
              >
                <span className="button-icon">🎥</span>
                Request the video of the presentation
              </button>

              <button 
                className="resource-button report-button"
                onClick={handleReportClick}
                aria-label="Download detailed report"
              >
                <span className="button-icon">📊</span>
                Download detailed report
              </button>

              <button 
                className="resource-button poster-button"
                onClick={handlePosterClick}
                aria-label="Request poster"
              >
                <span className="button-icon">🎨</span>
                Request poster
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantRecommendationProject; 