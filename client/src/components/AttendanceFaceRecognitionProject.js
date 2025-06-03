import React from 'react';
import './AttendanceFaceRecognitionProject.css';

const AttendanceFaceRecognitionProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Attendance Face Recognition image failed to load, trying alternative paths...');
    const imagePaths = [
      '/AttendanceFaceRecognition.jpeg',
      '/images/AttendanceFaceRecognition.jpeg',
      'http://localhost:5000/images/AttendanceFaceRecognition.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('AttendanceFaceRecognition.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RmFjZSBSZWNvZ25pdGlvbjwvdGV4dD48L3N2Zz4=';
      console.log('All Attendance Face Recognition image paths failed, using placeholder');
    }
  };

  return (
    <div className="attendance-project-container">
      <div className="attendance-project-content">
        {/* Header Section */}
        <div className="attendance-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to computer vision projects">
            ← Back
          </button>
          <div className="attendance-hero">
            <div className="attendance-image-container">
              <img 
                src="/AttendanceFaceRecognition.jpeg"
                alt="Attendance Face Recognition Project"
                className="attendance-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Attendance Face Recognition image loaded successfully!')}
              />
            </div>
            <div className="attendance-title-container">
              <h1 className="attendance-title">Attendance Using Face Recognition</h1>
              <p className="attendance-subtitle">Advanced Video-Based Facial Recognition System</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="attendance-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Created an innovative way through which one can compare embeddings created from frames of videos of people against other videos for facial recognition. This allows us to compare not only the frontal face but also the side faces of people and consider people's faces, from different angles, facial expressions, and light conditions while doing facial recognition.
            </p>
            <div className="methodology-section">
              <h4>The basic methodology is highlighted below:</h4>
              <ol className="methodology-list">
                <li><strong>Video Frame Division:</strong> Divided the video into frames. We suggest the user talks while moving their head from one side to another to capture a range of facial expressions, angles and lighting conditions.</li>
                <li><strong>Face Detection:</strong> Detect faces in each image. For the sake of simplicity we considered each image has only one face or gave an error.</li>
                <li><strong>Face Cropping:</strong> Crop the faces from each image.</li>
                <li><strong>Embedding Creation:</strong> Create embeddings from each face image.</li>
                <li><strong>Embedding Aggregation:</strong> Aggregate these embeddings to form a single embedding.</li>
                <li><strong>Test Processing:</strong> Follow steps 1 through 5 for each test video and get test embedding.</li>
                <li><strong>Similarity Calculation:</strong> Calculate the cosine similarity between the 2 embeddings to determine if the face is of the same person.</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AttendanceFaceRecognitionProject; 