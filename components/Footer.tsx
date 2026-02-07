
import React from 'react';
import { Youtube, Instagram, Twitter, MessageCircle, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] pt-24 pb-0 overflow-hidden">
      <div className="page-padding">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-xl">
            <h2 className="font-heading text-6xl md:text-8xl mb-8 leading-[0.85] uppercase tracking-tighter text-white">
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


          </div>
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-24 opacity-70 hover:opacity-100 transition-opacity duration-500">
          <img src="/assets/logos/google-partner.png" alt="Google Partner" className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-all" />
          <img src="/assets/logos/meta-partner.png" alt="Meta Business Partner" className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-all" />
          <img src="/assets/logos/tiktok-partner.png" alt="TikTok Marketing Partner" className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-all" />
          <img src="/assets/logos/shopee.svg" alt="Shopee" className="h-8 md:h-10 w-auto object-contain brightness-0 invert transition-all" />
          <img src="/assets/logos/google-ads.png" alt="Google Ads" className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-all" />
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
      <div className="relative w-full overflow-hidden flex justify-center items-end bg-[#1A1A1A] select-none pointer-events-none">
        <img
          src="/logosvgAsset 13logo.svg"
          alt="THE BRNE Logo"
          className="w-full h-auto translate-y-[15%] scale-110 origin-bottom"
          style={{
            maxHeight: '60vh',
            minWidth: '100vw'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent z-10" />
      </div>
    </footer>
  );
};

export default Footer;
