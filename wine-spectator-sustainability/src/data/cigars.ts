import { Cigar } from '@/types/cigars';

export const cigars: Cigar[] = [
  {
    id: 'cohiba-behike-56',
    name: 'Behike 56',
    brand: 'Cohiba',
    origin: 'Cuba',
    strength: 'Full',
    priceRange: 'Ultra Premium',
    rarity: 'Ultra Rare',
    rating: 5,
    price: 450,
    currency: 'USD',
    description: 'The pinnacle of Cuban cigar craftsmanship, aged to perfection with exceptional flavor complexity.',
    tastingNotes: ['Cedar', 'Leather', 'Dark Chocolate', 'Black Pepper', 'Cream'],
    size: {
      length: 6.5,
      ringGauge: 56,
      shape: 'Toro'
    },
    aging: 3,
    wrapper: 'Cuban Sun Grown',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 90,
    strengthProfile: {
      body: 9,
      flavor: 10,
      strength: 8
    },
    image: '/images/cigars/cohiba-behike-56.jpg',
    thumbnail: '/images/cigars/thumbnails/cohiba-behike-56.jpg',
    gallery: [
      '/images/cigars/gallery/cohiba-behike-56-1.jpg',
      '/images/cigars/gallery/cohiba-behike-56-2.jpg'
    ],
    featured: true,
    limitedEdition: true,
    year: 2021,
    awards: ['Cigar Aficionado Top 25'],
    pairings: ['Cognac', 'Single Malt Whiskey', 'Port Wine']
  },
  {
    id: 'padron-1964-anniversary',
    name: '1964 Anniversary Series',
    brand: 'Padrón',
    origin: 'Nicaragua',
    strength: 'Full',
    priceRange: 'Premium',
    rarity: 'Rare',
    rating: 4.8,
    price: 28,
    currency: 'USD',
    description: 'Aged Nicaraguan tobacco with exceptional complexity, featuring rich flavors and perfect construction.',
    tastingNotes: ['Cocoa', 'Coffee', 'Spice', 'Nutmeg', 'Wood'],
    size: {
      length: 5.5,
      ringGauge: 50,
      shape: 'Robusto'
    },
    aging: 4,
    wrapper: 'Nicaraguan',
    binder: 'Nicaraguan',
    filler: ['Nicaraguan', 'Nicaraguan'],
    smokingTime: 75,
    strengthProfile: {
      body: 8,
      flavor: 9,
      strength: 7
    },
    image: '/images/cigars/padron-1964.jpg',
    thumbnail: '/images/cigars/thumbnails/padron-1964.jpg',
    gallery: [
      '/images/cigars/gallery/padron-1964-1.jpg',
      '/images/cigars/gallery/padron-1964-2.jpg'
    ],
    featured: true,
    limitedEdition: false,
    year: 2020,
    awards: ['Cigar Aficionado 95 Points'],
    pairings: ['Bourbon', 'Rum', 'Dark Beer']
  },
  {
    id: 'arturo-fuente-opus-x',
    name: 'Opus X',
    brand: 'Arturo Fuente',
    origin: 'Dominican Republic',
    strength: 'Full',
    priceRange: 'Ultra Premium',
    rarity: 'Rare',
    rating: 4.9,
    price: 35,
    currency: 'USD',
    description: 'The legendary Opus X, featuring Dominican wrapper grown in the heart of the Dominican Republic.',
    tastingNotes: ['Floral', 'Spice', 'Cedar', 'Cream', 'Leather'],
    size: {
      length: 6.25,
      ringGauge: 52,
      shape: 'Toro'
    },
    aging: 2,
    wrapper: 'Dominican Sun Grown',
    binder: 'Dominican',
    filler: ['Dominican', 'Dominican'],
    smokingTime: 85,
    strengthProfile: {
      body: 9,
      flavor: 10,
      strength: 8
    },
    image: '/images/cigars/arturo-fuente-opus-x.jpg',
    thumbnail: '/images/cigars/thumbnails/arturo-fuente-opus-x.jpg',
    gallery: [
      '/images/cigars/gallery/arturo-fuente-opus-x-1.jpg'
    ],
    featured: true,
    limitedEdition: false,
    year: 2022,
    awards: ['Cigar Aficionado 96 Points'],
    pairings: ['Cognac', 'Scotch', 'Port']
  },
  {
    id: 'davidoff-winston-churchill',
    name: 'Winston Churchill',
    brand: 'Davidoff',
    origin: 'Dominican Republic',
    strength: 'Medium',
    priceRange: 'Premium',
    rarity: 'Limited',
    rating: 4.6,
    price: 22,
    currency: 'USD',
    description: 'A tribute to the legendary statesman, featuring balanced flavors and impeccable construction.',
    tastingNotes: ['Wood', 'Nuts', 'Spice', 'Cream', 'Toast'],
    size: {
      length: 6,
      ringGauge: 50,
      shape: 'Churchill'
    },
    aging: 1,
    wrapper: 'Ecuadorian',
    binder: 'Dominican',
    filler: ['Dominican', 'Nicaraguan'],
    smokingTime: 70,
    strengthProfile: {
      body: 6,
      flavor: 8,
      strength: 5
    },
    image: '/images/cigars/davidoff-winston-churchill.jpg',
    thumbnail: '/images/cigars/thumbnails/davidoff-winston-churchill.jpg',
    gallery: [
      '/images/cigars/gallery/davidoff-winston-churchill-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2023,
    pairings: ['Champagne', 'White Wine', 'Light Whiskey']
  },
  {
    id: 'montecristo-no-2',
    name: 'Montecristo No. 2',
    brand: 'Montecristo',
    origin: 'Cuba',
    strength: 'Medium',
    priceRange: 'Premium',
    rarity: 'Common',
    rating: 4.7,
    price: 45,
    currency: 'USD',
    description: 'The most iconic Cuban cigar, featuring the perfect torpedo shape and balanced flavor profile.',
    tastingNotes: ['Cedar', 'Cream', 'Nutty', 'Spice', 'Coffee'],
    size: {
      length: 6.1,
      ringGauge: 52,
      shape: 'Toro'
    },
    aging: 2,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 80,
    strengthProfile: {
      body: 7,
      flavor: 9,
      strength: 6
    },
    image: '/images/cigars/montecristo-no-2.jpg',
    thumbnail: '/images/cigars/thumbnails/montecristo-no-2.jpg',
    gallery: [
      '/images/cigars/gallery/montecristo-no-2-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2023,
    pairings: ['Cognac', 'Rum', 'Coffee']
  },
  {
    id: 'partagas-serie-d-no-4',
    name: 'Serie D No. 4',
    brand: 'Partagás',
    origin: 'Cuba',
    strength: 'Full',
    priceRange: 'Premium',
    rarity: 'Common',
    rating: 4.5,
    price: 38,
    currency: 'USD',
    description: 'A full-bodied Cuban classic with rich flavors and excellent construction.',
    tastingNotes: ['Wood', 'Spice', 'Leather', 'Earth', 'Coffee'],
    size: {
      length: 4.9,
      ringGauge: 50,
      shape: 'Robusto'
    },
    aging: 1,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 60,
    strengthProfile: {
      body: 8,
      flavor: 8,
      strength: 7
    },
    image: '/images/cigars/partagas-serie-d-no-4.jpg',
    thumbnail: '/images/cigars/thumbnails/partagas-serie-d-no-4.jpg',
    gallery: [
      '/images/cigars/gallery/partagas-serie-d-no-4-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2023,
    pairings: ['Rum', 'Whiskey', 'Port']
  },
  {
    id: 'romeo-y-julieta-wide-churchill',
    name: 'Wide Churchill',
    brand: 'Romeo y Julieta',
    origin: 'Cuba',
    strength: 'Medium',
    priceRange: 'Premium',
    rarity: 'Limited',
    rating: 4.4,
    price: 42,
    currency: 'USD',
    description: 'A wider version of the classic Churchill, offering enhanced flavor development.',
    tastingNotes: ['Wood', 'Cream', 'Nutty', 'Floral', 'Spice'],
    size: {
      length: 6.9,
      ringGauge: 55,
      shape: 'Churchill'
    },
    aging: 1,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 90,
    strengthProfile: {
      body: 6,
      flavor: 8,
      strength: 5
    },
    image: '/images/cigars/romeo-y-julieta-wide-churchill.jpg',
    thumbnail: '/images/cigars/thumbnails/romeo-y-julieta-wide-churchill.jpg',
    gallery: [
      '/images/cigars/gallery/romeo-y-julieta-wide-churchill-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2023,
    pairings: ['Champagne', 'Cognac', 'White Wine']
  },
  {
    id: 'hoyo-de-monterrey-epicure-no-2',
    name: 'Epicure No. 2',
    brand: 'Hoyo de Monterrey',
    origin: 'Cuba',
    strength: 'Medium',
    priceRange: 'Premium',
    rarity: 'Common',
    rating: 4.6,
    price: 40,
    currency: 'USD',
    description: 'A refined Cuban cigar with elegant flavors and perfect construction.',
    tastingNotes: ['Cedar', 'Cream', 'Nutty', 'Floral', 'Honey'],
    size: {
      length: 5.5,
      ringGauge: 50,
      shape: 'Robusto'
    },
    aging: 1,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 70,
    strengthProfile: {
      body: 6,
      flavor: 9,
      strength: 5
    },
    image: '/images/cigars/hoyo-de-monterrey-epicure-no-2.jpg',
    thumbnail: '/images/cigars/thumbnails/hoyo-de-monterrey-epicure-no-2.jpg',
    gallery: [
      '/images/cigars/gallery/hoyo-de-monterrey-epicure-no-2-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2023,
    pairings: ['White Wine', 'Champagne', 'Light Cognac']
  },
  {
    id: 'trinidad-fundadores',
    name: 'Fundadores',
    brand: 'Trinidad',
    origin: 'Cuba',
    strength: 'Medium',
    priceRange: 'Ultra Premium',
    rarity: 'Rare',
    rating: 4.8,
    price: 65,
    currency: 'USD',
    description: 'An exclusive Cuban cigar with exceptional complexity and refined flavors.',
    tastingNotes: ['Wood', 'Cream', 'Floral', 'Spice', 'Honey'],
    size: {
      length: 7.5,
      ringGauge: 40,
      shape: 'Lancero'
    },
    aging: 3,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 100,
    strengthProfile: {
      body: 7,
      flavor: 10,
      strength: 6
    },
    image: '/images/cigars/trinidad-fundadores.jpg',
    thumbnail: '/images/cigars/thumbnails/trinidad-fundadores.jpg',
    gallery: [
      '/images/cigars/gallery/trinidad-fundadores-1.jpg'
    ],
    featured: true,
    limitedEdition: true,
    year: 2021,
    awards: ['Cigar Aficionado 97 Points'],
    pairings: ['Cognac', 'Single Malt', 'Port']
  },
  {
    id: 'bolivar-belicoso-fino',
    name: 'Belicoso Fino',
    brand: 'Bolívar',
    origin: 'Cuba',
    strength: 'Full',
    priceRange: 'Premium',
    rarity: 'Limited',
    rating: 4.5,
    price: 35,
    currency: 'USD',
    description: 'A full-bodied Cuban cigar with rich, complex flavors and excellent construction.',
    tastingNotes: ['Wood', 'Spice', 'Leather', 'Earth', 'Coffee'],
    size: {
      length: 5.5,
      ringGauge: 52,
      shape: 'Belicoso'
    },
    aging: 2,
    wrapper: 'Cuban',
    binder: 'Cuban',
    filler: ['Cuban', 'Cuban', 'Cuban'],
    smokingTime: 75,
    strengthProfile: {
      body: 8,
      flavor: 8,
      strength: 7
    },
    image: '/images/cigars/bolivar-belicoso-fino.jpg',
    thumbnail: '/images/cigars/thumbnails/bolivar-belicoso-fino.jpg',
    gallery: [
      '/images/cigars/gallery/bolivar-belicoso-fino-1.jpg'
    ],
    featured: false,
    limitedEdition: false,
    year: 2022,
    pairings: ['Rum', 'Whiskey', 'Port']
  }
];
