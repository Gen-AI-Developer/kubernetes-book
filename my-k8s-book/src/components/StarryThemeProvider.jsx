import React from 'react';
import StarryBackgroundWrapper from './StarryBackgroundWrapper';

// Theme provider that adds the starry background to the entire site
const StarryThemeProvider = ({ children }) => {
  return (
    <>
      <StarryBackgroundWrapper />
      {children}
    </>
  );
};

export default StarryThemeProvider;