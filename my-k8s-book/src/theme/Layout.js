import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import StarryThemeProvider from '../components/StarryThemeProvider';

// Custom layout that wraps the original layout with the starry theme
const Layout = (props) => {
  return (
    <StarryThemeProvider>
      <div style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <main style={{ flex: 1, position: 'relative', zIndex: 5 }}>
          <OriginalLayout {...props}>{props.children}</OriginalLayout>
        </main>
      </div>
    </StarryThemeProvider>
  );
};

export default Layout;