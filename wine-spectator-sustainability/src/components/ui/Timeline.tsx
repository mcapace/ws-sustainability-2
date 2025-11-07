'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { History } from '@/types';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineProps {
  history: History;
  className?: string;
}

export function Timeline({ history, className = '' }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cigar-copper via-cigar-copper/50 to-cigar-copper/20" />
      
      {/* Timeline Items */}
      <div className="space-y-8">
        {history.milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            className="relative pl-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 top-2 w-4 h-4 bg-cigar-copper rounded-full border-4 border-luxury-charcoal shadow-lg" />
            
            {/* Content Card */}
            <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-xl p-6 border border-luxury-slate/20 hover:border-cigar-copper/30 transition-all duration-300">
              
              {/* Year Badge */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-cigar-copper text-luxury-cream px-4 py-2 rounded-lg font-bold text-lg">
                  {milestone.year}
                </div>
                <div className="text-luxury-cream/60 text-sm">
                  {new Date().getFullYear() - milestone.year} years ago
                </div>
              </div>
              
              {/* Event Description */}
              <p className="text-luxury-cream/80 leading-relaxed">
                {milestone.event}
              </p>
              
              {/* Special Highlighting for Key Events */}
              {milestone.year === 1910 && (
                <div className="mt-4 p-3 bg-cigar-copper/10 border border-cigar-copper/20 rounded-lg">
                  <p className="text-cigar-copper text-sm font-medium">
                    🏛️ Founding Year - The Beginning of a Legacy
                  </p>
                </div>
              )}
              
              {milestone.year === 1920 && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-sm font-medium">
                    🚫 Prohibition Era - Survival Through Innovation
                  </p>
                </div>
              )}
              
              {milestone.year === 2001 && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium">
                    🇺🇸 9/11 Response - Community Leadership
                  </p>
                </div>
              )}
              
              {milestone.year === 2023 && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">
                    👨‍👩‍👧‍👦 Fourth Generation - Future Secured
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Founder Tribute */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-xl p-8 border border-luxury-slate/20">
          <h3 className="text-2xl font-bold text-luxury-cream mb-2">Founded by Vision</h3>
          <p className="text-cigar-copper text-lg font-medium mb-4">{history.founder}</p>
          <p className="text-luxury-cream/70 max-w-2xl mx-auto">
            Over {new Date().getFullYear() - history.founded} years of continuous family ownership, 
            maintaining the traditions and excellence that define New York's most storied tobacco institution.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Compact Timeline for sidebar use
export function CompactTimeline({ history, className = '' }: TimelineProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-bold text-luxury-cream mb-4">Key Milestones</h3>
      {history.milestones.slice(0, 5).map((milestone, index) => (
        <div key={milestone.year} className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-cigar-copper rounded-full flex items-center justify-center text-luxury-cream text-xs font-bold flex-shrink-0">
            {milestone.year.toString().slice(-2)}
          </div>
          <div>
            <p className="text-luxury-cream/80 text-sm font-medium">{milestone.year}</p>
            <p className="text-luxury-cream/60 text-xs">{milestone.event}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
