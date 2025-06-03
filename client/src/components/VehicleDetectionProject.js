import React from 'react';
import './VehicleDetectionProject.css';

const VehicleDetectionProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('Vehicle Detection image failed to load, trying alternative paths...');
    const imagePaths = [
      '/VehicleDetection.jpg',
      '/images/VehicleDetection.jpg',
      'http://localhost:5000/images/VehicleDetection.jpg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('VehicleDetection.jpg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VmVoaWNsZSBEZXRlY3Rpb248L3RleHQ+PC9zdmc+';
      console.log('All Vehicle Detection image paths failed, using placeholder');
    }
  };

  return (
    <div className="vehicle-project-container">
      <div className="vehicle-project-content">
        {/* Header Section */}
        <div className="vehicle-header">
          <button className="back-button" onClick={onBack} aria-label="Go back to computer vision projects">
            ← Back
          </button>
          <div className="vehicle-hero">
            <div className="vehicle-image-container">
              <img 
                src="/VehicleDetection.jpg"
                alt="Vehicle Detection Project"
                className="vehicle-hero-image"
                onError={handleImageError}
                onLoad={() => console.log('Vehicle Detection image loaded successfully!')}
              />
            </div>
            <div className="vehicle-title-container">
              <h1 className="vehicle-title">Vehicle Detection</h1>
              <p className="vehicle-subtitle">Object Detection for Indian Road Vehicles</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <section className="vehicle-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              The goal of this project is to train a model that would work well to detect vehicles on Indian roads. I researched object detection models, comparing YOLOv8 and RT-DETR. YOLOv8 performed well overall with occasional misclassifications, while RT-DETR had a lower inference time but mislocated some objects. The recommendation is to choose YOLOv8 due to its balanced performance.
            </p>
            <div className="methodology-section">
              <h4>Model Comparison and Analysis:</h4>
              <div className="model-comparison">
                <div className="model-section">
                  <h5><strong>YOLOv8 (You Only Look Once v8)</strong></h5>
                  <ul>
                    <li><strong>Performance:</strong> Well-balanced overall performance</li>
                    <li><strong>Accuracy:</strong> High detection accuracy for Indian road vehicles</li>
                    <li><strong>Challenges:</strong> Occasional misclassifications in complex scenarios</li>
                    <li><strong>Strengths:</strong> Robust detection across various vehicle types</li>
                  </ul>
                </div>
                
                <div className="model-section">
                  <h5><strong>RT-DETR (Real-Time Detection Transformer)</strong></h5>
                  <ul>
                    <li><strong>Performance:</strong> Lower inference time for real-time applications</li>
                    <li><strong>Speed:</strong> Faster processing compared to YOLOv8</li>
                    <li><strong>Challenges:</strong> Occasional object mislocation issues</li>
                    <li><strong>Strengths:</strong> Excellent for time-critical applications</li>
                  </ul>
                </div>
              </div>
              
              <div className="recommendation-section">
                <h5><strong>Final Recommendation: YOLOv8</strong></h5>
                <p>
                  Based on the comprehensive analysis, YOLOv8 is recommended as the optimal choice for vehicle detection on Indian roads due to its balanced performance, superior accuracy, and reliable object localization capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VehicleDetectionProject; 