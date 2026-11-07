import React from 'react';
import './IndianSpeechToTextProject.css';
import config from '../config';

const IndianSpeechToTextProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Indian Speech-to-text image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/IndianSpeechToText.png',
      '/images/IndianSpeechToText.png',
      '/IndianSpeechToText.png',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('IndianSpeechToText.png'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U3BlZWNoLXRvLVRleHQ8L3RleHQ+PC9zdmc+';
    }
  };

  return (
    <div className="indian-speech-project-container">
      <div className="indian-speech-project-content">
        <div className="indian-speech-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="indian-speech-hero">
            <div className="indian-speech-image-container">
              <img 
                src={config.getImagePath('IndianSpeechToText.png')}
                alt="Indian Speech-to-text Project"
                className="indian-speech-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="indian-speech-title-container">
              <h1 className="indian-speech-title">Indian Speech-to-text</h1>
              <p className="indian-speech-subtitle">Multilingual Speech Recognition & Translation Pipeline</p>
            </div>
          </div>
        </div>

        <section className="indian-speech-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Implemented a pipeline for multilingual speech-to-text in Indian languages and translation into another language.
            </p>
            
            <div className="technical-section">
              <h4>Pipeline Architecture & Features:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Multilingual ASR Engine</strong></h5>
                  <ul>
                    <li><strong>Indian Language Support:</strong> Hindi, Tamil, Telugu, Bengali, Marathi, etc.</li>
                    <li><strong>Acoustic Models:</strong> Language-specific acoustic modeling</li>
                    <li><strong>Dialect Recognition:</strong> Regional dialect variations support</li>
                    <li><strong>Code-switching:</strong> Mixed language conversation handling</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Translation Framework</strong></h5>
                  <ul>
                    <li><strong>Neural Translation:</strong> Advanced NMT models for accuracy</li>
                    <li><strong>Language Pairs:</strong> Multiple source-target language combinations</li>
                    <li><strong>Context Preservation:</strong> Maintaining meaning across translations</li>
                    <li><strong>Domain Adaptation:</strong> Specialized vocabulary handling</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Audio Processing</strong></h5>
                  <ul>
                    <li><strong>Noise Reduction:</strong> Robust performance in noisy environments</li>
                    <li><strong>Speaker Adaptation:</strong> Multi-speaker recognition capabilities</li>
                    <li><strong>Real-time Processing:</strong> Low-latency speech recognition</li>
                    <li><strong>Audio Quality:</strong> Various audio format and quality support</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Language Detection</strong></h5>
                  <ul>
                    <li><strong>Automatic Detection:</strong> Intelligent language identification</li>
                    <li><strong>Confidence Scoring:</strong> Reliability metrics for detection</li>
                    <li><strong>Language Switching:</strong> Dynamic language transition handling</li>
                    <li><strong>Script Recognition:</strong> Devanagari, Tamil, Telugu script support</li>
                  </ul>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Processing Pipeline</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Audio Input:</strong> Capture speech in Indian languages
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Language Detection:</strong> Identify the source language automatically
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>Speech Recognition:</strong> Convert audio to text in source language
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Text Processing:</strong> Clean and normalize recognized text
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Translation:</strong> Convert to target language using NMT
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Output Delivery:</strong> Provide text in multiple languages
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Applications & Impact</strong></h5>
                <p>
                  This multilingual speech-to-text system bridges language barriers by enabling seamless communication across Indian languages. It supports accessibility, education, and business applications by providing accurate transcription and translation services for India's diverse linguistic landscape.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IndianSpeechToTextProject; 