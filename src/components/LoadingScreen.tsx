import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STORES = [
  { src: 'assets/sponsors/fox.png' },
  { src: 'assets/sponsors/Laline.png' },
  { src: 'assets/sponsors/NIKE.png' },
  { src: 'assets/sponsors/americanEagle.png' },
  { src: 'assets/sponsors/bilabong.png' },
  { src: 'assets/sponsors/footLocker.svg' },
  { src: 'assets/sponsors/alm.png' },
  { src: 'assets/sponsors/burgersBar.jpg' },
  { src: 'assets/sponsors/golf.png' },
  { src: 'assets/sponsors/greg.png' },
  { src: 'assets/sponsors/roladin.png' },
  { src: 'assets/sponsors/story.png' },
  { src: 'assets/sponsors/twenty.png' },
  { src: 'assets/sponsors/weShoes.png' }
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // 1. Preload key static assets in parallel
    const assetsToPreload = [
      `${baseUrl}assets/sponsors/big.png`,
      `${baseUrl}assets/main-base.png`,
      `${baseUrl}assets/burj.jpg`,
      `${baseUrl}assets/blueOrigin.png`,
      ...STORES.map(s => `${baseUrl}${s.src}`)
    ];

    let loadedCount = 0;
    const totalAssets = assetsToPreload.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalAssets) {
        // Enforce a minimum display time of 2.2 seconds for the pulsing logo
        setTimeout(() => {
          setIsPreloaded(true);
          setIsExiting(true);
        }, 2200);
      }
    };

    assetsToPreload.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // don't block if an image fails to load
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (isExiting && isPreloaded) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 800); // matches the CSS fadeout duration
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, isPreloaded, onComplete]);

  const baseUrl = import.meta.env.BASE_URL || '/';

  return (
    <div className={`loading-screen-overlay ${isExiting ? 'fade-out' : ''}`}>
      <div className="loading-container">
        {/* Center Mall Logo: BIG */}
        <div className="center-mall-logo-wrapper active">
          <img 
            src={`${baseUrl}assets/sponsors/big.png`} 
            alt="Big Fashion Mall" 
            className="center-mall-logo blinking" 
          />
        </div>
      </div>
    </div>
  );
}
