// src/YoutubeAPI.js
// ---------- DO NOT RENAME THIS FILE ----------

const API_KEY = "AIzaSyDSIFbUphG08rqzc7mlWe_fiDVcpvsAk2E"; // <-- replace exactly
const CHANNEL_ID = "UCknPQ1aaPOTUCuy6wb2ufJQ"; // <-- replace exactly
const MAX_RESULTS = 25; // ask for more, we’ll slice later

export default async function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || "YouTube API error");
  }

  if (!data.items) return [];

  // Only video IDs
  const videoIds = data.items
    .map((item) => item.id?.videoId)
    .filter(Boolean)
    .join(",");
  if (!videoIds) return [];

  // Get details (duration + thumbnails)
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  if (!detailsData.items) return [];

  // Filter Shorts + improve thumbnail quality
  const shortsFree = detailsData.items.filter((vid) => {
    const title = vid.snippet?.title?.toLowerCase() || "";
    const description = vid.snippet?.description?.toLowerCase() || "";

    // Rule 1: title/description check
    if (title.includes("#shorts") || description.includes("#shorts")) return false;

    // Rule 2: duration check
    const dur = vid.contentDetails?.duration || "";
    const seconds = isoDurationToSeconds(dur);
    if (seconds > 0 && seconds <= 65) return false;

    // Rule 3: aspect ratio check
    const thumb = getBestThumb(vid.snippet?.thumbnails);
    if (thumb && thumb.height > thumb.width) return false;

    return true;
  });

  // Only keep latest 9
  return shortsFree.slice(0, 15).map((vid) => ({
    ...vid,
    bestThumbnail: getBestThumb(vid.snippet?.thumbnails),
  }));
}

// Helper: pick best available thumbnail
function getBestThumb(thumbnails) {
  return (
    thumbnails?.maxres ||
    thumbnails?.standard ||
    thumbnails?.high ||
    thumbnails?.medium ||
    thumbnails?.default ||
    null
  );
}

// Helper: Convert ISO 8601 duration
function isoDurationToSeconds(iso) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, h, m, s] = iso.match(regex) || [];
  return (
    (parseInt(h || 0) * 3600) +
    (parseInt(m || 0) * 60) +
    parseInt(s || 0)
  );
}
