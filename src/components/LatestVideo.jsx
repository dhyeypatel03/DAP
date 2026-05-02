import { motion } from 'framer-motion';
import './LatestVideo.css';

const LatestVideo = () => {
    // Your latest video details - update with your actual video
    const latestVideo = {
        id: 'b0HSadL18Xc',
        title: 'I Thought I Knew India… Then I Saw Sikkim & Darjeeling.',
        description: 'Join me on an incredible journey through the breathtaking landscapes of Sikkim and Darjeeling. Experience the beauty, culture, and adventure!',
        thumbnail: `https://img.youtube.com/vi/b0HSadL18Xc/maxresdefault.jpg`,
        youtubeUrl: 'https://www.youtube.com/watch?v=b0HSadL18Xc',

    };

    return (
        <motion.section
            className="latest-video-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="latest-video-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h2>Latest Video</h2>
                    <p>Watch my newest adventure</p>
                </motion.div>

                <motion.div
                    className="video-showcase"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="video-wrapper">
                        <iframe
                            src={`https://www.youtube.com/embed/${latestVideo.id}?rel=0&modestbranding=1`}
                            title={latestVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-iframe"
                        ></iframe>
                    </div>

                    <div className="video-info">
                        <h3>{latestVideo.title}</h3>
                        <p className="video-description">{latestVideo.description}</p>

                        <div className="video-meta">
                            {/* <span className="views">{latestVideo.views} views</span> */}
                            {/* <span className="separator">•</span> */}
                            <span className="date">{latestVideo.uploadDate}</span>
                        </div>

                        <a
                            href={latestVideo.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="watch-youtube-btn"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            Watch on YouTube
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default LatestVideo;