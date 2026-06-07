import React from 'react';
import './DocBotProject.css';
import config from '../config';

const DocBotProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Doc Bot image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/DocBot.png',
      '/images/DocBot.png',
      '/DocBot.png',
      'http://localhost:5000/images/DocBot.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('DocBot.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RG9jIEJvdDwvdGV4dD48L3N2Zz4=';
      console.log('All Doc Bot image paths failed, using placeholder');
    }
  };

  return (
    <div className="doc-bot-project-container">
      <div className="doc-bot-project-content">
        {/* Header Section */}
        <div className="doc-bot-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to generative AI projects">
            ← Back
          </button>
          <div className="doc-bot-hero">
            <div className="doc-bot-image-container">
              <img 
                src={config.getImagePath('DocBot.png')}
                alt="Doc Bot Project"
                className="doc-bot-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Doc Bot image loaded successfully!')}
              />
            </div>
            <div className="doc-bot-title-container">
              <h1 className="doc-bot-title">Doc Bot</h1>
              <p className="doc-bot-subtitle">End-to-End Virtual Assistant Pipeline</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="doc-bot-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Implemented an end-to-end pipeline for a virtual assistant that went through speech-to-text, RAG and text-to-speech.
            </p>
            
            <div className="technical-section">
              <h4>Pipeline Architecture & Components:</h4>
              <div className="pipeline-grid">
                <div className="pipeline-section">
                  <h5><strong>Speech-to-Text (ASR)</strong></h5>
                  <ul>
                    <li><strong>Audio Processing:</strong> Real-time audio capture and preprocessing</li>
                    <li><strong>Speech Recognition:</strong> Advanced ASR models for accurate transcription</li>
                    <li><strong>Noise Handling:</strong> Robust performance in various acoustic environments</li>
                    <li><strong>Multi-language Support:</strong> Configurable language models</li>
                  </ul>
                </div>
                
                <div className="pipeline-section">
                  <h5><strong>RAG (Retrieval-Augmented Generation)</strong></h5>
                  <ul>
                    <li><strong>Knowledge Retrieval:</strong> Efficient document and information retrieval</li>
                    <li><strong>Context Integration:</strong> Combining retrieved information with user queries</li>
                    <li><strong>Response Generation:</strong> LLM-based intelligent response formulation</li>
                    <li><strong>Accuracy Enhancement:</strong> Grounded responses based on verified sources</li>
                  </ul>
                </div>
                
                <div className="pipeline-section">
                  <h5><strong>Text-to-Speech (TTS)</strong></h5>
                  <ul>
                    <li><strong>Natural Voice Synthesis:</strong> High-quality voice generation</li>
                    <li><strong>Emotional Tone:</strong> Contextual voice modulation</li>
                    <li><strong>Real-time Output:</strong> Low-latency speech synthesis</li>
                    <li><strong>Voice Customization:</strong> Configurable voice profiles</li>
                  </ul>
                </div>
                
                <div className="pipeline-section">
                  <h5><strong>Integration & Orchestration</strong></h5>
                  <ul>
                    <li><strong>Pipeline Management:</strong> Seamless component integration</li>
                    <li><strong>Error Handling:</strong> Robust failure recovery mechanisms</li>
                    <li><strong>Performance Optimization:</strong> Efficient resource utilization</li>
                    <li><strong>Scalability:</strong> Modular architecture for easy expansion</li>
                  </ul>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>End-to-End Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Audio Input:</strong> User speaks to the virtual assistant
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Speech Recognition:</strong> Convert audio to text using ASR
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Query Processing:</strong> Analyze and understand user intent
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Information Retrieval:</strong> RAG retrieves relevant information
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Response Generation:</strong> Generate contextual response
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Speech Synthesis:</strong> Convert response to natural speech
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Benefits</strong></h5>
                <p>
                  This comprehensive virtual assistant pipeline enables natural voice interactions with intelligent information retrieval capabilities. The system provides accurate, contextual responses through advanced AI technologies, making it suitable for customer service, documentation assistance, and interactive information systems across various domains.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocBotProject; 