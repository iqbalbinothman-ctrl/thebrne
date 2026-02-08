
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { id: 1, title: 'Branding', description: 'We craft logos and brand systems that leave a lasting impression', link: '/branding' },
  { id: 2, title: 'Development', description: 'Beautiful and functional websites built with purpose and precision', link: '/website-development' },
  { id: 3, title: 'Social Media', description: 'Strategic content and visual storytelling that build connection and drive engagement', link: '/social-media-management' },
  { id: 4, title: 'Digital Marketing', description: 'Data-driven campaigns designed to attract, convert, and scale your brand', link: '/digital-marketing' },
  { id: 5, title: 'Video Content', description: 'Cinematic visuals and storytelling that capture attention and elevate your message', link: '/video-content-production' },
];

const ProductShowcase: React.FC = () => {
  return (
    <section className="bg-black py-0 relative overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="block group relative border-b border-white/20 last:border-b-0 py-12 md:py-16 cursor-pointer transition-colors hover:bg-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center justify-between md:justify-start gap-4 w-full md:w-1/2">
                  <h2 className="font-heading text-5xl md:text-8xl uppercase tracking-tighter text-white transition-transform duration-500 group-hover:translate-x-4">
                    {service.title}
                  </h2>
                  <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 w-12 h-12 md:w-24 md:h-24" />
                </div>

                {/* Service Description */}
                <div className="w-full md:w-1/2 opacity-60 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 text-white font-body text-lg md:text-xl leading-relaxed max-w-md ml-auto md:text-right">
                  {service.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
