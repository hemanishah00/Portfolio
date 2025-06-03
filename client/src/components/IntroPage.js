import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IntroPage.css';

const IntroPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile');
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback data if API fails
        setProfile({
          name: 'Hemani Shah',
          designation: 'GenAI Developer',
          location: 'Valsad, Gujarat',
          specializations: ['Natural Language Processing', 'Computer Vision'],
          image: '/hemani.jpeg' // Use public folder image as fallback
        });
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageError = (e) => {
    console.log('Image failed to load, trying alternative paths...');
    // Try different possible paths
    const imagePaths = [
      '/hemani.jpeg', // Public folder (works in development)
      '/images/hemani.jpeg', // Backend served (works when backend is running)
      'http://localhost:5000/images/hemani.jpeg', // Direct backend URL
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes(path.split('/').pop()));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // If all paths fail, use a placeholder with cream and brown colors
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE3Mi4wOTEgMTAwIDE5MCA4Mi4wOTE0IDE5MCA2MEM1NzMgODIuMDkxNCA1NS45MDg2IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzhjNDUxMyIvPgo8cGF0aCBkPSJNNzUgMjI1Qzc1IDE4Ni4zNDEgMTA2LjM0MSAxNTUgMTQ1IDE1NUgxNTVDMTkzLjY1OSAxNTUgMjI1IDE4Ni4zNDEgMjI1IDIyNVYzMDBINzVWMjI1WiIgZmlsbD0iIzhjNDUxMyIvPgo8L3N2Zz4K';
      console.log('All image paths failed, using placeholder');
    }
  };

  if (loading) {
    return (
      <div className="intro-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // Use public folder image as primary source
  const imageSource = '/hemani.jpeg';

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