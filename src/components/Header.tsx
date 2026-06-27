interface HeaderProps {
  atTop?: boolean;
}

export default function Header({ atTop = false }: HeaderProps) {
  return (
    <header className={`site-header ${atTop ? 'at-top' : ''}`}>
      <div className="header-content">
        <nav className="header-nav">
          <a href="#about" className="nav-link">על האירוע</a>
          <a href="#booklet" className="nav-link">החוברת</a>
          <a href="#schedule" className="nav-link">לוח זמנים</a>
        </nav>

        <div className="header-title-container">
          <a href="#" className="header-title-link">
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
