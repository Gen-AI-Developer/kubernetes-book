import React, { useEffect, useState } from 'react';

const UserProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState('');

  // Initialize from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('k8s-textbook-progress');
    const savedChapter = localStorage.getItem('k8s-textbook-current-chapter');
    
    if (savedProgress) {
      setProgress(parseInt(savedProgress, 10));
    }
    
    if (savedChapter) {
      setCurrentChapter(savedChapter);
    }
  }, []);

  // Update progress when chapter changes
  useEffect(() => {
    const updateProgress = () => {
      // Calculate progress based on current chapter
      const chapters = [
        'intro',
        'chapter1-history', 
        'chapter2-what-why',
        'chapter3-setup',
        'chapter4-concepts',
        'chapter5-deploy',
        'chapter6-best-practices'
      ];
      
      const chapterIndex = chapters.indexOf(currentChapter);
      const calculatedProgress = chapterIndex >= 0 ? 
        Math.round(((chapterIndex + 1) / chapters.length) * 100) : 
        progress;
      
      setProgress(calculatedProgress);
      
      // Save to localStorage
      localStorage.setItem('k8s-textbook-progress', calculatedProgress.toString());
      localStorage.setItem('k8s-textbook-current-chapter', currentChapter);
    };
    
    updateProgress();
  }, [currentChapter]);

  const updateCurrentChapter = (chapterId) => {
    setCurrentChapter(chapterId);
  };

  return {
    progress,
    currentChapter,
    updateCurrentChapter
  };
};

export default UserProgressTracker;