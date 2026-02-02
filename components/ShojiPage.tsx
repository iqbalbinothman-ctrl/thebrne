import React, { useState, useEffect } from 'react';
import { Timeline } from './shoji/Timeline';
import { ConfidentialDeck } from './shoji/ConfidentialDeck';
import { PdfDocument } from './shoji/PdfDocument';
import { motion, useScroll, useSpring } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NDAModal } from './shoji/NDAModal';
import { Download } from 'lucide-react';

const ShojiPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // PDF Generation State
    const [isNDAModalOpen, setIsNDAModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'shoji2026') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password');
        }
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            // Get the PDF container with PdfDocument component
            const container = document.getElementById('pdf-print-container');
            if (!container) {
                throw new Error('PDF container not found');
            }

            // Get all individual pages from PdfDocument
            const pages = container.querySelectorAll('.print-page');
            if (pages.length === 0) {
                throw new Error('No print pages found');
            }

            // A4 Landscape dimensions (842 x 595 points)
            const pdf = new jsPDF({
                orientation: 'l',
                unit: 'pt',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Capture each page individually with high quality
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i] as HTMLElement;

                // High-resolution capture
                const canvas = await html2canvas(page, {
                    scale: 2,              // Higher resolution
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: 1123,           // A4 landscape width in pixels
                    height: 794,           // A4 landscape height in pixels
                    windowWidth: 1440      // Desktop viewport
                });

                // Convert to PNG for better quality
                const imgData = canvas.toDataURL('image/png');

                if (i > 0) {
                    pdf.addPage();
                }

                // Add image to PDF, fit to page
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            }

            pdf.save('THEBRNE_TigerShoji_Marketing2026_CONFIDENTIAL.pdf');

        } catch (err) {
            console.error("PDF Generation failed", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGenerating(false);
            setIsNDAModalOpen(false);
        }
    };

    // Anti-Screenshot / Privacy Protection


    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isScrolled, setIsScrolled] = useState(false);
    const [currentView, setCurrentView] = useState<'timeline' | 'deck'>('timeline');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans text-black">
                <form onSubmit={handleLogin} className="bg-white p-10 border border-gray-200 shadow-xl w-full max-w-sm text-center">
                    <div className="mb-6">
                        <div className="mb-4 flex justify-center items-center">
                            {/* Adjusted with ml-1 to visually center the circle icon, compensating for the TM mark */}
                            <img src="/logo-dark.svg" alt="THE BRNE" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-xl font-bold uppercase mb-1">Confidential</h2>
                        <p className="text-xs text-gray-400 uppercase">Internal Access Only</p>
                    </div>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-b-2 border-gray-200 p-2 text-center text-lg outline-none focus:border-black transition-colors mb-6 bg-transparent"
                        placeholder="ENTER PASSWORD"
                    />
                    {error && <p className="text-red-500 mb-6 text-xs font-bold uppercase">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-zinc-800 transition-all text-xs"
                    >
                        Unlock Strategy
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans">



            <NDAModal
                isOpen={isNDAModalOpen}
                onClose={() => !isGenerating && setIsNDAModalOpen(false)}
                onConfirm={handleDownload}
                isGenerating={isGenerating}
            />

            {/* Hidden Print Container for PDF Generation - A4 Landscape Width */}
            <div
                id="pdf-print-container"
                className="fixed left-[-9999px] top-0 w-[1123px] bg-white z-[99999] overflow-hidden"
            >
                {/* Watermark Overlay */}
                <div className="absolute inset-0 z-[50] pointer-events-none flex flex-wrap content-start items-start opacity-[0.03] overflow-hidden select-none">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="w-[300px] h-[300px] flex items-center justify-center -rotate-45 transform">
                            <span className="text-3xl font-black text-black whitespace-nowrap">BRNE AGENCY</span>
                        </div>
                    ))}
                </div>

                {/* Content - Using dedicated PDF Layout */}
                <div className="relative z-10 bg-white">
                    <PdfDocument />
                </div>

                {/* PDF Footer for each virtual page concept if needed, or just bottom */}
                <div className="text-center py-8 border-t border-gray-200 mt-10">
                    <p className="text-xs text-gray-400 uppercase">Confidential Document &bull; Generated via Secure Portal &bull; Tiger Shoji x TheBrne Agency</p>
                </div>
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
                style={{ scaleX }}
            />

            {/* Sticky Navigation / Brand */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md border-gray-100 py-4' : 'bg-transparent border-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <img
                            src="/logo-dark.svg"
                            alt="THE BRNE"
                            className="h-8 md:h-10 w-auto object-contain cursor-pointer"
                            onClick={() => setCurrentView('timeline')}
                        />

                        {/* View Switcher */}
                        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase">
                            <button
                                onClick={() => setCurrentView('timeline')}
                                className={`hover:text-black transition-colors ${currentView === 'timeline' ? 'text-black underline underline-offset-4 decoration-2' : 'text-gray-400'}`}
                            >
                                Roadmap
                            </button>
                            <button
                                onClick={() => setCurrentView('deck')}
                                className={`hover:text-black transition-colors ${currentView === 'deck' ? 'text-black underline underline-offset-4 decoration-2' : 'text-gray-400'}`}
                            >
                                Strategy Deck
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-xs font-mono text-gray-500 hidden sm:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            CONFIDENTIAL
                        </div>

                        <button
                            onClick={() => setIsNDAModalOpen(true)}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase hover:bg-zinc-800 transition-colors"
                        >
                            <Download className="w-3 h-3" />
                            <span className="hidden md:inline">Download PDF</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Simplified) */}
            <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <button
                    onClick={() => setIsNDAModalOpen(true)}
                    className="pointer-events-auto bg-black text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold uppercase"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>


            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 flex justify-around">
                <button
                    onClick={() => { setCurrentView('timeline'); window.scrollTo(0, 0); }}
                    className={`text-xs font-bold uppercase ${currentView === 'timeline' ? 'text-black' : 'text-gray-400'}`}
                >
                    Roadmap
                </button>
                <button
                    onClick={() => { setCurrentView('deck'); window.scrollTo(0, 0); }}
                    className={`text-xs font-bold uppercase ${currentView === 'deck' ? 'text-black' : 'text-gray-400'}`}
                >
                    Strategy Deck
                </button>
            </div>

            {/* Main Content */}
            <main className="pt-20">
                {currentView === 'timeline' ? <Timeline /> : <ConfidentialDeck />}
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-gray-100 bg-gray-50 py-12 mb-12 md:mb-0">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-wider">
                    <p>&copy; 2026 THEBRNE AGENCY</p>
                    <p className="mt-2 md:mt-0">TIGER SHOJI SDN BHD</p>
                </div>
            </footer>
        </div>
    );
};

export default ShojiPage;
