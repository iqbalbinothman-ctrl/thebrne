import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShojiPage from './components/ShojiPage';
import MaintenanceMode from './components/MaintenanceMode';

const App: React.FC = () => {
  const [isMaintenanceMode] = useState(true); // Set to false to disable

  return (
    <Router>
      <div className="relative">
        {/* Homepage with blur when maintenance mode is active */}
        <div className={isMaintenanceMode ? 'blur-sm pointer-events-none' : ''}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shojiMP_2026" element={<ShojiPage />} />
          </Routes>
        </div>

        {/* Maintenance Mode Overlay (only on homepage) */}
        {isMaintenanceMode && window.location.pathname === '/' && <MaintenanceMode />}
      </div>
    </Router>
  );
};

export default App;
