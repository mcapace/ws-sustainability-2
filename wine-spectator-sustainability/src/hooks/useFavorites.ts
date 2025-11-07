'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cigar-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error);
        }
      }
    }
  }, []);

  const isFavorite = (cigarId: string): boolean => {
    return favorites.includes(cigarId);
  };

  const toggleFavorite = (cigarId: string): void => {
    const newFavorites = favorites.includes(cigarId)
      ? favorites.filter(id => id !== cigarId)
      : [...favorites, cigarId];
    
    setFavorites(newFavorites);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  };

  const addFavorite = (cigarId: string): void => {
    if (!favorites.includes(cigarId)) {
      const newFavorites = [...favorites, cigarId];
      setFavorites(newFavorites);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    }
  };

  const removeFavorite = (cigarId: string): void => {
    const newFavorites = favorites.filter(id => id !== cigarId);
    setFavorites(newFavorites);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    }
  };

  const clearFavorites = (): void => {
    setFavorites([]);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FAVORITES_KEY);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites
  };
}
