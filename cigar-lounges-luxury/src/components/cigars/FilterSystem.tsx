'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterState, FilterPill as FilterPillType } from '@/types/cigars';
import { useDebounce } from '@/hooks/useDebounce';
import { useMagneticHover } from '@/hooks/useMagneticHover';

interface FilterSystemProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

const filterCategories: FilterPillType[] = [
  // Origins
  { id: 'origin-cuba', label: 'Cuba', value: 'Cuba', category: 'origin', color: '#d4af37', icon: '🇨🇺' },
  { id: 'origin-dominican', label: 'Dominican Republic', value: 'Dominican Republic', category: 'origin', color: '#b87333', icon: '🇩🇴' },
  { id: 'origin-nicaragua', label: 'Nicaragua', value: 'Nicaragua', category: 'origin', color: '#cd7f32', icon: '🇳🇮' },
  { id: 'origin-honduras', label: 'Honduras', value: 'Honduras', category: 'origin', color: '#ffd700', icon: '🇭🇳' },
  { id: 'origin-mexico', label: 'Mexico', value: 'Mexico', category: 'origin', color: '#ffbf00', icon: '🇲🇽' },
  { id: 'origin-ecuador', label: 'Ecuador', value: 'Ecuador', category: 'origin', color: '#f4a460', icon: '🇪🇨' },
  
  // Strengths
  { id: 'strength-mild', label: 'Mild', value: 'Mild', category: 'strength', color: '#90EE90', icon: '🌿' },
  { id: 'strength-medium', label: 'Medium', value: 'Medium', category: 'strength', color: '#FFA500', icon: '🔥' },
  { id: 'strength-full', label: 'Full', value: 'Full', category: 'strength', color: '#FF4500', icon: '🔥🔥' },
  { id: 'strength-extra-full', label: 'Extra Full', value: 'Extra Full', category: 'strength', color: '#DC143C', icon: '🔥🔥🔥' },
  
  // Price Ranges
  { id: 'price-economy', label: 'Economy', value: 'Economy', category: 'priceRange', color: '#87CEEB', icon: '💵' },
  { id: 'price-premium', label: 'Premium', value: 'Premium', category: 'priceRange', color: '#DDA0DD', icon: '💎' },
  { id: 'price-ultra-premium', label: 'Ultra Premium', value: 'Ultra Premium', category: 'priceRange', color: '#FFD700', icon: '👑' },
  { id: 'price-rare', label: 'Rare', value: 'Rare', category: 'priceRange', color: '#FF69B4', icon: '💍' },
  
  // Rarity
  { id: 'rarity-common', label: 'Common', value: 'Common', category: 'rarity', color: '#C0C0C0', icon: '⚪' },
  { id: 'rarity-limited', label: 'Limited', value: 'Limited', category: 'rarity', color: '#FFD700', icon: '🟡' },
  { id: 'rarity-rare', label: 'Rare', value: 'Rare', category: 'rarity', color: '#FF8C00', icon: '🟠' },
  { id: 'rarity-ultra-rare', label: 'Ultra Rare', value: 'Ultra Rare', category: 'rarity', color: '#DC143C', icon: '🔴' }
];

