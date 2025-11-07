'use client';

import { useState } from 'react';
import { Cigar, CompareItem } from '@/types/cigars';

export function useCompare() {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);

  const canAddToCompare = (): boolean => {
    return compareItems.length < 2;
  };

  const addToCompare = (cigar: Cigar): void => {
    if (compareItems.length >= 2) return;
    
    const isAlreadyAdded = compareItems.some(item => item.cigar.id === cigar.id);
    if (isAlreadyAdded) return;

    const position = compareItems.length === 0 ? 'left' : 'right';
    const newItem: CompareItem = { cigar, position };
    
    setCompareItems(prev => [...prev, newItem]);
  };

  const removeFromCompare = (cigarId: string): void => {
    setCompareItems(prev => {
      const filtered = prev.filter(item => item.cigar.id !== cigarId);
      
      // Reassign positions
      return filtered.map((item, index) => ({
        ...item,
        position: index === 0 ? 'left' : 'right' as 'left' | 'right'
      }));
    });
  };

  const clearCompare = (): void => {
    setCompareItems([]);
  };

  const swapCompareItems = (): void => {
    setCompareItems(prev => 
      prev.map(item => ({
        ...item,
        position: item.position === 'left' ? 'right' : 'left'
      }))
    );
  };

  return {
    compareItems,
    canAddToCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    swapCompareItems
  };
}
