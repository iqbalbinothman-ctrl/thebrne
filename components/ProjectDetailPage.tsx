import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface ProjectDetail {
    id: number;
    brand: string;
    year: string;
    description: string;
    scope: string;
    timeline: string;
    liveUrl?: string; // Optional live link
    images: string[];
}

const PROJECT_DETAILS: { [key: string]: ProjectDetail } = {
    'kroma': {
        id: 1,
        brand: 'KROMA®',
        year: '02.25',
        description: 'Kroma is a social-first creative agency built around bold ideas, fast culture, and playful storytelling. They came to us for a brand and web refresh that better reflected their upbeat energy, creative range, and knack for turning everyday moments into viral campaigns.',
        scope: 'Branding, Motion',
        timeline: '9 weeks',
        liveUrl: '#',
        images: [
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
        ]
    },
    'velvet-studios': {
        id: 2,
        brand: 'VELVET STUDIOS',
        year: '10.25',
        description: 'Luxury redefined through elegant visual storytelling. A premium photography studio that captures moments with sophistication, blending classic elegance with contemporary edge.',
        scope: 'Art Direction, Web Design',
        timeline: '6 weeks',
        liveUrl: '#',
        images: [
            'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1000&fit=crop',
        ]
    },
    // Add default placeholders for other projects to prevent errors if clicked
    'nexus-brands': {
        id: 3, brand: 'NEXUS BRANDS', year: '09.25', description: 'A futuristic tech brand identity focused on connectivity.', scope: 'Identity, UI/UX', timeline: '8 weeks', liveUrl: '#',
        images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop']
    },
    'aurora-co': {
        id: 4, brand: 'AURORA CO', year: '08.25', description: 'Sustainable lifestyle brand packaging and digital presence.', scope: 'Packaging, Web', timeline: '12 weeks', liveUrl: '#',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop']
    }
};

const MORE_PROJECTS = [
    { id: 3, brand: 'NEXUS BRANDS', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', slug: 'nexus-brands' },
    { id: 4, brand: 'AURORA CO', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', slug: 'aurora-co' },
];

const ProjectDetailPage: React.FC = () => {
    const { projectSlug } = useParams<{ projectSlug: string }>();
    const project = projectSlug ? PROJECT_DETAILS[projectSlug] : null;

    if (!project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/portfolio" className="text-[#9BE12C] hover:underline">
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <Header />

            {/* Main Content - Split Layout */}
            <div className="pt-20 md:pt-24 px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column - Fixed Project Details */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                        <div className="space-y-12">
                            {/* Project Title */}
                            <div>
                                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.85]">
                                    {project.brand}
                                </h1>

                                {/* Description */}
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Minimalist Info Table */}
                            <div className="pt-8">
                                {/* Year Row */}
                                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                    <span className="text-gray-500">Year</span>
                                    <span className="font-medium">{project.year}</span>
                                </div>

                                {/* Scope Row */}
                                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                    <span className="text-gray-500">Scope</span>
                                    <span className="font-medium text-right max-w-[60%]">{project.scope}</span>
                                </div>

                                {/* Timeline Row */}
                                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                    <span className="text-gray-500">Timeline</span>
                                    <span className="font-medium">{project.timeline}</span>
                                </div>

                                {/* Live Project Row */}
                                <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 group cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="text-gray-500">Live project</span>
                                    <a href={project.liveUrl || '#'} className="flex items-center gap-2 font-medium group-hover:text-[#9BE12C] transition-colors">
                                        Preview
                                        <span className="text-xl leading-none">+</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Scrollable Images */}
                    <div className="lg:col-span-8">
                        <div className="space-y-8 md:space-y-12">
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl bg-gray-100"
                                >
                                    <img
                                        src={image}
                                        alt={`${project.brand} ${index + 1}`}
                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* More Projects Section */}
            <section className="py-24 px-6 md:px-12 mt-24 border-t border-gray-200">
                <div className="mb-12">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                        More Projects
                    </h2>
                    <p className="text-gray-500">Explore our other work</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {MORE_PROJECTS.map((proj) => (
                        <Link
                            key={proj.id}
                            to={`/portfolio/${proj.slug}`}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gray-100 mb-3">
                                <img
                                    src={proj.image}
                                    alt={proj.brand}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="font-heading text-lg font-bold uppercase tracking-tight group-hover:text-[#9BE12C] transition-colors">
                                {proj.brand}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 bg-[#0A0A0A] text-white text-center">
                <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
                    Have a project<br />in mind?
                </h2>
                <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                    Let's create something extraordinary together.
                </p>
                <button className="bg-[#9BE12C] text-black px-10 py-5 rounded-full font-heading text-xl uppercase tracking-wider hover:bg-white transition-all transform hover:scale-105">
                    Get in Touch
                </button>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
