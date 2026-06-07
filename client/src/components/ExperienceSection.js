import React from 'react';
import './ExperienceSection.css';
import config from '../config';

const ExperienceSection = () => {
  const handleImageError = (imageName) => (e) => {
    console.log(`${imageName} failed to load, using placeholder...`);
    // Use a placeholder with cream and brown colors
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE2NS4wNDMgMTAwIDE3NyA4OC4wNDI2IDE3NyA3M0MxNzcgNTcuOTU3NCAxNjUuMDQzIDQ2IDE1MCA0NkMxMzQuOTU3IDQ2IDEyMyA1Ny45NTc0IDEyMyA3M0MxMjMgODguMDQyNiAxMzQuOTU3IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzhmNDUxMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTMwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4YjQ1MTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
    console.log(`${imageName} path failed, using placeholder`);
  };

  const companyLogos = [
    { name: 'GSK', file: 'GSK.jpeg', alt: 'GSK Logo' },
    { name: 'Cognizant', file: 'Cognizant.jpeg', alt: 'Cognizant Logo' },
    { name: 'ARThink AI', file: 'ARThinkAI.webp', alt: 'ARThink AI Logo' },
    { name: 'Univ.AI', file: 'Univ.AI.png', alt: 'Univ.AI Logo' }
  ];

  return (
    <section className="experience-container">
      <div className="experience-content">
        {/* Education Section */}
        <div className="education-section">
          <div className="education-image-container">
            <img 
              src={config.getImagePath('3.jpeg')} 
              alt="Education" 
              className="education-image"
              onError={handleImageError('3.jpeg')}
              onLoad={() => console.log('Education image loaded successfully!')}
            />
          </div>
          <div className="education-text">
            <h2 className="education-title">I've learned from</h2>
            <div className="education-description">
              <p>Gujarat Technological University (B.E. Computer Engineering, 2022)</p>
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="work-section">
          <h2 className="work-title">I've worked with</h2>
          <div className="company-logos">
            {companyLogos.map((company, index) => (
              <div key={index} className="company-logo-container">
                <img 
                  src={config.getImagePath(company.file)}
                  alt={company.alt}
                  className="company-logo"
                  onError={handleImageError(company.file)}
                  onLoad={() => console.log(`${company.name} logo loaded successfully!`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 