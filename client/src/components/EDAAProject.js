import React from 'react';
import './EDAAProject.css';

const EDAAProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('EDAA image failed to load, trying alternative paths...');
    const imagePaths = [
      '/EDAA.jpg',
      '/images/EDAA.jpg',
      'http://localhost:5000/images/EDAA.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('EDAA.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RURBQTwvdGV4dD48L3N2Zz4=';
      console.log('All EDAA image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/aamir09/FinalSubmissionAI5', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://youtu.be/G5-u3YE2TSQ?t=933', '_blank');
  };

  const handleReportDownload = () => {
    window.open('https://github.com/aamir09/FinalSubmissionAI5/blob/main/presentation%20final.pptx', '_blank');
  };

  return (
    <div className="edaa-project-container">
      <div className="edaa-project-content">
        {/* Header Section */}
        <div className="edaa-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to computer vision projects">
            ← Back
          </button>
          <div className="edaa-hero">
            <div className="edaa-image-container">
              <img 
                src="/EDAA.jpg"
                alt="EDAA - Emotion Detection and Analysis Project"
                className="edaa-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('EDAA image loaded successfully!')}
              />
            </div>
            <div className="edaa-title-container">
              <h1 className="edaa-title">EDAA</h1>
              <p className="edaa-subtitle">Emotion Detection and Analysis</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="edaa-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              EDAA stands for Emotion Detection and Analysis. It is a web application that will create a report of audience reactions. We consider video (facial expressions of the audience) and text (context of the speech) data. This app will help public speakers improve their speech. Please read more about our app in the About section of our web app.
            </p>
            
            <div className="architecture-section">
              <h4>System Architecture:</h4>
              <p>
                The following is a diagram of the architecture of our web app:
              </p>
              
              <div className="architecture-image-container">
                <img 
                  src="/EDAAArc.png"
                  alt="EDAA System Architecture Diagram"
                  className="architecture-image"
                  onError={(e) => {
                    console.log('Architecture diagram failed to load, trying alternative paths...');
                    const imagePaths = [
                      '/EDAAArc.png',
                      '/EDAAArc.PNG',
                      '/images/EDAAArc.png',
                      '/Images/EDAAArc.png',
                      '/Images/EDAAArc.PNG',
                      'http://localhost:5000/images/EDAAArc.png',
                    ];
                    
                    const currentSrc = e.target.src;
                    const currentIndex = imagePaths.findIndex(path => 
                      currentSrc.includes('EDAAArc.png') || currentSrc.includes('EDAAArc.PNG')
                    );
                    
                    if (currentIndex < imagePaths.length - 1) {
                      e.target.src = imagePaths[currentIndex + 1];
                    } else {
                      e.target.style.display = 'none';
                      console.log('All architecture diagram paths failed');
                    }
                  }}
                  onLoad={() => console.log('Architecture diagram loaded successfully!')}
                />
              </div>
              
              <div className="workflow-description">
                <p>
                  As you can see from the plot above, The user will input a video into the web app. The <a href="https://github.com/aamir09/FinalSubmissionAI5/blob/main/frontend_react/src/components/Upload.js" target="_blank" rel="noopener noreferrer" className="edaa-link"><strong>Upload</strong></a> component of the frontend-react downloads the video to the server after encoding it. This video is then taken by the <a href="https://github.com/aamir09/FinalSubmissionAI5/tree/main/preprocessor" target="_blank" rel="noopener noreferrer" className="edaa-link"><strong>preprocessor</strong></a> which first decodes it. Once decoded audio is extracted from the video using moviepy. Then it is divided into chunks by using the preprocessor. The preprocessor divides the audio into 10-second chunks. These audio chunks are then converted to text using the <a href="https://github.com/aamir09/FinalSubmissionAI5/tree/main/OpenAI-ASR" target="_blank" rel="noopener noreferrer" className="edaa-link"><strong>ASR container</strong></a>. These sentences are analysed using <a href="https://github.com/aamir09/FinalSubmissionAI5/tree/main/sbert" target="_blank" rel="noopener noreferrer" className="edaa-link"><strong>SBert</strong></a>. The sbert container predicts the sentiment of the model and saves the audio predictions to the GCS bucket. Here is a screenshot of the bucket to get a basic idea of the structure.
                </p>
              </div>

              <div className="data-processing">
                <h5><strong>Audio Processing Results:</strong></h5>
                <div className="code-block">
                  <pre>
{`{
  "0_10": {
    "sentence": "I'm goin",
    "prediction": "negative",
    "start": 0,
    "stop": 10
  },
  "10_20": {
    "sentence": "to go to the museum",
    "prediction": "neutral",
    "start": 10,
    "stop": 20
  },
  "20_30": {
    "sentence": "Good Bye",
    "prediction": "neutral",
    "start": 20,
    "stop": 30
  }
}`}
                  </pre>
                </div>
                
                <p>
                  The dictionary's key specifies the start and the stop time, i.e. the interval. the value is a dictionary which has the following information:
                </p>
                <ul>
                  <li><strong>sentence</strong> - this has been predicted by the asr model when the input audio chunk is given as input.</li>
                  <li><strong>prediction</strong> - this has been predicted by the sentence bert model when the sentence is given as input.</li>
                  <li><strong>start</strong> - start time</li>
                  <li><strong>stop</strong> - stop time</li>
                </ul>

                <h5><strong>Video Processing Results:</strong></h5>
                <p>
                  Similarly, the video chunks are created by the preprocessor and uploaded to GCS bucket. The yolo container takes these chunks as input to the <a href="https://github.com/aamir09/FinalSubmissionAI5/tree/main/Yolov7" target="_blank" rel="noopener noreferrer" className="edaa-link"><strong>yolo container</strong></a>. The results look something like this:
                </p>
                
                <div className="code-block">
                  <pre>
{`{
  "50_60": {
    "positive": 2,
    "neutral": 0,
    "negative": 39
  },
  "20_30": {
    "positive": 1,
    "neutral": 2,
    "negative": 45
  },
  "10_20": {
    "positive": 1,
    "neutral": 0,
    "negative": 35
  }
}`}
                  </pre>
                </div>
                
                <p>
                  The above results are taken back to the frontend and we use plotly.js to make plots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="edaa-section">
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
                aria-label="Watch presentation video"
              >
                <span className="button-icon">🎥</span>
                Video of the presentation
              </button>

              <button 
                className="resource-button report-button"
                onClick={handleReportDownload}
                aria-label="Download detailed report"
              >
                <span className="button-icon">📊</span>
                Download detailed report
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EDAAProject; 