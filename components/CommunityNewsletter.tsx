
import React from 'react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

const CommunityNewsletter: React.FC = () => {
    return (
        <section className="bg-[#1A1A1A] py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Newsletter Card */}
                <div className="relative group overflow-hidden rounded-3xl bg-[#222] border border-white/10 p-8 md:p-12 h-[500px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Newsletter mockup" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#9BE12C] rounded-xl flex items-center justify-center mb-6 text-black">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-heading text-4xl md:text-5xl mb-4 leading-[0.9] uppercase tracking-tight">Want the latest creator news?</h3>
                        <p className="text-gray-400 max-w-sm mb-8 font-body">
                            Stay ahead of the curve with insights from THE BRNE, delivered straight to your inbox.
                        </p>
                    </div>
                    <div className="relative z-10 flex gap-2 p-1 bg-black/40 rounded-full border border-white/10 focus-within:border-[#9BE12C] transition-colors">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-transparent border-none outline-none flex-1 px-6 text-white placeholder:text-gray-600 font-medium font-body"
                        />
                        <button className="bg-white text-black px-6 py-3 rounded-full font-heading text-xl uppercase tracking-wider transition-colors flex items-center gap-2 btn-bubble-effect btn-bubble-green">
                            <span>Subscribe</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Discord Card */}
                <div className="relative group overflow-hidden rounded-3xl bg-[#222] border border-white/10 p-8 md:p-12 h-[500px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none group-hover:opacity-40 transition-all duration-700">
                        <img src="https://images.unsplash.com/photo-1614680376593-902f74cc0d41?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Discord community" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center mb-6 text-white">
                            <MessageCircle size={24} />
                        </div>
                        <h3 className="font-heading text-4xl md:text-5xl mb-4 leading-[0.9] uppercase tracking-tight text-[#9BE12C]">Get in on our Discord</h3>
                        <p className="text-gray-400 max-w-sm mb-8 font-body">
                            Join THE BRNE community to share insights and build together with the next generation of creators.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <button className="bg-[#5865F2] text-white px-8 py-4 rounded-full font-heading text-2xl uppercase tracking-wider transition-all flex items-center gap-3 shadow-lg btn-bubble-effect btn-bubble-white">
                            <MessageCircle size={24} />
                            <span>Join Discord</span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CommunityNewsletter;
