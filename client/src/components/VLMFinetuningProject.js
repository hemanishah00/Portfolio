import React from 'react';
import './VLMFinetuningProject.css';

const VLMFinetuningProject = ({ onBack }) => {
  const handleImageError = (e) => {
    console.log('VLM Fine-tuning image failed to load, trying alternative paths...');
    const imagePaths = [
      '/Images/VLMFinetuning.jpeg',
      '/images/VLMFinetuning.jpeg',
      '/VLMFinetuning.jpeg',
    ];
    
    const currentSrc = e.target.src;
    const currentIndex = imagePaths.findIndex(path => currentSrc.includes('VLMFinetuning.jpeg'));
    
    if (currentIndex < imagePaths.length - 1) {
      e.target.src = imagePaths[currentIndex + 1];
    } else {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjVmNWRjIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMi4wOTEgMTUwIDI0MCAxMzIuMDkxIDI0MCAxMTBDMjQwIDg3LjkwODYgMjIyLjA5MSA3MCAyMDAgNzBDMTc3LjkwOSA3MCAyNjAgODcuOTA4NiAyNjAgMTEwQzI2MCAxMzIuMDkxIDE3Ny45MDkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOGI0NTEzIi8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzhmNDUxMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VkxNIEZpbmUtdHVuaW5nPC90ZXh0Pjwvc3ZnPg==';
    }
  };

  return (
    <div className="vlm-finetuning-project-container">
      <div className="vlm-finetuning-project-content">
        <div className="vlm-finetuning-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <div className="vlm-finetuning-hero">
            <div className="vlm-finetuning-image-container">
              <img 
                src="/Images/VLMFinetuning.jpeg"
                alt="VLM fine-tuning Project"
                className="vlm-finetuning-hero-image"
                onError={handleImageError}
              />
            </div>
            <div className="vlm-finetuning-title-container">
              <h1 className="vlm-finetuning-title">VLM Fine-tuning</h1>
              <p className="vlm-finetuning-subtitle">Vision Language Model Optimization Pipeline</p>
            </div>
          </div>
        </div>

        <section className="vlm-finetuning-section">
          <h2 className="section-title">Summary</h2>
          <div className="section-content">
            <p>
              Set up a pipeline to finetune Vision Language Model on custom datasets. Used various techniques like quantization and LORA for optimization.
            </p>
            
            <div className="technical-section">
              <h4>Fine-tuning Pipeline & Optimization:</h4>
              <div className="features-grid">
                <div className="feature-section">
                  <h5><strong>Vision Language Models</strong></h5>
                  <ul>
                    <li><strong>Multimodal Understanding:</strong> Joint vision and language processing</li>
                    <li><strong>Custom Adaptation:</strong> Domain-specific model customization</li>
                    <li><strong>Image-Text Alignment:</strong> Improved visual-linguistic connections</li>
                    <li><strong>Task Specialization:</strong> Fine-tuning for specific applications</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>LORA (Low-Rank Adaptation)</strong></h5>
                  <ul>
                    <li><strong>Parameter Efficiency:</strong> Reduced trainable parameters</li>
                    <li><strong>Memory Optimization:</strong> Lower GPU memory requirements</li>
                    <li><strong>Fast Training:</strong> Accelerated fine-tuning process</li>
                    <li><strong>Modular Updates:</strong> Plug-and-play adaptation modules</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Quantization Techniques</strong></h5>
                  <ul>
                    <li><strong>Model Compression:</strong> Reduced model size and inference time</li>
                    <li><strong>Hardware Efficiency:</strong> Optimized for deployment constraints</li>
                    <li><strong>Precision Control:</strong> Int8/Int4 quantization strategies</li>
                    <li><strong>Quality Preservation:</strong> Minimal performance degradation</li>
                  </ul>
                </div>
                
                <div className="feature-section">
                  <h5><strong>Custom Dataset Integration</strong></h5>
                  <ul>
                    <li><strong>Data Pipeline:</strong> Automated preprocessing and augmentation</li>
                    <li><strong>Format Standardization:</strong> Consistent image-text pair formatting</li>
                    <li><strong>Quality Control:</strong> Data validation and filtering</li>
                    <li><strong>Batch Management:</strong> Efficient data loading and sampling</li>
                  </ul>
                </div>
              </div>
              
              <div className="workflow-section">
                <h5><strong>Fine-tuning Workflow</strong></h5>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <span className="step-number">1</span>
                    <div className="step-content">
                      <strong>Dataset Preparation:</strong> Curate and preprocess custom vision-language datasets
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">2</span>
                    <div className="step-content">
                      <strong>Model Selection:</strong> Choose appropriate base VLM architecture
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">3</span>
                    <div className="step-content">
                      <strong>LORA Setup:</strong> Configure low-rank adaptation parameters
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">4</span>
                    <div className="step-content">
                      <strong>Quantization:</strong> Apply model compression techniques
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">5</span>
                    <div className="step-content">
                      <strong>Training:</strong> Execute optimized fine-tuning process
                    </div>
                  </div>
                  <div className="workflow-step">
                    <span className="step-number">6</span>
                    <div className="step-content">
                      <strong>Evaluation:</strong> Assess performance and deploy optimized model
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="impact-section">
                <h5><strong>Technical Impact & Applications</strong></h5>
                <p>
                  This VLM fine-tuning pipeline enables efficient adaptation of large vision-language models for specific domains while maintaining computational efficiency. The combination of LORA and quantization techniques significantly reduces training costs and deployment requirements, making advanced multimodal AI accessible for specialized applications across various industries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VLMFinetuningProject; 