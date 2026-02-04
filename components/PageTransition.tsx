import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayLocation, setDisplayLocation] = useState(location);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setIsTransitioning(true);
            window.scrollTo(0, 0); // Ensure scroll to top on route change

            // Minimum loading time
            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setIsTransitioning(false);
            }, 800); // Increased a bit to ensuring smooth transition

            return () => clearTimeout(timer);
        }
    }, [location, displayLocation]);

    return (
        <>
            {/* Loading Overlay with Spinning Logo */}
            <div
                className={`fixed inset-0 z-[9999] bg-[#1A1A1A] flex items-center justify-center transition-opacity duration-500 ${isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="relative">
                    {/* Spinning Logo */}
                    <div className="w-24 h-24 md:w-32 md:h-32 animate-spin-slow">
                        <div className="w-full h-full rounded-full border-4 border-transparent border-t-[#9BE12C] border-r-[#9BE12C]" />
                    </div>

                    {/* Center Logo/Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-heading text-2xl md:text-3xl font-bold text-[#9BE12C] animate-pulse">
                            BRNE
                        </span>
                    </div>
                </div>
            </div>

            {/* Page Content with Fade Transition */}
            <div
                className={`transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {children}
            </div>

            <style>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
            `}</style>
        </>
    );
};

export default PageTransition;
