import React from 'react';
import './CycleGANsProject.css';
import config from '../config';

const CycleGANsProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Cycle GANs image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/CycleGAN.jpg',
      '/images/CycleGAN.jpg',
      '/CycleGAN.jpg',
      'http://localhost:5000/images/CycleGAN.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('CycleGAN.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q3ljbGUgR0FOczwvdGV4dD48L3N2Zz4=';
      console.log('All Cycle GANs image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/CycleGAN', '_blank');
  };

  const handleReportClick = () => {
    window.open('https://drive.google.com/file/d/13wveYY59ZlwJvj2kBL46CvGZAl946CY2/view?usp=sharing', '_blank');
  };

  const handlePosterClick = () => {
    window.open('https://drive.google.com/file/d/1fw5wqPGXhLQDdA28F8D3n8eDkwP8eZUM/view?usp=sharing', '_blank');
  };

  return (
    <div className="cycle-gans-project-container">
      <div className="cycle-gans-project-content">
        {/* Header Section */}
        <div className="cycle-gans-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to generative AI projects">
            ← Back
          </button>
          <div className="cycle-gans-hero">
            <div className="cycle-gans-image-container">
              <img 
                src={config.getImagePath('CycleGAN.jpg')}
                alt="Cycle GANs Project"
                className="cycle-gans-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Cycle GANs image loaded successfully!')}
              />
            </div>
            <div className="cycle-gans-title-container">
              <h1 className="cycle-gans-title">Cycle GANs</h1>
              <p className="cycle-gans-subtitle">Ukiyo-e Art Generation using Image-to-Image Translation</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="cycle-gans-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Used CycleGANs to generate Ukiyo-e art. Image-to-image translation to generate a new synthetic version of a given image with a specific modification. The CycleGAN is a technique that involves the automatic training of image-to-image translation models. The models are trained in an unsupervised manner using a collection of images from the source and target domain that do not need to be related in any way. In this project, we take in an input image and generate Ukiyo-e art. We implemented the CycleGAN paper.
            </p>
            
            <div className="technical-section">
              <h4>Technical Implementation & Methodology:</h4>
              <div className="methodology-grid">
                <div className="method-section">
                  <h5><strong>CycleGAN Architecture</strong></h5>
                  <ul>
                    <li><strong>Dual Generator Design:</strong> Two generators for bidirectional translation</li>
                    <li><strong>Discriminator Networks:</strong> Adversarial training for realistic outputs</li>
                    <li><strong>Cycle Consistency:</strong> Ensures preservation of content during translation</li>
                    <li><strong>Unsupervised Learning:</strong> No paired training data required</li>
                  </ul>
                </div>
                
                <div className="method-section">
                  <h5><strong>Ukiyo-e Art Style Transfer</strong></h5>
                  <ul>
                    <li><strong>Traditional Japanese Art:</strong> Focus on traditional woodblock print aesthetics</li>
                    <li><strong>Color Palette:</strong> Characteristic bold colors and flat tones</li>
                    <li><strong>Style Elements:</strong> Simplified forms and distinctive line work</li>
                    <li><strong>Cultural Authenticity:</strong> Maintains artistic essence of Ukiyo-e</li>
                  </ul>
                </div>
                
                <div className="method-section">
                  <h5><strong>Training Strategy</strong></h5>
                  <ul>
                    <li><strong>Unpaired Datasets:</strong> Real photos and Ukiyo-e artwork collections</li>
                    <li><strong>Loss Functions:</strong> Adversarial + cycle consistency + identity loss</li>
                    <li><strong>Data Augmentation:</strong> Enhanced dataset diversity for robust training</li>
                    <li><strong>Optimization:</strong> Adam optimizer with learning rate scheduling</li>
                  </ul>
                </div>
                
                <div className="method-section">
                  <h5><strong>Paper Implementation</strong></h5>
                  <ul>
                    <li><strong>Original Research:</strong> Full implementation of the CycleGAN paper</li>
                    <li><strong>Architecture Fidelity:</strong> Exact replication of generator and discriminator</li>
                    <li><strong>Loss Computation:</strong> Proper implementation of all loss components</li>
                    <li><strong>Training Protocol:</strong> Following the paper's training methodology</li>
                  </ul>
                </div>
              </div>
              
              <div className="results-section">
                <h5><strong>Key Features & Results</strong></h5>
                <div className="features-list">
                  <div className="feature-item">
                    <strong>Image-to-Image Translation:</strong> Seamless conversion from real photographs to Ukiyo-e style artwork
                  </div>
                  <div className="feature-item">
                    <strong>Bidirectional Capability:</strong> Can translate both from photos to Ukiyo-e and vice versa
                  </div>
                  <div className="feature-item">
                    <strong>Content Preservation:</strong> Maintains the essential structure and composition of input images
                  </div>
                  <div className="feature-item">
                    <strong>Artistic Quality:</strong> Produces visually compelling artwork that captures Ukiyo-e aesthetics
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Impact</strong></h5>
                <p>
                  This project demonstrates the power of generative adversarial networks in artistic style transfer, enabling automatic conversion of modern photographs into traditional Japanese Ukiyo-e art style. The implementation serves as a bridge between contemporary imagery and classical artistic traditions, opening possibilities for digital art creation and cultural preservation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="cycle-gans-section">
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

export default CycleGANsProject; 