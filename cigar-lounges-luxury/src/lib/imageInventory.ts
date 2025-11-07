// Image inventory system for luxury cigar lounge brands
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

// Auto-scanned image inventory from the public/images folders
export const imageInventory: ImageAsset[] = [
  // Davidoff Logos
  {
    path: '/images/Davidoff Logo.png',
    filename: 'Davidoff Logo.png',
    category: 'logo',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['navigation', 'hero', 'footer'],
    brand: 'davidoff',
  },

  // Barclay Rex Logos
  {
    path: '/images/Barclay Rex logo.png',
    filename: 'Barclay Rex logo.png',
    category: 'logo',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['navigation', 'hero', 'footer'],
    brand: 'barclay-rex',
  },

  // Davidoff Madison Avenue - Hero Images
  {
    path: '/images/Davidoff Madison/Facade_Davidoff_NYMadison_04a.jpg',
    filename: 'Facade_Davidoff_NYMadison_04a.jpg',
    category: 'exterior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/Facade_Davidoff_NYMadison_04b.jpg',
    filename: 'Facade_Davidoff_NYMadison_04b.jpg',
    category: 'exterior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },

  // Davidoff Madison Avenue - Interior Spaces
  {
    path: '/images/Davidoff Madison/Humidor_Davidoff_NYMadison_02_V2.jpg',
    filename: 'Humidor_Davidoff_NYMadison_02_V2.jpg',
    category: 'humidor',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'feature-highlight'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/Sales Area_Davidoff_NYMadison_01_V2.jpg',
    filename: 'Sales Area_Davidoff_NYMadison_01_V2.jpg',
    category: 'interior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/UL Lounge_Davidoff_NYMadison_05.jpg',
    filename: 'UL Lounge_Davidoff_NYMadison_05.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'feature-highlight'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/UL Lounge_Davidoff_NYMadison_06_V2.jpg',
    filename: 'UL Lounge_Davidoff_NYMadison_06_V2.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/LL LOunge_Davidoff_NYMadison_07.jpg',
    filename: 'LL LOunge_Davidoff_NYMadison_07.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },
  {
    path: '/images/Davidoff Madison/LL Lounge_Davidoff_NYMadison_08.jpg',
    filename: 'LL Lounge_Davidoff_NYMadison_08.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'madison',
  },

  // Davidoff 6th Avenue - All Images
  {
    path: '/images/Davidoff Sixth Ave/Davidoff_6Av_01_V2_RGB.jpg',
    filename: 'Davidoff_6Av_01_V2_RGB.jpg',
    category: 'exterior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'sixth-ave',
  },
  {
    path: '/images/Davidoff Sixth Ave/Davidoff_6Av_02a_V2_RGB.jpg',
    filename: 'Davidoff_6Av_02a_V2_RGB.jpg',
    category: 'interior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'sixth-ave',
  },
  {
    path: '/images/Davidoff Sixth Ave/Davidoff_6Av_03a_V2_RGB.jpg',
    filename: 'Davidoff_6Av_03a_V2_RGB.jpg',
    category: 'interior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'sixth-ave',
  },
  {
    path: '/images/Davidoff Sixth Ave/Davidoff_6Av_04_V2_RGB.jpg',
    filename: 'Davidoff_6Av_04_V2_RGB.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'feature-highlight'],
    brand: 'davidoff',
    location: 'sixth-ave',
  },
  {
    path: '/images/Davidoff Sixth Ave/Davidoff_6Av_05_V2_RGB.jpg',
    filename: 'Davidoff_6Av_05_V2_RGB.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'davidoff',
    location: 'sixth-ave',
  },

  // Barclay Rex - All Images
  {
    path: '/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_6889 copy 2.jpg',
    filename: 'EFuerniss_KAMI_BarclayRex_6889 copy 2.jpg',
    category: 'exterior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'venue-card'],
    brand: 'barclay-rex',
    location: 'wall-st',
  },
  {
    path: '/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_7007 copy 1.jpg',
    filename: 'EFuerniss_KAMI_BarclayRex_7007 copy 1.jpg',
    category: 'interior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'barclay-rex',
    location: 'wall-st',
  },
  {
    path: '/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_7096.jpg',
    filename: 'EFuerniss_KAMI_BarclayRex_7096.jpg',
    category: 'humidor',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'feature-highlight'],
    brand: 'barclay-rex',
    location: 'wall-st',
  },
  {
    path: '/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_7181.jpg',
    filename: 'EFuerniss_KAMI_BarclayRex_7181.jpg',
    category: 'interior',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['gallery', 'venue-card'],
    brand: 'barclay-rex',
    location: 'wall-st',
  },
  {
    path: '/images/Barclay Rex/EFuerniss_KAMI_BarclayRex_7260 copy.jpg',
    filename: 'EFuerniss_KAMI_BarclayRex_7260 copy.jpg',
    category: 'lounge',
    quality: 'high',
    aspectRatio: 'original',
    suggestedUse: ['hero', 'gallery', 'feature-highlight'],
    brand: 'barclay-rex',
    location: 'wall-st',
  },
];

// Utility functions for image management
export function getImagesByBrand(brand: 'davidoff' | 'barclay-rex'): ImageAsset[] {
  return imageInventory.filter(img => img.brand === brand);
}

export function getImagesByLocation(location: 'madison' | 'sixth-ave' | 'wall-st'): ImageAsset[] {
  return imageInventory.filter(img => img.location === location);
}

export function getImagesByCategory(category: ImageAsset['category']): ImageAsset[] {
  return imageInventory.filter(img => img.category === category);
}

export function getHeroImage(brand: 'davidoff' | 'barclay-rex', location?: 'madison' | 'sixth-ave' | 'wall-st'): ImageAsset | undefined {
  if (location) {
    return imageInventory.find(img => 
      img.brand === brand && 
      img.location === location && 
      img.suggestedUse.includes('hero')
    );
  }
  
  return imageInventory.find(img => 
    img.brand === brand && 
    img.suggestedUse.includes('hero')
  );
}

export function getGalleryImages(brand: 'davidoff' | 'barclay-rex', location?: 'madison' | 'sixth-ave' | 'wall-st'): ImageAsset[] {
  if (location) {
    return imageInventory.filter(img => 
      img.brand === brand && 
      img.location === location && 
      img.suggestedUse.includes('gallery')
    );
  }
  
  return imageInventory.filter(img => 
    img.brand === brand && 
    img.suggestedUse.includes('gallery')
  );
}

export function getLogos(): ImageAsset[] {
  return imageInventory.filter(img => img.category === 'logo');
}
