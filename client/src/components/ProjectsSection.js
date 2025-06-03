import React from 'react';
import './ProjectsSection.css';

const ProjectsSection = ({ onAnalyticsClick, onComputerVisionClick, onRecommendationSystemsClick, onOCRClick, onGenerativeAIClick }) => {
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

  const handleProjectClick = (projectName) => {
    console.log(`${projectName} project clicked`);
    if (projectName === 'Analytics' && onAnalyticsClick) {
      onAnalyticsClick();
    } else if (projectName === 'Computer Vision' && onComputerVisionClick) {
      onComputerVisionClick();
    } else if (projectName === 'Recommendation Systems' && onRecommendationSystemsClick) {
      onRecommendationSystemsClick();
    } else if (projectName === 'OCR' && onOCRClick) {
      onOCRClick();
    } else if (projectName === 'Generative AI' && onGenerativeAIClick) {
      onGenerativeAIClick();
    } else {
      console.log(`${projectName} functionality coming soon`);
    }
  };

  const projects = [
    {
      name: 'Analytics',
      file: 'Analytics.jpeg',
      alt: 'Analytics Projects',
      description: 'Data Analytics & Business Intelligence'
    },
    {
      name: 'Computer Vision',
      file: 'Computer_Vision.jpeg',
      alt: 'Computer Vision Projects',
      description: 'Image Processing & Visual AI'
    },
    {
      name: 'OCR',
      file: 'OCR.jpeg',
      alt: 'OCR Projects',
      description: 'Optical Character Recognition'
    },
    {
      name: 'Generative AI',
      file: 'Generative_AI.jpeg',
      alt: 'Generative AI Projects',
      description: 'AI Content Generation'
    },
    {
      name: 'Recommendation Systems',
      file: 'Recommendation_Systems.jpeg',
      alt: 'Recommendation Systems',
      description: 'Personalized Recommendations'
    }
  ];

  return (
    <section className="projects-container">
      <div className="projects-content">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <button 
              key={index} 
              className="project-button"
              onClick={() => handleProjectClick(project.name)}
              aria-label={`View ${project.name} projects`}
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
    </section>
  );
};

export default ProjectsSection; 