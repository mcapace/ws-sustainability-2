import { GalleryImage, GalleryCategory } from '@/types/gallery';

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'lounge',
    name: 'Lounge Spaces',
    description: 'Elegant interiors and sophisticated ambiance',
    icon: '🏛️',
    color: '#d4af37'
  },
  {
    id: 'cigars',
    name: 'Premium Cigars',
    description: 'Curated selection of world-class cigars',
    icon: '🚬',
    color: '#b87333'
  },
  {
    id: 'spirits',
    name: 'Fine Spirits',
    description: 'Exclusive whiskeys, cognacs, and rums',
    icon: '🥃',
    color: '#cd7f32'
  },
  {
    id: 'atmosphere',
    name: 'Atmosphere',
    description: 'The luxury experience in every detail',
    icon: '✨',
    color: '#ffd700'
  },
  {
    id: 'events',
    name: 'Special Events',
    description: 'Exclusive gatherings and celebrations',
    icon: '🎉',
    color: '#ffbf00'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'manhattan-main-lounge',
    src: '/images/gallery/manhattan-main-lounge.jpg',
    alt: 'Manhattan Luxury Lounge main seating area',
    title: 'Main Lounge Area',
    description: 'The heart of our Manhattan location, featuring plush leather seating and ambient lighting that creates the perfect atmosphere for relaxation and conversation.',
    category: 'lounge',
    tags: ['manhattan', 'seating', 'luxury', 'interior'],
    photographer: 'Luxury Photography Co.',
    date: '2024-01-15',
    location: 'Manhattan, NY',
    aspectRatio: 1.5,
    highResSrc: '/images/gallery/high-res/manhattan-main-lounge.jpg',
    thumbnail: '/images/gallery/thumbnails/manhattan-main-lounge.jpg'
  },
  {
    id: 'humidor-collection',
    src: '/images/gallery/humidor-collection.jpg',
    alt: 'Premium cigar humidor with extensive collection',
    title: 'Premium Humidor',
    description: 'Our climate-controlled humidor houses over 500 premium cigars from the world\'s finest manufacturers, carefully maintained at optimal temperature and humidity.',
    category: 'cigars',
    tags: ['humidor', 'collection', 'premium', 'storage'],
    photographer: 'Cigar Photography Studio',
    date: '2024-01-20',
    location: 'Manhattan, NY',
    aspectRatio: 0.75,
    highResSrc: '/images/gallery/high-res/humidor-collection.jpg',
    thumbnail: '/images/gallery/thumbnails/humidor-collection.jpg'
  },
  {
    id: 'whiskey-tasting-room',
    src: '/images/gallery/whiskey-tasting-room.jpg',
    alt: 'Private whiskey tasting room with premium spirits',
    title: 'Whiskey Tasting Room',
    description: 'An intimate space dedicated to the appreciation of fine spirits, featuring rare and vintage whiskeys from around the world.',
    category: 'spirits',
    tags: ['whiskey', 'tasting', 'private', 'spirits'],
    photographer: 'Spirits Photography',
    date: '2024-01-18',
    location: 'Manhattan, NY',
    aspectRatio: 1.33,
    highResSrc: '/images/gallery/high-res/whiskey-tasting-room.jpg',
    thumbnail: '/images/gallery/thumbnails/whiskey-tasting-room.jpg'
  },
  {
    id: 'hamptons-terrace',
    src: '/images/gallery/hamptons-terrace.jpg',
    alt: 'Ocean view terrace at Hamptons Reserve',
    title: 'Ocean View Terrace',
    description: 'Our exclusive Hamptons location offers stunning ocean views from this beautifully designed outdoor terrace, perfect for sunset cigar sessions.',
    category: 'lounge',
    tags: ['hamptons', 'terrace', 'ocean', 'outdoor'],
    photographer: 'Coastal Photography',
    date: '2024-01-25',
    location: 'East Hampton, NY',
    aspectRatio: 1.77,
    highResSrc: '/images/gallery/high-res/hamptons-terrace.jpg',
    thumbnail: '/images/gallery/thumbnails/hamptons-terrace.jpg'
  },
  {
    id: 'cohiba-behike',
    src: '/images/gallery/cohiba-behike.jpg',
    alt: 'Cohiba Behike 56 premium cigar',
    title: 'Cohiba Behike 56',
    description: 'The pinnacle of Cuban cigar craftsmanship, aged to perfection with exceptional flavor complexity and smooth draw.',
    category: 'cigars',
    tags: ['cohiba', 'behike', 'cuban', 'premium'],
    photographer: 'Cigar Art Photography',
    date: '2024-01-22',
    location: 'Manhattan, NY',
    aspectRatio: 1.2,
    highResSrc: '/images/gallery/high-res/cohiba-behike.jpg',
    thumbnail: '/images/gallery/thumbnails/cohiba-behike.jpg'
  },
  {
    id: 'macallan-25',
    src: '/images/gallery/macallan-25.jpg',
    alt: 'Macallan 25 Year Old single malt whiskey',
    title: 'Macallan 25 Year',
    description: 'Rare single malt with rich sherry cask influence, offering exceptional depth and complexity that pairs perfectly with premium cigars.',
    category: 'spirits',
    tags: ['macallan', 'whiskey', 'scotch', 'rare'],
    photographer: 'Spirits Art Studio',
    date: '2024-01-19',
    location: 'Manhattan, NY',
    aspectRatio: 0.8,
    highResSrc: '/images/gallery/high-res/macallan-25.jpg',
    thumbnail: '/images/gallery/thumbnails/macallan-25.jpg'
  },
  {
    id: 'fire-pit-evening',
    src: '/images/gallery/fire-pit-evening.jpg',
    alt: 'Outdoor fire pit at Hamptons Reserve during evening',
    title: 'Evening Fire Pit',
    description: 'Cozy outdoor fire pits provide warmth and ambiance for year-round comfort, creating the perfect setting for intimate conversations.',
    category: 'atmosphere',
    tags: ['fire-pit', 'evening', 'outdoor', 'ambiance'],
    photographer: 'Atmosphere Photography',
    date: '2024-01-28',
    location: 'East Hampton, NY',
    aspectRatio: 1.33,
    highResSrc: '/images/gallery/high-res/fire-pit-evening.jpg',
    thumbnail: '/images/gallery/thumbnails/fire-pit-evening.jpg'
  },
  {
    id: 'cigar-rolling-demo',
    src: '/images/gallery/cigar-rolling-demo.jpg',
    alt: 'Cigar rolling demonstration and masterclass',
    title: 'Cigar Rolling Masterclass',
    description: 'Expert cigar rollers demonstrate traditional techniques in our exclusive masterclass sessions, offering guests a unique behind-the-scenes experience.',
    category: 'events',
    tags: ['masterclass', 'rolling', 'demonstration', 'education'],
    photographer: 'Event Photography Co.',
    date: '2024-01-30',
    location: 'Manhattan, NY',
    aspectRatio: 1.5,
    highResSrc: '/images/gallery/high-res/cigar-rolling-demo.jpg',
    thumbnail: '/images/gallery/thumbnails/cigar-rolling-demo.jpg'
  },
  {
    id: 'private-locker',
    src: '/images/gallery/private-locker.jpg',
    alt: 'Private cigar storage lockers for members',
    title: 'Private Cigar Lockers',
    description: 'Exclusive private lockers allow members to store their personal cigar collections in our climate-controlled environment.',
    category: 'lounge',
    tags: ['lockers', 'private', 'storage', 'membership'],
    photographer: 'Luxury Interior Photography',
    date: '2024-01-16',
    location: 'Manhattan, NY',
    aspectRatio: 0.75,
    highResSrc: '/images/gallery/high-res/private-locker.jpg',
    thumbnail: '/images/gallery/thumbnails/private-locker.jpg'
  },
  {
    id: 'padron-1964',
    src: '/images/gallery/padron-1964.jpg',
    alt: 'Padrón 1964 Anniversary Series cigar',
    title: 'Padrón 1964 Anniversary',
    description: 'Aged Nicaraguan tobacco with exceptional complexity, featuring rich flavors and perfect construction that exemplifies the Padrón family\'s craftsmanship.',
    category: 'cigars',
    tags: ['padron', 'nicaraguan', 'anniversary', 'aged'],
    photographer: 'Cigar Photography Studio',
    date: '2024-01-24',
    location: 'Manhattan, NY',
    aspectRatio: 1.1,
    highResSrc: '/images/gallery/high-res/padron-1964.jpg',
    thumbnail: '/images/gallery/thumbnails/padron-1964.jpg'
  }
];
