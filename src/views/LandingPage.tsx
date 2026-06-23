import { useMemo, useEffect } from 'react';
import SponsorHeader from '../components/SponsorHeader';
import Header from '../components/Header';
import CanvasContainer from '../components/CanvasContainer';
import VideoCard from '../components/VideoCard';
import FocalText from '../components/FocalText';
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
const VIDEO_SCALE = 0.7; // Multiplier to scale the videos (0.957 gives the current ~359x638)

const VIDEO_WIDTH = Math.round(VIDEO_BASE_WIDTH * VIDEO_SCALE);
const VIDEO_HEIGHT = Math.round(VIDEO_BASE_HEIGHT * VIDEO_SCALE);

// --- Main Base Image Sizing (Figma dimensions) ---
const MAIN_IMAGE_BASE_WIDTH = 1649;
const MAIN_IMAGE_BASE_HEIGHT = 2104;
const MAIN_IMAGE_SCALE = 0.45; // Multiplier to scale the image (0.7 gives the current 1154x1473)

const MAIN_IMAGE_WIDTH = Math.round(MAIN_IMAGE_BASE_WIDTH * MAIN_IMAGE_SCALE);
const MAIN_IMAGE_HEIGHT = Math.round(MAIN_IMAGE_BASE_HEIGHT * MAIN_IMAGE_SCALE);

// --- Predefined (Fixed) Videos on the Initial Landing Page ---
// The initial screen viewport is at X: 2505 to 4425 and Y: 1198 to 2398.
// We place three videos peeking on the edges to signal scrollability/dragging to the user.
const FIXED_VIDEOS_CONFIG = [
  { left: 2300, top: 1250, sourceIndex: 0 }, // Peeking on the left edge
    { left: 3200, top: 1450, sourceIndex: 1 }, // Peeking on the right mid
  { left: 2900, top: 1950, sourceIndex: 2 }, // Peeking on the bottom mid
  { left: 3700, top: 1800, sourceIndex: 3 }, // Peeking on the right mid
];

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
  // Listen to hash changes to smooth-scroll when navigating to "about" page/section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const viewport = document.querySelector('.canvas-viewport');
      if (!viewport) return;

      if (hash === '#about' || hash === '' || hash === '#') {
        viewport.scrollTo({
          left: INITIAL_SCROLL_X,
          top: INITIAL_SCROLL_Y,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Smooth scroll on initial mount if hash matches #about or is empty
    const hash = window.location.hash;
    if (hash === '#about' || hash === '' || hash === '#') {
      const timer = setTimeout(() => {
        const viewport = document.querySelector('.canvas-viewport');
        if (viewport) {
          viewport.scrollTo({
            left: INITIAL_SCROLL_X,
            top: INITIAL_SCROLL_Y,
          });
        }
      }, 50);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Memoize random video positions so they don't change on re-renders
  const spawnedVideos = useMemo(() => {
    const { totalSpawnCount, videoSources } = videoConfig;
    
    // Shuffle the video sources to get random videos for both fixed and random spots
    const shuffledSources = [...videoSources].sort(() => Math.random() - 0.5);
    
    // Start with the fixed videos
    const videos: Array<{ id: number | string; src: string; poster: string; left: number; top: number }> = FIXED_VIDEOS_CONFIG.map((fv, index) => {
      const item = shuffledSources[index % shuffledSources.length];
      return {
        id: `fixed-${index}`,
        src: item.video,
        poster: item.poster,
        left: fv.left,
        top: fv.top,
      };
    });
    
    // Video dimensions (portrait)
    const w = VIDEO_WIDTH;
    const h = VIDEO_HEIGHT;
    const maxLeft = CANVAS_WIDTH - w;
    const maxTop = CANVAS_HEIGHT - h;

    // Remaining count to spawn randomly
    const randomSpawnCount = Math.max(0, totalSpawnCount - FIXED_VIDEOS_CONFIG.length);

    for (let i = 0; i < randomSpawnCount; i++) {
      // Pick a source cycling through the remaining shuffled sources
      const item = shuffledSources[(i + FIXED_VIDEOS_CONFIG.length) % shuffledSources.length];
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
        // to keep the initial viewport clear and tidy (except for the fixed videos we placed ourselves)
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
      videos.push({ id: `random-${i}`, src: item.video, poster: item.poster, left, top });
    }
    return videos;
  }, [videoConfig.totalSpawnCount]); // Recalculate if the configuration spawn count changes

  return (
    <div className="landing-page">
      <SponsorHeader />
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
            poster={video.poster}
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
            top: '1330px',
            width: `${MAIN_IMAGE_WIDTH}px`,
            height: `${MAIN_IMAGE_HEIGHT}px`
          }}
        >
          <img src="/assets/main-base.png" alt="קפיטליזם זו לא מילה גסה" className="focal-img" />
        </div>

        {/* Date, Time and Place text components based on Figma coordinates (shifted by +1500px horizontally) */}
        <div className="focal-element date-time-container" style={{ left: '3312px', top: '2113px' }}>
          {/* Date Text */}
          <FocalText className="focal-text-date" text="09.07.26" />

          {/* Time Text */}
          <FocalText className="focal-text-time" text="10:00-20:00" />

          {/* Place Text */}
          <FocalText className="focal-text-place" text="ביג פאשן גלילות" />
        </div>

      </CanvasContainer>
    </div>
  );
}
