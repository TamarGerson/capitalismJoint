interface HeaderProps {
  atTop?: boolean;
  onRegisterClick?: () => void;
}

export default function Header({ atTop = false, onRegisterClick }: HeaderProps) {
  const handleTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash;
    // If the hash is empty or '#', we are on the landing page.
    // Instead of reloading, scroll back to the default viewport center.
    if (!hash || hash === '#') {
      e.preventDefault();
      const viewport = document.querySelector('.canvas-viewport');
      if (viewport) {
        viewport.scrollTo({
          left: 2505, // INITIAL_SCROLL_X from LandingPage
          top: 1198,  // INITIAL_SCROLL_Y from LandingPage
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className={`site-header ${atTop ? 'at-top' : ''}`}>
      <div className="header-content">
        <nav className="header-nav">
          <a href="#about" className="nav-link">על האירוע</a>
          <a href="#booklet" className="nav-link">החוברת</a>
          <a href="#schedule" className="nav-link">לוח זמנים</a>
        </nav>

        <div className="header-title-container">
          <a href="#" className="header-title-link" onClick={handleTitleClick}>
            <h1 className="header-title">קפיטליזם זו לא מילה גסה</h1>
          </a>
        </div>

        <div className="header-actions">
          <span className="header-date">יום חמישי 09.07.26 | ביג פאשן גלילות</span>
          <button className="register-btn" onClick={onRegisterClick}>הרשמה חופשית</button>
        </div>
      </div>
    </header>
  );
}
