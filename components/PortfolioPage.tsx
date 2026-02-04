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

            {/* Projects Grid - Masonry Layout */}
            <section className="pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                className={`group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#9BE12C]/20 ${index % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' :
                                    index % 3 === 0 ? 'md:row-span-2' :
                                        'row-span-1'
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Project Info - Always Visible */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 transition-transform duration-500">
                                        <p className="text-xs uppercase tracking-widest text-gray-300 mb-2">
                                            {project.category}
                                        </p>
                                        <h3 className="font-heading text-2xl md:text-3xl font-bold">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* View Project Button - Shows on Hover */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <div className="bg-[#9BE12C] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                            →
                                        </div>
                                    </div>
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-bold">
                                    #{String(project.id).padStart(2, '0')}
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
