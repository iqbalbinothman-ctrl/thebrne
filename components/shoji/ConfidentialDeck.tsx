import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users, Search, Smartphone, Zap, CheckCircle, Shield, Globe, PenTool } from 'lucide-react';

interface SlideSectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    index: number;
    isPrintMode?: boolean;
}

const SlideSection: React.FC<SlideSectionProps> = ({ title, subtitle, children, index, isPrintMode = false }) => {
    const motionProps = isPrintMode ? {
        initial: { opacity: 1, y: 0 },
        whileInView: undefined,
        viewport: undefined,
        transition: { duration: 0 }
    } : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.6, delay: index * 0.1 }
    };

    return (
        <motion.div
            {...motionProps}
            className="min-h-[80vh] flex flex-col justify-center py-20 border-b border-gray-100 last:border-0 page-break-inside-avoid"
        >
            <div className="max-w-4xl mx-auto w-full">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
                    {subtitle && <p className="text-xl text-gray-500 font-light border-l-2 border-black pl-4">{subtitle}</p>}
                </div>
                <div className="text-lg leading-relaxed text-gray-800">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

interface ConfidentialDeckProps {
    isPrintMode?: boolean;
}

export const ConfidentialDeck: React.FC<ConfidentialDeckProps> = ({ isPrintMode = false }) => {
    const headerMotionProps = isPrintMode ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 }
    } : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 }
    };

    const cardMotionProps = isPrintMode ? {
        whileHover: undefined
    } : {
        whileHover: { y: -10 }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">

            {/* Slide 1: Title Slide */}
            <motion.div
                {...headerMotionProps}
                className="min-h-[80vh] flex flex-col justify-center items-center text-center border-b border-gray-900 mb-10 page-break-after-always"
            >
                <div className="mb-8">
                    <img src="/logo-dark.svg" alt="THE BRNE" className="h-24 w-auto" />
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                    2026 Integrated Marketing<br />Strategy & Expansion
                </h1>
                <p className="text-2xl text-gray-500 font-light mb-12">
                    Bridging Japanese Quality with Malaysian Mobility
                </p>
                <div className="text-sm font-mono uppercase text-gray-400">
                    Prepared by THEBRNE AGENCY | February 2026
                </div>

                {isPrintMode && (
                    <p className="mt-8 text-xs font-bold uppercase text-red-500 border border-red-500 px-2 py-1">
                        Strictly Confidential - Do Not Distribute
                    </p>
                )}
            </motion.div>

            {/* Slide 2: Business Ecosystem */}
            <SlideSection title="Business Ecosystem Overview" subtitle="The One-Stop Concept" index={1} isPrintMode={isPrintMode}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="p-6 bg-gray-50 border border-gray-200 hover:border-black transition-colors">
                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Shield className="w-5 h-5" /> Car Maintenance</h3>
                            <p className="text-gray-600">Japanese-standard Shaken & Shindan services.</p>
                        </div>
                        <div className="p-6 bg-gray-50 border border-gray-200 hover:border-black transition-colors">
                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Globe className="w-5 h-5" /> Subscription Harimau</h3>
                            <p className="text-gray-600">Modern vehicle leasing (MaaS).</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="p-6 bg-gray-50 border border-gray-200 hover:border-black transition-colors">
                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Users className="w-5 h-5" /> Flea Market Harimau</h3>
                            <p className="text-gray-600">Trusted C2C support for the Japanese community.</p>
                        </div>
                        <div className="p-6 bg-gray-50 border border-gray-200 hover:border-black transition-colors">
                            <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Ancillary</h3>
                            <p className="text-gray-600">Auto Insurance & Rental services.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 p-6 bg-black text-white text-center">
                    <span className="font-bold uppercase">Unique Selling Point</span>
                    <p className="text-xl mt-2 italic font-serif">"Omotenashi" (Japanese Hospitality) in the Malaysian automotive sector.</p>
                </div>
            </SlideSection>

            {/* Slide 3: Market Opportunity */}
            <SlideSection title="Market Opportunity" subtitle="The 2026 Gong Xi Raya" index={2} isPrintMode={isPrintMode}>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <p className="text-2xl font-bold mb-6">The Rare Cycle</p>
                        <p className="mb-4">CNY (Feb 17) and Hari Raya (Mar 19) happen within 30 days.</p>
                        <div className="h-1 w-20 bg-black mb-6"></div>
                        <p className="text-2xl font-bold mb-6">The Surge</p>
                        <p>A 60-day window of maximum road-trip activity.</p>
                    </div>
                    <div className="flex-1 bg-gray-900 text-white p-10">
                        <h4 className="text-xl font-bold mb-4 uppercase text-gray-400">Strategy</h4>
                        <p className="text-3xl font-light leading-tight">
                            Capture the "Early Bird" market. Most workshops overbook last minute; Tiger Shoji will own the "1-Month Prep" segment.
                        </p>
                    </div>
                </div>
            </SlideSection>

            {/* Slide 4: Marketing Calendar */}
            <SlideSection title="1-Year Marketing Calendar" subtitle="Phased Execution" index={3} isPrintMode={isPrintMode}>
                <div className="space-y-4">
                    {[
                        { phase: "Phase 1 (Feb-Apr)", focus: "Festive Peak (Safety & Reliability)" },
                        { phase: "Phase 2 (May-Aug)", focus: "Expansion & Awareness (Subscription & Klang Branch)" },
                        { phase: "Phase 3 (Sep-Nov)", focus: "Monsoon Prep (Tyres & Safety)" },
                        { phase: "Phase 4 (Dec-Jan)", focus: "Renewal (Body Coating & Detailing)" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center border-b border-gray-200 py-4">
                            <div className="w-1/3 font-bold">{item.phase}</div>
                            <div className="w-2/3 text-gray-600">{item.focus}</div>
                        </div>
                    ))}
                </div>
            </SlideSection>

            {/* Components 1-4 Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-20 mb-12 page-break-inside-avoid">
                {/* Slide 5: Google Ads */}
                <motion.div
                    {...cardMotionProps}
                    className="p-8 border-2 border-black bg-white"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold">Google Ads<br /><span className="text-gray-400 text-lg font-normal">The Engine</span></h3>
                        <Search className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b pb-2"><span>Budget</span><span className="font-bold">RM 10,000 / mo</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Objective</span><span>Intent-based Lead Gen</span></div>
                        <div>
                            <p className="font-bold mb-1">Strategy</p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                <li>Search Ads: "Best car service Glenmarie", "Japanese mechanic Klang"</li>
                                <li>PMax ads for local workshop visits (Targeting Broad Klang Valley)</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Slide 6: Meta Platforms */}
                <motion.div
                    {...cardMotionProps}
                    className="p-8 border border-gray-200 bg-gray-50"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold">Meta Platforms<br /><span className="text-gray-400 text-lg font-normal">The Multiplier</span></h3>
                        <Users className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b border-gray-300 pb-2"><span>Budget</span><span className="font-bold">RM 1,500 / mo</span></div>
                        <div className="flex justify-between border-b border-gray-300 pb-2"><span>Objective</span><span>Retargeting & Recall</span></div>
                        <div>
                            <p className="font-bold mb-1">Strategy</p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                <li>Pixel Retargeting for website visitors</li>
                                <li>Showcase Subscription Harimau inventory</li>
                                <li>Social Proof: Testimonials & Tours</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Slide 7: TikTok */}
                <motion.div
                    {...cardMotionProps}
                    className="p-8 border border-gray-200 bg-gray-50"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold">TikTok<br /><span className="text-gray-400 text-lg font-normal">The Personality</span></h3>
                        <Smartphone className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b border-gray-300 pb-2"><span>Budget</span><span className="font-bold">RM 1,500 / mo</span></div>
                        <div className="flex justify-between border-b border-gray-300 pb-2"><span>Objective</span><span>Viral Education & Trust</span></div>
                        <div>
                            <p className="font-bold mb-1">Content (2x/week)</p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                <li>Sensei Tips: Car care hacks</li>
                                <li>Behind the Scenes: Cleanliness & Precision</li>
                                <li>Spark Ads for Pre-Festive tips</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Slide 8: KOL Support */}
                <motion.div
                    {...cardMotionProps}
                    className="p-8 border-2 border-black bg-white"
                >
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold">KOL Support<br /><span className="text-gray-400 text-lg font-normal">The Trust</span></h3>
                        <Target className="w-8 h-8" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between border-b pb-2"><span>Budget</span><span className="font-bold">RM 10,000 / mo</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Objective</span><span>Organic Reach & Credibility</span></div>
                        <div>
                            <p className="font-bold mb-1">KOL Mix</p>
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                                <li>Auto-Tech: Validate 30-Point Check</li>
                                <li>Lifestyle/Expat: Subscription ease</li>
                                <li>Timing: 4-5 weeks before holidays</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Component 5: Creative & Management Retainer */}
            <motion.div
                {...cardMotionProps}
                className="mb-20 p-8 border-2 border-dashed border-gray-300 bg-gray-50 hover:border-black transition-colors page-break-inside-avoid"
            >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-black text-white rounded-full hidden md:block">
                            <PenTool className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Creative & Campaign Management<br /><span className="text-gray-400 text-lg font-normal">Operational Support</span></h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <span className="px-2 py-1 bg-gray-200 rounded text-xs font-bold uppercase">Agency Retainer</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-left md:text-right border-t md:border-t-0 border-gray-200 pt-4 md:pt-0">
                        <span className="block text-sm uppercase text-gray-400">Monthly Allocation</span>
                        <span className="text-3xl font-bold">RM 7,000</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6 md:pl-16">
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase border-b border-gray-300 pb-1 inline-block">Content Production</h4>
                        <ul className="text-sm text-gray-600 space-y-2 mt-2">
                            <li className="flex items-start gap-2">• <span>Video Editing & Motion Graphics</span></li>
                            <li className="flex items-start gap-2">• <span>Graphic Design for Ads</span></li>
                            <li className="flex items-start gap-2">• <span>Material Sourcing</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase border-b border-gray-300 pb-1 inline-block">Talent & Management</h4>
                        <ul className="text-sm text-gray-600 space-y-2 mt-2">
                            <li className="flex items-start gap-2">• <span>Key Person / Talent Management</span></li>
                            <li className="flex items-start gap-2">• <span>Campaign Manager Supervision</span></li>
                            <li className="flex items-start gap-2">• <span>3rd Party Vendor Coordination</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-sm uppercase border-b border-gray-300 pb-1 inline-block">Deliverables</h4>
                        <ul className="text-sm text-gray-600 space-y-2 mt-2">
                            <li className="flex items-start gap-2">• <span>Weekly Performance Reports</span></li>
                            <li className="flex items-start gap-2">• <span>Creative Refresh (Bi-weekly)</span></li>
                            <li className="flex items-start gap-2">• <span>On-site Content Shoots</span></li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Slide 9: 1-Month Early Logic */}
            <SlideSection title="The '1-Month Early' Logic" subtitle="Operational Efficiency & ROI" index={9} isPrintMode={isPrintMode}>
                <div className="bg-black text-white p-8 md:p-12 rounded-none relative overflow-hidden">
                    <Zap className="absolute top-0 right-0 w-64 h-64 text-gray-800 opacity-20 -mr-10 -mt-10" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">The Logic</h4>
                            <p className="text-gray-300">Stop chasing "Last Minute" low-margin emergency repairs. Marketing spend peaks 30 days before the festival (e.g., Feb 15 for a Mar 19 Raya).</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">The Benefits</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Better workshop scheduling</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Higher customer satisfaction</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Higher conversion rates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SlideSection>

            {/* Slide 10: Summary */}
            <SlideSection title="Budget Summary & Next Steps" subtitle="" index={10} isPrintMode={isPrintMode}>
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    <div className="md:w-1/2 bg-gray-50 border p-8 flex flex-col justify-center">
                        <div className="mb-8 pb-8 border-b border-gray-200">
                            <p className="text-sm uppercase text-gray-500 mb-1">Total Monthly Investment</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-bold">RM 30,000</p>
                                <p className="text-sm text-gray-400 font-medium">(Ads + Retainer)</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm uppercase text-gray-500 mb-1">Annual Investment</p>
                            <p className="text-4xl font-bold">RM 360,000</p>
                        </div>

                        {/* The X-Factor */}
                        <div className="mt-8 p-4 bg-black text-white text-xs">
                            <span className="font-bold uppercase text-yellow-500 mb-1 block">The X-Factor</span>
                            <p className="opacity-80 leading-relaxed">
                                Campaign performance and platform algorithms may decrease paid advertising costs over time. Monthly investments are dynamic, potentially reducing the total annual spend as optimization improves.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-lg mb-4">Key Performance Indicators</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 border-b pb-2"><TrendingUp className="w-4 h-4" /> Increase in Monthly Service Bookings</li>
                                <li className="flex items-center gap-3 border-b pb-2"><TrendingUp className="w-4 h-4" /> Growth in Subscription Leads</li>
                                <li className="flex items-center gap-3 border-b pb-2"><TrendingUp className="w-4 h-4" /> Flea Market Website Traffic</li>
                            </ul>
                        </div>
                        <div className="mt-8 p-4 border-l-4 border-black">
                            <p className="text-xl italic font-serif">"Ensuring Peace of Mind for Every Journey."</p>
                        </div>
                    </div>
                </div>
            </SlideSection>

        </div>
    );
};
