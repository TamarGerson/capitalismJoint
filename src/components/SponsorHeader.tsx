import { useState } from 'react';
import sponsorsData from '../config/sponsors.json';

interface Sponsor {
  id: string;
  name: string;
  src: string;
  scale?: number;
  width?: string;
  height?: string;
}

interface SponsorLogoProps {
  sponsor: Sponsor;
}

interface SponsorHeaderProps {
  speed?: number; // Speed in seconds, defaults to 30
}

function SponsorLogo({ sponsor }: SponsorLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scale = sponsor.scale ?? 1.0;
  const style: React.CSSProperties = {
    height: sponsor.height ?? `${30 * scale}px`,
    width: sponsor.width ?? 'auto',
    maxHeight: '40px', // Ensure logos stay within the 55px header height bounds
    objectFit: 'contain',
    display: hasError ? 'none' : 'block',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div className="sponsor-logo-wrapper">
      <img
        src={sponsor.src}
        alt={sponsor.name}
        style={style}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      {(hasError || !isLoaded) && (
        <span className="sponsor-fallback-label" title={`Missing asset: ${sponsor.src}`}>
          {sponsor.name}
        </span>
      )}
    </div>
  );
}

export default function SponsorHeader({ speed = 30 }: SponsorHeaderProps) {
  const sponsors = sponsorsData as Sponsor[];
  const marqueeSpeed = `${speed}s`;

  return (
    <header className="sponsor-header">
      <div className="sponsor-marquee-wrapper">
        <div 
          className="sponsor-logos-track"
          style={{ '--marquee-speed': marqueeSpeed } as React.CSSProperties}
        >
          <div className="sponsor-logos-group">
            {sponsors.map((sponsor, index) => (
              <SponsorLogo key={`${sponsor.id}-1-${index}`} sponsor={sponsor} />
            ))}
          </div>
          <div className="sponsor-logos-group">
            {sponsors.map((sponsor, index) => (
              <SponsorLogo key={`${sponsor.id}-2-${index}`} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
