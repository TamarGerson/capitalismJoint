import { useState, useEffect, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import bookletPages from '../config/booklet.json';

export default function BookletPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [isBigger, setIsBigger] = useState(false);

  const nextPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentPage((prev) => (prev + 1) % bookletPages.length);
  };

  const prevPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentPage((prev) => (prev - 1 + bookletPages.length) % bookletPages.length);
  };

  // Keep layout responsive and scale-to-fit
  useEffect(() => {
    const handleResize = () => {
      const targetWidth = 1920;
      const targetHeight = 1200;
      const scaleX = window.innerWidth / targetWidth;
      const scaleY = (window.innerHeight - 140) / targetHeight; // Subtract header height (55px sponsor + 85px site header)
      const newScale = Math.min(scaleX, scaleY, 1); // Scale down but don't upscale past 1
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSinglePage = currentPage === 0 || currentPage === bookletPages.length - 1;

  return (
    <div className="booklet-page">
      <div 
        className={`booklet-container ${isBigger ? 'bigger-mode' : ''} ${isSinglePage ? 'single-page-active' : ''}`}
        style={{ 
          transform: `scale(${scale})`,
          width: '1920px',
          height: '1200px',
          position: 'relative',
          transformOrigin: 'top center',
          flexShrink: 0
        }}
      >
        {/* Description */}
        <p className="booklet-description">
          החוברת <span className="highlight-text">עוד יותר טוב ועוד יותר טוב</span> מבקשת להתבונן בקפיטליזם כמנגנון שמאפשר לאנשים להפוך אישיות למנוע של השפעה, הצלחה וכסף. דרך דמויותיהן של <span className="highlight-text">אודיה פינטו, עינב בובליל וליבנת אורינובסקי</span>, נשים שמעוררות לא פעם זלזול, ביקורת או לגלוג ציבורי, החוברת מציעה מבט אחר: כזה שרואה בהן לא רק תופעת רשת, אלא יזמיות של עצמן. כל אחת מהן הצליחה לבנות קהל ולהפוך את הנוכחות האישית שלה למותג בעל כוח כלכלי ממשי. זהו מבט על קפיטליזם ככוח שמייצר אפשרות: האפשרות לקחת אישיות ולהפוך אותה להשפעה רחבה, עצמאות כלכלית ומעמד חברתי.
        </p>

        {/* Zoom In / Zoom Out Button */}
        <button
          className="booklet-zoom-btn"
          onClick={() => setIsBigger(!isBigger)}
          aria-label={isBigger ? "Zoom out booklet" : "Zoom in booklet"}
          title={isBigger ? "הקטנה" : "הגדלה"}
        >
          {isBigger ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
        </button>

        {/* Left Arrow Button (Next Page for RTL) */}
        <button 
          className="booklet-nav-btn left" 
          onClick={nextPage}
          aria-label="Next page"
        >
          <ChevronLeft className="arrow-icon" size={64} />
        </button>

        {/* Booklet Image Container */}
        <div className="booklet-img-container">
          <img 
            src={bookletPages[currentPage]} 
            alt={`Booklet page ${currentPage + 1}`} 
            className={`booklet-img ${isSinglePage ? 'single-page' : ''}`}
          />
        </div>

        {/* Right Arrow Button (Previous Page for RTL) */}
        <button 
          className="booklet-nav-btn right" 
          onClick={prevPage}
          aria-label="Previous page"
        >
          <ChevronRight className="arrow-icon" size={64} />
        </button>
      </div>
    </div>
  );
}
