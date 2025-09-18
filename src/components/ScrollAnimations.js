import { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Add fade-in-section class to all major sections
    const sections = [
      '#about',
      '#gallery', 
      '#videos',
      '#projects',
      '.app-container',
      '.sanskrit-section'
    ];

    sections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add('fade-in-section');
        observer.observe(element);
      }
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return null;
};

export default ScrollAnimations;