import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

export default function SchedulePage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const targetWidth = 1920;
      const scaleX = window.innerWidth / targetWidth;
      const newScale = Math.min(scaleX, 1); // Scale down but don't upscale past 1
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="schedule-page">
      <div className="schedule-scroll-viewport">
        <div 
          className="schedule-scale-wrapper"
          style={{
            width: `${1920 * scale}px`,
            height: `${1800 * scale}px`
          }}
        >
          <div 
            className="schedule-container"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '1920px',
              height: '1800px'
            }}
          >
            {/* Row 1: 10:00 - 10:30 */}
            <div className="schedule-row row-1">
              <div className="main-time-col">
                <p className="time-val">10:00</p>
                <p className="time-val">10:30</p>
              </div>
              <div className="main-item-col">
                <h2 className="main-item-title">דברי פתיחה</h2>
                <p className="main-item-subtitle">
                  ברכות נציגי המחלקה לתקשורת חזותית, בצלאל ונציגי ביג פאשן גלילות
                </p>
              </div>
              <div className="left-item-col">
                <h2 className="left-item-title">עוד יותר טוב ועוד יותר טוב</h2>
                <p className="left-item-subtitle">
                  השקת החוברת - פרויקט סטודנטיאלי
                </p>
              </div>
            </div>

            {/* Row 2: 10:30 - 12:00 */}
            <div className="schedule-row row-2">
              <div className="main-time-col">
                <p className="time-val">10:30</p>
                <p className="time-val">12:00</p>
              </div>
              <div className="main-item-col">
                <h2 className="main-item-title">חלון הראווה</h2>
                <p className="main-item-subtitle">על צרכנות תוכן ברשתות</p>
              </div>
              <div className="image-col">
                <VideoCard 
                  src="assets/videos/firstRow.mp4" 
                  muted={true}
                  style={{ width: '100%', height: '100%', boxShadow: 'none', objectPosition: 'center top' }}
                />
              </div>
              <div className="sub-sessions-wrapper">
                <div className="sub-session">
                  <div className="sub-time">10:30 - 11:00</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">ירדן מיינפלד דיזינגוף</h3>
                    <p className="speaker-topic">איך מסקרים חלום</p>
                  </div>
                  <p className="sub-desc">
                    איך מסקרים את עולם התרבות בעידן הרשתות החברתיות
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">11:00 - 11:30</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">ערן סוויסה</h3>
                    <p className="speaker-topic">פרסום ראשון</p>
                  </div>
                  <p className="sub-desc">
                    על תקשורת חופשית, אחריות חברתית והמתח בין הפרטי לחברתי.
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">11:30 - 12:00</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">יובל סער</h3>
                    <p className="speaker-topic">תשוקה באריזה</p>
                  </div>
                  <p className="sub-desc">
                    שיחה פתוחה על צבע, חומר, טיפוגרפיה והיכולת להפוך מוצר לסיפור.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3: 12:20 - 14:00 */}
            <div className="schedule-row row-3">
              <div className="main-time-col">
                <p className="time-val">12:20</p>
                <p className="time-val">14:00</p>
              </div>
              <div className="main-item-col">
                <h2 className="main-item-title">העדר ואני</h2>
                <p className="main-item-subtitle">ביחד ולחוד כחלק מזהות אישית ומשייכות חברתית</p>
              </div>
              <div className="image-col">
                <VideoCard 
                  src="assets/videos/secondRow.mp4#t=0.5" 
                  muted={true}
                  style={{ width: '100%', height: '100%', boxShadow: 'none', objectPosition: '50% -60px' }}
                />
              </div>
              <div className="sub-sessions-wrapper">
                <div className="sub-session">
                  <div className="sub-time">12:20 - 13:00</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">פרופ’ אווה אילוז</h3>
                    <p className="speaker-topic">המצאת האדם הכלכלי</p>
                  </div>
                  <p className="sub-desc">
                    על רגשות, בחירה ותחרות כחלק ממבנה תרבותי ולא רק כלכלי.
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">13:00 - 13:40</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">פרופ’ חנה נוה</h3>
                    <p className="speaker-topic">המותג כדת כלכלית</p>
                  </div>
                  <p className="sub-desc">
                    על נאמנות, זהות ושייכות בעולם שבו לוגו יכול להפוך לסמל אמוני.
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">13:40 - 14:00</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">דיון פתוח</h3>
                    <p className="speaker-topic">&nbsp;</p>
                  </div>
                  <p className="sub-desc">
                    האם הקפיטליזם משחרר אותנו - או מלמד אותנו לקרוא לתלות בשם חירות?
                  </p>
                </div>
              </div>
            </div>

            {/* Row 4: 15:00 - 16:30 */}
            <div className="schedule-row row-4">
              <div className="main-time-col">
                <p className="time-val">15:00</p>
                <p className="time-val">16:30</p>
              </div>
              <div className="main-item-col">
                <h2 className="main-item-title">אני המותג</h2>
                <p className="main-item-subtitle">משפיעניות, יזמות וכלכלת ההשראה</p>
              </div>
              <div className="image-col">
                <VideoCard 
                  src="assets/videos/thirdRow.mp4" 
                  muted={true}
                  style={{ width: '100%', height: '100%', boxShadow: 'none', objectPosition: 'center top' }}
                />
              </div>
              <div className="sub-sessions-wrapper">
                <div className="sub-session">
                  <div className="sub-time">15:00 - 15:30</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">ד”ר יובל דרור</h3>
                    <p className="speaker-topic">הפרופיל כעסק</p>
                  </div>
                  <p className="sub-desc">
                    על רשתות חברתיות, תשומת לב והמעבר מאדם פרטי לפלטפורמה כלכלית.
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">15:30 - 16:00</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">ד”ר תמר אליאור</h3>
                    <p className="speaker-topic">להצליח מול מצלמה</p>
                  </div>
                  <p className="sub-desc">
                    על יזמות נשית, מנטורינג, קורסים דיגיטליים וההבטחה להפוך סיפור אישי לשיטה.
                  </p>
                </div>
                <div className="sub-session">
                  <div className="sub-time">16:00 - 16:30</div>
                  <div className="sub-content">
                    <h3 className="speaker-name">יערה זמיר</h3>
                    <p className="speaker-topic">גם את יכולה</p>
                  </div>
                  <p className="sub-desc">
                    שיחה על השראה, אותנטיות, כסף קל והאסתטיקה של ההצלחה ברשת.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 5: 16:30 - 20:00 */}
            <div className="schedule-row row-5">
              <div className="main-time-col">
                <p className="time-val">16:30</p>
                <p className="time-val">19:30</p>
              </div>
              <div className="main-item-col">
                <h2 className="main-item-title">הזאב מוול סטריט</h2>
                <p className="main-item-subtitle">הקרנה מיוחדת</p>
                <div className="bottom-detail special-bottom-detail">
                  <h3 className="speaker-name">אחינועם בר</h3>
                  <p className="sub-desc">על תשוקה וכסף והגבול בין הצלחה לקריסה מוסרית</p>
                </div>
              </div>
              <div className="image-col">
                <VideoCard 
                  src="assets/videos/forthRow.mp4" 
                  muted={true}
                  style={{ width: '100%', height: '100%', boxShadow: 'none', objectPosition: '50% -150px' }}
                />
              </div>
              <div className="left-side-special-col">
                <div className="special-time-col">
                  <p className="time-val">19:30</p>
                  <p className="time-val">20:00</p>
                </div>
                <div className="special-content-col">
                  <h2 className="main-item-title">כמה עולה חופש?</h2>
                  <p className="main-item-subtitle">שיחת סיכום</p>
                  <p className="sub-desc">
                    שיחה מסכמת על כסף, בחירה, עבודה, צריכה, חשיפה והאפשרות לדמיין כלכלה אחרת.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
