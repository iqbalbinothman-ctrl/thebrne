
import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      setIsSticky(window.scrollY > window.innerHeight - 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between w-full ${isSticky
        ? 'bg-black/90 backdrop-blur-xl text-white'
        : 'bg-[#9BE12C] text-black'
        }`}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="THE BRNE" className="h-10 md:h-12 w-auto object-contain" />
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">About</a>
        <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Services</a>
        <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Community</a>
        <button className={`px-8 py-2 rounded-full font-heading text-xl uppercase tracking-wider transition-all duration-300 btn-bubble-effect btn-bubble-white ${isSticky
          ? 'bg-[#9BE12C] text-black hover:text-black'
          : 'bg-black text-white hover:text-black'
          }`}>
          <span>Let's Talk</span>
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
