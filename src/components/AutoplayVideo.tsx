import React, { useRef, useEffect } from 'react';

interface AutoplayVideoProps {
  src: string;
  style?: React.CSSProperties;
}

export default function AutoplayVideo({ src, style }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.error("Autoplay failed:", err);
      });
    }
  }, []);

  return (
    <div className="autoplay-video" style={style}>
      <video 
        ref={videoRef}
        src={src}
        loop
        playsInline
        muted
        autoPlay
        preload="auto"
        className="video-element"
      />
    </div>
  );
}
