export interface Venue {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: string;
  neighborhood: string;
  phone: string;
  hours: Record<string, string>;
  images: {
    hero: string;
    gallery: string[];
  };
  features: string[];
  signature: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  accentColor: string;
  locations: Venue[];
}

export interface ImageAsset {
  path: string;
  filename: string;
  category: 'hero' | 'gallery' | 'logo' | 'interior' | 'exterior' | 'humidor' | 'lounge';
  quality: 'high' | 'medium' | 'low';
  aspectRatio: '1x1' | '9x16' | '16x9' | 'original';
  suggestedUse: string[];
  brand: 'davidoff' | 'barclay-rex';
  location?: 'madison' | 'sixth-ave' | 'wall-st';
}

export type BrandId = 'davidoff' | 'barclay-rex';
export type LocationId = 'madison' | 'sixth-ave' | 'wall-st';
export type ImageCategory = ImageAsset['category'];