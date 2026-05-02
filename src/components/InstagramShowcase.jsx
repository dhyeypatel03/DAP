import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InstagramShowcase.css';

const InstagramShowcase = () => {

  const [hoveredPost, setHoveredPost] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef({});

  // Detect if device is mobile - more accurate detection for PC hover
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Only consider mobile if it's actually a touch device AND small screen OR mobile user agent
      setIsMobile(isTouchDevice && (isSmallScreen || isMobileUserAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Your Instagram reels data - 8 vertical reels in 9:16 format
  const instagramPosts = [
    {
      id: 1,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/1.png`,
      video: `${process.env.PUBLIC_URL}/instagram/1.mp4`,
      likes: 234,
      comments: 12,
      caption: 'Amazing travel adventure! 🌟',
      date: '2 days ago'
    },
    {
      id: 2,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/2.png`,
      video: `${process.env.PUBLIC_URL}/instagram/2.mp4`,
      likes: 189,
      comments: 15,
      caption: 'Tech exploration journey 🚀',
      date: '5 days ago'
    },
    {
      id: 3,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/3.png`,
      video: `${process.env.PUBLIC_URL}/instagram/3.mp4`,
      likes: 312,
      comments: 18,
      caption: 'Adventure time! 🏔️',
      date: '1 week ago'
    },
    {
      id: 4,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/4.png`,
      video: `${process.env.PUBLIC_URL}/instagram/4.mp4`,
      likes: 267,
      comments: 21,
      caption: 'Creative coding session 💻',
      date: '1 week ago'
    },
    {
      id: 5,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/5.png`,
      video: `${process.env.PUBLIC_URL}/instagram/5.mp4`,
      likes: 198,
      comments: 9,
      caption: 'Peaceful moments 🌸',
      date: '2 weeks ago'
    },
    {
      id: 6,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/6.png`,
      video: `${process.env.PUBLIC_URL}/instagram/6.mp4`,
      likes: 156,
      comments: 8,
      caption: 'Beautiful sunset vibes ✨',
      date: '2 weeks ago'
    },
    {
      id: 7,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/7.png`,
      video: `${process.env.PUBLIC_URL}/instagram/7.mp4`,
      likes: 445,
      comments: 32,
      caption: 'Epic adventure moments! 🔥',
      date: '3 weeks ago'
    },
    {
      id: 8,
      type: 'reel',
      thumbnail: `${process.env.PUBLIC_URL}/instagram/8.png`,
      video: `${process.env.PUBLIC_URL}/instagram/8.mp4`,
      likes: 378,
      comments: 25,
      caption: 'Creative inspiration daily ✨',
      date: '3 weeks ago'
    }
  ];



  // Handle hover video play (desktop only)
  const handleMouseEnter = (post) => {
    if (!isMobile) {
      setHoveredPost(post.id);
      const video = videoRefs.current[post.id];
      if (video) {
        video.currentTime = 0;
        video.volume = 0.2; // Reduced audio for hover
        video.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    }
  };

  const handleMouseLeave = (post) => {
    if (!isMobile) {
      setHoveredPost(null);
      const video = videoRefs.current[post.id];
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // Stop all videos
  const stopAllVideos = () => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setHoveredPost(null);
  };

  // Handle click (mobile only - just preview, no modal)
  const handlePostClick = (post) => {
    if (isMobile) {
      // On mobile, click toggles preview (like hover on desktop)
      if (hoveredPost === post.id) {
        // If already playing, stop it
        stopAllVideos();
      } else {
        // Stop any currently playing video first
        stopAllVideos();

        // Start playing the new video
        setHoveredPost(post.id);
        const video = videoRefs.current[post.id];
        if (video) {
          video.currentTime = 0;
          video.volume = 0.3;
          video.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      }
    }
    // No click action on desktop - only hover to play
  };

  return (
    <motion.section
      className="instagram-showcase"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onClick={(e) => {
        // Stop videos when clicking outside of posts (mobile only)
        if (isMobile && e.target === e.currentTarget) {
          stopAllVideos();
        }
      }}
    >
      <div className="instagram-header">
        <motion.div
          className="instagram-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="profile-section">
            <img
              src={`${process.env.PUBLIC_URL}/instagram/me.jpg`}
              alt="Dhyey Profile"
              className="profile-pic"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="profile-info">
            <h2>@ddhhyyeeyy</h2>
            <p>Dhyey's creative journey and adventures</p>
          </div>
        </motion.div>

        <motion.a
          href="https://www.instagram.com/ddhhyyeeyy/"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Follow</span>
          <div className="follow-icon">→</div>
        </motion.a>
      </div>

      <div
        className={`instagram-grid ${hoveredPost ? 'has-playing' : ''}`}
        onClick={(e) => {
          // Stop videos when clicking in empty grid areas (mobile only)
          if (isMobile && e.target === e.currentTarget) {
            stopAllVideos();
          }
        }}
      >
        {instagramPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className={`instagram-post ${post.type} ${hoveredPost === post.id ? 'playing' : ''}`}
            initial={!isMobile ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={!isMobile ? { delay: 0.1 * index, duration: 0.6 } : { duration: 0 }}
            whileHover={!isMobile ? { y: -12, scale: 1.08 } : {}}
            onMouseEnter={() => handleMouseEnter(post)}
            onMouseLeave={() => handleMouseLeave(post)}
            onClick={(e) => {
              e.stopPropagation();
              handlePostClick(post);
            }}
          >
            <div className="post-media">
              {post.type === 'reel' ? (
                <div className="reel-container">
                  {/* Thumbnail image */}
                  <img
                    src={post.thumbnail}
                    alt={post.caption}
                    className={`thumbnail ${hoveredPost === post.id ? 'hidden' : ''}`}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SZWVsIFRodW1ibmFpbDwvdGV4dD48L3N2Zz4=';
                    }}
                  />

                  {/* Hover/Preview video */}
                  <video
                    ref={(el) => (videoRefs.current[post.id] = el)}
                    src={post.video}
                    className={`preview-video ${hoveredPost === post.id ? 'visible' : ''}`}
                    muted={false}
                    loop
                    playsInline
                    preload="metadata"
                  />





                  {/* Mobile tap indicator */}
                  {isMobile && hoveredPost !== post.id && (
                    <div className="mobile-tap-hint">
                      <span>Tap to play</span>
                    </div>
                  )}

                  {/* Mobile playing hint */}
                  {isMobile && hoveredPost === post.id && (
                    <div className="mobile-fullscreen-hint">
                      <span>Tap to stop</span>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={post.image}
                  alt={post.caption}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbnN0YWdyYW0gUGhvdG88L3RleHQ+PC9zdmc+';
                  }}
                />
              )}


            </div>
          </motion.div>
        ))}
      </div>


    </motion.section>
  );
};

export default InstagramShowcase;