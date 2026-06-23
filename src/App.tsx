import { useState, useEffect } from 'react';
import LandingPage from './views/LandingPage';
import BookletPage from './views/BookletPage';

function App() {
  const [view, setView] = useState<'landing' | 'booklet'>('landing');

  useEffect(() => {
    // Always reset the hash on fresh load/F5 refresh to default to the landing page
    if (window.location.hash && window.location.hash !== '#') {
      window.location.hash = '';
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#booklet') {
        setView('booklet');
      } else {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="app-root">
      {view === 'booklet' ? <BookletPage /> : <LandingPage />}
    </div>
  );
}

export default App;
