import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './components/Home';
import NewHome from './components/NewHome';
import ShojiPage from './components/ShojiPage';
import PortfolioPage from './components/PortfolioPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import MaintenanceMode from './components/MaintenanceMode';
import PageTransition from './components/PageTransition';

// Lazy load page components
const BrandingPage = lazy(() => import('./components/BrandingPage'));
const WebsiteDevelopmentPage = lazy(() => import('./components/WebsiteDevelopmentPage'));
const SocialMediaManagementPage = lazy(() => import('./components/SocialMediaManagementPage'));
const VideoContentProductionPage = lazy(() => import('./components/VideoContentProductionPage'));
const DigitalMarketingPage = lazy(() => import('./components/DigitalMarketingPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

const AppContent: React.FC<{ isMaintenanceMode: boolean }> = ({ isMaintenanceMode }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [hideLogo, setHideLogo] = useState(false);

  // On the homepage, hide the universal logo once the sticky Header takes over
  useEffect(() => {
    if (!isHomepage) {
      setHideLogo(false);
      return;
    }
    const onScroll = () => setHideLogo(window.scrollY > window.innerHeight * 3.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomepage]);

  return (
    <div className="relative">
      {/* Universal fixed logo — visible on every page */}
      <Link
        to="/"
        aria-label="THE BRNE — Home"
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-[60] transition-opacity duration-300 pointer-events-auto ${hideLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ animation: 'logoSlideDown 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }}
      >
        <img
          src="/logo.gif"
          alt="THE BRNE"
          className="h-[52px] md:h-[62px] w-auto select-none"
        />
      </Link>

      {/* Universal "HIT US" CTA — top-right, mirrors the logo on every page */}
      <a
        href="https://wa.me/60176412060"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hit us up on WhatsApp"
        className={`fixed top-4 right-4 md:top-6 md:right-6 z-[60] transition-opacity duration-300 pointer-events-auto ${hideLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ animation: 'logoSlideDown 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }}
      >
        <span
          className="inline-flex items-center justify-center font-black uppercase tracking-[0.12em] rounded-full select-none transition-colors duration-300 text-[12px] md:text-[13px] px-5 py-2.5 md:px-6 md:py-3"
          style={{ background: '#9BE12C', color: '#000' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#9BE12C'; }}
        >
          Hit Us
        </span>
      </a>

      {/* Apply blur only on homepage when maintenance mode is active */}
      <div className={isMaintenanceMode && isHomepage ? 'blur-sm pointer-events-none' : ''}>
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
            <Routes>
              <Route path="/" element={<NewHome />} />
              <Route path="/new" element={<NewHome />} />
              <Route path="/old" element={<Home />} />
              <Route path="/branding" element={<BrandingPage />} />
              <Route path="/website-development" element={<WebsiteDevelopmentPage />} />
              <Route path="/social-media-management" element={<SocialMediaManagementPage />} />
              <Route path="/video-content-production" element={<VideoContentProductionPage />} />
              <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
              <Route path="/shojiMP_2026" element={<ShojiPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:projectSlug" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </div>

      {/* Maintenance Mode Overlay (only on homepage) */}
      {isMaintenanceMode && isHomepage && <MaintenanceMode />}
    </div>
  );
};

const App: React.FC = () => {
  const [isMaintenanceMode] = useState(false); // Set to false to disable

  return (
    <Router>
      <AppContent isMaintenanceMode={isMaintenanceMode} />
    </Router>
  );
};

export default App;
