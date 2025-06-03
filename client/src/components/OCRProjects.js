import React from 'react';
import './OCRProjects.css';

const OCRProjects = ({ onBack, onEyePrescriptionBotClick, onOCRMultilingualFormsClick, onInvoiceExtractionClick }) => {
  const projects = [
    {
      id: 'eye-prescription-bot',
      title: 'Eye Prescription Bot',
      image: 'EyePrescriptionBot.jpg'
    },
    {
      id: 'ocr-multilingual-forms',
      title: 'OCR on Multilingual Forms',
      image: 'OCROnMultilingualForms.png'
    },
    {
      id: 'invoice-extraction-automation',
      title: 'Invoice Extraction and Automation',
      image: 'InvoiceExtractionAndAutomation.png'
    }
  ];

  const handleImageError = (imageName) => (e) => {
    console.log(`${imageName} failed to load, trying alternative paths...`);
    const baseName = imageName.split('/').pop();
    const imagePaths = [
      `/${baseName}`,
      `/images/${baseName}`,
      `http://localhost:5000/images/${baseName}`,
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes(baseName));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE2NS4wNDMgMTAwIDE3NyA4OC4wNDI2IDE3NyA3M0MxNzcgNTcuOTU3NCAxNjUuMDQzIDQ2IDE1MCA0NkMxMzQuOTU3IDQ2IDEyMyA1Ny45NTc0IDEyMyA3M0MxMjMgODguMDQyNiAxMzQuOTU3IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzhmNDUxMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4YjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByb2plY3Q8L3RleHQ+PC9zdmc+';
      console.log(`All ${imageName} paths failed, using placeholder`);
    }
  };

  const handleProjectClick = (projectId) => {
    console.log(`Clicked on project: ${projectId}`);
    if (projectId === 'eye-prescription-bot' && onEyePrescriptionBotClick) {
      onEyePrescriptionBotClick();
    } else if (projectId === 'ocr-multilingual-forms' && onOCRMultilingualFormsClick) {
      onOCRMultilingualFormsClick();
    } else if (projectId === 'invoice-extraction-automation' && onInvoiceExtractionClick) {
      onInvoiceExtractionClick();
    } else {
      console.log(`${projectId} functionality coming soon`);
    }
  };

  return (
    <div className="ocr-projects-container">
      <div className="ocr-projects-content">
        <div className="ocr-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to main projects">
            ← Back
          </button>
          <h1 className="ocr-title">Optical Character Recognition Projects</h1>
          <p className="ocr-subtitle">Explore my OCR and document processing projects</p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <button 
                className="project-button"
                onClick={() => handleProjectClick(project.id)}
                aria-label={`View ${project.title} project details`}
              >
                <img 
                  src={`/${project.image}`}
                  alt={project.title}
                  className="project-image"
                  onError={handleImageError(project.image)}
                  onLoad={() => console.log(`${project.title} image loaded successfully!`)}
                />
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                </div>
                <span className="project-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OCRProjects; 