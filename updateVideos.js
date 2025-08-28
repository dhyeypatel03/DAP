// updateVideos.js
// Node 18+ recommended (uses global fetch). Run with:
// node updateVideos.js   (after setting .env)

import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCknPQ1aaPOTUCuy6wb2ufJQ";
const MAX_RESULTS =25; // change if you want fewer

if (!API_KEY || !CHANNEL_ID) {
  console.error("❌ Missing env vars: set YOUTUBE_API_KEY and CHANNEL_ID");
  process.exit(1);
}

const BASE = "https://www.googleapis.com/youtube/v3";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function getUploadsPlaylistId() {
  const url = `${BASE}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`;
  const data = await fetchJson(url);
  const uploads = data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error("Cannot find uploads playlist for channel");
  return uploads;
}

async function getPlaylistItems(playlistId, max = MAX_RESULTS) {
  let items = [];
  let pageToken = "";
  while (items.length < max) {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId,
      maxResults: "50",
      key: API_KEY,
    });
    if (pageToken) params.set("pageToken", pageToken);
    const url = `${BASE}/playlistItems?${params.toString()}`;
    const data = await fetchJson(url);
    items = items.concat(data.items || []);
    pageToken = data.nextPageToken || "";
    if (!pageToken) break;
  }
  return items.slice(0, max);
}

function isoToSeconds(iso = "") {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  const h = parseInt(m[1] || 0, 10);
  const mm = parseInt(m[2] || 0, 10);
  const s = parseInt(m[3] || 0, 10);
  return h * 3600 + mm * 60 + s;
}

async function getVideoDetails(videoIds) {
  if (videoIds.length === 0) return [];
  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    id: videoIds.join(","),
    maxResults: "50",
    key: API_KEY,
  });
  const url = `${BASE}/videos?${params.toString()}`;
  const data = await fetchJson(url);
  return (data.items || []).map((v) => {
    const thumbs = v.snippet?.thumbnails || {};
    const bestThumb =
      thumbs.maxres || thumbs.standard || thumbs.high || thumbs.medium || thumbs.default || null;
    return {
      id: v.id, // videoId (keeps your UI unchanged)
      snippet: v.snippet,
      contentDetails: v.contentDetails || { duration: "" },
      bestThumbnail: bestThumb,
      _seconds: isoToSeconds(v.contentDetails?.duration || ""),
    };
  });
}

(async function run() {
  try {
    console.log("Fetching uploads playlist id...");
    const uploadsId = await getUploadsPlaylistId();

    console.log("Fetching playlist items...");
    const playlistItems = await getPlaylistItems(uploadsId, MAX_RESULTS);

    const videoIds = playlistItems
      .map((it) => it?.snippet?.resourceId?.videoId)
      .filter(Boolean);

    console.log(`Found ${videoIds.length} video IDs; fetching details...`);
    const details = await getVideoDetails(videoIds);

    // Filter shorts / vertical thumbs
    const filtered = details.filter((vid) => {
      const title = (vid.snippet?.title || "").toLowerCase();
      const desc = (vid.snippet?.description || "").toLowerCase();
      if (title.includes("#shorts") || desc.includes("#shorts")) return false;
      if (vid._seconds > 0 && vid._seconds <= 65) return false;
      const t = vid.bestThumbnail;
      if (t && t.height > t.width) return false;
      return true;
    });

    const payload = {
      updatedAt: new Date().toISOString(),
      items: filtered.slice(0, MAX_RESULTS),
    };

    const outPath = path.join(__dirname, "public", "videos.json");
    await fs.writeFile(outPath, JSON.stringify(payload, null, 2), "utf8");
    console.log(`✅ public/videos.json written: ${payload.items.length} items, updatedAt=${payload.updatedAt}`);
  } catch (err) {
    console.error("❌ updateVideos failed:", err);
    process.exit(1);
  }
})();
