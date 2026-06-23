import { useMemo } from 'react';
import Header from '../components/Header';
import CanvasContainer from '../components/CanvasContainer';
import VideoCard from '../components/VideoCard';
import videoConfig from '../config/videos.json';

// In Figma, the main viewport starts around this offset
// We shifted the X offset by +1500px to expand scrollable space on the left side.
const INITIAL_SCROLL_X = 2505; // 1005 + 1500
const INITIAL_SCROLL_Y = 1198;
const CANVAS_WIDTH = 6500; // 5000 + 1500
const CANVAS_HEIGHT = 5000;

// ====================================================
// SIZING CONFIGURATIONS & MULTIPLIERS
// ====================================================

// --- Video Sizing (Based on iPhone SE viewport) ---
const VIDEO_BASE_WIDTH = 375;
const VIDEO_BASE_HEIGHT = 667;
const VIDEO_SCALE = 0.957; // Multiplier to scale the videos (0.957 gives the current ~359x638)

const VIDEO_WIDTH = Math.round(VIDEO_BASE_WIDTH * VIDEO_SCALE);
const VIDEO_HEIGHT = Math.round(VIDEO_BASE_HEIGHT * VIDEO_SCALE);

// --- Main Base Image Sizing (Figma dimensions) ---
const MAIN_IMAGE_BASE_WIDTH = 1649;
const MAIN_IMAGE_BASE_HEIGHT = 2104;
const MAIN_IMAGE_SCALE = 0.7; // Multiplier to scale the image (0.7 gives the current 1154x1473)

const MAIN_IMAGE_WIDTH = Math.round(MAIN_IMAGE_BASE_WIDTH * MAIN_IMAGE_SCALE);
const MAIN_IMAGE_HEIGHT = Math.round(MAIN_IMAGE_BASE_HEIGHT * MAIN_IMAGE_SCALE);

// Helper to check if two video rectangles overlap (with safety padding)
const doesOverlap = (
  x1: number, y1: number, w1: number, h1: number,
  x2: number, y2: number, w2: number, h2: number,
  padding = 75 // Padding in pixels to prevent crowding
) => {
  return !(
    x1 + w1 + padding < x2 ||
    x2 + w2 + padding < x1 ||
    y1 + h1 + padding < y2 ||
    y2 + h2 + padding < y1
  );
};

export default function LandingPage() {
  
  // Memoize random video positions so they don't change on re-renders
  const spawnedVideos = useMemo(() => {
    const { totalSpawnCount, videoSources } = videoConfig;
    const videos: Array<{ id: number; src: string; left: number; top: number }> = [];
    
    // Video dimensions (portrait)
    const w = VIDEO_WIDTH;
    const h = VIDEO_HEIGHT;
    const maxLeft = CANVAS_WIDTH - w;
    const maxTop = CANVAS_HEIGHT - h;

    for (let i = 0; i < totalSpawnCount; i++) {
      const src = videoSources[i % videoSources.length];
      let left = 0;
      let top = 0;
      let attempts = 0;
      let valid = false;

      // Keep attempting random positions until a non-overlapping one is found
      while (!valid && attempts < 200) {
        left = Math.floor(Math.random() * maxLeft);
        top = Math.floor(Math.random() * maxTop);
        attempts++;

        let overlap = false;
        for (const other of videos) {
          if (doesOverlap(left, top, w, h, other.left, other.top, w, h, 80)) {
            overlap = true;
            break;
          }
        }

        // Avoid spawning directly on top of the initial landing screen area
        // to keep the initial viewport clear and tidy
        const landingAreaOverlap = doesOverlap(
          left, top, w, h, 
          INITIAL_SCROLL_X, INITIAL_SCROLL_Y, 1920, 1200, 
          0
        );

        if (!overlap && !landingAreaOverlap) {
          valid = true;
        }
      }

      // If we failed to find an empty spot after 200 attempts, place it anyway to prevent infinite loops
      videos.push({ id: i, src, left, top });
    }
    return videos;
  }, [videoConfig.totalSpawnCount]); // Recalculate if the configuration spawn count changes

  return (
    <div className="landing-page">
      <Header />
      
      <CanvasContainer 
        canvasWidth={CANVAS_WIDTH} 
        canvasHeight={CANVAS_HEIGHT}
        initialScrollX={INITIAL_SCROLL_X}
        initialScrollY={INITIAL_SCROLL_Y}
      >
        {/* Background/Foreground Layer - Random Videos */}
        {spawnedVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            src={video.src} 
            style={{ 
              position: 'absolute', 
              left: `${video.left}px`, 
              top: `${video.top}px`,
              width: `${VIDEO_WIDTH}px`,
              height: `${VIDEO_HEIGHT}px`
            }} 
          />
        ))}

        {/* Middleground Layer - Focal Images */}
        {/* Main Base Image based on Figma coordinates (shifted by +1500px horizontally) */}
        <div 
          className="focal-element main-base-image" 
          style={{ 
            left: '2537px', 
            top: '1217px',
            width: `${MAIN_IMAGE_WIDTH}px`,
            height: `${MAIN_IMAGE_HEIGHT}px`
          }}
        >
          <img src="/assets/main-base.png" alt="קפיטליזם זו לא מילה גסה" className="focal-img" />
        </div>

        {/* Date and Time Images based on Figma coordinates (Scaled to 0.7x position and shifted by +1500px horizontally) */}
        <div className="focal-element date-time-container" style={{ left: '3312px', top: '2113px' }}>
          {/* Date Image */}
          <div className="date-image-wrapper">
            <img src="/assets/date.png" alt="יום חמישי 09.07.26" className="focal-img" />
          </div>

          {/* Time Image with orange background rectangle */}
          <div className="time-image-wrapper">
            <img src="/assets/time.png" alt="10:00-20:00" className="time-img" />
          </div>

          {/* Place Image with black border */}
          <div className="place-image-wrapper">
            <img src="/assets/place.png" alt="ביג פאשן גלילות" className="focal-img" />
          </div>
        </div>

      </CanvasContainer>
    </div>
  );
}
