import React from 'react';
import './GenAISection.css';

const GenAISection = () => {
  const handleImageError = (e) => {
    console.log('GenAI section image failed to load, trying alternative paths...');
    const imagePaths = [
      '/2.jpeg',
      '/images/2.jpeg',
      'http://localhost:5000/images/2.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes(path.split('/').pop()));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQ1MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0NTAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMjUgMTUwQzI0Ny4wOTEgMTUwIDI2NSAxMzIuMDkxIDI2NSAxMTBDMjY1IDg3LjkwODYgMjQ3LjA5MSA3MCAyMjUgNzBDMjAyLjkwOSA3MCAyODUgODcuOTA4NiAyODUgMTEwQzI4NSAxMzIuMDkxIDIwMi45MDkgMTUwIDIyNSAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+CjxwYXRoIGQ9Ik0xNTAgMjMwQzE1MCAyMDEuMzQxIDE3MS4zNDEgMTgwIDIwMCAxODBIMjUwQzI3OC42NTkgMTgwIDMwMCAyMDEuMzQxIDMwMCAyMzBWMzAwSDE1MFYyMzBaIiBmaWxsPSIjOGI0NTEzIi8+PC9zdmc+';
      console.log('All GenAI image paths failed, using placeholder');
    }
  };

  return (
    <section className="genai-container">
      <div className="genai-content">
        <div className="genai-section">
          <div className="genai-text">
            <h2 className="genai-title">As a GenAI Developer</h2>
            <div className="genai-description">
              <p>
                I specialize in building AI-powered systems that solve complex, real-world problems using Large Language Models (LLMs), Computer Vision, and Natural Language Processing. My work includes developing RAG-based pipelines, voice assistants, multilingual bots, document intelligence solutions, and advanced dashboards that uncover insights from unstructured data.
              </p>
              <p>
                I have worked on impactful projects across healthcare, pharma, airports, and enterprise operations—delivering solutions that improve efficiency, accuracy, and decision-making. My experience includes fine-tuning models like LLaMA, designing structured agents, and building scalable, end-to-end AI systems.
              </p>
              <p>
                I enjoy connecting ideas across domains, learning continuously, and collaborating with diverse teams. Let's connect and build something intelligent together.
              </p>
            </div>
          </div>
          <div className="genai-image-container">
            <img 
              src="/2.jpeg" 
              alt="GenAI Development" 
              className="genai-image"
              onError={handleImageError}
              onLoad={() => console.log('GenAI section image loaded successfully!')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenAISection; 