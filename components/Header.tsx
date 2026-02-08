
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAgenciesOpen, setIsAgenciesOpen] = useState(false);
  const [isMobileAgenciesOpen, setIsMobileAgenciesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      setIsSticky(window.scrollY > window.innerHeight - 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAgenciesOpen(false);
    setIsMobileAgenciesOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const services = [
    { name: 'Branding', path: '/branding' },
    { name: 'Website Development', path: '/website-development' },
    { name: 'Social Media Management', path: '/social-media-management' },
    { name: 'Video Content Production', path: '/video-content-production' },
    { name: 'Digital Marketing', path: '/digital-marketing' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between w-full ${isSticky
          ? 'bg-black/90 backdrop-blur-xl text-white'
          : 'bg-[#9BE12C] text-black'
          }`}
      >
        <Link to="/" className="flex items-center gap-2 z-50">
          <img src="/logo.png" alt="THE BRNE" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">

          {/* Agencies Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsAgenciesOpen(true)}
            onMouseLeave={() => setIsAgenciesOpen(false)}
          >
            <button className="flex items-center gap-1 font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity focus:outline-none">
              Agencies
              <ChevronDown size={16} className={`transition-transform duration-300 ${isAgenciesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 w-64 transition-all duration-300 origin-top ${isAgenciesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
            >
              <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-4 py-3 text-white hover:bg-[#9BE12C] hover:text-black rounded-lg transition-colors font-body text-sm font-medium"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/portfolio" className="font-heading text-xl uppercase tracking-wider hover:opacity-70 transition-opacity">Portfolio</Link>


          <Link
            to="/contact"
            className={`px-8 py-2 rounded-full font-heading text-xl uppercase tracking-wider transition-all duration-300 btn-bubble-effect btn-bubble-white ${isSticky
              ? 'bg-[#9BE12C] text-black hover:text-black'
              : 'bg-black text-white hover:text-black'
              }`}
          >
            <span>Let's Talk</span>
          </Link>
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
        className={`md:hidden fixed top-0 left-0 w-full h-screen z-40 bg-black text-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col h-full pt-24 px-6 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-6">

            {/* Mobile Agencies Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileAgenciesOpen(!isMobileAgenciesOpen)}
                className="flex items-center justify-between w-full font-heading text-3xl uppercase tracking-wider border-b border-white/20 pb-4 text-left"
              >
                Agencies
                <ChevronDown size={24} className={`transition-transform duration-300 ${isMobileAgenciesOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isMobileAgenciesOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#9BE12C]">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="font-body text-lg text-gray-300 hover:text-[#9BE12C] transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/portfolio"
              className="font-heading text-3xl uppercase tracking-wider border-b border-white/20 pb-4"
            >
              Portfolio
            </Link>



            <Link
              to="/contact"
              className="mt-4 w-full bg-[#9BE12C] text-black py-4 rounded-full font-heading text-2xl uppercase tracking-wider text-center hover:bg-white transition-colors"
            >
              Let's Talk
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
