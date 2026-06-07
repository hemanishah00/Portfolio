import React from 'react';
import './Voice2InsightProject.css';
import config from '../config';

const Voice2InsightProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Voice2Insight image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/Voice2Insight.png',
      '/images/Voice2Insight.png',
      '/Voice2Insight.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('Voice2Insight.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Vm9pY2UySW5zaWdodDwvdGV4dD48L3N2Zz4=';
    }
  };

  return (
    <div className="voice2insight-project-container">
      <div className="voice2insight-project-content">
        <div className="voice2insight-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="voice2insight-hero">
            <div className="voice2insight-image-container">
              <img 
                src={config.getImagePath('Voice2Insight.png')}
                alt="Voice2Insight Project"
                className="voice2insight-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="voice2insight-title-container">
              <h1 className="voice2insight-title">Voice2Insight</h1>
              <p className="voice2insight-subtitle">Enterprise Feedback Analytics Dashboard</p>
            </div>
          </div>
        </div>

        <section className="voice2insight-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Developed a dashboard analysing 1.5L+ employee feedback comments (and transcriptions of calls with live agents) to surface hidden issues in Source-to-Pay processes. Helped CXO leadership uncover previously unknown systemic and regional pain points by providing root cause analysis and actionable insights, enabling data-driven decisions. This allowed users to get analysis reports within 4 to 5 minutes, which would have taken around 5 months of manual effort from consultants.
            </p>
            
            <div className="technical-section">
              <h4>Enterprise Analytics Architecture:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Large-Scale Data Processing</strong></h5>
                  <ul>
                    <li><strong>Volume Handling:</strong> Processing 150,000+ employee feedback comments</li>
                    <li><strong>Voice Transcription:</strong> Converting agent call recordings to text</li>
                    <li><strong>Data Integration:</strong> Unified analysis across multiple feedback channels</li>
                    <li><strong>Real-time Processing:</strong> Continuous data ingestion and analysis</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Source-to-Pay Analysis</strong></h5>
                  <ul>
                    <li><strong>Process Mapping:</strong> Comprehensive S2P workflow analysis</li>
                    <li><strong>Pain Point Detection:</strong> Automated identification of process bottlenecks</li>
                    <li><strong>Regional Analysis:</strong> Geographic breakdown of issues and trends</li>
                    <li><strong>Systemic Issue Discovery:</strong> Enterprise-wide problem identification</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>AI-Powered Insights</strong></h5>
                  <ul>
                    <li><strong>Sentiment Analysis:</strong> Employee satisfaction and concern detection</li>
                    <li><strong>Topic Modeling:</strong> Automatic categorization of feedback themes</li>
                    <li><strong>Root Cause Analysis:</strong> Deep dive into underlying issue sources</li>
                    <li><strong>Predictive Analytics:</strong> Trend forecasting and risk assessment</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Executive Dashboard</strong></h5>
                  <ul>
                    <li><strong>CXO Insights:</strong> C-level executive summary reports</li>
                    <li><strong>Interactive Visualizations:</strong> Dynamic charts and trend analysis</li>
                    <li><strong>Actionable Recommendations:</strong> Data-driven improvement suggestions</li>
                    <li><strong>Performance Metrics:</strong> KPI tracking and benchmarking</li>
                  </ul>
                </div>
              </div>
              
              <div className="impact-metrics-section">
                <h5><strong>Performance Impact</strong></h5>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-value">1.5L+</div>
                    <div className="metric-label">Feedback Comments Analyzed</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">4-5 Min</div>
                    <div className="metric-label">Report Generation Time</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">5 Months</div>
                    <div className="metric-label">Manual Effort Saved</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">100%</div>
                    <div className="metric-label">Data-Driven Decisions</div>
                  </div>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Analytics Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Data Ingestion:</strong> Collect feedback comments and call transcriptions
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Text Processing:</strong> Clean, normalize, and preprocess textual data
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>AI Analysis:</strong> Apply NLP models for sentiment and topic extraction
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Pattern Recognition:</strong> Identify systemic and regional pain points
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Root Cause Analysis:</strong> Deep dive into underlying issue sources
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Dashboard Generation:</strong> Create executive-ready insights and recommendations
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Business Impact & Value</strong></h5>
                <p>
                  Voice2Insight revolutionizes enterprise feedback analysis by transforming months of manual consultant work into minutes of automated insights. The platform enables CXO leadership to make data-driven decisions by uncovering hidden systemic issues and regional pain points in Source-to-Pay processes, dramatically improving operational efficiency and employee satisfaction across large-scale organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Voice2InsightProject; 