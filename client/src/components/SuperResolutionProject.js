import React from 'react';
import './SuperResolutionProject.css';

const SuperResolutionProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Super Resolution image failed to load, trying alternative paths...');
    const imagePaths = [
      '/SuperResolution.png',
      '/images/SuperResolution.png',
      'http://localhost:5000/images/SuperResolution.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('SuperResolution.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3VwZXIgUmVzb2x1dGlvbjwvdGV4dD48L3N2Zz4=';
      console.log('All Super Resolution image paths failed, using placeholder');
    }
  };

  return (
    <div className="super-resolution-project-container">
      <div className="super-resolution-project-content">
        {/* Header Section */}
        <div className="super-resolution-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to computer vision projects">
            ← Back
          </button>
          <div className="super-resolution-hero">
            <div className="super-resolution-image-container">
              <img 
                src="/SuperResolution.png"
                alt="Super Resolution Project"
                className="super-resolution-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Super Resolution image loaded successfully!')}
              />
            </div>
            <div className="super-resolution-title-container">
              <h1 className="super-resolution-title">Super Resolution</h1>
              <p className="super-resolution-subtitle">Enhanced Image Resolution for Drone Video Analysis</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="super-resolution-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Used super resolution on frames of videos captured by drone images that were later used for vehicle detection and then number plate detection.
            </p>
            <div className="methodology-section">
              <h4>Project Pipeline and Application:</h4>
              <div className="pipeline-steps">
                <div className="step-section">
                  <h5><strong>1. Drone Video Capture</strong></h5>
                  <p>High-altitude drone footage capturing vehicles and traffic scenes with varying image quality and resolution constraints.</p>
                </div>
                
                <div className="step-section">
                  <h5><strong>2. Super Resolution Enhancement</strong></h5>
                  <p>Applied advanced super resolution techniques to improve the quality and detail of individual video frames, enhancing pixel density and image clarity.</p>
                </div>
                
                <div className="step-section">
                  <h5><strong>3. Vehicle Detection</strong></h5>
                  <p>Utilized the enhanced high-resolution frames for more accurate vehicle detection and classification in the drone footage.</p>
                </div>
                
                <div className="step-section">
                  <h5><strong>4. Number Plate Detection</strong></h5>
                  <p>Leveraged the improved image quality to enable precise number plate detection and recognition from the enhanced video frames.</p>
                </div>
              </div>
              
              <div className="application-benefits">
                <h5><strong>Key Benefits of Super Resolution in this Pipeline:</strong></h5>
                <ul>
                  <li><strong>Enhanced Detail Recovery:</strong> Improved visibility of small objects like number plates in drone footage</li>
                  <li><strong>Better Detection Accuracy:</strong> Higher resolution images lead to more precise vehicle and number plate detection</li>
                  <li><strong>Quality Preservation:</strong> Maintains visual fidelity while increasing resolution for analysis tasks</li>
                  <li><strong>Processing Efficiency:</strong> Enables better downstream computer vision tasks with enhanced input quality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuperResolutionProject; 