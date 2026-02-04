import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PROJECTS = [
    { id: 1, brand: 'KROMA', date: '11.25' },
    { id: 2, brand: 'VELVET STUDIOS', date: '10.25' },
    { id: 3, brand: 'NEXUS BRANDS', date: '09.25' },
    { id: 4, brand: 'AURORA CO', date: '08.25' },
    { id: 5, brand: 'LUMINA DESIGN', date: '07.25' },
    { id: 6, brand: 'PULSE CREATIVE', date: '06.25' },
    { id: 7, brand: 'ZENITH GROUP', date: '05.25' },
    { id: 8, brand: 'VERTEX MEDIA', date: '04.25' },
    { id: 9, brand: 'ECHO BRANDS', date: '03.25' },
    { id: 10, brand: 'NOVA STUDIO', date: '02.25' },
    { id: 11, brand: 'PRISM AGENCY', date: '01.25' },
    { id: 12, brand: 'CIPHER LABS', date: '12.24' },
    { id: 13, brand: 'BLOOM COLLECTIVE', date: '11.24' },
    { id: 14, brand: 'AXIS DESIGN', date: '10.24' },
    { id: 15, brand: 'FORGE STUDIOS', date: '09.24' },
    { id: 16, brand: 'MAVEN CREATIVE', date: '08.24' },
];

const PortfolioPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
                        Projects.
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We've been busy. Here's a curated selection of our recent work across branding, digital, and creative chaos.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="w-2 h-2 bg-[#9BE12C] rounded-full animate-pulse" />
                        <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
                            500+ Projects Delivered
                        </span>
                    </div>
                </div>
            </section>

            {/* Projects Grid - Simple 2-Column Layout */}
            <section className="pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="group py-8 border-b border-gray-200 hover:border-[#9BE12C] transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    {/* Brand Name */}
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 group-hover:text-[#9BE12C] transition-colors">
                                        {project.brand}
                                    </h3>

                                    {/* Underscore Separator */}
                                    <div className="text-gray-400 text-2xl mb-2">_</div>

                                    {/* Date */}
                                    <p className="text-gray-500 text-lg font-mono">
                                        {project.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#1A1A1A] text-white">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Ready to create<br />
                        something <span className="text-[#9BE12C]">unseen</span>?
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
                        Let's turn your vision into reality. No fluff, just real results that are impossible to ignore.
                    </p>
                    <button className="group inline-flex items-center gap-4 bg-[#9BE12C] text-black px-10 py-5 rounded-full font-heading text-xl uppercase tracking-wider transition-all hover:bg-white hover:shadow-2xl hover:shadow-[#9BE12C]/30">
                        <span>Start Your Project</span>
                        <div className="bg-black text-white p-2 rounded-full group-hover:bg-[#9BE12C] transition-colors">
                            →
                        </div>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PortfolioPage;
