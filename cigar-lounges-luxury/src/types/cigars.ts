export interface Cigar {
  id: string;
  name: string;
  brand: string;
  origin: 'Cuba' | 'Dominican Republic' | 'Nicaragua' | 'Honduras' | 'Mexico' | 'Ecuador';
  strength: 'Mild' | 'Medium' | 'Full' | 'Extra Full';
  priceRange: 'Economy' | 'Premium' | 'Ultra Premium' | 'Rare';
  rarity: 'Common' | 'Limited' | 'Rare' | 'Ultra Rare';
  rating: number; // 1-5 stars
  price: number;
  currency: string;
  description: string;
  tastingNotes: string[];
  size: {
    length: number; // inches
    ringGauge: number; // 1/64th of an inch
    shape: 'Robusto' | 'Toro' | 'Churchill' | 'Corona' | 'Toro' | 'Belicoso' | 'Lancero';
  };
  aging: number; // years
  wrapper: string;
  binder: string;
  filler: string[];
  smokingTime: number; // minutes
  strengthProfile: {
    body: number; // 1-10
    flavor: number; // 1-10
    strength: number; // 1-10
  };
  image: string;
  thumbnail: string;
  gallery: string[];
  featured: boolean;
  limitedEdition: boolean;
  year: number;
  awards?: string[];
  pairings: string[];
}

export interface FilterState {
  origin: string[];
  strength: string[];
  priceRange: string[];
  rarity: string[];
  search: string;
  sortBy: 'name' | 'price' | 'rating' | 'rarity' | 'year';
  sortOrder: 'asc' | 'desc';
  favorites: boolean;
  featured: boolean;
}

export interface FilterPill {
  id: string;
  label: string;
  value: string;
  category: string;
  color: string;
  icon: string;
}

export interface CompareItem {
  cigar: Cigar;
  position: 'left' | 'right';
}

export interface VirtualScrollItem {
  index: number;
  cigar: Cigar;
  height: number;
}

export interface FLIPAnimation {
  from: DOMRect;
  to: DOMRect;
  element: HTMLElement;
}
