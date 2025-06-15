import React from 'react';
import './SmartTableExtractorProject.css';
import config from '../config';

const SmartTableExtractorProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('SmartTable Extractor image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/SmartTableExtractor.png',
      '/images/SmartTableExtractor.png',
      '/SmartTableExtractor.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('SmartTableExtractor.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U21hcnRUYWJsZSBFeHRyYWN0b3I8L3RleHQ+PC9zdmc+';
    }
  };

  return (
    <div className="smart-table-project-container">
      <div className="smart-table-project-content">
        <div className="smart-table-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="smart-table-hero">
            <div className="smart-table-image-container">
              <img 
                src={config.getImagePath('SmartTableExtractor.png')}
                alt="SmartTable Extractor Project"
                className="smart-table-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="smart-table-title-container">
              <h1 className="smart-table-title">SmartTable Extractor</h1>
              <p className="smart-table-subtitle">Intelligent Document Table Processing System</p>
            </div>
          </div>
        </div>

        <section className="smart-table-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Developed a table extraction pipeline using Azure Document Intelligence, extracting study IDs via RegEx and retrieving corresponding Study Intervention tables from a document database. Filtered relevant tables based on configuration files specifying required attributes, ensuring accurate extraction. Standardized extracted data using RegEx cleaning and merged multi-page tables using primary key configurations. Optimized table display for the UI by structuring non-primary attributes as per requirements.
            </p>
            
            <div className="technical-section">
              <h4>Pipeline Architecture & Features:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Azure Document Intelligence</strong></h5>
                  <ul>
                    <li><strong>Table Recognition:</strong> Advanced table structure detection</li>
                    <li><strong>Cell Extraction:</strong> Precise cell content and positioning</li>
                    <li><strong>Multi-page Handling:</strong> Seamless cross-page table processing</li>
                    <li><strong>Format Flexibility:</strong> Support for various document layouts</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Study ID Extraction</strong></h5>
                  <ul>
                    <li><strong>RegEx Patterns:</strong> Sophisticated pattern matching for study identifiers</li>
                    <li><strong>Multiple Formats:</strong> Support for various ID naming conventions</li>
                    <li><strong>Validation Logic:</strong> Ensures extracted IDs meet format requirements</li>
                    <li><strong>Context Awareness:</strong> Considers surrounding text for accuracy</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Table Filtering & Configuration</strong></h5>
                  <ul>
                    <li><strong>Attribute-based Filtering:</strong> Selective table extraction based on criteria</li>
                    <li><strong>Configuration Files:</strong> Customizable filtering rules and parameters</li>
                    <li><strong>Relevance Scoring:</strong> Prioritizes tables based on content relevance</li>
                    <li><strong>Quality Assurance:</strong> Ensures extracted tables meet quality standards</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Data Standardization</strong></h5>
                  <ul>
                    <li><strong>RegEx Cleaning:</strong> Automated data cleaning and formatting</li>
                    <li><strong>Consistency Enforcement:</strong> Standardized data representation</li>
                    <li><strong>Error Correction:</strong> Automatic correction of common extraction errors</li>
                    <li><strong>Format Normalization:</strong> Uniform data structure across tables</li>
                  </ul>
                </div>
              </div>
              
              <div className="processing-section">
                <h5><strong>Advanced Table Processing</strong></h5>
                <div className="processing-features">
                  <div className="feature-item">
                    <strong>Multi-page Merging:</strong> Intelligent table continuation across pages using primary key matching
                  </div>
                  <div className="feature-item">
                    <strong>Study Intervention Tables:</strong> Specialized extraction for clinical study data
                  </div>
                  <div className="feature-item">
                    <strong>Primary Key Configuration:</strong> Customizable key fields for table relationships
                  </div>
                  <div className="feature-item">
                    <strong>UI Optimization:</strong> Structured output optimized for user interface display
                  </div>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Extraction Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Document Processing:</strong> Azure Document Intelligence analyzes document structure
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Study ID Extraction:</strong> RegEx patterns identify and extract study identifiers
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Table Detection:</strong> Identify Study Intervention tables in document database
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Filtering:</strong> Apply configuration-based filtering for relevant tables
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Data Cleaning:</strong> RegEx-based standardization and error correction
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Table Merging:</strong> Combine multi-page tables using primary key configurations
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">7</span>
                    <div className="step-content">
                      <strong>UI Structuring:</strong> Format data for optimal user interface presentation
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Benefits</strong></h5>
                <p>
                  SmartTable Extractor streamlines clinical and research document processing by automatically extracting, standardizing, and merging complex table data. This system significantly reduces manual data entry efforts, improves data accuracy, and enables efficient analysis of study intervention information across large document collections with consistent formatting for downstream applications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SmartTableExtractorProject; 