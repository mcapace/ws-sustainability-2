'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fallbackSrc?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate blur placeholder if not provided
  const generateBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Simple base64 encoded 1x1 transparent pixel
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setImgSrc(fallbackSrc);
    setIsLoading(false);
  };

  const imageProps = {
    src: hasError ? fallbackSrc : imgSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`,
    priority,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder === 'blur' ? 'blur' : 'empty',
    blurDataURL: placeholder === 'blur' ? generateBlurDataURL() : undefined,
    ...props
  };

  if (fill) {
    return (
      <div className={`relative ${aspectRatio ? `aspect-[${aspectRatio}]` : ''} overflow-hidden`}>
        <Image
          {...imageProps}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          style={{ objectFit: 'cover' }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-luxury-slate animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cigar-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        {...imageProps}
        width={width || 800}
        height={height || 600}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-luxury-slate animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cigar-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Hero Image Component with special optimizations
export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
        aspectRatio="16/9"
      />
    </motion.div>
  );
}

// Gallery Image Component
export function GalleryImage({ 
  src, 
  alt, 
  onClick,
  className = '' 
}: { 
  src: string; 
  alt: string; 
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        quality={80}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover rounded-lg"
      />
    </motion.div>
  );
}

// Logo Component with special handling
export function LogoImage({ 
  src, 
  alt, 
  width = 120, 
  height = 48,
  className = '' 
}: { 
  src: string; 
  alt: string; 
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      quality={95}
      className={`filter brightness-0 invert ${className}`}
      placeholder="empty"
    />
  );
}
