import React, { useState } from 'react';
import { ShieldAlert, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NDAModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isGenerating: boolean;
}

export const NDAModal: React.FC<NDAModalProps> = ({ isOpen, onClose, onConfirm, isGenerating }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-lg p-8 shadow-2xl border-t-4 border-black"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6 text-red-600">
                            <ShieldAlert className="w-8 h-8" />
                            <h3 className="text-xl font-bold uppercase tracking-wide">Confidentiality Agreement</h3>
                        </div>

                        <div className="prose prose-sm prose-gray max-w-none mb-6 text-justify">
                            <p className="font-bold">NON-DISCLOSURE NOTICE:</p>
                            <p>
                                The document you are about to download contains <strong>strictly confidential</strong> proprietary algorithms, budget allocations, and strategic roadmaps belonging to <strong>Tiger Shoji Sdn Bhd</strong> and <strong>TheBrne Agency</strong>.
                            </p>
                            <p>
                                By downloading, you agree NOT to distribute, share, or reproduce any part of this document to external parties, competitors, or unauthorized personnel. This document is watermarked and traceable.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 border border-gray-200 mb-6">
                            <label className="flex items-start gap-3 cursor-pointer select-none">
                                <div className="relative flex-shrink-0 mt-1">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-400 peer-checked:bg-black peer-checked:border-black transition-colors"></div>
                                    <svg className="w-3.5 h-3.5 text-white absolute top-1 left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700 font-medium">
                                    I acknowledge that I have read the terms and agree to maintain strict confidentiality.
                                </span>
                            </label>
                        </div>

                        <button
                            disabled={!agreed || isGenerating}
                            onClick={onConfirm}
                            className={`w-full py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${agreed && !isGenerating
                                ? 'bg-black text-white hover:bg-gray-800 shadow-lg'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating PDF...
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    Download Secure PDF
                                </>
                            )}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
