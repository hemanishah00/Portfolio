import React from 'react';
import './EyePrescriptionBotProject.css';

const EyePrescriptionBotProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Eye Prescription Bot image failed to load, trying alternative paths...');
    const imagePaths = [
      '/EyePrescriptionBot.jpg',
      '/images/EyePrescriptionBot.jpg',
      'http://localhost:5000/images/EyePrescriptionBot.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('EyePrescriptionBot.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXllIFByZXNjcmlwdGlvbiBCb3Q8L3RleHQ+PC9zdmc+';
      console.log('All Eye Prescription Bot image paths failed, using placeholder');
    }
  };

  return (
    <div className="eye-prescription-bot-project-container">
      <div className="eye-prescription-bot-project-content">
        {/* Header Section */}
        <div className="eye-prescription-bot-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to OCR projects">
            ← Back
          </button>
          <div className="eye-prescription-bot-hero">
            <div className="eye-prescription-bot-image-container">
              <img 
                src="/EyePrescriptionBot.jpg"
                alt="Eye Prescription Bot Project"
                className="eye-prescription-bot-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Eye Prescription Bot image loaded successfully!')}
              />
            </div>
            <div className="eye-prescription-bot-title-container">
              <h1 className="eye-prescription-bot-title">Eye Prescription Bot</h1>
              <p className="eye-prescription-bot-subtitle">Automated Eye Prescription Processing</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="eye-prescription-bot-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Developed an automated image processing pipeline for classifying spectacle prescription images and extracting key information. Implemented ROI detection using YOLO to standardize prescription information extraction. Established quality control measures, to ensure the accuracy and reliability of extracted data.
            </p>
            
            <div className="features-section">
              <h4>Key Features:</h4>
              <ul>
                <li><strong>Prescription Recognition:</strong> Automated extraction of prescription details from various formats</li>
                <li><strong>Handwriting Support:</strong> Advanced OCR capable of processing handwritten prescriptions</li>
                <li><strong>Data Validation:</strong> Built-in validation for prescription format and medical standards</li>
                <li><strong>Digital Storage:</strong> Secure digital storage and retrieval of prescription data</li>
                <li><strong>Integration Ready:</strong> API endpoints for integration with healthcare systems</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EyePrescriptionBotProject; 