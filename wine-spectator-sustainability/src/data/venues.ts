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
            'Since its founding, Lallier Champagne has cherished its relationship with terroir and nature—crafting remarkable Champagnes guided by sincerity, curiosity, and respect for the environment.',
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
            'Certified HVE and VDC Maison reintroducing biodiversity around its Oger winemaking facility in partnership with Terr’Api.',
          features: [
            'Founded in the Grand Cru village of Aÿ, uniting a century of craftsmanship with modern expression.',
            'Dominique Demarville crafts cuvées that capture freshness, purity, intensity, and depth with a touch of Aÿ Grand Cru in every blend.',
            'No herbicides or pesticides; biodiversity nurtured through Terr’Api partnership bringing back wild bees, flowering plants, and trees.',
            'Champagnes such as Réflexion R.021, Blanc de Blancs, and Rosé express Champagne’s greatest terroirs.',
          ],
        },
        {
          id: 'firetree',
          name: 'Firetree Vineyards',
          shortName: 'Firetree',
          tagline: 'Regenerative Los Carneros Chardonnay in motion',
          description:
            'Rooted in the Los Carneros foothills, Firetree Vineyards crafts expressive, sustainably grown Chardonnay guided by the Jimenez family’s vision for legacy, stewardship, and regenerative farming.',
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
            'Family-owned estate working with winemaker Julien Fayard to steward Napa Green- and Fish Friendly Farming-certified vineyards through organic, regenerative practices.',
          features: [
            'Napa Green and Fish Friendly Farming certified estate committed to soil, water, and vineyard biodiversity.',
            'Permanent herd of goats and Babydoll sheep provides natural weed management and soil enrichment.',
            'Healthy Soils Program participant planting native pollinator cover crops with the Napa County Resource Conservation District.',
            'Next-generation family involvement and estate bottlings such as FIDEM Reserve and Bunny Hills Chardonnay anchor a legacy mindset.',
          ],
        },
        {
          id: 'gloria-ferrer',
          name: 'Gloria Ferrer Winery',
          shortName: 'Gloria Ferrer',
          tagline: 'Organic sparkling excellence from Carneros',
          description:
            'Discover Gloria Ferrer’s certified-organic Carneros estate, where intentional farming and winemaking deliver sparkling wines of balance, integrity, and enduring quality.',
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
            'Over 40 years of méthode traditionnelle craftsmanship now backed by dual organic and CSWA certifications.',
          features: [
            'Carneros vineyards and winery fully certified organic by CCOF and certified sustainable by the CSWA.',
            'Methodé traditionnelle sparkling and small-lot still wines showcase purity, balance, and age-worthy structure.',
            'Regenerative farming, cover crops, and resource conservation anchor a holistic stewardship philosophy.',
            'Hospitality experiences pair estate wines with culinary moments overlooking Sonoma’s rolling vineyards.',
          ],
        },
        {
          id: 'piccini',
          name: 'Piccini 1882',
          shortName: 'Piccini',
          tagline: 'Tuscan heritage with organic innovation',
          description:
            'Piccini is one of Tuscany’s most established wine families, blending 140 years of heritage with a courageous commitment to innovation and sustainability.',
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
            'Five generations evolving from a 7-hectare vineyard into a global ambassador for eco-forward Chianti.',
          features: [
            'Extensive organic viticulture preserves biodiversity and reduces chemical use across Tuscan vineyards.',
            'Investments in renewable energy minimize the winery’s carbon footprint and promote responsible production.',
            'Sets a regional benchmark for eco-friendly winemaking that balances tradition with modern expectations.',
            'Portfolios capture the timeless allure of Chianti while introducing fresh, contemporary expressions.',
          ],
        },
        {
          id: 'san-simeon',
          name: 'San Simeon Wines',
          shortName: 'San Simeon',
          tagline: 'Central Coast estate-grown stewardship',
          description:
            'San Simeon wines are crafted from 100% estate-grown, certified sustainable vineyards in Monterey and Paso Robles—reflecting generations of Riboli family expertise.',
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
            'Fourth-generation family ownership marrying coastal elegance with innovation across CSWA-certified vineyards.',
          features: [
            'Certified California Sustainable Vineyard and Winery (CSWA) across Monterey and Paso Robles estates.',
            'Monterey’s cool climate shapes vibrant Chardonnay and Pinot Noir while Paso Robles yields bold reds like Stormwatch.',
            'New Willow Creek District winery and tasting room opening in early 2026.',
            'Meticulous vineyard management and modern winemaking deliver consistent 90+ point accolades.',
          ],
        },
        {
          id: 'willakenzie',
          name: 'WillaKenzie Estate',
          shortName: 'WillaKenzie',
          tagline: 'LIVE-certified Willamette Valley stewardship',
          description:
            'Discover the many expressions of Oregon’s Willamette Valley at WillaKenzie Estate—where diverse soils, elevations, and craftsmanship create distinctive, terroir-driven wines.',
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
            'Oregon’s first LIVE-certified winery with Salmon-Safe stewardship across a 420-acre mosaic of microclimates.',
          features: [
            'Marine sedimentary WillaKenzie soils, ridgelines, and benches deliver a tapestry of terroir.',
            'More than 75% of the estate remains natural habitat supporting honeybees, longhorn cattle, and solar-powered operations.',
            'LIVE Certified #001 and Salmon-Safe practices protect regional waterways and biodiversity.',
            'Curated tastings and immersive vineyard tours showcase diverse terroir and sustainable winegrowing in breathtaking settings.',
          ],
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
