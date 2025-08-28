
// src/YouTubeAPI.js
// FINAL VERSION - frontend reads cached videos.json only
// No API key or channel ID here.



export default async function fetchVideos() {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/videos.json`) // served from public/
    if (!response.ok) throw new Error("Failed to load videos.json");

    const data = await response.json();
return data.items
  .slice(0, 12)   // <-- limit to 6 videos
  .map((video) => ({
    id: video.id,
    title: video.snippet.title,
    thumbnail: video.bestThumbnail?.url || video.snippet.thumbnails.high.url,
  }));

  } catch (err) {
    console.error("Error loading cached videos:", err);
    return [];
  }
}
