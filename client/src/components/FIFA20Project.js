import React from 'react';
import './FIFA20Project.css';
import config from '../config';

const FIFA20Project = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('FIFA-20 image failed to load, trying alternative paths...');
    const imagePaths = [
      '/FIFA-20.jpeg',
      '/images/FIFA-20.jpeg',
      'http://localhost:5000/images/FIFA-20.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('FIFA-20.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RklGQS0yMDwvdGV4dD48L3N2Zz4=';
      console.log('All FIFA-20 image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/FIFA-20', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://drive.google.com/file/d/10RKMTCTOtpr2WBIFXjVmfi1lY2TcJ4Oj/view?usp=sharing', '_blank');
  };

  const handleReportDownload = () => {
    const link = document.createElement('a');
    link.href = '/FIFA-20.pptx';
    link.download = 'FIFA-20-Detailed-Report.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fifa-project-container">
      <div className="fifa-project-content">
        {/* Header Section */}
        <div className="fifa-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to analytics projects">
            ← Back
          </button>
          <div className="fifa-hero">
            <div className="fifa-image-container">
              <img 
                src={config.getImagePath('FIFA-20.jpeg')}
                alt="FIFA-20 Project"
                className="fifa-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('FIFA-20 image loaded successfully!')}
              />
            </div>
            <div className="fifa-title-container">
              <h1 className="fifa-title">FIFA-20</h1>
              <p className="fifa-subtitle">Player Analysis & Prediction System</p>
            </div>
          </div>
        </div>

        {/* Problem Statement Section */}
        <section className="fifa-section">
          <h2 className="section-title">Problem Statement</h2>
          <div className="section-content">
            <p>
              Football is arguably the most popular sport in the world and FIFA is the most popular football (soccer) simulation game by Electronic Arts (EA Sports). The game is not to be confused with the official International Federation for Football (FIFA).
            </p>
            <p>
              You are given the following public dataset, scraped from <a href="https://sofifa.com/" target="_blank" rel="noopener noreferrer" className="fifa-link">SoFIFA</a>. The data lists soccer players from the 2015-2020 editions of EA Sports FIFA video game. It consists of player positions, player attributes and personal data.
            </p>
            <p>
              The player club changes can be tracked using the unique Sofifa id across all years. The problem statement is as follows:
            </p>
            
            <div className="problem-parts">
              <div className="problem-part">
                <h3>Part A - Rank the Players</h3>
                <p><strong>Who is the best player in the world according to your analysis?</strong></p>
                <p>Use data from FIFA 19. Predict the Overall (OVR) skill Statistic for players in the FIFA 20 Edition. Train on all players from FIFA 19. Graphically represent the Overall data for the players in test set.</p>
              </div>
              
              <div className="problem-part">
                <h3>Part B - Classify player position</h3>
                <p><strong>Can a professional defender become a forward?</strong></p>
                <p>Train on data from FIFA 19. Predict the player_position variable using other skill statistics for players in the FIFA 20 Edition. Train on all players from FIFA 19</p>
                <p>Graphically represent the predicted player_position for the players in Test Set</p>
              </div>
              
              <div className="problem-part">
                <h3>Part C - Which Club has the Best Staff</h3>
                <p><strong>The best staff always help their players grow, can you identify that using historical data?</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="fifa-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Analyzed the players' datasets from 2015-2020 to predict the team ranks in 2021. Pre-processed the datasets by examining the collinearity and correlations between the variables to reduce the number of predictors from 104 to 46. Implemented a 4-layered Neural Network to predict the ranks of players in 2019. Deployed 4 different Logistic Regression models on the 2019 data and compiled their results to predict the players' positions in 2020. Predicted if a defender could become a forward player based on the attacking abilities. Compared the team performances and ranked the support staff based on the team performance from 2015 to 2020 using Linear Regression.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="fifa-section">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FIFA20Project; 