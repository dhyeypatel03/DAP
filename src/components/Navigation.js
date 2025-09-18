import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navStyle = {
    '--scroll-progress': scrollProgress
  };

  return (
    <nav className="nav" style={navStyle}>
      <button onClick={() => scrollTo('hero')}>Home</button>
      <button onClick={() => scrollTo('about')}>About</button>
      <button onClick={() => scrollTo('gallery')}>Gallery</button>
      <button onClick={() => scrollTo('videos')}>Videos</button>
      <button onClick={() => scrollTo('projects')}>Projects</button>
    </nav>
  );
};

export default Navigation;