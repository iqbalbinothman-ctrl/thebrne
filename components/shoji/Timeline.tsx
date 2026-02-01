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

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

            {/* Header Section */}
            <motion.div
                {...motionProps}
                className="mb-20 text-center relative"
            >
                <span className="inline-block py-1 px-3 border border-black text-xs font-bold uppercase tracking-[0.2em] mb-4 hover:bg-black hover:text-white transition-colors cursor-default">
                    Strategy 2026-2027
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-black tracking-tighter mb-6">
                    Marketing Roadmap
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    A comprehensive breakdown of festive events, marketing push periods, and strategic budget allocations for the upcoming fiscal year.
                </p>

                {/* Agency Attribution */}
                <div className="mt-8 flex justify-center">
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-gray-400 uppercase">
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
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase tracking-widest">
                    <div className="w-12 h-px bg-gray-300"></div>
                    End of Cycle
                    <div className="w-12 h-px bg-gray-300"></div>
                </div>
            </motion.div>
        </div>
    );
};
