
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('/heroimage.webp')`,
          transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
        }}
      />

      {/* Logo Overlay with Parallax and Fade */}
      <div
        className="absolute top-0 left-0 w-full text-center pt-8 md:pt-12 px-4 will-change-transform"
        style={{
          transform: `translateY(-${scrollY * 0.2}px)`,
          opacity: 1 - scrollY / 700
        }}
      >
        <h1 className="font-heading text-6xl md:text-[10rem] lg:text-[15rem] leading-[0.8] tracking-tighter drop-shadow-2xl select-none uppercase">
          THE BRNE
        </h1>
      </div>

      {/* Floating Info Box */}
      <div className="absolute bottom-10 left-6 right-6 md:left-auto md:right-12 md:max-w-sm z-10">
        <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#9BE12C] rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
            <span className="font-heading text-xl uppercase tracking-wide">We Create Unseen.</span>
          </div>
          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed font-body">
            The best work isn't always visible—until it's impossible to ignore. We’re a crew of creative brains crafting strategic chaos for brands that are tired of playing it safe. No fluff, just real results.
          </p>
          <button className="group flex items-center gap-3 bg-white text-black pl-6 pr-2 py-2 rounded-full font-heading text-lg uppercase tracking-wider transition-all btn-bubble-effect btn-bubble-green">
            <span>🔥 Start the Chaos</span>
            <div className="bg-black text-white p-2 rounded-full group-hover:bg-[#9BE12C] group-hover:text-black transition-colors">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
