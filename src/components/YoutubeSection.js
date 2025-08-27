// src/components/YouTubeSection.js
import React, { useEffect, useState } from "react";
import fetchVideos from "../YoutubeAPI";

export default function YouTubeSection() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos().then((res) => setVideos(res.slice(0, 15))); // limit to 9
  }, []);

  return (
    <section className="youtube-section">
      <h2 className="yt-title">Latest Videos</h2>
      <div className="yt-grid">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-card"
          >
            <img
              src={video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.high?.url}
              alt={video.snippet?.title}
              className="yt-thumb"
            />
            <p className="yt-caption">{video.snippet?.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}