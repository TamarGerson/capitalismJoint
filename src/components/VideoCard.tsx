import React, { useRef, useState } from 'react';

interface VideoCardProps {
  src: string;
  style?: React.CSSProperties;
  muted?: boolean;
}

export default function VideoCard({ src, style, muted = false }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      if (muted) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(error => {
          console.error("Muted play failed:", error);
        });
      } else {
        // Try to play with sound first
        videoRef.current.muted = false;
        videoRef.current.play().catch(error => {
          console.warn("Unmuted play blocked by browser, falling back to muted play:", error);
          // Fallback: Play muted (which is always allowed by browsers without user interaction)
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(mutedError => {
              console.error("Muted play also failed:", mutedError);
            });
          }
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      // Pause the video, it will naturally resume from this point on next play
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className={`video-card ${isHovered ? 'hovered' : ''}`} 
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={src}
        loop
        playsInline
        preload="auto"
        className="video-element"
      />
    </div>
  );
}
