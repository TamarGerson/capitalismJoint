interface HeaderProps {
  atTop?: boolean;
}

export default function Header({ atTop = false }: HeaderProps) {
  const handleTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash;
    // If the hash is empty or '#', we are on the landing page, so reload the page
    if (!hash || hash === '#') {
      e.preventDefault();
      window.location.reload();
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
          <button className="register-btn">הרשמה חופשית</button>
        </div>
      </div>
    </header>
  );
}
