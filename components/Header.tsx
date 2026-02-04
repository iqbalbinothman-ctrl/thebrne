
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      setIsSticky(window.scrollY > window.innerHeight - 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between w-full ${isSticky
          ? 'bg-black/90 backdrop-blur-xl text-white'
          : 'bg-[#9BE12C] text-black'
          }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="THE BRNE" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Services</a>
          <Link to="/portfolio" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Portfolio</Link>
          <a href="#" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Community</a>
          <button className={`px-8 py-2 rounded-full font-heading text-xl uppercase tracking-wider transition-all duration-300 btn-bubble-effect btn-bubble-white ${isSticky
            ? 'bg-[#9BE12C] text-black hover:text-black'
            : 'bg-black text-white hover:text-black'
            }`}>
            <span>Let's Talk</span>
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out ${isSticky
          ? 'bg-black/95 backdrop-blur-xl text-white'
          : 'bg-[#9BE12C] text-black'
          }`}
        style={{
          maxHeight: isMobileMenuOpen ? '400px' : '0px',
        }}
      >
        <nav className="flex flex-col px-6 py-6 gap-6">
          <a
            href="#"
            className="font-heading text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity border-b border-current/20 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#"
            className="font-heading text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity border-b border-current/20 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </a>
          <Link
            to="/portfolio"
            className="font-heading text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity border-b border-current/20 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <a
            href="#"
            className="font-heading text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity border-b border-current/20 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Community
          </a>
          <button
            className={`px-8 py-3 rounded-full font-heading text-xl uppercase tracking-wider transition-all duration-300 ${isSticky
              ? 'bg-[#9BE12C] text-black hover:bg-[#8CD020]'
              : 'bg-black text-white hover:bg-gray-800'
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Let's Talk
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
