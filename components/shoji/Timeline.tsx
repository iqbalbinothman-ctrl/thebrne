import React from 'react';
import { TimelineItem } from './TimelineItem';
import { CAMPAIGN_DATA } from './constants';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineProps {
    isPrintMode?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ isPrintMode = false }) => {
    const motionProps = isPrintMode ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 }
    } : {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const footerMotionProps = isPrintMode ? {
        initial: { opacity: 1 },
        whileInView: undefined,
        viewport: undefined
    } : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true }
    };

    // Chunk data for print mode (pagination)
    const chunkArray = (arr: any[], size: number) => {
        const results = [];
        while (arr.length) {
            results.push(arr.splice(0, size));
        }
        return results;
    };

    if (isPrintMode) {
        // Create deep copy for chunking to avoid mutating original for other views
        const dataCopy = [...CAMPAIGN_DATA];
        // Strategy: 4 items per page in a 2x2 Grid for Landscape
        const chunks = [];
        for (let i = 0; i < CAMPAIGN_DATA.length; i += 4) {
            chunks.push(CAMPAIGN_DATA.slice(i, i + 4));
        }

        return (
            <div className="w-full bg-white">
                {/* Page 1: Header + First 4 Items */}
                <div className="print-page p-12 h-[794px] flex flex-col relative bg-white border-b-8 border-gray-100">
                    <div className="mb-8 text-center">
                        <span className="inline-block py-1 px-3 border border-black text-xs font-bold uppercase mb-2">
                            Strategy 2026-2027
                        </span>
                        <h1 className="text-3xl font-extrabold text-black mb-2">
                            Marketing Roadmap
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
                            A comprehensive breakdown of festive events, marketing push periods, and strategic budget allocations.
                        </p>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
                        {chunks[0].map((item, index) => (
                            <TimelineItem
                                key={`${item.id}-${index}`}
                                data={item}
                                index={index}
                                isLast={false}
                                isPrintMode={true}
                            />
                        ))}
                    </div>
                    <div className="mt-auto text-center text-[10px] text-gray-400 uppercase tracking-widest py-2">
                        Page 1 / {chunks.length}
                    </div>
                </div>

                {/* Subsequent Pages */}
                {chunks.slice(1).map((chunk, pageIndex) => (
                    <div key={pageIndex} className="print-page p-12 h-[794px] flex flex-col relative bg-white border-b-8 border-gray-100">
                        <div className="mb-6 pt-2 border-b border-gray-100 pb-2 flex justify-between items-center text-xs uppercase text-gray-400 font-bold tracking-widest">
                            <span>Marketing Roadmap</span>
                            <span>Continuation</span>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
                            {chunk.map((item, index) => (
                                <TimelineItem
                                    key={`${item.id}-${index}`}
                                    data={item}
                                    index={index}
                                    isLast={false}
                                    isPrintMode={true}
                                />
                            ))}
                        </div>

                        {/* Footer on last page */}
                        {pageIndex === chunks.slice(1).length - 1 && (
                            <div className="mt-4 flex justify-center py-2">
                                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase">
                                    <div className="w-12 h-px bg-gray-300"></div>
                                    End of Cycle
                                    <div className="w-12 h-px bg-gray-300"></div>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto text-center text-[10px] text-gray-400 uppercase tracking-widest py-2">
                            Page {pageIndex + 2} / {chunks.length}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Standard Web View Implementation (unchanged logic mostly) */}
            {/* Header Section */}
            <motion.div
                {...motionProps}
                className="mb-20 text-center relative"
            >
                <span className="inline-block py-1 px-3 border border-black text-xs font-bold uppercase mb-4 hover:bg-black hover:text-white transition-colors cursor-default">
                    Strategy 2026-2027
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6">
                    Marketing Roadmap
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    A comprehensive breakdown of festive events, marketing push periods, and strategic budget allocations for the upcoming fiscal year.
                </p>

                {/* Agency Attribution */}
                <div className="mt-8 flex justify-center">
                    <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase">
                        prepared by <span className="text-black font-bold">THEBRNE AGENCY</span> for <span className="text-black font-bold">TIGER SHOJI SDN BHD</span>
                    </p>
                </div>

                {!isPrintMode && (
                    <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 hidden md:flex flex-col items-center">
                        <div className="h-8 w-px bg-gray-300"></div>
                        <ArrowDown className="w-4 h-4 text-gray-400" />
                    </div>
                )}
            </motion.div>

            {/* Timeline Grid */}
            <div className="relative">
                {CAMPAIGN_DATA.map((item, index) => (
                    <TimelineItem
                        key={`${item.id}-${index}`}
                        data={item}
                        index={index}
                        isLast={index === CAMPAIGN_DATA.length - 1}
                        isPrintMode={isPrintMode}
                    />
                ))}
            </div>

            {/* Footer / End Marker */}
            <motion.div
                {...footerMotionProps}
                className="flex justify-center mt-12 mb-20"
            >
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase">
                    <div className="w-12 h-px bg-gray-300"></div>
                    End of Cycle
                    <div className="w-12 h-px bg-gray-300"></div>
                </div>
            </motion.div>
        </div>
    );
};
