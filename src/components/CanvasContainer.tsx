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

  // Refs for edge scrolling state
  const scrollDirection = useRef({ dx: 0, dy: 0 });
  const isDraggingRef = useRef(false);

  // Sync dragging state to ref to avoid stale closure issues in global listener
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Set initial scroll position when the component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = initialScrollX;
      containerRef.current.scrollTop = initialScrollY;
    }
  }, [initialScrollX, initialScrollY]);

  // Edge scrolling logic: runs a continuous frame loop when scroll offsets are non-zero
  useEffect(() => {
    let animationFrameId: number;

    const scrollLoop = () => {
      if (containerRef.current && !isDraggingRef.current) {
        const { dx, dy } = scrollDirection.current;
        if (dx !== 0 || dy !== 0) {
          containerRef.current.scrollLeft += dx;
          containerRef.current.scrollTop += dy;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Global mousemove listener for edge scrolling
  useEffect(() => {
    const EDGE_ZONE = 80; // Distance in pixels from viewport edge to start scrolling
    const MAX_SPEED = 20;  // Maximum scroll speed in pixels per frame

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Don't edge-scroll if we are actively dragging/panning with click
      if (isDraggingRef.current) {
        scrollDirection.current = { dx: 0, dy: 0 };
        return;
      }

      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      let dx = 0;
      let dy = 0;

      // Check left/right screen edges
      if (clientX < EDGE_ZONE) {
        // Near left edge (faster speed closer to the edge)
        const ratio = 1 - Math.max(0, clientX) / EDGE_ZONE;
        dx = -MAX_SPEED * ratio;
      } else if (clientX > width - EDGE_ZONE) {
        // Near right edge
        const ratio = 1 - Math.max(0, width - clientX) / EDGE_ZONE;
        dx = MAX_SPEED * ratio;
      }

      // Check top/bottom screen edges
      if (clientY < EDGE_ZONE) {
        // Near top edge
        const ratio = 1 - Math.max(0, clientY) / EDGE_ZONE;
        dy = -MAX_SPEED * ratio;
      } else if (clientY > height - EDGE_ZONE) {
        // Near bottom edge
        const ratio = 1 - Math.max(0, height - clientY) / EDGE_ZONE;
        dy = MAX_SPEED * ratio;
      }

      scrollDirection.current = { dx, dy };
    };

    const handleGlobalMouseLeave = () => {
      // Stop scrolling if the cursor leaves the window completely
      scrollDirection.current = { dx: 0, dy: 0 };
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, []);

  // Manual drag-panning mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setScrollTop(containerRef.current?.scrollTop || 0);
    scrollDirection.current = { dx: 0, dy: 0 }; // Pause edge scrolling
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollDirection.current = { dx: 0, dy: 0 };
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
