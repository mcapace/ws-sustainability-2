'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to analytics service if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-luxury-charcoal flex items-center justify-center p-4"
        >
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-cigar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-luxury-cream mb-2">
                Something went wrong
              </h1>
              <p className="text-luxury-cream/70 mb-6">
                We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
              </p>
            </div>

            <div className="space-y-4">
              <motion.button
                onClick={() => window.location.reload()}
                className="w-full bg-cigar-gold text-luxury-charcoal py-3 px-6 rounded-lg font-semibold hover:bg-cigar-gold/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Refresh Page
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '/'}
                className="w-full bg-transparent border border-luxury-slate/30 text-luxury-cream py-3 px-6 rounded-lg font-semibold hover:border-cigar-gold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go Home
              </motion.button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-cigar-gold cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <pre className="bg-luxury-slate/20 p-4 rounded-lg text-xs text-luxury-cream/70 overflow-auto">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Specific error boundaries for different sections
export function VenueErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cigar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-luxury-cream mb-2">
              Venue Information Unavailable
            </h3>
            <p className="text-luxury-cream/70">
              We're having trouble loading venue details. Please try again later.
            </p>
          </div>
          <motion.button
            onClick={() => window.location.reload()}
            className="bg-cigar-gold text-luxury-charcoal py-2 px-4 rounded-lg font-semibold hover:bg-cigar-gold/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retry
          </motion.button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function ImageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-lg p-4 border border-luxury-slate/20 flex items-center justify-center aspect-video">
          <div className="text-center">
            <div className="w-12 h-12 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-cigar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-luxury-cream/70 text-sm">Image unavailable</p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}