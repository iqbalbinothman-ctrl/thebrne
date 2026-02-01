import React from 'react';
import { CAMPAIGN_DATA } from './constants';
import { Shield, Globe, Users, CheckCircle, Search, Smartphone, Target, PenTool, Zap, TrendingUp, Banknote } from 'lucide-react';

// A4 Landscape Dimensions: 297mm x 210mm
// @ 96 DPI: ~1123px x ~794px
const PAGE_WIDTH = 1123;
const PAGE_HEIGHT = 794;

const PageLayout = ({ children, title, subtitle, pageNumber }: { children: React.ReactNode, title?: string, subtitle?: string, pageNumber?: number }) => (
    <div
        className="print-page bg-white relative flex flex-col"
        style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT, padding: '40px 60px' }}
    >
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
            <div>
                {title && <h1 className="text-3xl font-bold uppercase tracking-tight text-black">{title}</h1>}
                {subtitle && <p className="text-lg text-gray-500 font-medium">{subtitle}</p>}
            </div>
            <div className="flex flex-col items-end">
                <img src="/logo-dark.svg" alt="THEBRNE" className="h-6 w-auto mb-1" />
                <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Confidential</span>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
            {children}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-auto pt-4 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
            <span>Tiger Shoji Sdn Bhd x TheBrne Agency</span>
            <span>2026 Integrated Marketing Strategy</span>
            {pageNumber && <span>Page {pageNumber}</span>}
        </div>
    </div>
);

