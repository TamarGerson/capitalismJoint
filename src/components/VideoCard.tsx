import React, { useRef, useState } from 'react';

interface VideoCardProps {
  src: string;
  style?: React.CSSProperties;
}

export default function VideoCard({ src, style }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      // Play the video with sound
      videoRef.current.muted = false;
      videoRef.current.play().catch(error => {
        console.warn("Video play failed (often due to browser autoplay policies):", error);
      });
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
        className="video-element"
      />
    </div>
  );
}
