// src/components/YoutubeSection.js
import React, { useEffect, useState } from "react";
import fetchVideos from "../YoutubeAPI";
import "./YoutubeSection.css"; // 👈 make sure this file exists

export default function YouTubeSection() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos().then((data) => {
      // normalize id
      const fixed = data.map((video) => ({
        ...video,
        videoId: video.id.videoId || video.id,
      }));
      setVideos(fixed);
    });
  }, []);

  return (
    <section className="youtube-section">
      <h2>YouTube Videos</h2>
      <div className="video-grid">
        {videos.map((video, idx) => (
          <div key={idx} className="video-item">
            {video.title ? (
              <>
                <iframe
                  loading="lazy"
                  src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>

                <h3>{video.title}</h3>
              </>
            ) : (
              <p>Video unavailable</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
