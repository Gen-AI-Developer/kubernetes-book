import React from 'react';
import StarryThemeProvider from '../components/StarryThemeProvider';

// Root component that wraps the entire application
const Root = ({ children }) => {
  return <StarryThemeProvider>{children}</StarryThemeProvider>;
};

export default Root;