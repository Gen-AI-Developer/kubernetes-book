import React, { useEffect } from 'react';
import './../css/starry-background.css';

const StarryBackground = ({ location }) => {
  const isDocsOrBlog = location && (location.pathname.includes('/docs/') || location.pathname.includes('/blog/'));

  useEffect(() => {
    const starsContainer = document.querySelector('.stars');
    const cometsContainer = document.querySelector('.starry-background');

    // Create stars
    const createStars = () => {
      // Clear existing stars
      if (starsContainer) {
        while (starsContainer.firstChild) {
          starsContainer.removeChild(starsContainer.firstChild);
        }
      }

      // Create new stars
      const starCount = 200; // Number of stars to create
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const sizes = ['small', 'medium', 'large'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(size);

        // Random animation duration
        const duration = 2 + Math.random() * 5;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);

        // Random delay for twinkling
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;

        if (starsContainer) {
          starsContainer.appendChild(star);
        }
      }
    };

    // Create comets
    const createComets = () => {
      // Clear existing comets
      const existingComets = cometsContainer?.querySelectorAll('.comet');
      existingComets?.forEach(comet => comet.remove());

      // Create new comets
      const cometCount = 5; // Number of comets to create
      for (let i = 0; i < cometCount; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');

        // Random starting position (edges of the screen)
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY, endX, endY;

        switch (side) {
          case 0: // top
            startX = Math.random() * 100;
            startY = 0;
            endX = startX + (Math.random() - 0.5) * 100; // Move in a random direction
            endY = 100;
            break;
          case 1: // right
            startX = 100;
            startY = Math.random() * 100;
            endX = 0;
            endY = startY + (Math.random() - 0.5) * 100;
            break;
          case 2: // bottom
            startX = Math.random() * 100;
            startY = 100;
            endX = startX + (Math.random() - 0.5) * 100;
            endY = 0;
            break;
          case 3: // left
            startX = 0;
            startY = Math.random() * 100;
            endX = 100;
            endY = startY + (Math.random() - 0.5) * 100;
            break;
          default:
            startX = 0;
            startY = 0;
            endX = 100;
            endY = 100;
        }

        // Random animation duration
        const duration = 5 + Math.random() * 10;

        comet.style.left = `${startX}%`;
        comet.style.top = `${startY}%`;
        comet.style.setProperty('--start-x', `${startX}%`);
        comet.style.setProperty('--start-y', `${startY}%`);
        comet.style.setProperty('--end-x', `${endX}%`);
        comet.style.setProperty('--end-y', `${endY}%`);
        comet.style.setProperty('--duration', `${duration}s`);

        // Random delay for shooting
        const delay = Math.random() * 10;
        comet.style.animationDelay = `${delay}s`;

        if (cometsContainer) {
          cometsContainer.appendChild(comet);
        }
      }
    };

    // Create stars and comets on initial load
    createStars();
    createComets();

    // Recreate comets periodically to keep them moving
    const cometInterval = setInterval(createComets, 10000); // Every 10 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(cometInterval);
    };
  }, []);

  return (
    <div className={`starry-background ${isDocsOrBlog ? 'blurred-background' : ''}`}>
      <div className="milkyway-background"></div>
      <div className="milkyway-arms"></div>
      <div className="stars"></div>
    </div>
  );
};

export default StarryBackground;