import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ShojiPage from './components/ShojiPage';
import PortfolioPage from './components/PortfolioPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import MaintenanceMode from './components/MaintenanceMode';
import PageTransition from './components/PageTransition';

const AppContent: React.FC<{ isMaintenanceMode: boolean }> = ({ isMaintenanceMode }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="relative">
      {/* Apply blur only on homepage when maintenance mode is active */}
      <div className={isMaintenanceMode && isHomepage ? 'blur-sm pointer-events-none' : ''}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shojiMP_2026" element={<ShojiPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:projectSlug" element={<ProjectDetailPage />} />
          </Routes>
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
