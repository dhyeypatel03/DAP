// src/components/YoutubeSection.js
import React, { useEffect, useState } from "react";
import "./YoutubeSection.css"; // Link to the updated CSS file
import fetchVideos from "../YoutubeAPI"; // Import fetchVideos for your actual API call

export default function YouTubeSection() {
  const [videos, setVideos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialVideoCount, setInitialVideoCount] = useState(6);

  // This effect runs once to fetch videos
  useEffect(() => {
    
    
    // Your actual API call would look like this:
    fetchVideos().then((data) => {
      const fixed = data.map((video) => ({
        ...video,
        videoId: video.id.videoId || video.id,
      }));
      setVideos(fixed);
    });
    
  }, []);

  // This effect sets the initial video count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setInitialVideoCount(5); // Mobile
      } else {
        setInitialVideoCount(6); // Desktop
      }
    };
    
    handleResize(); // Set the initial count on load
    window.addEventListener('resize', handleResize); // Adjust on resize
    
    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="youtube-section">
      <h2>Watch Our Latest Videos</h2>
      <div className="video-grid">
        {videos.map((video, idx) => {
          const isHidden = idx >= initialVideoCount && !isExpanded;
          const isPreview = idx >= initialVideoCount && idx < initialVideoCount + 3 && !isExpanded;
          
          return (
            <div
              key={video.videoId || idx}
              className={`video-item ${
                isHidden && !isPreview ? 'hidden' : ''
              } ${isPreview ? 'preview' : ''}`}
            >
              {video.title ? (
                <>
                  <iframe
                    loading="lazy"
                    src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h3>{video.title}</h3>
                </>
              ) : (
                <p>Video unavailable</p>
              )}
            </div>
          );
        })}
      </div>

      {/* The arrow only renders if there are more videos to show */}
      {videos.length > initialVideoCount && (
        <div 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="show-more-arrow"
          title={isExpanded ? "Show Less" : "Show More"}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      )}
    </section>
  );
}