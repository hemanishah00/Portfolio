import React, { useState } from 'react';
import './InvoiceExtractionProject.css';
import config from '../config';

const InvoiceExtractionProject = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageError = (e) => {
    console.log('Invoice Extraction image failed to load, trying alternative paths...');
    const imagePaths = [
      config.getImagePath('InvoiceExtractionAndAutomation.png'),
      '/InvoiceExtractionAndAutomation.png',
      '/images/InvoiceExtractionAndAutomation.png',
      'http://localhost:5000/images/InvoiceExtractionAndAutomation.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('InvoiceExtractionAndAutomation.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW52b2ljZSBFeHRyYWN0aW9uPC90ZXh0Pjwvc3ZnPg==';
      console.log('All Invoice Extraction image paths failed, using placeholder');
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

  return (
    <div className="invoice-extraction-project-container">
      <div className="invoice-extraction-project-content">
        {/* Header Section */}
        <div className="invoice-extraction-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to OCR projects">
            ← Back
          </button>
          <div className="invoice-extraction-hero">
            <div className="invoice-extraction-image-container">
              <img 
                src={config.getImagePath('InvoiceExtractionAndAutomation.png')}
                alt="Invoice Extraction and Automation Project"
                className="invoice-extraction-hero-image clickable-image"
                onError={handleImageError}
                onLoad={() => console.log('Invoice Extraction image loaded successfully!')}
                onClick={openModal}
                style={{ cursor: 'pointer' }}
                title="Click to view full size"
              />
              <div className="image-overlay">
                <span className="expand-icon">🔍</span>
              </div>
            </div>
            <div className="invoice-extraction-title-container">
              <h1 className="invoice-extraction-title">Invoice Extraction and Automation</h1>
              <p className="invoice-extraction-subtitle">Automated Financial Document Processing</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="invoice-extraction-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Automated the process of extracting information from invoices (in PDF or image format) and converted to Excel format the way the client needed.
            </p>
            
            <div className="features-section">
              <h4>Key Features:</h4>
              <ul>
                <li><strong>Invoice Data Extraction:</strong> Automated extraction of vendor details, amounts, dates, and line items</li>
                <li><strong>Multi-Format Support:</strong> Processes various invoice formats including PDF, images, and scanned documents</li>
                <li><strong>Data Validation:</strong> Built-in checks for accuracy and compliance with business rules</li>
                <li><strong>ERP Integration:</strong> Seamless integration with popular accounting and ERP systems</li>
                <li><strong>Workflow Automation:</strong> End-to-end processing from receipt to approval and payment</li>
              </ul>
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
              src={config.getImagePath('InvoiceExtractionAndAutomation.png')}
              alt="Invoice Extraction and Automation Project - Full Size"
              className="modal-image"
              onError={handleImageError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceExtractionProject; 