import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import PersonalIntro from './PersonalIntro';
import ProductShowcase from './ProductShowcase';
import Projects from './Projects';
import Clients from './Clients';
import Footer from './Footer';

const Home: React.FC = () => {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    return (
        <div className="relative min-h-screen bg-[#1A1A1A] selection:bg-[#9BE12C] selection:text-black">
            <main>
                {/* Section 1: Hero Impact with Parallax */}
                <Hero />

                {/* Sticky Header Bridge */}
                <Header />

                {/* Section 2: Personal Intro (Brand Color) */}
                <PersonalIntro />

                {/* Section 3: Product Showcase (Dark Mode) */}
                <ProductShowcase />

                {/* Section 3.25: Projects (Horizontal Slider) */}
                <Projects />

                {/* Section 3.5: Clients (Happy Hoomans style) */}
                {/* <Clients /> */}

            </main>

            {/* Footer */}
            <Footer />

            <style>{`
        .outline-text {
            color: transparent;
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 40s linear infinite;
            display: flex;
            width: fit-content;
        }
      `}</style>
        </div>
    );
};

export default Home;
