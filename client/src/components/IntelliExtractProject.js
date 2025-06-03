import React from 'react';
import './IntelliExtractProject.css';

const IntelliExtractProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('IntelliExtract image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/IntelliExtract.jpeg',
      '/images/IntelliExtract.jpeg',
      '/IntelliExtract.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('IntelliExtract.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW50ZWxsaUV4dHJhY3Q8L3RleHQ+PC9zdmc+';
    }
  };

  return (
    <div className="intelli-extract-project-container">
      <div className="intelli-extract-project-content">
        <div className="intelli-extract-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="intelli-extract-hero">
            <div className="intelli-extract-image-container">
              <img 
                src="/Images/IntelliExtract.jpeg"
                alt="IntelliExtract Project"
                className="intelli-extract-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="intelli-extract-title-container">
              <h1 className="intelli-extract-title">IntelliExtract</h1>
              <p className="intelli-extract-subtitle">Intelligent Substance Extraction Pipeline</p>
            </div>
          </div>
        </div>

        <section className="intelli-extract-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Developed a pipeline to extract substances from documents using Azure Document Intelligence and RAG to extract substances and their properties from documents.
            </p>
            
            <div className="technical-section">
              <h4>Pipeline Architecture & Features:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Document Processing</strong></h5>
                  <ul>
                    <li><strong>Azure Integration:</strong> Document Intelligence API utilization</li>
                    <li><strong>Format Support:</strong> Multiple document format handling</li>
                    <li><strong>OCR Capabilities:</strong> Advanced text recognition</li>
                    <li><strong>Layout Analysis:</strong> Document structure understanding</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Substance Extraction</strong></h5>
                  <ul>
                    <li><strong>Chemical Recognition:</strong> Substance name identification</li>
                    <li><strong>Property Detection:</strong> Physical and chemical properties</li>
                    <li><strong>Context Analysis:</strong> Relationship mapping</li>
                    <li><strong>Validation Rules:</strong> Data accuracy verification</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>RAG Implementation</strong></h5>
                  <ul>
                    <li><strong>Knowledge Base:</strong> Chemical substance database</li>
                    <li><strong>Query Processing:</strong> Intelligent information retrieval</li>
                    <li><strong>Context Enhancement:</strong> Data enrichment</li>
                    <li><strong>Accuracy Improvement:</strong> Validation against known data</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Data Standardization</strong></h5>
                  <ul>
                    <li><strong>Format Normalization:</strong> Consistent data structure</li>
                    <li><strong>Unit Conversion:</strong> Standardized measurements</li>
                    <li><strong>Nomenclature:</strong> Chemical naming conventions</li>
                    <li><strong>Quality Control:</strong> Data integrity checks</li>
                  </ul>
                </div>
              </div>
              
              <div className="data-extraction-section">
                <h5><strong>Extracted Data Points</strong></h5>
                <div className="data-points-grid">
                  <div className="data-point">
                    <strong>Chemical Properties:</strong> Molecular weight, density, boiling point, melting point
                  </div>
                  <div className="data-point">
                    <strong>Physical Properties:</strong> State, color, odor, solubility
                  </div>
                  <div className="data-point">
                    <strong>Safety Information:</strong> Hazard classifications, handling precautions
                  </div>
                  <div className="data-point">
                    <strong>Regulatory Data:</strong> CAS numbers, compliance information
                  </div>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Extraction Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Document Upload:</strong> Process input documents through Azure
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Text Extraction:</strong> OCR and content recognition
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Substance Identification:</strong> Chemical entity recognition
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Property Extraction:</strong> Identify associated properties
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>RAG Enhancement:</strong> Enrich with database knowledge
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Data Validation:</strong> Quality checks and standardization
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Benefits</strong></h5>
                <p>
                  IntelliExtract streamlines the process of extracting and organizing chemical substance information from various documents. By combining Azure Document Intelligence with RAG technology, it provides accurate, standardized data while significantly reducing manual effort. The system enables efficient substance property analysis, regulatory compliance checking, and safety information management across chemical and pharmaceutical industries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntelliExtractProject;

 