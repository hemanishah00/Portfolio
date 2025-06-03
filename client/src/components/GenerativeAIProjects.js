import React from 'react';
import './GenerativeAIProjects.css';

const GenerativeAIProjects = ({ 
  onBack, 
  onAirportBotClick,
  onCycleGANsClick,
  onDocBotClick,
  onHRBotClick,
  onIndianSpeechToTextClick,
  onPharmaBotClick,
  onVLMFinetuningClick,
  onIntelliExtractClick,
  onSmartTableExtractorClick,
  onVoice2InsightClick
}) => {
  const handleImageError = (imageName) => (e) => {
    console.log(`${imageName} failed to load, trying alternative paths...`);
    const baseName = imageName.split('/').pop();
    const imagePaths = [
      `/${baseName}`,
      `/images/${baseName}`,
      `/Images/${baseName}`,
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

  const projects = [
    {
      name: 'Airport Bot',
      file: 'Images/AirportBot.jpeg',
      alt: 'Airport Bot Project',
      description: 'Intelligent Airport Assistant',
      onClick: onAirportBotClick
    },
    {
      name: 'Cycle GANs',
      file: 'Images/CycleGAN.jpg',
      alt: 'Cycle GANs Project',
      description: 'Image-to-Image Translation',
      onClick: onCycleGANsClick
    },
    {
      name: 'Doc Bot',
      file: 'Images/DocBot.png',
      alt: 'Doc Bot Project',
      description: 'Document Processing Assistant',
      onClick: onDocBotClick
    },
    {
      name: 'HR Bot',
      file: 'Images/HRBot.jpg',
      alt: 'HR Bot Project',
      description: 'Human Resources Assistant',
      onClick: onHRBotClick
    },
    {
      name: 'Indian Speech-to-text',
      file: 'Images/IndianSpeechToText.png',
      alt: 'Indian Speech-to-text Project',
      description: 'Indian Language Speech Recognition',
      onClick: onIndianSpeechToTextClick
    },
    {
      name: 'Pharma Bot',
      file: 'Images/PharmaBot.jpg',
      alt: 'Pharma Bot Project',
      description: 'Pharmaceutical Assistant',
      onClick: onPharmaBotClick
    },
    {
      name: 'VLM fine-tuning',
      file: 'Images/VLMFinetuning.jpeg',
      alt: 'VLM fine-tuning Project',
      description: 'Vision Language Model Tuning',
      onClick: onVLMFinetuningClick
    },
    {
      name: 'IntelliExtract',
      file: 'Images/IntelliExtract.jpeg',
      alt: 'IntelliExtract Project',
      description: 'Intelligent Data Extraction',
      onClick: onIntelliExtractClick
    },
    {
      name: 'SmartTable Extractor',
      file: 'Images/SmartTableExtractor.png',
      alt: 'SmartTable Extractor Project',
      description: 'Advanced Table Processing',
      onClick: onSmartTableExtractorClick
    },
    {
      name: 'Voice2Insight',
      file: 'Images/Voice2Insight.png',
      alt: 'Voice2Insight Project',
      description: 'Voice Analytics Platform',
      onClick: onVoice2InsightClick
    }
  ];

  return (
    <div className="generative-ai-projects-container">
      <div className="generative-ai-projects-content">
        <div className="generative-ai-projects-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to main page">
            ← Back
          </button>
          <h1 className="generative-ai-projects-title">Generative AI Projects</h1>
          <p className="generative-ai-projects-subtitle">AI Content Generation & Language Models</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <button 
              key={index} 
              className="project-card"
              onClick={project.onClick}
              aria-label={`View ${project.name} project`}
            >
              <div className="project-image-container">
                <img 
                  src={`/${project.file}`}
                  alt={project.alt}
                  className="project-image"
                  onError={handleImageError(project.file)}
                  onLoad={() => console.log(`${project.name} image loaded successfully!`)}
                />
                <div className="project-overlay">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerativeAIProjects; 