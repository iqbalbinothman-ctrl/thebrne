import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import ShojiPage from './components/ShojiPage';
import MaintenanceMode from './components/MaintenanceMode';

const AppContent: React.FC<{ isMaintenanceMode: boolean }> = ({ isMaintenanceMode }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="relative">
      {/* Apply blur only on homepage when maintenance mode is active */}
      <div className={isMaintenanceMode && isHomepage ? 'blur-sm pointer-events-none' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shojiMP_2026" element={<ShojiPage />} />
        </Routes>
      </div>

      {/* Maintenance Mode Overlay (only on homepage) */}
      {isMaintenanceMode && isHomepage && <MaintenanceMode />}
    </div>
  );
};

const App: React.FC = () => {
  const [isMaintenanceMode] = useState(true); // Set to false to disable

  return (
    <Router>
      <AppContent isMaintenanceMode={isMaintenanceMode} />
    </Router>
  );
};

export default App;
