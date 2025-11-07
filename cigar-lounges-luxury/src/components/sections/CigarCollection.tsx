'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cigars } from '@/data/cigars';
import { Cigar, FilterState } from '@/types/cigars';
import { FilterSystem } from '@/components/cigars/FilterSystem';
import { VirtualScrollGrid } from '@/components/cigars/VirtualScrollGrid';
import { CompareMode } from '@/components/cigars/CompareMode';
import { SurpriseButton } from '@/components/cigars/SurpriseButton';
import { useCompare } from '@/hooks/useCompare';
import { Container } from '@/components/ui/Container';

export function CigarCollection() {
  const [filters, setFilters] = useState<FilterState>({
    origin: [],
    strength: [],
    priceRange: [],
    rarity: [],
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
    favorites: false,
    featured: false
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const { compareItems, addToCompare, removeFromCompare } = useCompare();

  // Filter and sort cigars
  const filteredCigars = useMemo(() => {
    const filtered = cigars.filter(cigar => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          cigar.name.toLowerCase().includes(searchLower) ||
          cigar.brand.toLowerCase().includes(searchLower) ||
          cigar.tastingNotes.some(note => note.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filters
      if (filters.origin.length > 0 && !filters.origin.includes(cigar.origin)) return false;
      if (filters.strength.length > 0 && !filters.strength.includes(cigar.strength)) return false;
      if (filters.priceRange.length > 0 && !filters.priceRange.includes(cigar.priceRange)) return false;
      if (filters.rarity.length > 0 && !filters.rarity.includes(cigar.rarity)) return false;

      // Special filters
      if (filters.featured && !cigar.featured) return false;
      if (filters.favorites) {
        // This would need to be connected to the favorites hook
        // For now, we'll skip this filter
      }

      return true;
    });

    // Sort cigars
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'rarity':
          const rarityOrder = ['Common', 'Limited', 'Rare', 'Ultra Rare'];
          comparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
          break;
        case 'year':
          comparison = b.year - a.year;
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [filters]);

  const handleCompare = useCallback((cigar: Cigar) => {
    const isInCompare = compareItems.some(item => item.cigar.id === cigar.id);
    
    if (isInCompare) {
      removeFromCompare(cigar.id);
    } else {
      addToCompare(cigar);
    }
  }, [compareItems, addToCompare, removeFromCompare]);

  const handleSurpriseSelect = useCallback((cigar: Cigar) => {
    // Scroll to the selected cigar in the grid
    const element = document.querySelector(`[data-cigar-id="${cigar.id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <section id="cigar-collection" className="section-padding bg-luxury-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cigar-gold/10 via-transparent to-cigar-gold/10" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-display mb-6">
            <span className="gradient-text">Premium</span>
            <br />
            <span className="text-luxury-cream">Cigar Collection</span>
          </h2>
          <p className="text-xl text-luxury-cream/80 max-w-3xl mx-auto text-accent mb-8">
            Discover our curated selection of world-class cigars, each one a masterpiece 
            of craftsmanship and flavor.
          </p>

          {/* Surprise Button */}
          <SurpriseButton
            cigars={filteredCigars}
            onSurpriseSelect={handleSurpriseSelect}
          />
        </motion.div>

        {/* Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterSystem
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredCigars.length}
          />
        </motion.div>

        {/* Collection Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cigar-gold mb-2">{cigars.length}</div>
            <div className="text-luxury-cream/70 text-sm">Total Cigars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cigar-gold mb-2">
              {new Set(cigars.map(c => c.origin)).size}
            </div>
            <div className="text-luxury-cream/70 text-sm">Origins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cigar-gold mb-2">
              {cigars.filter(c => c.featured).length}
            </div>
            <div className="text-luxury-cream/70 text-sm">Featured</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cigar-gold mb-2">
              {cigars.filter(c => c.rarity === 'Ultra Rare').length}
            </div>
            <div className="text-luxury-cream/70 text-sm">Ultra Rare</div>
          </div>
        </motion.div>

        {/* Virtual Scroll Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-screen"
        >
          <VirtualScrollGrid
            cigars={filteredCigars}
            onCompare={handleCompare}
            compareItems={compareItems}
          />
        </motion.div>
      </Container>

      {/* Compare Mode */}
      <CompareMode
        compareItems={compareItems}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Floating Compare Button */}
      {compareItems.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCompareOpen(true)}
          className="fixed bottom-8 left-8 z-40 bg-cigar-gold text-luxury-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Compare ({compareItems.length})
        </motion.button>
      )}
    </section>
  );
}
