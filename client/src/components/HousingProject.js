import React from 'react';
import './HousingProject.css';

const HousingProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Housing image failed to load, trying alternative paths...');
    const imagePaths = [
      '/DDOHII.webp',
      '/images/DDOHII.webp',
      'http://localhost:5000/images/DDOHII.webp',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('DDOHII.webp'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SG91c2luZyBQcm9qZWN0PC90ZXh0Pjwvc3ZnPg==';
      console.log('All housing image paths failed, using placeholder');
    }
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/hemanishah00/DS2Project', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://drive.google.com/file/d/1UXEff7GF6dMIhqf3DCsShZBNQkluYsdC/view?usp=sharing', '_blank');
  };

  const handleReportDownload = () => {
    window.open('https://drive.google.com/file/d/1a-geWZwFGzP8Yf3v55xBGQ6LAOzIy73z/view?usp=sharing', '_blank');
  };

  const handlePosterClick = () => {
    window.open('https://drive.google.com/file/d/10Mxj5JFn13QAqj_-5Pu2yeuPWnmzFlXv/view?usp=sharing', '_blank');
  };

  return (
    <div className="housing-project-container">
      <div className="housing-project-content">
        {/* Header Section */}
        <div className="housing-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to analytics projects">
            ← Back
          </button>
          <div className="housing-hero">
            <div className="housing-image-container">
              <img 
                src="/DDOHII.webp"
                alt="Deep Dive of Housing in India Project"
                className="housing-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Housing image loaded successfully!')}
              />
            </div>
            <div className="housing-title-container">
              <h1 className="housing-title">Deep Dive of Housing in India</h1>
              <p className="housing-subtitle">Comprehensive Analysis & Price Prediction</p>
            </div>
          </div>
        </div>

        {/* Problem Statement Section */}
        <section className="housing-section">
          <h2 className="section-title">Problem Statement</h2>
          <div className="section-content">
            <div className="problem-parts">
              <div className="problem-part">
                <h3>Part A - Comprehensive Analysis of India Housing Census Data 2011</h3>
                <p>The objective of Part A is for you to perform the following:</p>
                <ul>
                  <li><strong>EDA & Visualization Dashboard</strong> of the variables provided</li>
                  <li>We encourage you to come up with your own valuable insights into the dataset, but some examples include:
                    <ul>
                      <li>What states have the highest and lowest electrical household items?</li>
                      <li>What does the latrine facilities per state look like?</li>
                      <li>What are the various usage of energy across all states?</li>
                      <li>What is the status of good condition households per state and how is it correlated with other factors present?</li>
                      <li>And much more...!</li>
                    </ul>
                  </li>
                </ul>
                <p>
                  <strong>Link to the dataset:</strong> In order to prepare the dataset, you will have to perform automated/manual download of all the district data within the states within the following link and consolidate the dataset together into a master dataset - <a href="https://censusindia.gov.in/2011census/HLO/HL_PCA/Houselisting-housing-HLPCA.html" target="_blank" rel="noopener noreferrer" className="housing-link">Census India Housing Data</a>
                </p>
              </div>
              
              <div className="problem-part">
                <h3>Part B - Housing Price Prediction from Metropolitan Indian Cities</h3>
                <p>The objective of Part B is for you to perform the following:</p>
                <ul>
                  <li>Construct and compare at least 3 models to predict the pricing of houses from Metropolitan Indian Cities</li>
                  <li>Perform feature engineering to increase the accuracy of your models. Some features to add would be House Quality Living Index (Refer to the Appendix below) by using the Census dataset or other features using the comprehensive Census dataset provided.</li>
                </ul>
                <p>This dataset comprises data that was scraped. It includes:</p>
                <ul>
                  <li>collection of prices of new and resale houses located in the metropolitan areas of India</li>
                  <li>the amenities provided for each house</li>
                </ul>
                <p>
                  With 40 explanatory variables describing various aspects of new and resale houses in the metropolitan areas of India, one can predict the final price of houses in these regions.
                </p>
                <p>
                  <strong>Note:</strong> Since for a set of houses, nothing was mentioned about certain amenities, '9' was used to mark such values, which could indicate the absence of information about the apartment but these values don't ascertain the absence of such a feature in real life.
                </p>
                <p>
                  <strong>Link to the dataset:</strong> Please use this dataset for the same - <a href="https://www.kaggle.com/ruchi798/housing-prices-in-metropolitan-areas-of-india/download" target="_blank" rel="noopener noreferrer" className="housing-link">Kaggle Housing Dataset</a>
                </p>
              </div>
              
              <div className="problem-part">
                <h3>Appendix - Housing Quality of Living Index Calculation</h3>
                <p>
                  Calculation of Housing Quality of Living Index - Household quality of living (HQL) refers to three broad aspects including housing condition, amenities and assets.
                </p>
                <p>
                  To assess the household quality of living only for Indian states, a Household Quality of living Index (HQLI) is constructed on the basis of 20 variables. Here, Union Territories (UTs) are excluded to equalize the parity of the states. HQLI is made up of three distinctive indices such as quality of housing index (QHI), basic amenity index (BAI) and asset index (AI). The selected 20 variables fall under these three indices.
                </p>
                <p><strong>HQLI = QHI + BAI + AI</strong></p>
                
                <div className="index-sections">
                  <div className="index-section">
                    <h4>Quality of Housing Index (QHI)</h4>
                    <ol>
                      <li>HHs by good condition of residential census houses</li>
                      <li>HHs living in permanent houses</li>
                      <li>Married couples do not have exclusive room</li>
                      <li>HHs with own houses</li>
                      <li>HHs having at least two dwelling rooms</li>
                    </ol>
                  </div>
                  
                  <div className="index-section">
                    <h4>Basic Amenity Index (BAI)</h4>
                    <p>HHs having following amenities/facilities:</p>
                    <ol>
                      <li>Drinking water within premises</li>
                      <li>Electricity</li>
                      <li>Latrine within premises</li>
                      <li>Bath room</li>
                      <li>Closed drainage system for waste water outlet</li>
                      <li>Separate kitchen inside the house</li>
                      <li>LPG/PNG for cooking</li>
                      <li>Banking service</li>
                    </ol>
                  </div>
                  
                  <div className="index-section">
                    <h4>Asset Index (AI)</h4>
                    <p>HHs having following assets:</p>
                    <ol>
                      <li>Radio/Transistor</li>
                      <li>Television</li>
                      <li>Telephone facilities (mobile, landline or both)</li>
                      <li>Bicycle</li>
                      <li>Scooter/Motorcycle/Moped</li>
                      <li>Car/Jeep/Van</li>
                      <li>Computer/Laptop (with or without internet)</li>
                    </ol>
                  </div>
                </div>
                
                <p>
                  To calculate each, sum each of the % values of the variables with weights derived from a random seed i.e AI = weight_1 * Radio/transistor value% + weight_2 * Television% + ....+ weight_7 * Computer/Laptop%.
                </p>
                <p className="citation">
                  [1] Das, Bhaswati & Mistri, Avijit. (2013). Household Quality of Living in Indian States: Analysis of 2011 Census. Environment and Urbanization Asia. 4. 151-171. 10.1177/0975425313477759.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="housing-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              In this project, we delve into Indian housing data, looking at the 2011 Indian Housing Census Data as well as house data from India's metropolite cities. The exploratory data analysis section of the project answers several questions regarding houses in India for the year 2011 and presents some interesting statistics. Predictive modelling of housing prices in India's metro cities, including Delhi, Mumbai, Bangalore, Chennai, Kolkata, and Hyderabad, is covered in the second section, which is modelling. To compare and pick which model is most suited to our situation, we train linear models, tree-based models, distance-based models, and neural network-based models. We then explain the best model using several approaches.
            </p>
          </div>
        </section>

        {/* Resources Section */}
        <section className="housing-section">
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

export default HousingProject; 