export const PdfDocument: React.FC = () => {
    return (
        <div>
            {/* Page 1: Title & Cover */}
            <div
                className="print-page bg-black text-white relative flex flex-col justify-center items-center"
                style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
            >
                <div className="border-4 border-white p-20 text-center max-w-4xl">
                    <img src="/logo-dark.svg" alt="THEBRNE" className="h-24 w-auto mx-auto mb-12 invert filter brightness-0" />
                    <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        2026 Integrated<br />Marketing Strategy
                    </h1>
                    <p className="text-2xl text-gray-400 font-light tracking-wide mb-12">
                        Expansion & Brand Dominance Roadmap
                    </p>
                    <div className="inline-block border border-gray-600 px-6 py-2 text-sm font-mono uppercase tracking-widest text-gray-400">
                        Prepared for Tiger Shoji Sdn Bhd
                    </div>
                </div>
                <div className="absolute bottom-10 text-[10px] text-gray-600 uppercase tracking-widest">
                    Strictly Confidential • Do Not Distribute
                </div>
            </div>

            {/* Page 2: Ecosystem & USP */}
            <PageLayout title="Business Ecosystem" subtitle="The One-Stop Mobility Concept" pageNumber={2}>
                <div className="grid grid-cols-2 gap-12 h-full">
                    <div className="grid grid-cols-1 gap-6 content-center">
                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <Shield className="w-10 h-10 text-black shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Car Maintenance</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Japanese-standard Shaken & Shindan services. High-precision diagnostics and preventative care.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <Globe className="w-10 h-10 text-black shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Subscription Harimau</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Modern vehicle leasing (MaaS). Flexible ownership models for expats and locals.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                            <Users className="w-10 h-10 text-black shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Flea Market Harimau</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">Trusted C2C support for the Japanese community. Buy/Sell assurance.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 text-white p-10 flex flex-col justify-center rounded-lg">
                        <h3 className="text-2xl font-bold uppercase text-gray-500 mb-6">Core Philosophy</h3>
                        <p className="text-4xl font-serif italic leading-tight mb-8">"Omotenashi"</p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Bringing true Japanese hospitality to the Malaysian automotive sector. It's not just about fixing cars; it's about anticipating needs and ensuring peace of mind for every journey.
                        </p>
                    </div>
                </div>
            </PageLayout>

            {/* Page 3: Market Opportunity */}
            <PageLayout title="Strategic Analysis" subtitle="Market Opportunity & 2026 Festive Surge" pageNumber={3}>
                <div className="flex gap-12 h-full items-center">
                    <div className="w-1/2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2 text-red-600">The "Rare Cycle" Anomaly</h3>
                            <p className="text-gray-600 text-lg">In 2026, Chinese New Year (Feb 17) and Hari Raya (Mar 19) occur within just <strong>30 days</strong> of each other.</p>
                        </div>
                        <hr className="border-gray-200" />
                        <div>
                            <h3 className="text-2xl font-bold mb-2">The 60-Day Surge</h3>
                            <p className="text-gray-600">This creates a continuous 60-day window of maximum road-trip activity, vehicle stress, and service demand.</p>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                            <h4 className="font-bold text-yellow-800 uppercase text-sm mb-2">The Strategy</h4>
                            <p className="text-xl font-bold">Capture the "Early Bird" Market.</p>
                            <p className="text-yellow-700 mt-2">While competitors fight for last-minute emergency repairs, Tiger Shoji will own the distinct "1-Month Prep" segment.</p>
                        </div>
                    </div>
                    <div className="w-1/2 bg-gray-100 p-8 h-full flex flex-col justify-center rounded-lg">
                        <div className="space-y-6">
                            <h4 className="font-bold uppercase text-gray-400 text-sm border-b border-gray-300 pb-2">Execution Phases</h4>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl">Phase 1 (Feb-Apr)</span>
                                <span className="text-gray-600">Festive Peak (Safety & Reliability)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl">Phase 2 (May-Aug)</span>
                                <span className="text-gray-600">Expansion (Subscription & Klang)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl">Phase 3 (Sep-Nov)</span>
                                <span className="text-gray-600">Monsoon Prep (Tyres & Safety)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl">Phase 4 (Dec-Jan)</span>
                                <span className="text-gray-600">Renewal (Body Coating)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>

            {/* Page 4: Channel Strategy Mix */}
            <PageLayout title="Channel Strategy" subtitle="Digital Dominance & Brand Trust" pageNumber={4}>
                <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full pb-4">
                    {/* Google */}
                    <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Search className="w-6 h-6 text-blue-600" />
                                <h3 className="font-bold text-xl">Google Ads</h3>
                            </div>
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">RM 10,000 / mo</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 font-mono uppercase">Role: The Engine (Intent)</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>High-intent Search: "Car service Glenmarie", "Japanese mechanic"</li>
                            <li>Performance Max (PMax) targeting Broad Klang Valley radius</li>
                            <li>Focus on conversion (Bookings & Calls)</li>
                        </ul>
                    </div>

                    {/* Meta */}
                    <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-blue-800" />
                                <h3 className="font-bold text-xl">Meta Platforms</h3>
                            </div>
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">RM 1,500 / mo</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 font-mono uppercase">Role: The Multiplier (Retargeting)</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Pixel Retargeting for website visitors & leads</li>
                            <li>Visual showcase for Subscription Harimau inventory</li>
                            <li>Social Proofing via testimonials</li>
                        </ul>
                    </div>

                    {/* TikTok */}
                    <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-6 h-6 text-black" />
                                <h3 className="font-bold text-xl">TikTok</h3>
                            </div>
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">RM 1,500 / mo</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 font-mono uppercase">Role: Personality & Trust</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>"Sensei Tips" - Educational car care content</li>
                            <li>Behind-the-scenes Workshop precision</li>
                            <li>Viral reach for brand awareness</li>
                        </ul>
                    </div>

                    {/* KOL */}
                    <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Target className="w-6 h-6 text-red-600" />
                                <h3 className="font-bold text-xl">KOL Support</h3>
                            </div>
                            <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">RM 10,000 / mo</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 font-mono uppercase">Role: Credibility & Validation</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                            <li>Auto-Tech Experts: Validating the 30-Point Check</li>
                            <li>Lifestyle/Expat Influencers: Promoting Subscription ease</li>
                            <li>Deployed 4-5 weeks before major holidays</li>
                        </ul>
                    </div>
                </div>
            </PageLayout>

            {/* Page 5: Operational Support */}
            <PageLayout title="Operational Support" subtitle="Creative & Campaign Management Retainer" pageNumber={5}>
                <div className="flex gap-12 h-full items-start pt-8">
                    <div className="w-1/3 bg-black text-white p-8 rounded-xl h-full flex flex-col justify-between">
                        <div>
                            <PenTool className="w-12 h-12 mb-6 text-gray-300" />
                            <h3 className="text-3xl font-bold mb-2">Agency Retainer</h3>
                            <p className="text-gray-400">Dedicated operational and creative team ensuring consistent execution.</p>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-widest text-gray-500 mb-1">Monthly Investment</div>
                            <div className="text-5xl font-bold">RM 7,000</div>
                        </div>
                    </div>

                    <div className="w-2/3 grid grid-cols-2 gap-x-12 gap-y-12 content-start">
                        <div>
                            <h4 className="font-bold text-lg uppercase border-b-2 border-black pb-2 mb-4">Content Production</h4>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2"><span>•</span> Video Editing (Reels/TikTok)</li>
                                <li className="flex items-start gap-2"><span>•</span> Motion Graphics for Ads</li>
                                <li className="flex items-start gap-2"><span>•</span> Static Visuals & Banners</li>
                                <li className="flex items-start gap-2"><span>•</span> Copywriting (Ad & Social)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg uppercase border-b-2 border-black pb-2 mb-4">Management</h4>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2"><span>•</span> Media Buying Strategy</li>
                                <li className="flex items-start gap-2"><span>•</span> Campaign Optimization</li>
                                <li className="flex items-start gap-2"><span>•</span> 3rd Party Vendor Coordination</li>
                                <li className="flex items-start gap-2"><span>•</span> Key Talent / KOL Liaison</li>
                            </ul>
                        </div>
                        <div className="col-span-2 bg-gray-50 p-6 rounded-lg mt-4 border border-gray-100">
                            <h4 className="font-bold text-lg uppercase mb-2">Deliverables</h4>
                            <p className="text-gray-600">Weekly Performance Reports • Bi-weekly Creative Refresh • On-site Content Shoots (1x/month)</p>
                        </div>
                    </div>
                </div>
            </PageLayout>

            {/* Page 6: Budget Summary */}
            <PageLayout title="Budget Overview" subtitle="Financial Breakdown & Projections" pageNumber={6}>
                <div className="flex gap-8 h-full items-center">
                    {/* Main Numbers */}
                    <div className="w-1/2 space-y-6">
                        <div className="bg-white border-2 border-black p-8 shadow-lg">
                            <p className="text-sm uppercase text-gray-500 font-bold mb-2">Total Monthly Investment</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl font-bold text-black">RM 30,000</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2 font-mono">Ads (23k) + Retainer (7k)</p>
                        </div>

                        <div className="bg-gray-50 p-8 border border-gray-200">
                            <p className="text-sm uppercase text-gray-500 font-bold mb-2">Projected Annual Investment</p>
                            <span className="text-4xl font-bold text-gray-800">RM 360,000</span>
                        </div>
                    </div>

                    {/* KPI & X-Factor */}
                    <div className="w-1/2 space-y-6">
                        <div className="bg-black text-white p-8 rounded-lg">
                            <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4">
                                <Zap className="w-4 h-4" />
                                The X-Factor
                            </div>
                            <h4 className="text-xl font-bold mb-4">Dynamic Cost Efficiency</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                Campaign performance and platform algorithms may decrease paid advertising costs over time. Monthly investments are dynamic, potentially reducing the total annual spend as optimization improves/learning phase completes.
                            </p>
                        </div>

                        <div className="p-6">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Key Performance Indicators</h4>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Search Impression Share</span>
                                    <span className="font-bold">&gt; 70%</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Cost Per Lead (CPL)</span>
                                    <span className="font-bold">Decreasing QoQ</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Subscription Enquiries</span>
                                    <span className="font-bold">+15% MoM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PageLayout>

            {/* Page 7: Roadmap P1 */}
            <TimelinePage
                title="Marketing Roadmap: Feb - Jul 2026"
                data={CAMPAIGN_DATA.slice(0, 6)}
                pageNumber={7}
            />

            {/* Page 8: Roadmap P2 */}
            <TimelinePage
                title="Marketing Roadmap: Aug - Jan 2027"
                data={CAMPAIGN_DATA.slice(6, 12)}
                pageNumber={8}
            />

        </div>
    );
};

