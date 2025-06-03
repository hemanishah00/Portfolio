import React from 'react';
import './NERProject.css';

const NERProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('NER image failed to load, trying alternative paths...');
    const imagePaths = [
      '/NER.jpeg',
      '/images/NER.jpeg',
      'http://localhost:5000/images/NER.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('NER.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TkVSPC90ZXh0Pjwvc3ZnPg==';
      console.log('All NER image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/NER-project', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://drive.google.com/file/d/1DkmwoojrIoW9dYHCFU2pI9Hl3iBWccDP/view?usp=sharing', '_blank');
  };

  const handleReportDownload = () => {
    window.open('https://docs.google.com/presentation/d/126yb-We7p8RTyAfdfK0HxWEOogUcy9S9/edit?usp=sharing&ouid=104638630139530232188&rtpof=true&sd=true', '_blank');
  };

  const handlePosterClick = () => {
    window.open('https://drive.google.com/file/d/1klD_IOUabW96jCBwfQVGmV6cZ3XCOTj4/view?usp=sharing', '_blank');
  };

  return (
    <div className="ner-project-container">
      <div className="ner-project-content">
        {/* Header Section */}
        <div className="ner-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to analytics projects">
            ← Back
          </button>
          <div className="ner-hero">
            <div className="ner-image-container">
              <img 
                src="/NER.jpeg"
                alt="NER Project"
                className="ner-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('NER image loaded successfully!')}
              />
            </div>
            <div className="ner-title-container">
              <h1 className="ner-title">NER</h1>
              <p className="ner-subtitle">Named Entity Recognition for Scientific Publications</p>
            </div>
          </div>
        </div>

        {/* Problem Statement Section */}
        <section className="ner-section">
          <h2 className="section-title">Problem Statement</h2>
          <div className="section-content">
            <h3 className="subsection-title">Information Extraction From Scientific Publication</h3>
            <p>
              Named Entity Recognition (NER) is one of the most popular applications of Natural Language Processing. For the scope of this project, we will focus on creating a NER model that identifies key tokens and classifies them into set of predefined entities.
            </p>
            <p>
              The number of scientific papers published per year has exploded in recent years, strengthening its value as one of the main drivers for scientific progress. In astronomy alone, more than 41,000 new articles are published every year and the vast majority are available either via an open-access model or via pre-print services. Indexing the article's full-text in search engines helps discover and retrieve vital scientific information to continue building on the shoulders of giants, informing policy, and making evidence-based decisions.
            </p>
            <p>
              Nevertheless, it is difficult to navigate in this ocean of data; finding articles rely heavily on string matching searches and following citations/references. NER helps us extract key information from scientific papers which can help search engines to better select and filter articles.
            </p>
            <div className="project-requirements">
              <h4>Project Requirements</h4>
              <p>
                For this, you will first train a language model on <a href="https://huggingface.co/datasets/fgrezes/WIESP2022-NER" target="_blank" rel="noopener noreferrer" className="ner-link"><strong>WIESP</strong></a> dataset. Define and train a simple RNN network with 2 RNN layers as your baseline model. Using the knowledge learned during the duration of this, come up with an algorithm that outperforms the baseline. The goal is to flex your AI3 muscles so we expect a tonne of experimentation with different models and architectures.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="ner-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Trained a language model on WIESP dataset. Used various architectures like ELMO and our own custom architecture.
            </p>
            <div className="notebooks-section">
              <h4>Notebooks (In the recommended order):</h4>
              <ol className="notebooks-list">
                <li><strong>EDA</strong> - Exploratory Data Analysis of the WIESP dataset</li>
                <li><strong>Baseline and ELMO</strong> - Implementation of baseline RNN model and ELMO architecture</li>
                <li><strong>Custom_Model</strong> - Our custom NER model architecture</li>
                <li><strong>Balanced_Custom_Model</strong> - This is very similar to the Custom model notebook, except for the preprocessing to balance data, for model 2, 3 and 4.</li>
                <li><strong>Autocorrector</strong> - This notebook contains an autocorrect tool trained on this corpus. Suppose one is trying use one of our models to predict the NER tag of a word and they accidentally type the incorrect spelling, this returned autocorrect suggestions that are the closest match from our data. This can be used as a tool when implementing the model for an end user.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="ner-section">
          <h2 className="section-title">Resources</h2>
          <div className="section-content">
            <div className="resources-container">
              <button 
                className="resource-button github-button"
                onClick={handleGitHubClick}
                aria-label="View GitHub repository"
              >
                <span className="button-icon">🔗</span>
                View Code on GitHub
              </button>
              
              <button 
                className="resource-button video-button"
                onClick={handleVideoClick}
                aria-label="Request presentation video"
              >
                <span className="button-icon">🎥</span>
                Request the video of the presentation
              </button>

              <button 
                className="resource-button report-button"
                onClick={handleReportDownload}
                aria-label="Download detailed report"
              >
                <span className="button-icon">📊</span>
                Download detailed report
              </button>

              <button 
                className="resource-button poster-button"
                onClick={handlePosterClick}
                aria-label="Request poster"
              >
                <span className="button-icon">🎨</span>
                Request poster
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NERProject; 