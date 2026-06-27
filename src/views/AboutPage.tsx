import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SponsorHeader from '../components/SponsorHeader';
import VideoCard from '../components/VideoCard';

export default function AboutPage() {
  const [scale, setScale] = useState(1);

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

  return (
    <div className="about-page">
      <SponsorHeader speed={40} />
      <Header />
      <div 
        className="about-container"
        style={{ 
          transform: `scale(${scale})`,
          width: '1920px',
          height: '1200px',
          position: 'relative',
          transformOrigin: 'top center',
          flexShrink: 0
        }}
      >
        {/* Video element on the left side, centered */}
        <div className="about-video-wrapper">
          <VideoCard src="/assets/videos/dubaiMall.mp4" />
        </div>

        {/* Description paragraphs */}
        <div className="about-description">
          <p>
            {`אם בעבר הקפיטליזם הופיע בדמות מפעל או גורד שחקים - היום הוא מופיע בפרופיל האישי. בעולם של הסטורי ויצירת התוכן לייקים ושיתופים הם העדות להצלחה. האנשים החדשים הם ערוצי הפצה או  מוצר לכל דבר ועניין. השוק החדש הוא במה - ואנחנו השחקנים הראשיים.`}
          </p>
          <p>
            {`בעידן שבו גם האישיות היא נכס, גם אותנטיות יכולה להיות אסטרטגיה שיווקית:  הפנים, הבית, הזוגיות או שגרת הבוקר - כולם נעשים חומרי גלם במערכת שבה תשומת לב היא מטבע, והעצמי הופך לפרויקט מתמשך של עיצוב, ניהול ומכירה.`}
          </p>
          <p>
            {`בין הרצאות, שיחות והקרנה מיוחדת, תושק גם החוברת קפיטליזם - פרויקט מחקר ועיצוב הבוחן את השפה החזותית של כסף, עבודה, צריכה, צמיחה ומיתוג עצמי, ואת האופן שבו הכלכלה מעצבת לא רק את המציאות אלא גם את הדמיון.`}
          </p>
        </div>
      </div>
    </div>
  );
}
