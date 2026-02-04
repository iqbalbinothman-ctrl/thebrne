import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PROJECTS = [
    {
        id: 1,
        title: 'Brand Identity Design',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 2,
        title: 'Fashion Photography',
        category: 'Photography',
        image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&h=600&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 3,
        title: 'Portrait Series',
        category: 'Art Direction',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 4,
        title: 'UI/UX Design',
        category: 'Digital',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 5,
        title: 'Creative Campaign',
        category: 'Marketing',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 6,
        title: 'Illustration Project',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 7,
        title: 'Fashion Editorial',
        category: 'Photography',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop',
        span: 'row-span-2'
    },
    {
        id: 8,
        title: 'Visual Identity',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop',
        span: 'row-span-2'
    }
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

            <style>{`
                @media (min-width: 1024px) {
                    .auto-rows-auto {
                        grid-auto-rows: 300px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PortfolioPage;
