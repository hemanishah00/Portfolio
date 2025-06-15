import React from 'react';
import './IntroPage.css';
import config from '../config';

const IntroPage = () => {
  // Static profile data - no need for API calls
  const profile = {
    name: 'Hemani Shah',
    designation: 'GenAI Developer',
    location: 'Valsad, Gujarat',
    specializations: ['Natural Language Processing', 'Computer Vision']
  };

  const handleImageError = (e) => {
    console.log('Image failed to load, using placeholder...');
    // Use a placeholder with cream and brown colors
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE3Mi4wOTEgMTAwIDE5MCA4Mi4wOTE0IDE5MCA2MEM1NzMgODIuMDkxNCA1NS45MDg2IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzhjNDUxMyIvPgo8cGF0aCBkPSJNNzUgMjI1Qzc1IDE4Ni4zNDEgMTA2LjM0MSAxNTUgMTQ1IDE1NUgxNTVDMTkzLjY1OSAxNTUgMjI1IDE4Ni4zNDEgMjI1IDIyNVYzMDBINzVWMjI1WiIgZmlsbD0iIzhjNDUxMyIvPgo8L3N2Zz4K';
    console.log('Image path failed, using placeholder');
    

  };



  // Use config helper for proper path handling
  const imageSource = config.getImagePath('hemani.jpeg');

  return (
    <div className="intro-container">
      <div className="intro-content">
        <div className="profile-section">
          <div className="profile-image-container">
            <img 
              src={imageSource} 
              alt="Hemani Shah" 
              className="profile-image"
              onError={handleImageError}
              onLoad={() => console.log('Image loaded successfully!')}
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile.name}</h1>
            <h2 className="profile-designation">{profile.designation}</h2>
            <p className="profile-description">
              I am a {profile.designation} based in {profile.location}. My 
              specializations include {profile.specializations.join(' and ')}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage; 