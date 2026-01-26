import React from 'react';

// Placeholder list of clients
const CLIENTS = [
    "SkyWorld", "UNICEF", "Isetan", "Mamee", "Hush Puppies", "Manitou", "Cosmic",
    "Essilor", "Suria KLCC", "Mednefits", "Sime Darby", "Shell", "Sunway", "Tamasuk",
    "Sol Estate", "Ranhill", "Sunway College", "Vitagen", "AISM", "Bad Lab", "Bosch",
    "KDU", "Principal", "SHL"
];

// Helper to chunk array
const chunkArray = (arr: string[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

// Split into 4 rows (approx 6 items each)
const ROW_DATA = chunkArray(CLIENTS, Math.ceil(CLIENTS.length / 4));

const Clients: React.FC = () => {
    return (
        <section className="bg-[#1A1A1A] py-24 relative overflow-hidden flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center w-full z-10 relative">
                <div className="inline-block px-6 py-2 rounded-full border border-[#9BE12C] text-[#9BE12C] font-body font-bold text-sm tracking-widest uppercase mb-12">
                    Clients
                </div>
                <h2 className="font-heading text-5xl md:text-8xl mb-16 text-white uppercase tracking-tighter">
                    Our Valued <span className="text-[#9BE12C]">—</span> Partners
                </h2>
            </div>

            <div className="w-full space-y-6 md:space-y-10">
                {ROW_DATA.map((rowClients, rowIndex) => {
                    // Create a base set that is definitely wide enough (repeat original chunk 4 times)
                    const BASE_SET = [...rowClients, ...rowClients, ...rowClients, ...rowClients];

                    return (
                        <div key={rowIndex} className="flex relative overflow-hidden w-full">
                            {/* Marquee Track Container */}
                            <div
                                className={`flex gap-6 md:gap-10 w-max ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                            >
                                {/* Render the Base Set twice to create the infinite loop window */}
                                {[...BASE_SET, ...BASE_SET].map((client, i) => (
                                    <div
                                        key={`${rowIndex}-${i}`}
                                        className="group flex-shrink-0 w-32 h-32 md:w-44 md:h-44 bg-white rounded-full flex items-center justify-center p-6 transition-transform hover:scale-105 duration-300 hover:shadow-[0_0_30px_rgba(155,225,44,0.3)]"
                                    >
                                        <span className="font-heading text-black text-center text-sm md:text-lg leading-tight uppercase">
                                            {client}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
        /* Mobile speed adj */
        @media (max-width: 768px) {
           .animate-marquee, .animate-marquee-reverse {
             animation-duration: 30s;
           }
        }
        .w-max {
            width: max-content;
        }
      `}</style>
        </section>
    );
};

export default Clients;
