import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PROJECTS = [
    { id: 1, brand: 'SALOMA KUALA LUMPUR', date: '2025', image: '/saloma-website.png', logo: '/saloma-logo.png', slug: 'saloma-kuala-lumpur', imagePosition: 'object-top' },
    { id: 2, brand: 'KROMA', date: '11.25', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop', slug: 'kroma' },
    { id: 3, brand: 'VELVET STUDIOS', date: '10.25', image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&h=600&fit=crop', slug: 'velvet-studios' },
    { id: 4, brand: 'NEXUS BRANDS', date: '09.25', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop', slug: 'nexus-brands' },
    { id: 5, brand: 'AURORA CO', date: '08.25', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop', slug: 'aurora-co' },
    { id: 6, brand: 'LUMINA DESIGN', date: '07.25', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop', slug: 'lumina-design' },
    { id: 7, brand: 'PULSE CREATIVE', date: '06.25', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop', slug: 'pulse-creative' },
    { id: 8, brand: 'ZENITH GROUP', date: '05.25', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop', slug: 'zenith-group' },
    { id: 9, brand: 'VERTEX MEDIA', date: '04.25', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop', slug: 'vertex-media' },
    { id: 10, brand: 'ECHO BRANDS', date: '03.25', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop', slug: 'echo-brands' },
    { id: 11, brand: 'NOVA STUDIO', date: '02.25', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=700&fit=crop', slug: 'nova-studio' },
    { id: 12, brand: 'PRISM AGENCY', date: '01.25', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop', slug: 'prism-agency' },
    { id: 13, brand: 'CIPHER LABS', date: '12.24', image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&h=600&fit=crop', slug: 'cipher-labs' },
    { id: 14, brand: 'BLOOM COLLECTIVE', date: '11.24', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=700&fit=crop', slug: 'bloom-collective' },
    { id: 15, brand: 'AXIS DESIGN', date: '10.24', image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&h=600&fit=crop', slug: 'axis-design' },
    { id: 16, brand: 'FORGE STUDIOS', date: '09.24', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&h=800&fit=crop', slug: 'forge-studios' },
    { id: 17, brand: 'MAVEN CREATIVE', date: '08.24', image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=700&fit=crop', slug: 'maven-creative' },
];

const PortfolioPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 page-padding">
                <div className="text-center">
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

            {/* Projects Grid - 2-Column Image Cards */}
            <section className="pb-24 page-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {PROJECTS.map((project: any) => (
                        <Link
                            key={project.id}
                            to={`/portfolio/${project.slug}`}
                            className="group cursor-pointer"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {/* Project Image Container */}
                            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 mb-4">
                                {/* Project Image */}
                                <img
                                    src={project.image}
                                    alt={project.brand}
                                    className={`w-full h-full object-cover transition-all duration-500 ${project.imagePosition || 'object-center'}`}
                                />

                                {/* Hover Overlay with Glassmorphic Blur */}
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="text-center">
                                        {project.logo ? (
                                            <img
                                                src={project.logo}
                                                alt={`${project.brand} Logo`}
                                                className="w-48 h-auto object-contain drop-shadow-lg"
                                            />
                                        ) : (
                                            <div className="font-heading text-5xl md:text-6xl font-bold text-white uppercase tracking-tight drop-shadow-lg">
                                                {project.brand}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info Below Image */}
                            <div className="flex items-center justify-between">
                                {/* Brand Name - Left */}
                                <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#9BE12C] transition-colors">
                                    {project.brand}
                                </h3>

                                {/* Date - Right */}
                                <p className="text-gray-500 text-sm md:text-base font-mono">
                                    {project.date}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            < Footer />
        </div >
    );
};

export default PortfolioPage;
