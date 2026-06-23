interface HeaderProps {
  atTop?: boolean;
}

export default function Header({ atTop = false }: HeaderProps) {
  return (
    <header className={`site-header ${atTop ? 'at-top' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <button className="register-btn">הרשמה חופשית</button>
          <span className="header-date">יום חמישי 09.07.26 | ביג פאשן גלילות</span>
        </div>
        
        <div className="header-center">
          <h1 className="header-title">יום עיון על קפיטליזם, יצירה וכלכלת העצמי</h1>
        </div>
        
        <nav className="header-right">
          <a href="#about" className="nav-link">על האירוע</a>
          <a href="#booklet" className="nav-link">החוברת</a>
          <a href="#schedule" className="nav-link">לוח זמנים</a>
        </nav>
      </div>
    </header>
  );
}
