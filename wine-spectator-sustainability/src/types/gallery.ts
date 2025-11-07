export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'lounge' | 'cigars' | 'spirits' | 'atmosphere' | 'events';
  tags: string[];
  photographer?: string;
  date?: string;
  location?: string;
  aspectRatio: number; // width/height
  highResSrc?: string;
  thumbnail?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: GalleryImage[];
}

export interface TouchGesture {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  scale: number;
  rotation: number;
  isDragging: boolean;
}

export interface GalleryFilters {
  category?: string;
  tags?: string[];
  search?: string;
}
