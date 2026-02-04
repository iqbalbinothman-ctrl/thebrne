import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface ProjectDetail {
    id: number;
    brand: string;
    date: string;
    year: string;
    category: string;
    description: string;
    challenge: string;
    solution: string;
    images: string[];
}

const PROJECT_DETAILS: { [key: string]: ProjectDetail } = {
    'kroma': {
        id: 1,
        brand: 'KROMA',
        date: '11.25',
        year: '2025',
        category: 'Brand Identity',
        description: 'A bold exploration of color theory meets minimalist design. KROMA represents the future of visual communication through innovative brand experiences.',
        challenge: 'Creating a brand identity that stands out in a saturated market while maintaining timeless appeal and versatility across all touchpoints.',
        solution: 'We developed a dynamic color system with a modular logo that adapts to different contexts, ensuring consistency while allowing creative flexibility.',
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
        date: '10.25',
        year: '2025',
        category: 'Photography & Art Direction',
        description: 'Luxury redefined through elegant visual storytelling. A premium photography studio that captures moments with sophistication.',
        challenge: 'Establishing a premium brand presence that appeals to high-end clients while maintaining approachability.',
        solution: 'Created a refined visual language combining classic elegance with contemporary edge, supported by a cohesive brand narrative.',
        images: [
            'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1000&fit=crop',
        ]
    },
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
                        <div className="space-y-8">
                            {/* Back Link */}
                            <Link
                                to="/portfolio"
                                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider hover:text-[#9BE12C] transition-colors group"
                            >
                                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                                Back to Projects
                            </Link>

                            {/* Project Title */}
                            <div>
                                <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                                    {project.brand}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500 uppercase tracking-wider">
                                    <span>{project.year}</span>
                                    <span>•</span>
                                    <span>{project.category}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-3">
                                        Overview
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-3">
                                        Challenge
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {project.challenge}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-3">
                                        Solution
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {project.solution}
                                    </p>
                                </div>
                            </div>

                            {/* Project Meta */}
                            <div className="pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-wider text-xs mb-1">Year</p>
                                        <p className="font-semibold">{project.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 uppercase tracking-wider text-xs mb-1">Category</p>
                                        <p className="font-semibold">{project.category}</p>
                                    </div>
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
                <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
                    Have a project<br />in mind?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Let's create something extraordinary together.
                </p>
                <button className="bg-[#9BE12C] text-black px-8 py-4 rounded-full font-heading text-lg uppercase tracking-wider hover:bg-white transition-all">
                    Get in Touch
                </button>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ProjectDetailPage;
