import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Lottie from "lottie-react";
import animationData from "./digital_marketing.json";
import { useInView } from '../hooks/useInView';

const DigitalMarketingPage: React.FC = () => {
    const [lottieRef, isInView] = useInView({ threshold: 0.1 });

    const servicesLeft = [
        'Trend Analysis',
        'Viral Campaign Ideas',
        'Hook & Copywriting',
        'Paid Ads Strategy',
        'Performance Optimisation'
    ];

    const servicesRight = [
        'Social Media Campaigns',
        'Short-Form Ads',
        'Email Sequences',
        'Audience Targeting',
        'Analytics & Reports'
    ];

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white selection:bg-[#9BE12C] selection:text-black font-sans">
            <Header />

            <main className="pt-20 lg:pt-32 pb-20 page-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-12">
                        {/* LEFT TOP — Mobile Title (Visible only on mobile) */}
                        <div className="block lg:hidden">
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-2">
                                DIGITAL MARKETING<br />
                                <span className="text-[#9BE12C]">THAT WORKS</span>
                            </h1>
                            {/* Alt Title as Subtext/Stroke */}
                            <h2 className="font-heading text-4xl md:text-5xl text-transparent outline-text stroke-white/20 opacity-50 mt-2">
                                CLICK OR MISS OUT
                            </h2>
                        </div>

                        {/* LEFT TOP — Lottie Animation */}
                        <div ref={lottieRef} className="w-full aspect-[4/3] md:aspect-[16/10] bg-gray-800 rounded-lg overflow-hidden relative group">
                            {isInView && (
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    className="w-full h-full"
                                    rendererSettings={{
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }}
                                />
                            )}

                            {/* Overlay Text */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white/90 text-sm md:text-base font-medium tracking-wide backdrop-blur-sm bg-black/30 p-2 rounded-md inline-block">
                                    Performance, conversion & scale
                                </p>
                            </div>
                        </div>

                        {/* LEFT BOTTOM — Description */}
                        <div className="max-w-xl mt-auto">
                            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-200">
                                Digital marketing shouldn’t be boring. We craft scroll-stopping campaigns that make your audience <span className="text-[#9BE12C]">stop</span>, <span className="text-[#9BE12C]">stare</span>, and <span className="text-[#9BE12C]">act</span>. Memes, trends, or straight-up strategy—we’ve got it covered.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-12 lg:justify-between">
                        {/* RIGHT TOP — Big Title (Hidden on mobile) */}
                        <div className="mt-4 lg:mt-0 hidden lg:block">
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-2">
                                DIGITAL MARKETING<br />
                                <span className="text-[#9BE12C]">THAT WORKS</span>
                            </h1>
                            {/* Alt Title as Subtext/Stroke */}
                            <h2 className="font-heading text-4xl md:text-5xl text-transparent outline-text stroke-white/20 opacity-50 mt-2">
                                CLICK OR MISS OUT
                            </h2>
                        </div>

                        {/* RIGHT BOTTOM — Services */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-auto pt-8 border-t border-white/10">
                            {/* Left Service Column */}
                            <div>
                                <h3 className="text-sm font-bold tracking-widest text-[#9BE12C] uppercase mb-6">Strategy & Ideas</h3>
                                <ul className="space-y-4">
                                    {servicesLeft.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-lg md:text-xl text-gray-400 hover:text-white transition-colors duration-300 group cursor-default">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#9BE12C] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Service Column */}
                            <div>
                                <h3 className="text-sm font-bold tracking-widest text-[#9BE12C] uppercase mb-6">Execution & Data</h3>
                                <ul className="space-y-4">
                                    {servicesRight.map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-lg md:text-xl text-gray-400 hover:text-white transition-colors duration-300 group cursor-default">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#9BE12C] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                .outline-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                    color: transparent;
                }
            `}</style>
        </div>
    );
};

export default DigitalMarketingPage;
