import { ImageAsset } from '@/lib/imageInventory';

export interface VenueHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  website: string;
  logo: string;
  address?: string;
  neighborhood?: string;
  phone?: string;
  email?: string;
  hours?: VenueHours;
  images: {
    hero: string;
    gallery: string[];
  };
  features?: string[];
  signature?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  impact?: {
    headline: string;
    description: string;
    metrics: Array<{
      label: string;
      value: string;
      supportingText: string;
    }>;
  };
  commitments?: {
    focus: string;
    details: string[];
  };
  perfectFor?: string[];
  history?: {
    founded: number;
    founder: string;
    milestones: Array<{
      year: number;
      event: string;
    }>;
  };
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  accentColor: string;
  locations: VenueLocation[];
}

export const venueData: { brands: Brand[] } = {
  brands: [
    {
      id: 'wine-spectator',
      name: 'Wine Spectator Sustainability Collection',
      logo: '/images/logos/wine-spectator.svg',
      tagline: 'Six producers redefining stewardship in every pour',
      description:
        'The 2025 Wine Spectator Sustainability campaign spotlights vineyards and maisons that link climate action with extraordinary wines. Explore regenerative farming, biodiversity corridors, and community-first investments from California to Champagne.',
      accentColor: '#4F7C4C',
      locations: [
        {
          id: 'lallier',
          name: 'Champagne Lallier',
          shortName: 'Lallier',
          tagline: 'Champagne heritage rooted in biodiversity',
          description:
            'Since its founding, Lallier Champagne has embraced a deep respect for terroir and nature. Certified HVE and VDC, Lallier nurtures biodiversity through its partnership with local company Terr\'Api—welcoming back wild bees, trees, and flowering plants around its Oger winemaking facility. Using no herbicides or pesticides, Lallier lets nature inspire its ongoing pursuit of excellence.',
          website: 'https://www.champagne-lallier.com',
          logo: '/images/logos/lallier.jpg',
          images: {
            hero: '/images/wineries/lallier/hero.jpg',
            gallery: [
              '/images/wineries/lallier/gallery-1.jpg',
              '/images/wineries/lallier/gallery-2.jpg',
              '/images/wineries/lallier/gallery-3.jpg',
            ],
          },
          signature:
            'Certified HVE and VDC, Lallier cultivates biodiversity alongside grand cru precision—letting nature guide every cuvée.',
        },
        {
          id: 'firetree',
          name: 'Firetree Vineyards',
          shortName: 'Firetree',
          tagline: 'Regenerative Los Carneros Chardonnay in motion',
          description:
            'At Firetree Vineyards, sustainability is a living promise. The Jimenez family farms their Los Carneros Chardonnay organically and regeneratively, with goats, Babydoll sheep, and native wildflowers enriching the soil. Under the guidance of winemaker Julien Fayard, Firetree cultivates a future rooted in stewardship, excellence, and generational goals.',
          website: 'https://firetreevineyards.com',
          logo: '/images/logos/firetree.png',
          images: {
            hero: '/images/wineries/firetree/hero.jpg',
            gallery: [
              '/images/wineries/firetree/gallery-1.jpg',
              '/images/wineries/firetree/gallery-2.jpg',
              '/images/wineries/firetree/gallery-3.jpg',
            ],
          },
          signature:
            'Organic farming, heritage livestock, and regenerative viticulture keep Firetree’s Los Carneros vineyards thriving for generations.',
        },
        {
          id: 'gloria-ferrer',
          name: 'Gloria Ferrer Winery',
          shortName: 'Gloria Ferrer',
          tagline: 'Organic sparkling excellence from Carneros',
          description:
            'In the rolling hills of Carneros, Gloria Ferrer has long been synonymous with exceptional sparkling wine. Today, the estate stands at a new milestone: with both vineyards and winery fully certified organic, the commitment to crafting wines with integrity has never been stronger. Discover where intentional farming and winemaking deliver sparkling wines of balance and enduring quality.',
          website: 'https://www.gloriaferrer.com',
          logo: '/images/logos/gloria-ferrer.png',
          images: {
            hero: '/images/wineries/gloria-ferrer/hero.jpg',
            gallery: [
              '/images/wineries/gloria-ferrer/gallery-1.jpg',
              '/images/wineries/gloria-ferrer/gallery-2.jpg',
              '/images/wineries/gloria-ferrer/gallery-3.jpg',
            ],
          },
          signature:
            'Certified-organic vineyards and intentional winemaking deliver sparkling wines of balance and enduring quality.',
        },
        {
          id: 'piccini',
          name: 'Piccini 1882',
          shortName: 'Piccini',
          tagline: 'Tuscan heritage with organic innovation',
          description:
            'For over 140 years, the Piccini family has transformed the landscape of Chianti winemaking, rooted in the heart of Tuscany. Today, Piccini stands as a symbol of innovation and heritage—bridging the timeless allure of Chianti with a fresh perspective for modern wine lovers. But their legacy goes beyond tradition and innovation: Piccini is leading the way in sustainable and organic viticulture.',
          website: 'https://www.piccini1882.it/en',
          logo: '/images/logos/piccini.png',
          images: {
            hero: '/images/wineries/piccini/hero.jpg',
            gallery: [
              '/images/wineries/piccini/gallery-1.jpg',
              '/images/wineries/piccini/gallery-2.jpg',
              '/images/wineries/piccini/gallery-3.jpg',
            ],
          },
          signature:
            '140 years of Chianti heritage now married to ambitious organic and sustainable viticulture across Tuscany.',
        },
        {
          id: 'san-simeon',
          name: 'San Simeon Wines',
          shortName: 'San Simeon',
          tagline: 'Central Coast estate-grown stewardship',
          description:
            'San Simeon Wines are crafted from 100% estate-grown fruit from certified sustainable vineyards in both Monterey and Paso Robles. Made with generations of expertise and passion, each bottle reflects our family’s unwavering commitment to quality and environmental stewardship—sustainability from ground to glass.',
          website: 'https://sansimeonwines.com',
          logo: '/images/logos/san-simeon.png',
          images: {
            hero: '/images/wineries/san-simeon/hero.jpg',
            gallery: [
              '/images/wineries/san-simeon/gallery-1.jpg',
              '/images/wineries/san-simeon/gallery-2.jpg',
              '/images/wineries/san-simeon/gallery-3.jpg',
            ],
          },
          signature:
            'Estate-grown, certified-sustainable fruit expresses a Central Coast story of family stewardship from ground to glass.',
        },
        {
          id: 'willakenzie',
          name: 'WillaKenzie Estate',
          shortName: 'WillaKenzie',
          tagline: 'LIVE-certified Willamette Valley stewardship',
          description:
            'WillaKenzie Estate, founded in 1992 in the Yamhill-Carlton AVA, is named for the sedimentary soil on which our vines are planted. As the first LIVE-certified winery in the northwest, we have remained committed to sustainable practices since breaking ground. Our estate is a study in diversity and complexity, with a multitude of slopes, elevations, aspects, and clonal plantings—offering a collection of distinctive single-vineyard Pinot Noirs.',
          website: 'https://www.willakenzie.com',
          logo: '/images/logos/willakenzie.png',
          images: {
            hero: '/images/wineries/willakenzie/hero.jpg',
            gallery: [
              '/images/wineries/willakenzie/gallery-1.jpg',
              '/images/wineries/willakenzie/gallery-2.jpg',
              '/images/wineries/willakenzie/gallery-3.jpg',
            ],
          },
          signature:
            'LIVE-certified farming and expressive single-vineyard Pinot Noirs showcase the diversity of WillaKenzie’s Willamette Valley estate.',
        },
      ],
    },
  ],
};

// Utility functions
export function getAllVenues(): VenueLocation[] {
  return venueData.brands.flatMap(brand => brand.locations);
}

export function getVenueById(id: string): VenueLocation | undefined {
  return getAllVenues().find(venue => venue.id === id);
}

export function getBrandById(id: string): Brand | undefined {
  return venueData.brands.find(brand => brand.id === id);
}

export function getVenuesByBrand(brandId: string): VenueLocation[] {
  const brand = getBrandById(brandId);
  return brand ? brand.locations : [];
}

export function getFeaturedVenues(): VenueLocation[] {
  return getAllVenues().filter(venue =>
    ['firetree', 'gloria-ferrer', 'willakenzie'].includes(venue.id)
  );
}
