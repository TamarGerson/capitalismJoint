import { useRef, useState, useEffect, type ReactNode } from 'react';

interface CanvasContainerProps {
  children: ReactNode;
  canvasWidth: number;
  canvasHeight: number;
  initialScrollX: number;
  initialScrollY: number;
}

export default function CanvasContainer({ 
  children, 
  canvasWidth, 
  canvasHeight, 
  initialScrollX, 
  initialScrollY 
}: CanvasContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Set initial scroll position when the component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = initialScrollX;
      containerRef.current.scrollTop = initialScrollY;
    }
  }, [initialScrollX, initialScrollY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const y = e.pageY - (containerRef.current?.offsetTop || 0);
    const walkX = x - startX;
    const walkY = y - startY;
    
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walkX;
      containerRef.current.scrollTop = scrollTop - walkY;
    }
  };

  return (
    <div 
      className={`canvas-viewport ${isDragging ? 'dragging' : ''}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="canvas-content"
        style={{ 
          width: `${canvasWidth}px`, 
          height: `${canvasHeight}px` 
        }}
      >
        {children}
      </div>
    </div>
  );
}
