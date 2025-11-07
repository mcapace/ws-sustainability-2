'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { AdvancedLightbox } from '@/components/gallery/AdvancedLightbox';
import { GradientMesh } from '@/components/3d/GradientMesh';
import { FloatingDust } from '@/components/3d/FloatingDust';
import { Container } from '@/components/ui/Container';
import { galleryImages, galleryCategories } from '@/data/gallery';
import { GalleryImage, LightboxState, GalleryFilters } from '@/types/gallery';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PremiumGallery() {
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    isOpen: false,
    currentIndex: 0,
    images: []
  });
  const [filters, setFilters] = useState<GalleryFilters>({});
  const [, setIsBackgroundVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Filter images based on current filters
  const filteredImages = useMemo(() => {
    return galleryImages.filter(image => {
      if (filters.category && image.category !== filters.category) return false;
      if (filters.search && !image.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.tags && filters.tags.length > 0) {
        return filters.tags.some(tag => image.tags.includes(tag));
      }
      return true;
    });
  }, [filters]);

  // Handle image click
  const handleImageClick = (image: GalleryImage, index: number) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
      images: filteredImages
    });
  };

  // Handle lightbox navigation
  const handleLightboxNavigate = (index: number) => {
    setLightboxState(prev => ({ ...prev, currentIndex: index }));
  };

  // Handle lightbox close
  const handleLightboxClose = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onEnter: () => setIsBackgroundVisible(true),
        onLeave: () => setIsBackgroundVisible(false),
      }
    });

    tl.fromTo(backgroundRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="section-padding bg-luxury-black relative overflow-hidden">
      {/* WebGL Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4af37" />
          <GradientMesh />
          <FloatingDust count={150} />
        </Canvas>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-display mb-6">
            <span className="gradient-text">Premium</span>
            <br />
            <span className="text-luxury-cream">Gallery</span>
          </h2>
          <p className="text-xl text-luxury-cream/80 max-w-3xl mx-auto text-accent">
            Immerse yourself in the luxury experience through our curated collection 
            of premium venues, cigars, and spirits.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                filters.category === category.id
                  ? 'bg-cigar-gold text-luxury-black'
                  : 'bg-luxury-charcoal/50 text-luxury-cream hover:bg-luxury-slate/50'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-8 mb-12 text-luxury-cream/60"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-cigar-gold">{filteredImages.length}</div>
            <div className="text-sm">Images</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cigar-gold">{galleryCategories.length}</div>
            <div className="text-sm">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cigar-gold">4K</div>
            <div className="text-sm">Quality</div>
          </div>
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MasonryGallery
            images={filteredImages}
            onImageClick={handleImageClick}
            className="min-h-screen"
          />
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-luxury-cream mb-2">
                No images found
              </h3>
              <p className="text-luxury-cream/60">
                Try adjusting your filters to see more content.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Advanced Lightbox */}
      <AdvancedLightbox
        isOpen={lightboxState.isOpen}
        currentIndex={lightboxState.currentIndex}
        images={lightboxState.images}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </section>
  );
}
