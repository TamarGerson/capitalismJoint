import { useState, type MouseEvent } from 'react';
import Header from '../components/Header';

export default function BookletPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const bookletPages = [
    '/assets/booklet.png',
    '/assets/booklet-2.png',
    '/assets/booklet-3.png',
    '/assets/booklet-4.png',
  ];

  const nextPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentPage((prev) => (prev + 1) % bookletPages.length);
  };

  const prevPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentPage((prev) => (prev - 1 + bookletPages.length) % bookletPages.length);
  };

  return (
    <div className="booklet-page">
      <Header atTop={true} />
      <div className="booklet-container">
        
        {/* Right Section: Quote & Description */}
        <div className="booklet-content-right">
          <h2 className="booklet-quote">
            “תגידו אתם בסדר?
            אחת כמוני מניעה
            את הכלכלה בישראל”
          </h2>
          <p className="booklet-description">
            החוברת <span className="highlight-text">קפיטליזם זו לא מילה גסה</span> מבקשת להתבונן בקפיטליזם כמנגנון שמאפשר לאנשים להפוך אישיות למנוע של השפעה, הצלחה וכסף. דרך דמויותיהן של <span className="highlight-text">אודיה פינטו, עינב בובליל וליבנת אורינובסקי</span>, נשים שמעוררות לא פעם זלזול, ביקורת או לגלוג ציבורי, החוברת מציעה מבט אחר: כזה שרואה בהן לא רק תופעת רשת, אלא יזמיות של עצמן. כל אחת מהן הצליחה לבנות קהל ולהפוך את הנוכחות האישית שלה למותג בעל כוח כלכלי ממשי. זהו מבט על קפיטליזם ככוח שמייצר אפשרות: האפשרות לקחת את האישיות ולהפוך אותה להשפעה רחבה, עצמאות כלכלית ומעמד תרבותי.
          </p>
        </div>

        {/* Left Section: Booklet Image Slider */}
        <div className="booklet-viewer-left">
          {/* Left Arrow Button */}
          <button 
            className="booklet-nav-btn left" 
            onClick={prevPage}
            aria-label="העמוד הקודם בחוברת"
          >
            <svg width="89" height="93" viewBox="0 0 89 93" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M89 0 L0 46.5 L89 93 Z" fill="white"/>
            </svg>
          </button>

          {/* Booklet Image Container */}
          <div className="booklet-img-container">
            <img 
              src={bookletPages[currentPage]} 
              alt={`עמוד ${currentPage + 1} בחוברת`} 
              className="booklet-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const placeholder = e.currentTarget.parentElement?.querySelector('.booklet-placeholder');
                if (placeholder) {
                  (placeholder as HTMLElement).style.display = 'flex';
                }
              }}
              onLoad={(e) => {
                e.currentTarget.style.display = 'block';
                const placeholder = e.currentTarget.parentElement?.querySelector('.booklet-placeholder');
                if (placeholder) {
                  (placeholder as HTMLElement).style.display = 'none';
                }
              }}
            />
            
            <div className="booklet-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-title">תמונת החוברת</span>
                <span className="placeholder-subtitle">עמוד {currentPage + 1}</span>
                <span className="placeholder-hint">הכניסו קובץ תמונה בנתיב:</span>
                <code className="placeholder-code">public/assets/booklet{currentPage > 0 ? `-${currentPage + 1}` : ''}.png</code>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button 
            className="booklet-nav-btn right" 
            onClick={nextPage}
            aria-label="העמוד הבא בחוברת"
          >
            <svg width="89" height="93" viewBox="0 0 89 93" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0 L89 46.5 L0 93 Z" fill="white"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
