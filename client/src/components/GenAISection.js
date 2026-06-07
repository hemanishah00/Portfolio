import React from 'react';
import './GenAISection.css';
import config from '../config';

const GenAISection = () => {
  const handleImageError = (e) => {
    console.log('GenAI section image failed to load, using placeholder...');
    // Use a placeholder with cream and brown colors
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQ1MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0NTAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMjUgMTUwQzI0Ny4wOTEgMTUwIDI2NSAxMzIuMDkxIDI2NSAxMTBDMjY1IDg3LjkwODYgMjQ3LjA5MSA3MCAyMjUgNzBDMjAyLjkwOSA3MCAyODUgODcuOTA4NiAyODUgMTEwQzI4NSAxMzIuMDkxIDIwMi45MDkgMTUwIDIyNSAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+CjxwYXRoIGQ9Ik0xNTAgMjMwQzE1MCAyMDEuMzQxIDE3MS4zNDEgMTgwIDIwMCAxODBIMjUwQzI3OC42NTkgMTgwIDMwMCAyMDEuMzQxIDMwMCAyMzBWMzAwSDE1MFYyMzBaIiBmaWxsPSIjOGI0NTEzIi8+PC9zdmc+';
    console.log('GenAI image path failed, using placeholder');
  };

  return (
    <section className="genai-container">
      <div className="genai-content">
        <div className="genai-section">
          <div className="genai-text">
            <h2 className="genai-title">As a Senior Data Scientist</h2>
            <div className="genai-description">
              <p>
                I design and develop AI-powered systems that solve complex, real-world business problems. Over the past several years, I have worked across Generative AI, Large Language Models (LLMs), Agentic AI, Computer Vision, Intelligent Document Processing, and Natural Language Processing, building solutions that move from research and experimentation into production.
              </p>
              <p>
                My experience spans developing multi-agent workflows, Retrieval-Augmented Generation (RAG) applications, conversational AI systems, intelligent document processing pipelines, and computer vision solutions for enterprise clients across healthcare, pharmaceuticals, customer service, and business operations. More recently, I have been focused on designing AI-driven workflow automation systems that leverage agent orchestration, evaluation frameworks, and personalized content generation to support customer engagement and business growth at scale. I have built scalable AI products using technologies such as LangGraph, Azure AI Services, Vector Databases, and modern LLM frameworks, with a strong emphasis on reliability, observability, and measurable business impact.
              </p>
              <p>
                From analyzing hundreds of thousands of employee feedback comments to uncover operational bottlenecks, to building multilingual virtual assistants, automated document intelligence systems, and intelligent customer interaction workflows, I enjoy transforming complex data and emerging AI technologies into practical solutions that deliver real value. My passion lies in bridging the gap between cutting-edge AI capabilities and the business challenges they are designed to solve.
              </p>
            </div>
          </div>
          <div className="genai-image-container">
            <img 
              src={config.getImagePath('2.jpeg')} 
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