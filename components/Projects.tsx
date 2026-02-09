import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImageColor } from '../hooks/useImageColor';

const PROJECTS = [
    {
        id: 1,
        title: 'SALOMA KUALA LUMPUR',
        category: 'Website',
        image: '/saloma-frontpage.png',
        date: '2025',
        slug: 'saloma-kuala-lumpur',
        imagePosition: 'object-top'
    },
    {
        id: 2,
        title: 'MILK™',
        category: 'Branding',
        image: '/project-1.jpg',
        date: '26 Jan 2024',
        slug: 'milk'
    },
    {
        id: 3,
        title: 'Glossier®',
        category: 'Branding',
        image: '/project-2.jpg',
        date: '22 Mar 2024',
        slug: 'glossier'
    },
    {
        id: 4,
        title: 'CURAME',
        category: 'Branding',
        image: '/project-3.jpg',
        date: '14 Feb 2024',
        slug: 'curame'
    },
    {
        id: 5,
        title: 'thatsmytype',
        category: 'Branding',
        image: '/project-4.jpg',
        date: '11 Jan 2024',
        slug: 'thatsmytype'
    },
    {
        id: 6,
        title: 'Zurich 2017 Race',
        category: 'Branding',
        image: '/project-5.jpg',
        date: '05 Dec 2023',
        slug: 'zurich-race'
    }
];

const ProjectCard = ({ project }: { project: any }) => {
    // Use fallback white color initially
    const titleColor = useImageColor(project.image, '#FFFFFF');

    return (
        <Link
            to={`/portfolio/${project.slug}`}
            className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center group cursor-pointer block"
        >
            {/* Image Card */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-8 bg-[#222]">
                <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${project.imagePosition || 'object-center'}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Hover Badge */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-[#9BE12C] text-black w-12 h-12 rounded-full flex items-center justify-center">
                        <ArrowUpRight size={24} />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2">
                <p className="text-gray-500 font-body text-sm uppercase tracking-widest">
                    {project.date} — {project.category}
                </p>
                <h3
                    className="font-heading text-3xl md:text-4xl uppercase tracking-tight transition-colors duration-500"
                    style={{ color: titleColor }}
                >
                    {project.title}
                </h3>
            </div>
        </Link>
    );
};

const Projects: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="bg-black text-white py-24 overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-tighter">
                        Projects
                    </h2>
                    <Link to="/portfolio" className="hidden md:flex items-center gap-2 group font-body text-gray-400 hover:text-[#9BE12C] transition-colors">
                        <span className="text-lg uppercase tracking-wider">More +500</span>
                        <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 md:gap-12 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    {/* Spacer for padding right */}
                    <div className="w-1 md:w-12 flex-shrink-0" />
                </div>

                {/* Mobile View More */}
                <div className="md:hidden mt-8 flex justify-center">
                    <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-[#9BE12C]">
                        <span className="uppercase tracking-wider">View All Projects</span>
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default Projects;
