import React from 'react';
import './AirportBotProject.css';

const AirportBotProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Airport Bot image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/AirportBot.jpeg',
      '/images/AirportBot.jpeg',
      '/AirportBot.jpeg',
      'http://localhost:5000/images/AirportBot.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('AirportBot.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QWlycG9ydCBCb3Q8L3RleHQ+PC9zdmc+';
      console.log('All Airport Bot image paths failed, using placeholder');
    }
  };

  return (
    <div className="airport-bot-project-container">
      <div className="airport-bot-project-content">
        {/* Header Section */}
        <div className="airport-bot-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to generative AI projects">
            ← Back
          </button>
          <div className="airport-bot-hero">
            <div className="airport-bot-image-container">
              <img 
                src="/Images/AirportBot.jpeg"
                alt="Airport Bot Project"
                className="airport-bot-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Airport Bot image loaded successfully!')}
              />
            </div>
            <div className="airport-bot-title-container">
              <h1 className="airport-bot-title">Airport Bot</h1>
              <p className="airport-bot-subtitle">Intelligent Airport Customer Service</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="airport-bot-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Created a chatbot for customer service at an airport, explored structured agents and OpenAI function calling to call various functions that gave information related to various services offered by the airport like parking, bus services, etc. Used various techniques like prompt engineering and RAGs to ensure accurate information was given.
            </p>
            
            <div className="technical-section">
              <h4>Technical Implementation:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Structured Agents</strong></h5>
                  <ul>
                    <li><strong>Architecture:</strong> Modular agent design for specific airport services</li>
                    <li><strong>Service Coverage:</strong> Parking, transportation, facilities, and more</li>
                    <li><strong>Scalability:</strong> Easy addition of new service modules</li>
                    <li><strong>Efficiency:</strong> Targeted responses based on query type</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>OpenAI Function Calling</strong></h5>
                  <ul>
                    <li><strong>Integration:</strong> Seamless API calls to airport service databases</li>
                    <li><strong>Real-time Data:</strong> Live information on parking availability, schedules</li>
                    <li><strong>Accuracy:</strong> Direct access to authoritative data sources</li>
                    <li><strong>Reliability:</strong> Consistent and up-to-date responses</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Prompt Engineering</strong></h5>
                  <ul>
                    <li><strong>Context Awareness:</strong> Understanding of airport-specific terminology</li>
                    <li><strong>User Intent:</strong> Accurate interpretation of customer queries</li>
                    <li><strong>Response Quality:</strong> Clear, helpful, and actionable information</li>
                    <li><strong>Error Handling:</strong> Graceful handling of ambiguous requests</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>RAG Implementation</strong></h5>
                  <ul>
                    <li><strong>Knowledge Base:</strong> Comprehensive airport service documentation</li>
                    <li><strong>Retrieval System:</strong> Efficient document and FAQ retrieval</li>
                    <li><strong>Accuracy:</strong> Grounded responses based on official information</li>
                    <li><strong>Updates:</strong> Dynamic knowledge base with latest policies</li>
                  </ul>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Impact & Benefits</strong></h5>
                <p>
                  The Airport Bot significantly improves customer experience by providing instant, accurate responses to common queries, reducing wait times for human agents, and ensuring 24/7 availability of essential airport information and services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AirportBotProject; 