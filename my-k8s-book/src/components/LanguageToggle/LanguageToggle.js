import React, { createContext, useContext, useState } from 'react';

// Create context for language management
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default to English

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Optionally store user preference in localStorage
    localStorage.setItem('preferred-language', lang);
  };

  // Check for user preference on initial load
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language toggle component
export const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ur' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <div className="language-toggle">
      <button
        onClick={toggleLanguage}
        className="button button--secondary"
        aria-label={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
      >
        {language === 'en' ? 'اُردو' : 'English'}
      </button>
      <span style={{ marginLeft: '10px' }}>
        Current: {language === 'en' ? 'English' : 'Urdu'}
      </span>
    </div>
  );
};