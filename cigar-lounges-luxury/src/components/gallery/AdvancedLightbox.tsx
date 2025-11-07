'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage, TouchGesture } from '@/types/gallery';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface AdvancedLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  images: GalleryImage[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function AdvancedLightbox({ 
  isOpen, 
  currentIndex, 
  images, 
  onClose, 
  onNavigate 
}: AdvancedLightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [touchGesture, setTouchGesture] = useState<TouchGesture>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    scale: 1,
    rotation: 0,
    isDragging: false
  });

  const lightboxRef = useRef<HTMLDivElement>(null);
  const currentImage = images[currentIndex];

  // Touch gesture handling
  const { ref: touchRef } = useSwipeGestures({
    onSwipeLeft: () => {
      if (currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    onSwipeRight: () => {
      if (currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    },
    onSwipeUp: onClose,
    threshold: 50
  });

  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: onClose,
    onArrowLeft: () => currentIndex > 0 && onNavigate(currentIndex - 1),
    onArrowRight: () => currentIndex < images.length - 1 && onNavigate(currentIndex + 1),
    onSpace: () => setShowDescription(!showDescription),
    enabled: isOpen
  });

  // Reset state when image changes
  useEffect(() => {
    setImageLoaded(false);
    setShowDescription(false);
    setTouchGesture(prev => ({ ...prev, scale: 1, rotation: 0 }));
  }, [currentIndex]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Handle download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.highResSrc || currentImage.src;
    link.download = `${currentImage.title}.jpg`;
    link.click();
  };

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={lightboxRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-lg"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-luxury-charcoal/80 hover:bg-luxury-slate/80 rounded-full transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Navigation arrows */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex > 0) onNavigate(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-luxury-charcoal/80 hover:bg-luxury-slate/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < images.length - 1) onNavigate(currentIndex + 1);
            }}
            disabled={currentIndex === images.length - 1}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-luxury-charcoal/80 hover:bg-luxury-slate/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Main image container */}
          <div 
            ref={touchRef as React.RefObject<HTMLDivElement>}
            className="relative w-full h-full flex items-center justify-center p-20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: imageLoaded ? 1 : 0.8,
                x: touchGesture.currentX - touchGesture.startX,
                y: touchGesture.currentY - touchGesture.startY,
                rotate: touchGesture.rotation
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-full"
            >
              <Image
                src={currentImage.highResSrc || currentImage.src}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
                onLoad={handleImageLoad}
                priority
              />
            </motion.div>
          </div>

          {/* Image info panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-luxury-black/90 to-transparent"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-display text-luxury-cream mb-2">
                    {currentImage.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-luxury-cream/70">
                    <span className="px-2 py-1 bg-cigar-gold/20 text-cigar-gold rounded">
                      {currentImage.category}
                    </span>
                    {currentImage.photographer && (
                      <span>Photo: {currentImage.photographer}</span>
                    )}
                    {currentImage.date && (
                      <span>{new Date(currentImage.date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleShare}
                    className="p-2 bg-luxury-charcoal/80 hover:bg-luxury-slate/80 rounded-lg transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 bg-luxury-charcoal/80 hover:bg-luxury-slate/80 rounded-lg transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 text-luxury-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Description */}
              <AnimatePresence>
                {showDescription && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-luxury-cream/80 leading-relaxed">
                      {currentImage.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image counter */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-luxury-charcoal/80 text-luxury-cream text-sm rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>

          {/* Keyboard hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 left-6 text-cigar-gold/60 text-sm"
          >
            <div className="space-y-1">
              <div>← → Navigate</div>
              <div>Space Description</div>
              <div>ESC Close</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
