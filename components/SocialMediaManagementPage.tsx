import React from 'react';
import Header from './Header';
import Footer from './Footer';

const SocialMediaManagementPage: React.FC = () => {
    const servicesLeft = [
        'Content Ideas',
        'Trend Monitoring',
        'Feed Aesthetics',
        'Caption Writing',
        'Meme Strategy'
    ];

    const servicesRight = [
        'Reels & TikTok',
        'Short-Form Video',
        'Comment Management',
        'Performance Tracking',
        'Content Optimisation'
    ];

    return (
        <div className="min-h-screen bg-[#1A1A1A] text-white selection:bg-[#9BE12C] selection:text-black font-sans">
            <Header />

            <main className="pt-32 pb-20 page-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-12">
                        {/* LEFT TOP — Image */}
                        <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-gray-800 rounded-lg overflow-hidden relative group">
                            {/* Placeholder Image - Meme/Social/Bold Vibe */}
                            <img
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
                                alt="Social Media Content"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                            {/* Overlay Text */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white/90 text-sm md:text-base font-medium tracking-wide backdrop-blur-sm bg-black/30 p-2 rounded-md inline-block">
                                    Meme-style posts, bold captions, scroll-stopping feeds
                                </p>
                            </div>
                        </div>

                        {/* LEFT BOTTOM — Description */}
                        <div className="max-w-xl mt-auto">
                            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-200">
                                We manage social media for brands that want <span className="text-[#9BE12C]">attention</span>—not silence. From memes to meaningful content, we help you stay <span className="text-[#9BE12C]">relevant</span>, <span className="text-[#9BE12C]">relatable</span>, and impossible to ignore.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-12 lg:justify-between">
                        {/* RIGHT TOP — Big Title */}
                        <div className="mt-4 lg:mt-0">
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white/90 mb-2">
                                SOCIAL MEDIA<br />
                                <span className="text-[#9BE12C]">BUT LOUDER</span>
                            </h1>
                            {/* Alt Title as Subtext/Stroke */}
                            <h2 className="font-heading text-4xl md:text-5xl text-transparent outline-text stroke-white/20 opacity-50 mt-2">
                                POST LIKE YOU MEAN IT
                            </h2>
                        </div>

                        {/* RIGHT BOTTOM — Services */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-auto pt-8 border-t border-white/10">
                            {/* Left Service Column */}
                            <div>
                                <h3 className="text-sm font-bold tracking-widest text-[#9BE12C] uppercase mb-6">Strategy & Content</h3>
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
                                <h3 className="text-sm font-bold tracking-widest text-[#9BE12C] uppercase mb-6">Growth & Engagement</h3>
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

export default SocialMediaManagementPage;
