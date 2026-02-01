import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Clock, Banknote, ArrowRight } from 'lucide-react';
import { TimelineItemProps } from '../types';

export const TimelineItem: React.FC<TimelineItemProps> = ({ data, index, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex group"
    >
      {/* Timeline Line (Desktop) */}
      <div className="hidden md:flex flex-col items-center mr-8">
        <div className={`w-px h-full bg-gray-200 group-hover:bg-black transition-colors duration-300 ${isLast ? 'h-1/2' : ''}`}></div>
        <div className="absolute top-8 w-3 h-3 bg-black rounded-full ring-4 ring-white border border-black z-10 transition-transform duration-300 group-hover:scale-125"></div>
      </div>

      {/* Content Card */}
      <div className="flex-1 mb-12 relative">
        {/* Mobile Line */}
        <div className={`absolute left-[-16px] top-8 bottom-[-48px] w-px bg-gray-200 md:hidden ${isLast ? 'hidden' : 'block'}`}></div>
        <div className="absolute left-[-21px] top-8 w-2.5 h-2.5 bg-black rounded-full ring-4 ring-white border border-black md:hidden"></div>

        <div className="bg-white border border-gray-200 hover:border-black transition-all duration-300 p-6 md:p-8 shadow-sm hover:shadow-xl rounded-none">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            
            {/* Header Section: Month & Event */}
            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 md:pr-6 pb-4 md:pb-0">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                {data.month}
              </div>
              <h3 className="text-2xl font-bold text-black leading-tight group-hover:underline decoration-1 underline-offset-4">
                {data.event}
              </h3>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 md:pl-2 grid grid-cols-1 gap-6">
              
              {/* Push Period */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0 group-hover:text-black transition-colors" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Push Period</p>
                  <p className="text-sm font-medium text-black">{data.pushPeriod}</p>
                </div>
              </div>

              {/* Primary Focus */}
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-gray-400 mt-0.5 shrink-0 group-hover:text-black transition-colors" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Focus & Offer</p>
                  <p className="text-lg text-gray-900 leading-relaxed font-light">
                    {data.focus}
                  </p>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 border border-gray-200">
                  <Banknote className="w-4 h-4 text-black" />
                  <span className="text-sm font-bold text-black">RM {data.budget}</span>
                </div>
                <div className="ml-auto md:hidden">
                   <ArrowRight className="w-5 h-5 text-gray-300" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};