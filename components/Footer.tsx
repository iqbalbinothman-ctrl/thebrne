
import React from 'react';
import { Youtube, Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-xl">
            <h2 className="font-heading text-6xl md:text-8xl mb-8 leading-[0.85] uppercase tracking-tighter">
              We'd love to <br /> hear from you
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-body">
              Have a question for THE BRNE? Want to suggest a collaboration? Interested in partnering with us? Just want to say hi? We've got a form for that.
            </p>
            <button className="group flex items-center gap-3 bg-white text-black pl-8 pr-2 py-3 rounded-full font-heading text-2xl uppercase tracking-wider transition-all btn-bubble-effect btn-bubble-green">
              <span>Get in touch</span>
              <div className="bg-black text-white p-3 rounded-full group-hover:bg-[#9BE12C] group-hover:text-black transition-colors">
                <ArrowRight size={24} />
              </div>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-16 md:gap-32 w-full md:w-auto">
            {/* Social Icons */}
            <div className="flex md:flex-col gap-6">
              <a href="#" className="p-3 bg-[#222] rounded-full text-white hover:bg-red-600 transition-colors"><Youtube size={24} /></a>
              <a href="#" className="p-3 bg-[#222] rounded-full text-white hover:bg-pink-600 transition-colors"><Instagram size={24} /></a>
              <a href="#" className="p-3 bg-[#222] rounded-full text-white hover:bg-blue-400 transition-colors"><Twitter size={24} /></a>
              <a href="#" className="p-3 bg-[#222] rounded-full text-white hover:bg-[#5865F2] transition-colors"><MessageCircle size={24} /></a>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-heading text-[#9BE12C] uppercase text-2xl tracking-wider mb-6">Explore</h4>
              <ul className="space-y-4 font-body text-lg font-semibold">
                <li><a href="#" className="hover:text-[#9BE12C] transition-colors">How to be famous in 30 days</a></li>
                <li><a href="#" className="hover:text-[#9BE12C] transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-[#9BE12C] transition-colors">VIP Consult</a></li>
                <li><a href="#" className="hover:text-[#9BE12C] transition-colors">Meet Up</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Divider/Copyright */}
        <div className="pt-12 border-t border-white/5 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-600 font-body">
            <span>© 2024 THE BRNE. All Rights Reserved.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Giant Branding Statement - Optimized to 25.5vw for "THE BRNE" in Bebas Neue to hit edges perfectly */}
      {/* Bottom Giant Branding Statement - Optimized SVG Logo */}
      <div className="w-full overflow-hidden flex justify-center items-end bg-[#1A1A1A] select-none pointer-events-none">
        <img
          src="/logosvgAsset 13logo.svg"
          alt="THE BRNE Logo"
          className="min-w-full w-screen h-auto translate-y-[10%] scale-105 origin-bottom"
          style={{
            maxHeight: '50vh',
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
