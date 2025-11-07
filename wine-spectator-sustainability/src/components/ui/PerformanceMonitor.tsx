'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Get Web Vitals
    const getWebVitals = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // First Contentful Paint
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        
        // Largest Contentful Paint
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        const lcp = lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : null;
        
        // Time to First Byte
        const ttfb = navigation ? navigation.responseStart - navigation.requestStart : null;
        
        setMetrics({
          fcp: fcpEntry ? fcpEntry.startTime : null,
          lcp: lcp,
          fid: null, // First Input Delay requires user interaction
          cls: null, // Cumulative Layout Shift requires observation
          ttfb: ttfb,
        });
      }
    };

    // Calculate performance score
    const calculateScore = () => {
      const { fcp, lcp, ttfb } = metrics;
      let totalScore = 0;
      let factors = 0;

      // FCP scoring (0-25 points)
      if (fcp !== null) {
        if (fcp <= 1800) totalScore += 25;
        else if (fcp <= 3000) totalScore += 20;
        else if (fcp <= 4000) totalScore += 10;
        factors++;
      }

      // LCP scoring (0-25 points)
      if (lcp !== null) {
        if (lcp <= 2500) totalScore += 25;
        else if (lcp <= 4000) totalScore += 20;
        else if (lcp <= 6000) totalScore += 10;
        factors++;
      }

      // TTFB scoring (0-25 points)
      if (ttfb !== null) {
        if (ttfb <= 800) totalScore += 25;
        else if (ttfb <= 1800) totalScore += 20;
        else if (ttfb <= 3000) totalScore += 10;
        factors++;
      }

      // Bundle size estimation (0-25 points)
      const bundleSize = document.querySelectorAll('script').length * 50; // Rough estimate
      if (bundleSize <= 500) totalScore += 25;
      else if (bundleSize <= 1000) totalScore += 20;
      else if (bundleSize <= 2000) totalScore += 10;
      factors++;

      setScore(factors > 0 ? Math.round(totalScore / factors) : null);
    };

    // Initial measurement
    setTimeout(getWebVitals, 1000);
    setTimeout(calculateScore, 1500);

    // Monitor for LCP updates
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    return () => observer.disconnect();
  }, [metrics]);

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number | null) => {
    if (score === null) return 'Calculating...';
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Poor';
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -300 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -300 }}
          className="fixed top-4 right-4 z-[9999] bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-slate/20 rounded-lg p-4 text-xs text-luxury-cream min-w-[280px]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-cigar-gold">Performance Monitor</div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-luxury-cream/60 hover:text-luxury-cream"
              >
                ✕
              </button>
            </div>

            {/* Performance Score */}
            <div className="border-t border-luxury-slate/20 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span>Performance Score</span>
                <span className={`font-bold ${getScoreColor(score)}`}>
                  {score || '--'}
                </span>
              </div>
              <div className="text-xs text-luxury-cream/70">
                {getScoreLabel(score)}
              </div>
            </div>

            {/* Web Vitals */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-cigar-gold">Web Vitals</div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-luxury-cream/60">FCP</div>
                  <div className="font-mono">
                    {metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : '--'}
                  </div>
                </div>
                <div>
                  <div className="text-luxury-cream/60">LCP</div>
                  <div className="font-mono">
                    {metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : '--'}
                  </div>
                </div>
                <div>
                  <div className="text-luxury-cream/60">TTFB</div>
                  <div className="font-mono">
                    {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : '--'}
                  </div>
                </div>
                <div>
                  <div className="text-luxury-cream/60">Bundle</div>
                  <div className="font-mono">
                    {document.querySelectorAll('script').length} scripts
                  </div>
                </div>
              </div>
            </div>

            {/* Resource Count */}
            <div className="border-t border-luxury-slate/20 pt-3">
              <div className="text-xs font-semibold text-cigar-gold mb-2">Resources</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-luxury-cream/60">Images</div>
                  <div className="font-mono">
                    {document.querySelectorAll('img').length}
                  </div>
                </div>
                <div>
                  <div className="text-luxury-cream/60">CSS</div>
                  <div className="font-mono">
                    {document.querySelectorAll('link[rel="stylesheet"]').length}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-luxury-slate/20 pt-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-cigar-gold text-luxury-charcoal py-1 px-2 rounded text-xs font-semibold hover:bg-cigar-gold/90"
              >
                Reload & Measure
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsVisible(true)}
          className="fixed top-4 right-4 z-[9999] bg-cigar-gold text-luxury-charcoal p-2 rounded-full shadow-lg hover:bg-cigar-gold/90 transition-colors"
          title="Performance Monitor"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
