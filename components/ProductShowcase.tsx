
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { id: 1, title: 'Web Design' },
  { id: 2, title: 'Branding' },
  { id: 3, title: 'Social Media' },
  { id: 4, title: 'Digital Marketing' },
  { id: 5, title: 'Video Content' },
];

const ProductShowcase: React.FC = () => {
  return (
    <section className="bg-black py-0 relative overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative border-b border-white/20 last:border-b-0 py-12 md:py-20 cursor-pointer transition-colors hover:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-5xl md:text-9xl w-full uppercase tracking-tighter text-white transition-transform duration-500 group-hover:translate-x-4">
                  {service.title}
                </h2>

                {/* Arrow Icon on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={48} className="text-white md:w-24 md:h-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
