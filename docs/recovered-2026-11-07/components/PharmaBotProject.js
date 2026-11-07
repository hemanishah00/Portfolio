import React from 'react';
import './PharmaBotProject.css';
import config from '../config';

const PharmaBotProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Pharma Bot image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/PharmaBot.jpg',
      '/images/PharmaBot.jpg',
      '/PharmaBot.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('PharmaBot.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGhhcm1hIEJvdDwvdGV4dD48L3N2Zz4=';
    }
  };

  return (
    <div className="pharma-bot-project-container">
      <div className="pharma-bot-project-content">
        <div className="pharma-bot-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="pharma-bot-hero">
            <div className="pharma-bot-image-container">
              <img 
                src={config.getImagePath('PharmaBot.jpg')}
                alt="Pharma Bot Project"
                className="pharma-bot-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="pharma-bot-title-container">
              <h1 className="pharma-bot-title">Pharma Bot</h1>
              <p className="pharma-bot-subtitle">Intelligent Pharmaceutical Customer Service Bot</p>
            </div>
          </div>
        </div>

        <section className="pharma-bot-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Created a Bot that calls customers or customers can call and ask questions and their questions will be answered using IBS, ASR, RAG using LLM, text-to-speech and Twilio.
            </p>
            
            <div className="technical-section">
              <h4>System Architecture & Technologies:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Twilio Integration</strong></h5>
                  <ul>
                    <li><strong>Voice Calls:</strong> Bi-directional calling functionality</li>
                    <li><strong>Phone Networks:</strong> Integration with telecommunication systems</li>
                    <li><strong>Call Management:</strong> Call routing and handling automation</li>
                    <li><strong>Real-time Communication:</strong> Live voice interaction capabilities</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>ASR & TTS Pipeline</strong></h5>
                  <ul>
                    <li><strong>Speech Recognition:</strong> Real-time voice-to-text conversion</li>
                    <li><strong>Voice Synthesis:</strong> Natural text-to-speech output</li>
                    <li><strong>Audio Quality:</strong> Clear communication over phone networks</li>
                    <li><strong>Language Support:</strong> Multi-language conversation capabilities</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>RAG with LLM</strong></h5>
                  <ul>
                    <li><strong>Pharmaceutical Knowledge:</strong> Comprehensive drug and medical information</li>
                    <li><strong>Query Understanding:</strong> Intent recognition for customer questions</li>
                    <li><strong>Contextual Responses:</strong> Accurate answers based on medical databases</li>
                    <li><strong>Safety Protocols:</strong> Responsible medical information delivery</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>IBS (Interactive Bot System)</strong></h5>
                  <ul>
                    <li><strong>Customer Interaction:</strong> Intelligent conversation management</li>
                    <li><strong>Call Flow Control:</strong> Dynamic conversation steering</li>
                    <li><strong>Session Management:</strong> Context preservation across calls</li>
                    <li><strong>Escalation Handling:</strong> Transfer to human agents when needed</li>
                  </ul>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Call Interaction Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Call Initiation:</strong> Customer calls or bot initiates outbound call
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Voice Recognition:</strong> ASR converts customer speech to text
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Query Processing:</strong> IBS analyzes customer intent and requirements
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Information Retrieval:</strong> RAG retrieves relevant pharmaceutical data
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Response Generation:</strong> LLM formulates appropriate answers
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Voice Output:</strong> TTS delivers response through Twilio
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Benefits</strong></h5>
                <p>
                  This pharmaceutical bot revolutionizes customer service by providing 24/7 accessibility to medical information through natural voice interactions. It enhances patient support, reduces call center workload, and ensures consistent, accurate pharmaceutical guidance while maintaining safety protocols for responsible medical information dissemination.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PharmaBotProject; 