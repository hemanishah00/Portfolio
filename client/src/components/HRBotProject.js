import React from 'react';
import './HRBotProject.css';

const HRBotProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('HR Bot image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/HRBot.jpg',
      '/images/HRBot.jpg',
      '/HRBot.jpg',
      'http://localhost:5000/images/HRBot.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('HRBot.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SFIgQm90PC90ZXh0Pjwvc3ZnPg==';
      console.log('All HR Bot image paths failed, using placeholder');
    }
  };

  return (
    <div className="hr-bot-project-container">
      <div className="hr-bot-project-content">
        {/* Header Section */}
        <div className="hr-bot-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to generative AI projects">
            ← Back
          </button>
          <div className="hr-bot-hero">
            <div className="hr-bot-image-container">
              <img 
                src="/Images/HRBot.jpg"
                alt="HR Bot Project"
                className="hr-bot-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('HR Bot image loaded successfully!')}
              />
            </div>
            <div className="hr-bot-title-container">
              <h1 className="hr-bot-title">HR Bot</h1>
              <p className="hr-bot-subtitle">Intelligent Resume-Job Matching System</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="hr-bot-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Extracted information from resumes using OCR to map them to the most compatible job descriptions using LLMs to map them dynamically.
            </p>
            
            <div className="technical-section">
              <h4>System Architecture & Components:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>OCR-Based Resume Processing</strong></h5>
                  <ul>
                    <li><strong>Document Parsing:</strong> Advanced OCR for various resume formats</li>
                    <li><strong>Text Extraction:</strong> Accurate information retrieval from PDFs and images</li>
                    <li><strong>Format Handling:</strong> Support for diverse resume layouts and styles</li>
                    <li><strong>Data Validation:</strong> Quality checks for extracted information</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Information Extraction</strong></h5>
                  <ul>
                    <li><strong>Skill Identification:</strong> Automatic detection of technical and soft skills</li>
                    <li><strong>Experience Parsing:</strong> Work history and duration analysis</li>
                    <li><strong>Education Extraction:</strong> Academic qualifications and certifications</li>
                    <li><strong>Contact Details:</strong> Professional contact information retrieval</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>LLM-Powered Matching</strong></h5>
                  <ul>
                    <li><strong>Semantic Analysis:</strong> Deep understanding of job requirements</li>
                    <li><strong>Dynamic Mapping:</strong> Real-time compatibility assessment</li>
                    <li><strong>Context Understanding:</strong> Industry-specific knowledge application</li>
                    <li><strong>Scoring Algorithm:</strong> Quantified match percentage calculations</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Job Compatibility Engine</strong></h5>
                  <ul>
                    <li><strong>Requirements Analysis:</strong> Comprehensive job description parsing</li>
                    <li><strong>Skill Matching:</strong> Multi-dimensional skill compatibility assessment</li>
                    <li><strong>Experience Alignment:</strong> Career progression and relevance evaluation</li>
                    <li><strong>Cultural Fit Analysis:</strong> Company culture and candidate alignment</li>
                  </ul>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Processing Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Resume Upload:</strong> Candidate submits resume in various formats
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>OCR Processing:</strong> Extract text and structured data from resume
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Information Parsing:</strong> Identify skills, experience, and qualifications
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>LLM Analysis:</strong> Semantic understanding and profile creation
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Job Matching:</strong> Dynamic compatibility assessment with open positions
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Results Delivery:</strong> Ranked job recommendations with match scores
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Impact & Benefits</strong></h5>
                <p>
                  This intelligent HR system streamlines the recruitment process by automatically matching candidates to suitable positions based on comprehensive skill and experience analysis. The system reduces manual screening time, improves match accuracy, and enables data-driven hiring decisions while providing candidates with better job opportunities aligned with their profiles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HRBotProject; 