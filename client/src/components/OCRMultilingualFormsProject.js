import React from 'react';
import './OCRMultilingualFormsProject.css';

const OCRMultilingualFormsProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('OCR Multilingual Forms image failed to load, trying alternative paths...');
    const imagePaths = [
      '/OCROnMultilingualForms.png',
      '/images/OCROnMultilingualForms.png',
      'http://localhost:5000/images/OCROnMultilingualForms.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('OCROnMultilingualForms.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+T0NSIE11bHRpbGluZ3VhbCBGb3JtczwvdGV4dD48L3N2Zz4=';
      console.log('All OCR Multilingual Forms image paths failed, using placeholder');
    }
  };

  return (
    <div className="ocr-multilingual-forms-project-container">
      <div className="ocr-multilingual-forms-project-content">
        {/* Header Section */}
        <div className="ocr-multilingual-forms-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to OCR projects">
            ← Back
          </button>
          <div className="ocr-multilingual-forms-hero">
            <div className="ocr-multilingual-forms-image-container">
              <img 
                src="/OCROnMultilingualForms.png"
                alt="OCR on Multilingual Forms Project"
                className="ocr-multilingual-forms-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('OCR Multilingual Forms image loaded successfully!')}
              />
            </div>
            <div className="ocr-multilingual-forms-title-container">
              <h1 className="ocr-multilingual-forms-title">OCR on Multilingual Forms</h1>
              <p className="ocr-multilingual-forms-subtitle">Cross-Language Document Processing</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="ocr-multilingual-forms-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Used open source OCR libraries to extract information from forms containing multiple languages.
            </p>
            
            <div className="features-section">
              <h4>Key Features:</h4>
              <ul>
                <li><strong>Multi-Language Support:</strong> Processes forms in various languages and scripts</li>
                <li><strong>Script Detection:</strong> Automatic identification of writing systems and languages</li>
                <li><strong>Form Structure Recognition:</strong> Intelligent parsing of form fields and layouts</li>
                <li><strong>Translation Integration:</strong> Optional translation services for cross-language processing</li>
                <li><strong>High Accuracy:</strong> Advanced ML models for reliable text extraction</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OCRMultilingualFormsProject; 