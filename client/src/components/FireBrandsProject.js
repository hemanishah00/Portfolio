import React, { useState } from 'react';
import './FireBrandsProject.css';
import config from '../config';

const FireBrandsProject = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (e) => {
    console.log('FireBrands image failed to load, trying alternative paths...');
    const imagePaths = [
      config.getImagePath('Firebrands.jpg'),
      '/Firebrands.jpg',
      '/images/Firebrands.jpg',
      'http://localhost:5000/images/Firebrands.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('Firebrands.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RmlyZUJyYW5kczwvdGV4dD48L3N2Zz4=';
      console.log('All FireBrands image paths failed, using placeholder');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('image-modal-overlay')) {
      closeModal();
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/-Estimating-firebrand-shape-and-size-from-field-measurements', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://github.com/hemanishah00/-Estimating-firebrand-shape-and-size-from-field-measurements/blob/master/video_presentation.mp4', '_blank');
  };

  const handleReportDownload = () => {
    window.open('https://github.com/hemanishah00/-Estimating-firebrand-shape-and-size-from-field-measurements/blob/master/Presentation%20Slides.pptx', '_blank');
  };

  const handlePosterClick = () => {
    window.open('https://github.com/hemanishah00/-Estimating-firebrand-shape-and-size-from-field-measurements/blob/master/Poster_FireBrand.pdf', '_blank');
  };

  return (
    <div className="firebrands-project-container">
      <div className="firebrands-project-content">
        {/* Header Section */}
        <div className="firebrands-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to computer vision projects">
            ← Back
          </button>
          <div className="firebrands-hero">
            <div className="firebrands-image-container">
              <img 
                src={config.getImagePath('Firebrands.jpg')}
                alt="FireBrands Project"
                className="firebrands-hero-image clickable-image"
                onError={handleImageError}
                onLoad={() => console.log('FireBrands image loaded successfully!')}
                onClick={openModal}
                style={{ cursor: 'pointer' }}
                title="Click to view full size"
              />
              <div className="image-overlay">
                <span className="expand-icon">🔍</span>
              </div>
            </div>
            <div className="firebrands-title-container">
              <h1 className="firebrands-title">FireBrands</h1>
              <p className="firebrands-subtitle">Estimating Firebrand Shape and Size from Field Measurements</p>
            </div>
          </div>
        </div>

        {/* Problem Statement Section */}
        <section className="firebrands-section">
          <h2 className="section-title">Problem Statement</h2>
          <div className="section-content">
            <h3 className="subsection-title">Wildland Fire Characterization and Firebrand Analysis</h3>
            <p>
              Wildland fires have caused significant destruction to communities in Australia, Greece, Portugal, Spain, and the USA. The 2007 Southern California Fire displaced more than 300,000 people, destroyed over 1,000 structures, and resulted in $1B paid by insurers in 2007 alone. WUI fires continue to burn in the USA and are rapidly getting worse; most recently, the tragic Camp Fire in California in 2020 [1,2].
            </p>
            <p>
              When vegetation and structures burn in large outdoor fires, pieces of burning material, known as firebrands, are generated, become lofted, and may be carried by the wind. This results in showers of wind-driven firebrands that may land ahead of the fire front, igniting vegetation and structures, and spreading the fire very fast. Post-fire disaster studies indicate that firebrand showers are a significant factor in the fire spread of multiple large outdoor fires.
            </p>
            <p>
              To protect communities from firebrand ignition, it is critical to understand the characteristics of the firebrand shower. In this project, we use image data collected from a system of 4 video cameras to characterize the firebrands.
            </p>
          </div>
        </section>

        {/* Summary Section */}
        <section className="firebrands-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Implemented CNNs to predict the shapes of the firebrands. Used Data Augmentation to regularize the model for predicting the shapes. Explored and plotted saliency maps, Grad-CAM maps for error analysis in the predictions. Deployed Functional API to use both images and distances as inputs in the CNNs for predicting volumes. Achieved an R² score of 0.95 in the prediction of shapes. Attained an R² score of 0.97 in the prediction of volumes.
            </p>
            <div className="methodology-section">
              <h4>Key Methodologies and Achievements:</h4>
              <div className="methodology-grid">
                <div className="methodology-item">
                  <h5><strong>Convolutional Neural Networks (CNNs)</strong></h5>
                  <p>Implemented advanced CNN architectures specifically designed for firebrand shape prediction with high accuracy.</p>
                </div>
                
                <div className="methodology-item">
                  <h5><strong>Data Augmentation</strong></h5>
                  <p>Applied comprehensive data augmentation techniques to regularize the model and improve generalization for shape prediction tasks.</p>
                </div>
                
                <div className="methodology-item">
                  <h5><strong>Error Analysis</strong></h5>
                  <p>Explored and plotted saliency maps and Grad-CAM visualizations for comprehensive error analysis and model interpretability.</p>
                </div>
                
                <div className="methodology-item">
                  <h5><strong>Multi-Input Architecture</strong></h5>
                  <p>Deployed Functional API to create models that utilize both image data and distance measurements as inputs for volume prediction.</p>
                </div>
              </div>
              
              <div className="results-section">
                <h5><strong>Performance Results:</strong></h5>
                <ul>
                  <li><strong>Shape Prediction:</strong> Achieved an R² score of 0.95</li>
                  <li><strong>Volume Prediction:</strong> Attained an R² score of 0.97</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="firebrands-section">
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
                aria-label="Watch presentation video"
              >
                <span className="button-icon">🎥</span>
                Video of the presentation
              </button>

              <button 
                className="resource-button report-button"
                onClick={handleReportDownload}
                aria-label="Download detailed report"
              >
                <span className="button-icon">📊</span>
                Download detailed report
              </button>

              <button 
                className="resource-button poster-button"
                onClick={handlePosterClick}
                aria-label="Download poster"
              >
                <span className="button-icon">🎨</span>
                Download poster
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal-overlay" onClick={handleModalClick}>
          <div className="image-modal">
            <button className="modal-close-button" onClick={closeModal} aria-label="Close image modal">
              ×
            </button>
            <img 
              src={config.getImagePath('Firebrands.jpg')}
              alt="FireBrands Project - Full Size"
              className="modal-image"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FireBrandsProject; 