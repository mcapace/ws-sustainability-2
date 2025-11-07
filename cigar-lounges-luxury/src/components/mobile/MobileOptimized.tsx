'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice, useMobileConfig, useCollapsibleSection, useThumbZone, useAdaptiveQuality } from '@/hooks/useMobile';
import { TouchGesture, SwipeData, PinchData } from '@/types/mobile';
import { useTouchGestures } from '@/hooks/useTouchGestures';

// Mobile Card Layout
interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onSwipe?: (direction: 'left' | 'right') => void;
  enableSwipe?: boolean;
  hapticFeedback?: boolean;
}

export function MobileCard({ 
  children, 
  className = '', 
  onSwipe, 
  enableSwipe = false,
  hapticFeedback = true 
}: MobileCardProps) {
  const { deviceInfo } = useDevice();
  const { checkThumbZone } = useThumbZone();

  const handleSwipe = (data: SwipeData) => {
    if (data.direction === 'left' || data.direction === 'right') {
      onSwipe?.(data.direction);
    }
  };

  const gestures = useTouchGestures({
    swipe: enableSwipe ? handleSwipe : undefined,
  });

  // Optimize for mobile if device is mobile
  const mobileOptimized = deviceInfo?.isMobile ? {
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } : {};

  return (
    <motion.div
      ref={enableSwipe ? gestures.swipe.elementRef : undefined}
      className={`bg-luxury-charcoal/80 backdrop-blur-sm border border-luxury-slate/20 ${className}`}
      style={mobileOptimized}
      whileHover={deviceInfo?.isDesktop ? { scale: 1.02 } : undefined}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {children}
    </motion.div>
  );
}

// Thumb-Zone Optimized CTA
interface ThumbZoneCTAProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  hapticFeedback?: boolean;
}

export function ThumbZoneCTA({ 
  children, 
  onClick, 
  className = '', 
  size = 'medium',
  color = 'cigar-gold',
  hapticFeedback = true 
}: ThumbZoneCTAProps) {
  const { deviceInfo } = useDevice();
  const { isInThumbZone } = useThumbZone();

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  // Optimize for thumb zone on mobile
  const mobileOptimized = deviceInfo?.isMobile ? {
    minHeight: '44px', // Apple's recommended touch target size
    minWidth: '44px',
    borderRadius: '12px',
    fontWeight: '600',
  } : {};

  return (
    <motion.button
      onClick={onClick}
      className={`bg-${color} text-black font-semibold rounded-lg transition-all duration-200 ${sizeClasses[size]} ${className}`}
      style={{
        ...mobileOptimized,
        // Highlight if in thumb zone
        backgroundColor: isInThumbZone && deviceInfo?.isMobile ? 
          `var(--cigar-gold-light)` : undefined,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.button>
  );
}

// Collapsible Section
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  icon?: string;
}

export function CollapsibleSection({ 
  title, 
  children, 
  isOpen = false, 
  onToggle,
  className = '',
  icon = '▼'
}: CollapsibleSectionProps) {
  const { height, isAnimating, contentRef } = useCollapsibleSection(isOpen);

  return (
    <div className={`border-b border-luxury-slate/20 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-luxury-slate/10 transition-colors"
      >
        <h3 className="text-lg font-semibold text-luxury-cream">{title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-luxury-cream/70"
        >
          {icon}
        </motion.span>
      </button>
      
      <AnimatePresence>
        <motion.div
          ref={contentRef}
          initial={false}
          animate={{ height }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="px-4 pb-4">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Adaptive Image Component
interface AdaptiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function AdaptiveImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw'
}: AdaptiveImageProps) {
  const { deviceInfo } = useDevice();
  const { imageQuality } = useAdaptiveQuality();
  const [isLoaded, setIsLoaded] = useState(false);

  // Adjust image quality based on device and network
  const getOptimizedSrc = (originalSrc: string) => {
    if (imageQuality === 'low') {
      // Return low quality version or add quality parameter
      return `${originalSrc}?q=60&w=400`;
    } else if (imageQuality === 'medium') {
      return `${originalSrc}?q=80&w=800`;
    }
    return originalSrc;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={getOptimizedSrc(src)}
        alt={alt}
        className="w-full h-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
        whileHover={deviceInfo?.isDesktop ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.3 }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-luxury-slate animate-pulse" />
      )}
    </div>
  );
}

// Mobile-Optimized Gallery
interface MobileGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    id: string;
  }>;
  onImageClick?: (imageId: string) => void;
  className?: string;
}

export function MobileGallery({ images, onImageClick, className = '' }: MobileGalleryProps) {
  const { deviceInfo } = useDevice();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    if (deviceInfo?.isMobile) {
      setSelectedImage(imageId);
    }
    onImageClick?.(imageId);
  };

  const handlePinch = (data: PinchData) => {
    // Handle pinch-to-zoom for mobile
    console.log('Pinch scale:', data.scale);
  };

  const gestures = useTouchGestures({
    pinch: deviceInfo?.isMobile ? handlePinch : undefined,
  });

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            ref={index === 0 ? gestures.pinch.elementRef : undefined}
            onClick={() => handleImageClick(image.id)}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AdaptiveImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Full-screen image viewer for mobile */}
      {deviceInfo?.isMobile && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <AdaptiveImage
            src={images.find(img => img.id === selectedImage)?.src || ''}
            alt={images.find(img => img.id === selectedImage)?.alt || ''}
            className="max-w-full max-h-full rounded-lg"
          />
        </motion.div>
      )}
    </div>
  );
}

// Performance-Optimized Particle System
interface MobileParticlesProps {
  count?: number;
  className?: string;
}

export function MobileParticles({ count = 100, className = '' }: MobileParticlesProps) {
  const { deviceInfo } = useDevice();
  const { performanceConfig } = useDevice();

  // Reduce particle count based on device performance
  const optimizedCount = deviceInfo?.isMobile ? 
    Math.min(count, performanceConfig?.particleCount || 100) : count;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: optimizedCount }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-cigar-gold/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Responsive Text Component
interface ResponsiveTextProps {
  children: ReactNode;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  className?: string;
}

export function ResponsiveText({ 
  children, 
  mobile = 'text-sm',
  tablet = 'text-base',
  desktop = 'text-lg',
  className = ''
}: ResponsiveTextProps) {
  return (
    <span className={`${mobile} md:${tablet} lg:${desktop} ${className}`}>
      {children}
    </span>
  );
}

// Mobile-First Spacing
interface MobileSpacingProps {
  children: ReactNode;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  className?: string;
}

export function MobileSpacing({ 
  children, 
  mobile = 'p-4',
  tablet = 'md:p-6',
  desktop = 'lg:p-8',
  className = ''
}: MobileSpacingProps) {
  return (
    <div className={`${mobile} ${tablet} ${desktop} ${className}`}>
      {children}
    </div>
  );
}