export function FilterSystem({ filters, onFiltersChange, resultsCount }: FilterSystemProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [isExpanded, setIsExpanded] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update filters when debounced search changes
  useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch });
  }, [debouncedSearch, filters, onFiltersChange]);

  const handlePillClick = (pill: FilterPillType) => {
    const category = pill.category as keyof Pick<FilterState, 'origin' | 'strength' | 'priceRange' | 'rarity'>;
    const currentValues = filters[category];
    const newValues = currentValues.includes(pill.value)
      ? currentValues.filter(v => v !== pill.value)
      : [...currentValues, pill.value];

    onFiltersChange({
      ...filters,
      [category]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      ...filters,
      origin: [],
      strength: [],
      priceRange: [],
      rarity: [],
      search: '',
      favorites: false,
      featured: false
    });
    setSearchTerm('');
  };

  const hasActiveFilters = [
    ...filters.origin,
    ...filters.strength,
    ...filters.priceRange,
    ...filters.rarity
  ].length > 0 || filters.search || filters.favorites || filters.favorites;

  return (
    <div ref={containerRef} className="filter-system bg-luxury-charcoal/50 backdrop-blur-lg rounded-2xl p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-luxury-cream/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cigars by name, brand, or tasting notes..."
          className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-slate/30 rounded-lg text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:border-cigar-gold/50 focus:ring-1 focus:ring-cigar-gold/20 transition-all duration-300"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFiltersChange({ ...filters, featured: !filters.featured })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            filters.featured
              ? 'bg-cigar-gold text-luxury-black'
              : 'bg-luxury-slate/50 text-luxury-cream hover:bg-luxury-slate/70'
          }`}
        >
          ⭐ Featured
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFiltersChange({ ...filters, favorites: !filters.favorites })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            filters.favorites
              ? 'bg-cigar-gold text-luxury-black'
              : 'bg-luxury-slate/50 text-luxury-cream hover:bg-luxury-slate/70'
          }`}
        >
          ❤️ Favorites
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-full text-sm font-medium bg-luxury-slate/50 text-luxury-cream hover:bg-luxury-slate/70 transition-all duration-300"
          >
            ✕ Clear All
          </motion.button>
        )}
      </div>

      {/* Expandable Filter Categories */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 bg-luxury-black/30 rounded-lg hover:bg-luxury-black/50 transition-all duration-300"
      >
        <span className="text-luxury-cream font-medium">Advanced Filters</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 text-cigar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-6">
              {/* Origin Filters */}
              <div>
                <h4 className="text-luxury-cream font-medium mb-3 flex items-center">
                  <span className="mr-2">🌍</span>
                  Origin
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.filter(p => p.category === 'origin').map(pill => (
                    <FilterPill
                      key={pill.id}
                      pill={pill}
                      isActive={filters.origin.includes(pill.value)}
                      onClick={() => handlePillClick(pill)}
                    />
                  ))}
                </div>
              </div>

              {/* Strength Filters */}
              <div>
                <h4 className="text-luxury-cream font-medium mb-3 flex items-center">
                  <span className="mr-2">🔥</span>
                  Strength
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.filter(p => p.category === 'strength').map(pill => (
                    <FilterPill
                      key={pill.id}
                      pill={pill}
                      isActive={filters.strength.includes(pill.value)}
                      onClick={() => handlePillClick(pill)}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range Filters */}
              <div>
                <h4 className="text-luxury-cream font-medium mb-3 flex items-center">
                  <span className="mr-2">💰</span>
                  Price Range
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.filter(p => p.category === 'priceRange').map(pill => (
                    <FilterPill
                      key={pill.id}
                      pill={pill}
                      isActive={filters.priceRange.includes(pill.value)}
                      onClick={() => handlePillClick(pill)}
                    />
                  ))}
                </div>
              </div>

              {/* Rarity Filters */}
              <div>
                <h4 className="text-luxury-cream font-medium mb-3 flex items-center">
                  <span className="mr-2">💎</span>
                  Rarity
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.filter(p => p.category === 'rarity').map(pill => (
                    <FilterPill
                      key={pill.id}
                      pill={pill}
                      isActive={filters.rarity.includes(pill.value)}
                      onClick={() => handlePillClick(pill)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 flex items-center justify-between"
      >
        <div className="text-luxury-cream/70 text-sm">
          <RollingNumber value={resultsCount} />
          <span className="ml-1">cigars found</span>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFiltersChange({ 
                ...filters, 
                sortBy: sortBy as 'name' | 'price' | 'rating' | 'rarity' | 'year', 
                sortOrder: sortOrder as 'asc' | 'desc' 
              });
            }}
            className="px-3 py-1 bg-luxury-black/50 border border-luxury-slate/30 rounded text-luxury-cream text-sm focus:outline-none focus:border-cigar-gold/50"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="rating-desc">Rating High-Low</option>
            <option value="rarity-asc">Rarity</option>
            <option value="year-desc">Year Newest</option>
          </select>
        </div>
      </motion.div>
    </div>
  );
}

// Individual Filter Pill Component
interface FilterPillProps {
  pill: FilterPillType;
  isActive: boolean;
  onClick: () => void;
}

function FilterPill({ pill, isActive, onClick }: FilterPillProps) {
  const { ref, magneticStyle } = useMagneticHover();

  return (
    <motion.button
      ref={ref}
      style={{
        ...magneticStyle,
        backgroundColor: isActive ? pill.color : 'transparent',
        border: `1px solid ${isActive ? pill.color : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: isActive ? `0 0 20px ${pill.color}40` : 'none'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
        isActive
          ? 'text-luxury-black shadow-lg'
          : 'text-luxury-cream hover:text-luxury-black'
      }`}
    >
      <span>{pill.icon}</span>
      <span>{pill.label}</span>
    </motion.button>
  );
}

// Rolling Number Component
interface RollingNumberProps {
  value: number;
}

function RollingNumber({ value }: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.span
      key={displayValue}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="font-bold text-cigar-gold"
    >
      {displayValue}
    </motion.span>
  );
}
