'use client';

import { motion } from 'framer-motion';

// Main page loading component
export function PageLoading() {
  return (
    <div className="min-h-screen bg-luxury-charcoal flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 border-4 border-cigar-gold border-t-transparent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h1
          className="text-2xl font-bold text-luxury-cream mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Cigar Aficionado Select
        </motion.h1>
        <motion.p
          className="text-luxury-cream/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Loading luxury experiences...
        </motion.p>
      </div>
    </div>
  );
}

// Skeleton loading for content sections
export function ContentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-luxury-slate/20 rounded-lg w-3/4"></div>
      <div className="h-4 bg-luxury-slate/20 rounded-lg w-full"></div>
      <div className="h-4 bg-luxury-slate/20 rounded-lg w-5/6"></div>
      <div className="h-4 bg-luxury-slate/20 rounded-lg w-4/6"></div>
    </div>
  );
}

// Image loading skeleton
export function ImageSkeleton({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <div 
      className="bg-luxury-slate/20 animate-pulse rounded-lg"
      style={{ aspectRatio }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-12 h-12 text-luxury-slate/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

// Venue card loading skeleton
export function VenueCardSkeleton() {
  return (
    <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-6 border border-luxury-slate/20 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-luxury-slate/20 rounded-lg"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-luxury-slate/20 rounded w-3/4"></div>
          <div className="h-3 bg-luxury-slate/20 rounded w-1/2"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="h-3 bg-luxury-slate/20 rounded w-full"></div>
        <div className="h-3 bg-luxury-slate/20 rounded w-5/6"></div>
        <div className="h-3 bg-luxury-slate/20 rounded w-4/6"></div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="h-3 bg-luxury-slate/20 rounded w-1/3"></div>
        <div className="h-3 bg-luxury-slate/20 rounded w-2/3"></div>
        <div className="h-3 bg-luxury-slate/20 rounded w-1/2"></div>
      </div>
    </div>
  );
}

// Gallery loading skeleton
export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ImageSkeleton key={index} aspectRatio="1/1" />
      ))}
    </div>
  );
}

// Timeline loading skeleton
export function TimelineSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="relative pl-20 animate-pulse">
          <div className="absolute left-4 top-2 w-4 h-4 bg-luxury-slate/20 rounded-full"></div>
          <div className="bg-luxury-slate/10 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-8 bg-luxury-slate/20 rounded"></div>
              <div className="h-4 bg-luxury-slate/20 rounded w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-luxury-slate/20 rounded w-full"></div>
              <div className="h-4 bg-luxury-slate/20 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Button loading state
export function ButtonLoading() {
  return (
    <div className="inline-flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-cigar-gold border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  );
}

// Form loading state
export function FormLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-4 bg-luxury-slate/20 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-luxury-slate/20 rounded w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-luxury-slate/20 rounded w-1/3 mb-2"></div>
        <div className="h-10 bg-luxury-slate/20 rounded w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-luxury-slate/20 rounded w-1/2 mb-2"></div>
        <div className="h-24 bg-luxury-slate/20 rounded w-full"></div>
      </div>
      <div className="h-10 bg-luxury-slate/20 rounded w-32"></div>
    </div>
  );
}

// Progressive loading for images
export function ProgressiveImageLoader({ 
  src, 
  alt, 
  className = '',
  placeholder = true 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {placeholder && (
        <ImageSkeleton />
      )}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onLoad={(e) => {
          // Hide placeholder when image loads
          const placeholder = e.currentTarget.previousElementSibling;
          if (placeholder) {
            placeholder.style.display = 'none';
          }
        }}
      />
    </div>
  );
}
