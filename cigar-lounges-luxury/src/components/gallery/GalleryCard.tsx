'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage } from '@/types/gallery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface GalleryCardProps {
  image: GalleryImage;
  onLoad: () => void;
  onClick: () => void;
}

export function GalleryCard({ image, onLoad, onClick }: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  useIntersectionObserver(cardRef, {
    threshold: 0.1,
    onIntersect: () => setIsInView(true)
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad();
  };

  return (
    <motion.div
      ref={cardRef}
      className="gallery-card relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Blur-up placeholder */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-luxury-charcoal animate-pulse"
          style={{ aspectRatio: image.aspectRatio }}
        >
          <div className="w-full h-full bg-gradient-to-br from-luxury-slate to-luxury-charcoal" />
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
          style={{ aspectRatio: image.aspectRatio }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={handleImageLoad}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-luxury-cream">
              <h3 className="text-lg font-semibold text-display mb-1">
                {image.title}
              </h3>
              <p className="text-sm text-luxury-cream/80 line-clamp-2">
                {image.description}
              </p>
              {image.photographer && (
                <p className="text-xs text-cigar-gold mt-2">
                  Photo: {image.photographer}
                </p>
              )}
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-cigar-gold/90 text-luxury-black rounded-full">
              {image.category}
            </span>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-lg border border-cigar-gold/0 group-hover:border-cigar-gold/30 transition-colors duration-300"
            whileHover={{
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>
      )}

      {/* Loading shimmer */}
      {!imageLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cigar-gold/10 to-transparent animate-shimmer" />
      )}
    </motion.div>
  );
}