const TimelinePage = ({ title, data, pageNumber }: { title: string, data: any[], pageNumber: number }) => (
    <PageLayout title={title} pageNumber={pageNumber}>
        <div className="grid grid-cols-2 gap-8 h-full content-start">
            {data.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5 flex flex-col h-full bg-white shadow-sm">

                    {/* Header: Month & Budget */}
                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100">
                        <div>
                            <div className="text-xs font-bold uppercase text-red-600 mb-1">{item.event}</div>
                            <div className="text-xl font-bold text-black">{item.month}</div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-sm font-bold bg-black text-white px-2 py-1 rounded">
                                <Banknote className="w-3 h-3" />
                                RM {item.budget}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-1 uppercase">Allocation</div>
                        </div>
                    </div>

                    {/* Core Content */}
                    <div className="flex-1 space-y-3">
                        <div>
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Push Period</span>
                            <p className="text-sm font-medium mt-1">{item.pushPeriod}</p>
                        </div>
                        <div>
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Key Focus</span>
                            <p className="text-sm text-gray-700 mt-1 leading-snug">{item.focus}</p>
                        </div>
                    </div>

                    {/* Metrics Footer */}
                    <div className="mt-4 pt-3 border-t border-gray-50 bg-gray-50/50 -mx-5 -mb-5 p-5 rounded-b-lg">
                        <div className="text-xs text-gray-500 font-mono mb-1">Breakdown: {item.breakdown}</div>
                        {item.metrics && <div className="text-xs font-bold text-blue-600">{item.metrics}</div>}
                    </div>
                </div>
            ))}
        </div>
    </PageLayout>
);
