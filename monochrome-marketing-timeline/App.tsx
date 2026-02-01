import React, { useState, useEffect } from 'react';
import { Timeline } from './components/Timeline';
import { ConfidentialDeck } from './components/ConfidentialDeck';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'timeline' | 'deck'>('timeline');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
        style={{ scaleX }}
      />

      {/* Sticky Navigation / Brand */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md border-gray-100 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div 
                className="text-xl font-black tracking-tighter border-2 border-black p-1 leading-none cursor-pointer hover:bg-black hover:text-white transition-colors"
                onClick={() => setCurrentView('timeline')}
              >
                MM<span className="opacity-0">.</span>
              </div>
              
              {/* View Switcher */}
              <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
                 <button 
                  onClick={() => setCurrentView('timeline')}
                  className={`hover:text-black transition-colors ${currentView === 'timeline' ? 'text-black underline underline-offset-4 decoration-2' : 'text-gray-400'}`}
                 >
                   Roadmap
                 </button>
                 <button 
                  onClick={() => setCurrentView('deck')}
                  className={`hover:text-black transition-colors ${currentView === 'deck' ? 'text-black underline underline-offset-4 decoration-2' : 'text-gray-400'}`}
                 >
                   Strategy Deck
                 </button>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-500 hidden sm:flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                CONFIDENTIAL // INTERNAL USE ONLY
            </div>
        </div>
      </nav>

      {/* Mobile Menu (Simplified) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 flex justify-around">
           <button 
            onClick={() => { setCurrentView('timeline'); window.scrollTo(0,0); }}
            className={`text-xs font-bold uppercase tracking-widest ${currentView === 'timeline' ? 'text-black' : 'text-gray-400'}`}
           >
             Roadmap
           </button>
           <button 
            onClick={() => { setCurrentView('deck'); window.scrollTo(0,0); }}
            className={`text-xs font-bold uppercase tracking-widest ${currentView === 'deck' ? 'text-black' : 'text-gray-400'}`}
           >
             Strategy Deck
           </button>
      </div>

      {/* Main Content */}
      <main className="pt-20">
        {currentView === 'timeline' ? <Timeline /> : <ConfidentialDeck />}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12 mb-12 md:mb-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
            <p>&copy; 2026 THEBRNE AGENCY</p>
            <p className="mt-2 md:mt-0">TIGER SHOJI SDN BHD</p>
        </div>
      </footer>
    </div>
  );
};

export default App;