'use client';

import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from '@/types/gallery';
import { GalleryCard } from './GalleryCard';

interface MasonryGalleryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage, index: number) => void;
  className?: string;
}

export function MasonryGallery({ images, onImageClick, className = '' }: MasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLoadedImages] = useState<Set<string>>(new Set());

  // Create masonry columns
  const columns = useMemo(() => {
    const columnCount = typeof window !== 'undefined' 
      ? (window.innerWidth > 1200 ? 4 : window.innerWidth > 800 ? 3 : 2)
      : 3; // Default to 3 columns for SSR
    const cols: GalleryImage[][] = Array.from({ length: columnCount }, () => []);
    
    images.forEach((image) => {
      const shortestColumn = cols.reduce((shortest, current, i) => 
        cols[i].length < cols[shortest].length ? i : shortest, 0
      );
      cols[shortestColumn].push(image);
    });
    
    return cols;
  }, [images]);

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  return (
    <div 
      ref={containerRef}
      className={`masonry-gallery ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: '1.5rem',
        padding: '2rem 0'
      }}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="masonry-column">
        {column.map((image) => {
          const globalIndex = images.findIndex(img => img.id === image.id);
            return (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.6,
                  delay: columnIndex * 0.1,
                  ease: 'easeOut'
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="masonry-item mb-6"
              >
                <GalleryCard
                  image={image}
                  onLoad={() => handleImageLoad(image.id)}
                  onClick={() => onImageClick(image, globalIndex)}
                />
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
