import { CigarLounge } from '@/types';

export const lounges: CigarLounge[] = [
  {
    id: 'manhattan-luxury',
    name: 'Manhattan Luxury Lounge',
    tagline: 'Urban Sophistication',
    description: 'Our flagship Manhattan location offers an unparalleled luxury experience in the heart of the city. Featuring a curated selection of rare and vintage cigars, premium spirits, and an atmosphere of refined elegance.',
    coordinates: [40.7505, -73.9934],
    atmosphere: {
      style: 'Modern Luxury',
      music: 'Jazz & Classical',
      dressCode: 'Business Casual to Formal'
    },
    collection: {
      featured: [
        {
          id: 'cohiba-behike-56',
          name: 'Cohiba Behike 56',
          brand: 'Cohiba',
          origin: 'Cuba',
          description: 'The pinnacle of Cuban cigar craftsmanship, aged to perfection',
          image: '/images/cigars/cohiba-behike-56.jpg',
          price: 850,
          rarity: 'vintage'
        },
        {
          id: 'padron-1964',
          name: 'Padrón 1964 Anniversary',
          brand: 'Padrón',
          origin: 'Nicaragua',
          description: 'Aged Nicaraguan tobacco with exceptional complexity',
          image: '/images/cigars/padron-1964.jpg',
          price: 45,
          rarity: 'rare'
        }
      ],
      rare: [
        {
          id: 'davidoff-millennium',
          name: 'Davidoff Millennium',
          brand: 'Davidoff',
          origin: 'Dominican Republic',
          description: 'Elegant and refined with notes of cedar and spice',
          image: '/images/cigars/davidoff-millennium.jpg',
          price: 65,
          rarity: 'rare'
        },
        {
          id: 'arturo-fuente-opus-x',
          name: 'Arturo Fuente Opus X',
          brand: 'Arturo Fuente',
          origin: 'Dominican Republic',
          description: 'Rare Dominican tobacco with exceptional flavor profile',
          image: '/images/cigars/arturo-fuente-opus-x.jpg',
          price: 35,
          rarity: 'rare'
        }
      ],
      vintage: [
        {
          id: 'cuban-hoyo-epicure',
          name: 'Hoyo de Monterrey Epicure No. 2',
          brand: 'Hoyo de Monterrey',
          origin: 'Cuba',
          description: 'Classic Cuban vitola with rich, creamy flavors',
          image: '/images/cigars/hoyo-epicure-2.jpg',
          price: 28,
          rarity: 'vintage'
        }
      ]
    },
    amenities: {
      services: [
        'Private Cigar Lockers',
        'Humidor with 500+ Premium Cigars',
        'Whiskey Tasting Room',
        'Private Meeting Rooms',
        'Valet Parking',
        'Concierge Service'
      ],
      experiences: [
        'Cigar Rolling Masterclass',
        'Whiskey & Cigar Pairing',
        'Private Tasting Sessions',
        'VIP Events & Celebrations'
      ]
    },
    media: {
      hero: '/images/lounges/manhattan-hero.jpg',
      gallery: [
        '/images/lounges/manhattan-1.jpg',
        '/images/lounges/manhattan-2.jpg',
        '/images/lounges/manhattan-3.jpg',
        '/images/lounges/manhattan-4.jpg'
      ],
      video: '/videos/manhattan-lounge-tour.mp4',
      ambientSound: '/audio/jazz-ambient.mp3'
    },
    reservations: {
      link: 'https://resy.com/manhattan-luxury',
      phone: '+1 (212) 555-0123',
      preferredTimes: ['7:00 PM', '8:30 PM', '10:00 PM']
    }
  },
  {
    id: 'hamptons-reserve',
    name: 'Hamptons Reserve',
    tagline: 'Coastal Elegance',
    description: 'Our exclusive Hamptons location offers a serene escape from city life. Set in a beautifully restored historic building with ocean views and an outdoor terrace perfect for summer evenings.',
    coordinates: [40.9634, -72.1847],
    atmosphere: {
      style: 'Coastal Luxury',
      music: 'Acoustic & Ambient',
      dressCode: 'Smart Casual'
    },
    collection: {
      featured: [
        {
          id: 'romeo-y-julieta-churchill',
          name: 'Romeo y Julieta Churchill',
          brand: 'Romeo y Julieta',
          origin: 'Cuba',
          description: 'Classic Cuban cigar with smooth, balanced flavor',
          image: '/images/cigars/romeo-y-julieta-churchill.jpg',
          price: 32,
          rarity: 'vintage'
        },
        {
          id: 'ashton-vsg',
          name: 'Ashton VSG',
          brand: 'Ashton',
          origin: 'Dominican Republic',
          description: 'Full-bodied with notes of dark chocolate and spice',
          image: '/images/cigars/ashton-vsg.jpg',
          price: 38,
          rarity: 'rare'
        }
      ],
      rare: [
        {
          id: 'my-father-le-bijou',
          name: 'My Father Le Bijou 1922',
          brand: 'My Father',
          origin: 'Nicaragua',
          description: 'Award-winning Nicaraguan puro with rich complexity',
          image: '/images/cigars/my-father-le-bijou.jpg',
          price: 42,
          rarity: 'rare'
        }
      ],
      vintage: [
        {
          id: 'partagas-serie-d',
          name: 'Partagás Serie D No. 4',
          brand: 'Partagás',
          origin: 'Cuba',
          description: 'Legendary Cuban robusto with bold, spicy character',
          image: '/images/cigars/partagas-serie-d4.jpg',
          price: 35,
          rarity: 'vintage'
        }
      ]
    },
    amenities: {
      services: [
        'Ocean View Terrace',
        'Historic Building Setting',
        'Outdoor Fire Pits',
        'Seasonal Menu',
        'Private Events Space',
        'Wine Cellar'
      ],
      experiences: [
        'Sunset Cigar Sessions',
        'Wine & Cigar Pairing',
        'Outdoor Tasting Events',
        'Seasonal Celebrations'
      ]
    },
    media: {
      hero: '/images/lounges/hamptons-hero.jpg',
      gallery: [
        '/images/lounges/hamptons-1.jpg',
        '/images/lounges/hamptons-2.jpg',
        '/images/lounges/hamptons-3.jpg',
        '/images/lounges/hamptons-4.jpg'
      ],
      video: '/videos/hamptons-lounge-tour.mp4',
      ambientSound: '/audio/ocean-ambient.mp3'
    },
    reservations: {
      link: 'https://resy.com/hamptons-reserve',
      phone: '+1 (631) 555-0456',
      preferredTimes: ['6:30 PM', '8:00 PM', '9:30 PM']
    }
  }
];