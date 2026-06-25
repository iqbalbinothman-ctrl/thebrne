import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const ACCENT = '#9BE12C';

const services = [
  { name: 'Branding', path: '/branding' },
  { name: 'Website Development', path: '/website-development' },
  { name: 'Social Media Management', path: '/social-media-management' },
  { name: 'Video Content Production', path: '/video-content-production' },
  { name: 'Digital Marketing', path: '/digital-marketing' },
];

// Universal "Agencies" dropdown — sits next to the Hit Us CTA (App.tsx).
// Hover to reveal the service list. Mirrors the old Header dropdown.
const AgenciesMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 font-black uppercase tracking-[0.12em] text-[12px] md:text-[13px] px-5 py-2.5 md:px-6 md:py-3 rounded-full select-none transition-colors duration-300 focus:outline-none"
        style={{
          background: 'rgba(255,255,255,0.08)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Services
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 pt-4 w-64 transition-all duration-300 origin-top-right ${
          open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-2 flex flex-col gap-1">
          {services.map((service) => (
            <Link
              key={service.path}
              to={service.path}
              className="block px-4 py-3 text-white rounded-lg transition-colors font-body text-sm font-medium"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenciesMenu;
