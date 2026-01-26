
import React from 'react';
import { Play } from 'lucide-react';

const PersonalIntro: React.FC = () => {
  return (
    <section className="bg-[#9BE12C] text-black pb-24 pt-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        {/* Artistic Masked Image */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-black/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-2xl transition-transform duration-500">
            <img
              src="/second-section.webp"
              alt="THE BRNE Team"
              className="w-full h-full object-cover grayscale-0"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full p-10 stroke-black opacity-20" viewBox="0 0 100 100">
                <circle cx="30" cy="30" r="15" fill="none" strokeWidth="0.5" />
                <circle cx="70" cy="60" r="20" fill="none" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-6xl md:text-8xl leading-[0.9] uppercase tracking-tighter">
            Hey, we're <br /> THE BRNE
          </h2>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="text-lg md:text-xl font-medium leading-relaxed font-body">
                We're a modern agency and media house breaking down the latest in the Creator Economy.
              </p>
            </li>
            <li className="flex gap-4">
              <div className="mt-2 w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="text-lg md:text-xl font-medium leading-relaxed font-body">
                We've spent 10+ years scaling digital brands. We build and grow creator-led businesses that define the next generation of media.
              </p>
            </li>
          </ul>

          <div className="pt-4">
            <button className="group flex items-center gap-4 bg-black text-white px-8 py-3 rounded-full font-heading text-2xl uppercase tracking-wider transition-all shadow-xl btn-bubble-effect btn-bubble-green">
              <div className="bg-[#9BE12C] text-black p-2 rounded-full group-hover:scale-110 transition-transform">
                <Play fill="currentColor" size={20} />
              </div>
              <span>Get to know us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalIntro;
