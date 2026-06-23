import React from 'react';

interface FocalTextProps {
  className?: string;
  text: string;
  style?: React.CSSProperties;
}

export default function FocalText({ className = '', text, style }: FocalTextProps) {
  return (
    <div className={`focal-text ${className}`} style={style}>
      {text}
    </div>
  );
}
