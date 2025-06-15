import React from 'react';
import './ContactSection.css';
import config from '../config';

const ContactSection = () => {
  const handleImageError = (e) => {
    console.log('Contact image failed to load, trying alternative paths...');
    const imagePaths = [
      '/last.jpeg',
      '/images/last.jpeg',
      'http://localhost:5000/images/last.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('last.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      // Placeholder if all paths fail
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQ1MCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0NTAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMjUgMTUwQzI0Ny4wOTEgMTUwIDI2NSAxMzIuMDkxIDI2NSAxMTBDMjY1IDg3LjkwODYgMjQ3LjA5MSA3MCAyMjUgNzBDMjAyLjkwOSA3MCAyODUgODcuOTA4NiAyODUgMTEwQzI4NSAxMzIuMDkxIDIwMi45MDkgMTUwIDIyNSAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+CjxwYXRoIGQ9Ik0xNTAgMjMwQzE1MCAyMDEuMzQxIDE3MS4zNDEgMTgwIDIwMCAxODBIMjUwQzI3OC42NTkgMTgwIDMwMCAyMDEuMzQxIDMwMCAyMzBWMzAwSDE1MFYyMzBaIiBmaWxsPSIjOGI0NTEzIi8+PC9zdmc+';
      console.log('All contact image paths failed, using placeholder');
    }
  };

  const handleResumeClick = () => {
    console.log('Resume clicked - opening PDF');
    // Open the resume PDF in a new tab
    const resumePaths = [
      '/H N Shah.pdf',
      '/pdfs/H N Shah.pdf',
      config.getImagePath('H N Shah.pdf'),
      '/images/H N Shah.pdf',
      'http://localhost:5000/images/H N Shah.pdf'
    ];
    
    // Try to open the first path, if it fails the browser will handle it
    const resumeUrl = process.env.NODE_ENV === 'production' 
      ? `${process.env.PUBLIC_URL}/H N Shah.pdf`
      : resumePaths[0];
    
    console.log('Opening resume at:', resumeUrl);
    window.open(encodeURI(resumeUrl), '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hemanishah00@gmail.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+919924475599';
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/hemanishah00/', '_blank');
  };

  return (
    <section className="contact-container">
      <div className="contact-content">
        <div className="contact-section">
          <div className="contact-info">
            <h2 className="contact-title">Work with Me</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h3 className="contact-label">Email</h3>
                <button 
                  className="contact-link email-link"
                  onClick={handleEmailClick}
                  aria-label="Send email to hemanishah00@gmail.com"
                >
                  hemanishah00@gmail.com
                </button>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-label">Phone</h3>
                <button 
                  className="contact-link phone-link"
                  onClick={handlePhoneClick}
                  aria-label="Call +91 9924475599"
                >
                  (+91) 9924475599
                </button>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-label">LinkedIn</h3>
                <button 
                  className="contact-link linkedin-link"
                  onClick={handleLinkedInClick}
                  aria-label="Visit LinkedIn profile"
                >
                  https://www.linkedin.com/in/hemanishah00/
                </button>
              </div>
              
              <div className="contact-item">
                <h3 className="contact-label">Resume</h3>
                <button 
                  className="contact-link resume-link"
                  onClick={handleResumeClick}
                  aria-label="View resume PDF"
                >
                  Take me to your resume
                </button>
              </div>
            </div>
          </div>
          
          <div className="contact-image-container">
            <img 
              src={config.getImagePath('last.jpeg')} 
              alt="Contact" 
              className="contact-image"
              onError={handleImageError}
              onLoad={() => console.log('Contact image loaded successfully!')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 