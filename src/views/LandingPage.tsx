import { useMemo } from 'react';
import Header from '../components/Header';
import CanvasContainer from '../components/CanvasContainer';
import VideoCard from '../components/VideoCard';
import videoConfig from '../config/videos.json';

// In Figma, the main viewport starts around this offset
const INITIAL_SCROLL_X = 1005;
const INITIAL_SCROLL_Y = 1198;
const CANVAS_WIDTH = 5000;
const CANVAS_HEIGHT = 5000;

export default function LandingPage() {
  
  // Memoize random video positions so they don't change on re-renders
  const spawnedVideos = useMemo(() => {
    const videos = [];
    const { totalSpawnCount, videoSources } = videoConfig;
    
    for (let i = 0; i < totalSpawnCount; i++) {
      // Pick a source (looping if count > available sources)
      const src = videoSources[i % videoSources.length];
      
      // Generate random coordinates (ensure they stay within the canvas bounds)
      // Video size is ~359x638
      const maxLeft = CANVAS_WIDTH - 360;
      const maxTop = CANVAS_HEIGHT - 640;
      const left = Math.floor(Math.random() * maxLeft);
      const top = Math.floor(Math.random() * maxTop);
      
      videos.push({ id: i, src, left, top });
    }
    return videos;
  }, []);

  return (
    <div className="landing-page">
      <Header />
      
      <CanvasContainer 
        canvasWidth={CANVAS_WIDTH} 
        canvasHeight={CANVAS_HEIGHT}
        initialScrollX={INITIAL_SCROLL_X}
        initialScrollY={INITIAL_SCROLL_Y}
      >
        {/* Background Layer (Z-Index: 1) - Random Videos */}
        {spawnedVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            src={video.src} 
            style={{ 
              position: 'absolute', 
              left: `${video.left}px`, 
              top: `${video.top}px`,
              zIndex: 1
            }} 
          />
        ))}

        {/* Middleground Layer (Z-Index: 2) - Focal Images */}
        {/* Main Base Image based on Figma coordinates */}
        <div className="focal-element main-base-image" style={{ left: '1037px', top: '1217px' }}>
          <img src="/assets/main-base.png" alt="קפיטליזם זו לא מילה גסה" className="focal-img" />
        </div>

        {/* Date and Time Images based on Figma coordinates */}
        <div className="focal-element date-time-container" style={{ left: '2144px', top: '2497px' }}>
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
