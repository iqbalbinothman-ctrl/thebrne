import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Header from './Header';

const PortfolioPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#9BE12C] selection:text-black">
            {/* Header */}
            <Header />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

                    {/* Left Column - Brand Info */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Logo/Brand */}
                        <div className="space-y-6">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight">
                                TheBRNE
                            </h1>

                            {/* Availability Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5">
                                <div className="w-2 h-2 bg-[#9BE12C] rounded-full animate-pulse" />
                                <span className="text-sm uppercase tracking-wider text-gray-400">
                                    Available for new projects
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                            Creative chaos<br />
                            crafted from<br />
                            TheBRNE
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
                            We're creative studio seeking to provide imaginative digital answers to your needs. No fluff, just real results that are impossible to ignore.
                        </p>

                        {/* Contact Email */}
                        <a
                            href="mailto:hello@thebrne.com"
                            className="inline-block text-lg md:text-xl text-gray-300 hover:text-[#9BE12C] transition-colors underline decoration-gray-600 hover:decoration-[#9BE12C]"
                        >
                            hello@thebrne.com
                        </a>

                        {/* CTA Button */}
                        <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-heading text-lg uppercase tracking-wider transition-all hover:bg-[#9BE12C] hover:shadow-2xl hover:shadow-[#9BE12C]/20 btn-bubble-effect btn-bubble-green mt-8">
                            <span>Book a Free Call</span>
                            <div className="bg-black text-white p-2 rounded-full group-hover:bg-black transition-colors">
                                <ArrowUpRight size={20} />
                            </div>
                        </button>
                    </div>

                    {/* Right Column - Bento Grid */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-4 md:gap-6 h-full">

                            {/* Card 1 - Services */}
                            <div className="col-span-1 row-span-1 bg-[#1A1A1A] rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-[#9BE12C]/30 transition-all group cursor-pointer">
                                <div className="h-full flex flex-col justify-end">
                                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                        How can<br />
                                        we help.<br />
                                        <span className="text-white font-semibold">Services.</span>
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 - Number 01 */}
                            <div className="col-span-1 row-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-[#9BE12C]/30 transition-all group cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#9BE12C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative h-full flex items-center justify-center">
                                    <span className="font-heading text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold leading-none text-white/10 group-hover:text-white/20 transition-colors select-none">
                                        01
                                    </span>
                                </div>
                                {/* Geometric Shape */}
                                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-20">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 transform rotate-45 translate-x-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Card 3 - Number 02 */}
                            <div className="col-span-1 row-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-[#9BE12C]/30 transition-all group cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#9BE12C]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative h-full flex items-center justify-center">
                                    <span className="font-heading text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold leading-none text-white/10 group-hover:text-white/20 transition-colors select-none">
                                        02
                                    </span>
                                </div>
                            </div>

                            {/* Card 4 - Projects */}
                            <div className="col-span-1 row-span-1 bg-[#1A1A1A] rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-[#9BE12C]/30 transition-all group cursor-pointer">
                                <div className="h-full flex flex-col justify-end">
                                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                        Curated<br />
                                        selection.<br />
                                        <span className="text-white font-semibold">Projects.</span>
                                    </p>
                                </div>
                            </div>

                            {/* Card 5 - Featured Work (Full Width) */}
                            <div className="col-span-2 row-span-1 bg-gradient-to-r from-[#1A1A1A] via-[#202020] to-[#1A1A1A] rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 border border-white/5 hover:border-[#9BE12C]/30 transition-all group cursor-pointer overflow-hidden relative">
                                <div className="absolute inset-0 opacity-5">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" className="text-[#9BE12C]" />
                                    </svg>
                                </div>
                                <div className="relative flex items-center justify-between">
                                    <div className="space-y-2">
                                        <p className="text-sm uppercase tracking-widest text-gray-500">Featured Work</p>
                                        <h3 className="font-heading text-3xl md:text-5xl font-bold">
                                            Recent<br />
                                            <span className="text-[#9BE12C]">Creations</span>
                                        </h3>
                                    </div>
                                    <div className="bg-[#9BE12C] text-black w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                                        <ArrowUpRight size={28} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Section - Stats or Additional Info */}
                <div className="mt-20 md:mt-32 pt-12 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { number: '500+', label: 'Projects Completed' },
                            { number: '50+', label: 'Happy Clients' },
                            { number: '10+', label: 'Years Experience' },
                            { number: '99%', label: 'Client Satisfaction' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center md:text-left group">
                                <div className="font-heading text-4xl md:text-6xl font-bold text-[#9BE12C] mb-2 group-hover:scale-110 transition-transform">
                                    {stat.number}
                                </div>
                                <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
