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

function SponsorLogo({ sponsor }: SponsorLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const scale = sponsor.scale ?? 1.0;
  const style: React.CSSProperties = {
    height: sponsor.height ?? `${45 * scale}px`,
    width: sponsor.width ?? 'auto',
    maxHeight: '65px', // Ensure logos stay within the 85px header height bounds
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

export default function SponsorHeader() {
  const sponsors = sponsorsData as Sponsor[];

  return (
    <header className="sponsor-header">
      <div className="sponsor-logos-container">
        {sponsors.map((sponsor) => (
          <SponsorLogo key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </header>
  );
}
