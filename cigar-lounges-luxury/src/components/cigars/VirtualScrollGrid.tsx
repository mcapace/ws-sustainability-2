'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cigar, VirtualScrollItem } from '@/types/cigars';
import { CigarCard } from './CigarCard';

interface VirtualScrollGridProps {
  cigars: Cigar[];
  onCompare: (cigar: Cigar) => void;
  compareItems: { cigar: Cigar; position: 'left' | 'right' }[];
}

const ITEM_HEIGHT = 400; // Approximate height of each card
const CONTAINER_HEIGHT = 800; // Height of visible area
const OVERSCAN = 3; // Extra items to render outside visible area

export function VirtualScrollGrid({ cigars, onCompare, compareItems }: VirtualScrollGridProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(CONTAINER_HEIGHT);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / ITEM_HEIGHT) + OVERSCAN,
      cigars.length
    );
    
    return {
      start: Math.max(0, startIndex - OVERSCAN),
      end: endIndex
    };
  }, [scrollTop, containerHeight, cigars.length]);

  // Virtual items
  const virtualItems = useMemo(() => {
    const items: VirtualScrollItem[] = [];
    
    for (let i = visibleRange.start; i < visibleRange.end; i++) {
      items.push({
        index: i,
        cigar: cigars[i],
        height: ITEM_HEIGHT
      });
    }
    
    return items;
  }, [cigars, visibleRange]);

  // Handle scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Update container height
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);


  return (
    <div className="virtual-scroll-container">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-auto scrollbar-thin scrollbar-thumb-luxury-slate scrollbar-track-transparent"
        style={{ height: `${containerHeight}px` }}
      >
        {/* Virtual Spacer - Top */}
        <div style={{ height: visibleRange.start * ITEM_HEIGHT }} />

        {/* Virtual Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          <AnimatePresence mode="popLayout">
            {virtualItems.map((item) => {
              const isInCompare = compareItems.some(ci => ci.cigar.id === item.cigar.id);
              
              return (
                <motion.div
                  key={item.cigar.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.4,
                    layout: { duration: 0.5, ease: 'easeOut' }
                  }}
                  className="cigar-card"
                >
                  <CigarCard
                    cigar={item.cigar}
                    onCompare={onCompare}
                    isInCompare={isInCompare}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Virtual Spacer - Bottom */}
        <div style={{ height: (cigars.length - visibleRange.end) * ITEM_HEIGHT }} />
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-10">
        <motion.div
          className="bg-luxury-black/80 backdrop-blur-lg rounded-full px-4 py-2 text-luxury-cream text-sm border border-luxury-slate/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Math.floor(scrollTop / ITEM_HEIGHT) + 1} - {Math.min(Math.floor(scrollTop / ITEM_HEIGHT) + Math.ceil(containerHeight / ITEM_HEIGHT), cigars.length)} of {cigars.length}
        </motion.div>
      </div>
    </div>
  );
}
