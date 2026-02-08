import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
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

  return (
    <div className="relative">
      {/* Apply blur only on homepage when maintenance mode is active */}
      <div className={isMaintenanceMode && isHomepage ? 'blur-sm pointer-events-none' : ''}>
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
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
