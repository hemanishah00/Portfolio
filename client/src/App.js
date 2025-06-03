import React, { useState } from 'react';
import IntroPage from './components/IntroPage';
import GenAISection from './components/GenAISection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import AnalyticsProjects from './components/AnalyticsProjects';
import ComputerVisionProjects from './components/ComputerVisionProjects';
import RecommendationSystemsProjects from './components/RecommendationSystemsProjects';
import GenerativeAIProjects from './components/GenerativeAIProjects';
import OCRProjects from './components/OCRProjects';
import FIFA20Project from './components/FIFA20Project';
import HousingProject from './components/HousingProject';
import NERProject from './components/NERProject';
import AttendanceFaceRecognitionProject from './components/AttendanceFaceRecognitionProject';
import VehicleDetectionProject from './components/VehicleDetectionProject';
import SuperResolutionProject from './components/SuperResolutionProject';
import EDAAProject from './components/EDAAProject';
import FireBrandsProject from './components/FireBrandsProject';
import RestaurantRecommendationProject from './components/RestaurantRecommendationProject';
import EyePrescriptionBotProject from './components/EyePrescriptionBotProject';
import OCRMultilingualFormsProject from './components/OCRMultilingualFormsProject';
import InvoiceExtractionProject from './components/InvoiceExtractionProject';
import AirportBotProject from './components/AirportBotProject';
import CycleGANsProject from './components/CycleGANsProject';
import DocBotProject from './components/DocBotProject';
import HRBotProject from './components/HRBotProject';
import IndianSpeechToTextProject from './components/IndianSpeechToTextProject';
import PharmaBotProject from './components/PharmaBotProject';
import VLMFinetuningProject from './components/VLMFinetuningProject';
import IntelliExtractProject from './components/IntelliExtractProject';
import SmartTableExtractorProject from './components/SmartTableExtractorProject';
import Voice2InsightProject from './components/Voice2InsightProject';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const handleAnalyticsClick = () => {
    setCurrentPage('analytics');
  };

  const handleComputerVisionClick = () => {
    setCurrentPage('computer-vision');
  };

  const handleRecommendationSystemsClick = () => {
    setCurrentPage('recommendation-systems');
  };

  const handleGenerativeAIClick = () => {
    setCurrentPage('generative-ai');
  };

  const handleOCRClick = () => {
    setCurrentPage('ocr');
  };

  const handleFIFA20Click = () => {
    setCurrentPage('fifa20');
  };

  const handleHousingClick = () => {
    setCurrentPage('housing');
  };

  const handleNERClick = () => {
    setCurrentPage('ner');
  };

  const handleAttendanceFaceRecognitionClick = () => {
    setCurrentPage('attendance-face-recognition');
  };

  const handleVehicleDetectionClick = () => {
    setCurrentPage('vehicle-detection');
  };

  const handleSuperResolutionClick = () => {
    setCurrentPage('super-resolution');
  };

  const handleEDAAClick = () => {
    setCurrentPage('edaa');
  };

  const handleFireBrandsClick = () => {
    setCurrentPage('firebrands');
  };

  const handleRestaurantRecommendationClick = () => {
    setCurrentPage('restaurant-recommendation');
  };

  const handleEyePrescriptionBotClick = () => {
    setCurrentPage('eye-prescription-bot');
  };

  const handleOCRMultilingualFormsClick = () => {
    setCurrentPage('ocr-multilingual-forms');
  };

  const handleInvoiceExtractionClick = () => {
    setCurrentPage('invoice-extraction');
  };

  // Generative AI project handlers
  const handleAirportBotClick = () => {
    setCurrentPage('airport-bot');
  };

  const handleCycleGANsClick = () => {
    setCurrentPage('cycle-gans');
  };

  const handleDocBotClick = () => {
    setCurrentPage('doc-bot');
  };

  const handleHRBotClick = () => {
    setCurrentPage('hr-bot');
  };

  const handleIndianSpeechToTextClick = () => {
    setCurrentPage('indian-speech-to-text');
  };

  const handlePharmaBotClick = () => {
    setCurrentPage('pharma-bot');
  };

  const handleVLMFinetuningClick = () => {
    setCurrentPage('vlm-finetuning');
  };

  const handleIntelliExtractClick = () => {
    setCurrentPage('intelli-extract');
  };

  const handleSmartTableExtractorClick = () => {
    setCurrentPage('smart-table-extractor');
  };

  const handleVoice2InsightClick = () => {
    setCurrentPage('voice2insight');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const handleBackToAnalytics = () => {
    setCurrentPage('analytics');
  };

  const handleBackToComputerVision = () => {
    setCurrentPage('computer-vision');
  };

  const handleBackToRecommendationSystems = () => {
    setCurrentPage('recommendation-systems');
  };

  const handleBackToGenerativeAI = () => {
    setCurrentPage('generative-ai');
  };

  const handleBackToOCR = () => {
    setCurrentPage('ocr');
  };

  if (currentPage === 'fifa20') {
    return <FIFA20Project onBack={handleBackToAnalytics} />;
  }

  if (currentPage === 'housing') {
    return <HousingProject onBack={handleBackToAnalytics} />;
  }

  if (currentPage === 'ner') {
    return <NERProject onBack={handleBackToAnalytics} />;
  }

  if (currentPage === 'attendance-face-recognition') {
    return <AttendanceFaceRecognitionProject onBack={handleBackToComputerVision} />;
  }

  if (currentPage === 'vehicle-detection') {
    return <VehicleDetectionProject onBack={handleBackToComputerVision} />;
  }

  if (currentPage === 'super-resolution') {
    return <SuperResolutionProject onBack={handleBackToComputerVision} />;
  }

  if (currentPage === 'edaa') {
    return <EDAAProject onBack={handleBackToComputerVision} />;
  }

  if (currentPage === 'firebrands') {
    return <FireBrandsProject onBack={handleBackToComputerVision} />;
  }

  if (currentPage === 'restaurant-recommendation') {
    return <RestaurantRecommendationProject onBack={handleBackToRecommendationSystems} />;
  }

  if (currentPage === 'eye-prescription-bot') {
    return <EyePrescriptionBotProject onBack={handleBackToOCR} />;
  }

  if (currentPage === 'ocr-multilingual-forms') {
    return <OCRMultilingualFormsProject onBack={handleBackToOCR} />;
  }

  if (currentPage === 'invoice-extraction') {
    return <InvoiceExtractionProject onBack={handleBackToOCR} />;
  }

  // Generative AI project pages
  if (currentPage === 'airport-bot') {
    return <AirportBotProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'cycle-gans') {
    return <CycleGANsProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'doc-bot') {
    return <DocBotProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'hr-bot') {
    return <HRBotProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'indian-speech-to-text') {
    return <IndianSpeechToTextProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'pharma-bot') {
    return <PharmaBotProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'vlm-finetuning') {
    return <VLMFinetuningProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'intelli-extract') {
    return <IntelliExtractProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'smart-table-extractor') {
    return <SmartTableExtractorProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'voice2insight') {
    return <Voice2InsightProject onBack={handleBackToGenerativeAI} />;
  }

  if (currentPage === 'analytics') {
    return <AnalyticsProjects onBack={handleBackToMain} onFIFA20Click={handleFIFA20Click} onHousingClick={handleHousingClick} onNERClick={handleNERClick} />;
  }

  if (currentPage === 'computer-vision') {
    return <ComputerVisionProjects onBack={handleBackToMain} onAttendanceFaceRecognitionClick={handleAttendanceFaceRecognitionClick} onVehicleDetectionClick={handleVehicleDetectionClick} onSuperResolutionClick={handleSuperResolutionClick} onEDAAClick={handleEDAAClick} onFireBrandsClick={handleFireBrandsClick} />;
  }

  if (currentPage === 'recommendation-systems') {
    return <RecommendationSystemsProjects onBack={handleBackToMain} onRestaurantRecommendationClick={handleRestaurantRecommendationClick} />;
  }

  if (currentPage === 'generative-ai') {
    return <GenerativeAIProjects 
      onBack={handleBackToMain} 
      onAirportBotClick={handleAirportBotClick}
      onCycleGANsClick={handleCycleGANsClick}
      onDocBotClick={handleDocBotClick}
      onHRBotClick={handleHRBotClick}
      onIndianSpeechToTextClick={handleIndianSpeechToTextClick}
      onPharmaBotClick={handlePharmaBotClick}
      onVLMFinetuningClick={handleVLMFinetuningClick}
      onIntelliExtractClick={handleIntelliExtractClick}
      onSmartTableExtractorClick={handleSmartTableExtractorClick}
      onVoice2InsightClick={handleVoice2InsightClick}
    />;
  }

  if (currentPage === 'ocr') {
    return <OCRProjects onBack={handleBackToMain} onEyePrescriptionBotClick={handleEyePrescriptionBotClick} onOCRMultilingualFormsClick={handleOCRMultilingualFormsClick} onInvoiceExtractionClick={handleInvoiceExtractionClick} />;
  }

  return (
    <div className="App">
      <IntroPage />
      <GenAISection />
      <ExperienceSection />
      <ProjectsSection onAnalyticsClick={handleAnalyticsClick} onComputerVisionClick={handleComputerVisionClick} onRecommendationSystemsClick={handleRecommendationSystemsClick} onGenerativeAIClick={handleGenerativeAIClick} onOCRClick={handleOCRClick} />
      <ContactSection />
    </div>
  );
}

export default App; 