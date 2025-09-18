import React, { useState, useEffect, useRef } from 'react';
import './CinematicGallery.css';

const CinematicGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const intervalRef = useRef(null);
  const thumbnailRef = useRef(null);

  const images = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    src: `${process.env.PUBLIC_URL}/images/${i + 1}.jpg`,
    alt: `Travel memory ${i + 1}`
  }));

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % images.length;
          // Auto-scroll thumbnails to keep active one visible
          if (thumbnailRef.current) {
            const thumbnailWidth = 140; // thumbnail width + gap
            const containerWidth = thumbnailRef.current.clientWidth;
            const scrollPosition = nextIndex * thumbnailWidth - containerWidth / 2;
            thumbnailRef.current.scrollTo({ left: Math.max(0, scrollPosition), behavior: 'smooth' });
          }
          return nextIndex;
        });
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 2000);
  };

  const [modalIndex, setModalIndex] = useState(0);



  const nextImage = () => {
    const nextIdx = (modalIndex + 1) % images.length;
    setModalIndex(nextIdx);
    setSelectedImage(images[nextIdx]);
  };

  const prevImage = () => {
    const prevIdx = (modalIndex - 1 + images.length) % images.length;
    setModalIndex(prevIdx);
    setSelectedImage(images[prevIdx]);
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    const handleWheel = (e) => {
      if (!selectedImage) return;
      e.preventDefault();
      
      if (e.deltaY > 0) {
        nextImage();
      } else {
        prevImage();
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [selectedImage, modalIndex, nextImage, prevImage]);

  const closeFullscreen = () => {
    setSelectedImage(null);
    setIsPlaying(true);
    document.body.style.overflow = '';
  };

  return (
    <div className="cinematic-gallery">
      <div className="main-showcase">
        <div className="hero-image-container">
          {images.map((image, index) => (
            <img 
              key={image.id}
              src={image.src} 
              alt={image.alt}
              className={`hero-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
          <div className="image-overlay">
            <div className="image-info">
              <span className="image-counter">{currentIndex + 1} / {images.length}</span>
              <h3>Travel Memory</h3>
              <p>Enjoy the slideshow</p>
            </div>
          </div>
        </div>
        
        <div className="controls">
          <button 
            className={`play-pause ${isPlaying ? 'playing' : 'paused'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div className="thumbnail-container">
        <button 
          className="slider-btn prev" 
          onClick={() => {
            const newPos = Math.max(0, scrollPosition - 300);
            setScrollPosition(newPos);
            thumbnailRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
          }}
        >
          ‹
        </button>
        
        <div className="thumbnail-strip" ref={thumbnailRef}>
          {images.map((image, index) => (
            <div 
              key={image.id}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img src={image.src} alt={image.alt} />
              <div className="thumbnail-overlay"></div>
            </div>
          ))}
        </div>
        
        <button 
          className="slider-btn next" 
          onClick={() => {
            const maxScroll = thumbnailRef.current.scrollWidth - thumbnailRef.current.clientWidth;
            const newPos = Math.min(maxScroll, scrollPosition + 300);
            setScrollPosition(newPos);
            thumbnailRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
          }}
        >
          ›
        </button>
      </div>

      {selectedImage && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeFullscreen}>×</button>
            <button className="nav-btn prev-btn" onClick={prevImage}>‹</button>
            <button className="nav-btn next-btn" onClick={nextImage}>›</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="modal-info">
              <h3>{selectedImage.alt}</h3>
              <p>Scroll or use arrows to navigate • {modalIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinematicGallery;