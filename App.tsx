import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShojiPage from './components/ShojiPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shojiMP_2026" element={<ShojiPage />} />
      </Routes>
    </Router>
  );
};

export default App;
