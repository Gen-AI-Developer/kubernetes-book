import React from 'react';
import { useLocation } from '@docusaurus/router';
import StarryBackground from './StarryBackground';

// Wrapper component that provides router context to StarryBackground
const StarryBackgroundWrapper = () => {
  const location = useLocation();
  return <StarryBackground location={location} />;
};

export default StarryBackgroundWrapper;