import { useState, useEffect, useRef } from 'react';
import LandingPage from './views/LandingPage';
import BookletPage from './views/BookletPage';
import AboutPage from './views/AboutPage';
import SchedulePage from './views/SchedulePage';
import Header from './components/Header';
import SponsorHeader from './components/SponsorHeader';
import RegisterModal from './components/RegisterModal';

function App() {
  const [view, setView] = useState<'landing' | 'booklet' | 'about' | 'schedule'>('landing');
  const [displayView, setDisplayView] = useState<'landing' | 'booklet' | 'about' | 'schedule'>('landing');
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Keep a ref of the current view to avoid stale closures in handleHashChange
  const currentViewRef = useRef(view);
  useEffect(() => {
    currentViewRef.current = view;
  }, [view]);

  useEffect(() => {
    // Always reset the hash on fresh load/F5 refresh to default to the landing page
    if (window.location.hash && window.location.hash !== '#') {
      window.location.hash = '';
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      let targetView: 'landing' | 'booklet' | 'about' | 'schedule' = 'landing';
      if (hash === '#booklet') {
        targetView = 'booklet';
      } else if (hash === '#about') {
        targetView = 'about';
      } else if (hash === '#schedule') {
        targetView = 'schedule';
      }

      if (targetView !== currentViewRef.current) {
        // Trigger fade out
        setFadeState('fade-out');
        
        setTimeout(() => {
          setView(targetView);
          setDisplayView(targetView);
          // Trigger fade in
          setFadeState('fade-in');
        }, 100); // 100ms matches the 0.10s transition duration in CSS
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
      {/* Global Headers - these do not fade or unmount */}
      <SponsorHeader speed={40} />
      <Header onRegisterClick={() => setIsRegisterOpen(true)} />

      {/* Page Content with fade transition */}
      <div className={`view-transition-wrapper view-transition ${fadeState}`}>
        {displayView === 'booklet' ? (
          <BookletPage />
        ) : displayView === 'about' ? (
          <AboutPage />
        ) : displayView === 'schedule' ? (
          <SchedulePage />
        ) : (
          <LandingPage />
        )}
      </div>

      {/* Registration Modal Overlay */}
      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </div>
  );
}

export default App;
