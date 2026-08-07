import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    prediction: "Disease Prediction",
    aiAssistant: "AI Assistant",
    analytics: "Analytics",
    reports: "Reports",
    datasetUpload: "Dataset Upload",
    downloads: "Downloads",
    founder: "Founder",
    contactUs: "Contact Us",
    adminPanel: "Admin Panel",
    login: "Login",
    register: "Register",
    logout: "Logout",
    
    // Header & Hero
    tagline: "Predict Today, Protect Tomorrow",
    description: "An AI-powered multi-disease prediction and healthcare analytics platform designed to empower doctors, patients, and healthcare administrators.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Settings
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    
    // Auth roles
    admin: "Admin",
    doctor: "Doctor",
    patient: "Patient",
    
    // Disease labels
    kidney: "Kidney Disease",
    diabetes: "Diabetes",
    heart: "Heart Disease",
    liver: "Liver Disease",
    parkinson: "Parkinson's Disease",
    lungCancer: "Lung Cancer",
    stroke: "Stroke Prediction",
  },
  ta: {
    // Navigation
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    prediction: "நோய் கணிப்பு",
    aiAssistant: "AI உதவியாளர்",
    analytics: "பகுப்பாய்வு",
    reports: "அறிக்கைகள்",
    datasetUpload: "தரவுத்தொகுப்பு பதிவேற்றம்",
    downloads: "பதிவிறக்கம்",
    founder: "நிறுவனர்",
    contactUs: "தொடர்பு கொள்ள",
    adminPanel: "நிர்வாக குழு",
    login: "உள்நுழை",
    register: "பதிவு செய்",
    logout: "வெளியேறு",
    
    // Header & Hero
    tagline: "இன்று கணிப்போம், நாளை காப்போம்",
    description: "மருத்துவர்கள், நோயாளிகள் மற்றும் சுகாதார நிர்வாகிகளுக்கு அதிகாரம் அளிப்பதற்காக வடிவமைக்கப்பட்ட AI-இயங்கும் பல நோய் கணிப்பு மற்றும் சுகாதார பகுப்பாய்வு தளம்.",
    getStarted: "தொடங்குங்கள்",
    learnMore: "மேலும் அறிய",
    
    // Settings
    darkMode: "இருண்ட பயன்முறை",
    lightMode: "ஒளி பயன்முறை",
    language: "மொழி",
    
    // Auth roles
    admin: "நிர்வாகி",
    doctor: "மருத்துவர்",
    patient: "நோயாளி",
    
    // Disease labels
    kidney: "சிறுநீரக நோய்",
    diabetes: "நீரிழிவு நோய்",
    heart: "இருதய நோய்",
    liver: "கல்லீரல் நோய்",
    parkinson: "பார்கின்சன் நோய்",
    lungCancer: "நுரையீரல் புற்றுநோய்",
    stroke: "பக்கவாதம் கணிப்பு",
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
