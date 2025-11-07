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
  address: string;
  neighborhood: string;
  phone: string;
  email?: string;
  hours: VenueHours;
  images: {
    hero: string;
    gallery: string[];
  };
  features: string[];
  signature: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  impact: {
    headline: string;
    description: string;
    metrics: Array<{
      label: string;
      value: string;
      supportingText: string;
    }>;
  };
  commitments: {
    focus: string;
    details: string[];
  };
  perfectFor: string[];
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
          id: 'firetree',
          name: 'Firetree Vineyards',
          shortName: 'Firetree',
          tagline: 'Stewarding steep Mendocino ridgelines',
          description:
            'Family-run Firetree Vineyards charts a wildfire-resilient future for Anderson Valley, pairing regenerative farming with Indigenous partnerships and water-positive winemaking.',
          address: 'Anderson Valley, Mendocino County, CA',
          neighborhood: 'Mendocino Ridge AVA',
          phone: '—',
          email: 'hello@firetreevineyards.com',
          hours: {
            monday: 'By appointment',
            tuesday: 'By appointment',
            wednesday: 'By appointment',
            thursday: 'By appointment',
            friday: 'By appointment',
            saturday: 'By appointment',
            sunday: 'Closed',
          },
          images: {
            hero: '/images/wineries/firetree/hero.jpg',
            gallery: [
              '/images/wineries/firetree/gallery-1.jpg',
              '/images/wineries/firetree/gallery-2.jpg',
              '/images/wineries/firetree/gallery-3.jpg',
            ],
          },
          features: [
            'Prescribed-burn corridors managed with tribal partners',
            'Dry-farmed Pinot Noir blocks with biochar soil rebuilds',
            'Gravity-flow cellar powered by hillside solar arrays',
            'Pollinator maze and edible native hedgerows',
          ],
          signature:
            'Guests traverse ridge-top vineyards designed as fire breaks, taste carbon-negative bottlings, and learn how Firetree’s “ember-to-earth” protocol protects a rugged landscape.',
          impact: {
            headline: 'Wildfire resilience, rooted in community',
            description:
              'Firetree models a regenerative approach for extreme-slope viticulture, reducing fuel loads while capturing carbon in living soils.',
            metrics: [
              {
                label: 'Fuel Load Reduction',
                value: '180 acres',
                supportingText: 'Strategic fuel corridors restored with Indigenous crews since 2021',
              },
              {
                label: 'Water Reuse',
                value: '94%',
                supportingText: 'Closed-loop greywater system keeping creeks fed through late summer',
              },
              {
                label: 'Carbon Drawdown',
                value: '12.6 tons',
                supportingText: 'Annual sequestration through biochar and living roots across vineyard blocks',
              },
            ],
          },
          commitments: {
            focus: 'Regenerate & Protect',
            details: [
              '10-year stewardship compact with Coast Miwok fire practitioners',
              'Carbon-negative bottling line certified by Climate Neutral',
              'Scholarship fund supporting Mendocino science classrooms',
            ],
          },
          perfectFor: [
            'Hospitality teams crafting fire resilience programming',
            'Buyers sourcing regenerative coastal Pinot Noir',
            'Storytellers covering Indigenous-led climate solutions',
          ],
        },
        {
          id: 'gloria-ferrer',
          name: 'Gloria Ferrer Winery',
          shortName: 'Gloria Ferrer',
          tagline: 'Carneros bubbles with a biodiversity backbone',
          description:
            'Pioneers of méthode traditionnelle in Carneros, Gloria Ferrer champions climate-smart sparkling wine through habitat restoration, precision irrigation, and circular design.',
          address: '23555 Arnold Drive, Sonoma, CA 95476',
          neighborhood: 'Carneros AVA',
          phone: '(707) 996-7256',
          email: 'experience@gloriaferrer.com',
          hours: {
            monday: '10:00 AM - 6:00 PM',
            tuesday: '10:00 AM - 6:00 PM',
            wednesday: '10:00 AM - 6:00 PM',
            thursday: '10:00 AM - 6:00 PM',
            friday: '10:00 AM - 7:00 PM',
            saturday: '10:00 AM - 7:00 PM',
            sunday: '10:00 AM - 6:00 PM',
          },
          images: {
            hero: '/images/wineries/gloria-ferrer/hero.jpg',
            gallery: [
              '/images/wineries/gloria-ferrer/gallery-1.jpg',
              '/images/wineries/gloria-ferrer/gallery-2.jpg',
              '/images/wineries/gloria-ferrer/gallery-3.jpg',
            ],
          },
          features: [
            '45-acre pollinator preserve weaving through estate vineyards',
            'AI-guided irrigation using fog and sap-flow sensors',
            'Glass reuse loop for sparkling bottles and giftware',
            'Vista lounge built with reclaimed redwood and basalt',
          ],
          signature:
            'Visitors walk pollinator pathways, sample zero-waste tasting menus, and preview sparkling cuvées aged in energy-efficient caves cooled by geothermal wells.',
          impact: {
            headline: 'Sparkling sustainability on the Sonoma coast',
            description:
              'Gloria Ferrer blends heritage with innovation, measuring every drop of water, watt of energy, and square foot of soil for biodiversity value.',
            metrics: [
              {
                label: 'Water Efficiency',
                value: '38% ↓',
                supportingText: 'Irrigation per acre since adopting sap-flow sensors and fog catchment',
              },
              {
                label: 'Habitat Recovery',
                value: '14 acres',
                supportingText: 'Native grasslands restored for pollinators and raptors',
              },
              {
                label: 'Bottle Reuse',
                value: '62%',
                supportingText: 'Sparkling bottles cycled through closed-loop reuse partners',
              },
            ],
          },
          commitments: {
            focus: 'Balance & Biodiversity',
            details: [
              'Certified Napa Green Winery & Vineyard member',
              'Wastewater polished through constructed wetlands',
              'Annual biodiversity audit with Pepperwood Preserve scientists',
            ],
          },
          perfectFor: [
            'Sparkling wine programs seeking climate storytelling',
            'Corporate retreats focused on biodiversity leadership',
            'Media covering circular design in hospitality spaces',
          ],
        },
        {
          id: 'lallier',
          name: 'Champagne Lallier',
          shortName: 'Lallier',
          tagline: 'Grand cru precision, low-impact effervescence',
          description:
            'From Aÿ’s grand cru terroir, Champagne Lallier experiments with agroforestry, beekeeping, and lightweight packaging to prove tradition and carbon reduction can co-exist.',
          address: '5 Rue Victor Hugo, 51160 Aÿ-Champagne, France',
          neighborhood: 'Grand Cru Aÿ',
          phone: '+33 3 26 55 40 04',
          email: 'contact@champagne-lallier.fr',
          hours: {
            monday: '10:00 AM - 5:00 PM',
            tuesday: '10:00 AM - 5:00 PM',
            wednesday: '10:00 AM - 5:00 PM',
            thursday: '10:00 AM - 5:00 PM',
            friday: '10:00 AM - 5:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Closed',
          },
          images: {
            hero: '/images/wineries/lallier/hero.jpg',
            gallery: [
              '/images/wineries/lallier/gallery-1.jpg',
              '/images/wineries/lallier/gallery-2.jpg',
              '/images/wineries/lallier/gallery-3.jpg',
            ],
          },
          features: [
            'Agroforestry alleys threading through grand cru Chardonnay parcels',
            'Bee and biodiversity sanctuaries buzzing above chalk cellars',
            'Lightweight bottle and recycled glass program across cuvées',
            'Renewable energy microgrid powering riddling and disgorgement',
          ],
          signature:
            'Guests descend into chalk cellars framed by living walls, sample zero-dosage experiments, and follow the maison’s “bee to bottle” biodiversity trail.',
          impact: {
            headline: 'Aÿ’s grand cru goes climate positive',
            description:
              'Lallier trims glass, energy, and chemical inputs without losing the taut precision that defines its terroir-driven champagnes.',
            metrics: [
              {
                label: 'Glass Weight',
                value: '18% ↓',
                supportingText: 'Average bottle weight reduction across the R.018 series',
              },
              {
                label: 'Chemical Inputs',
                value: '0 herbicides',
                supportingText: 'Maison-wide elimination of synthetic weed control since 2022',
              },
              {
                label: 'Biodiversity Index',
                value: '+28%',
                supportingText: 'Increase in pollinator species recorded across estate parcels',
              },
            ],
          },
          commitments: {
            focus: 'Precision & Preservation',
            details: [
              'Member of the Champagne Climate Plan and VDC certified',
              'Agroforestry pilot with Comité Champagne researchers',
              'Packaging roadmap to 100% recycled and recyclable materials by 2027',
            ],
          },
          perfectFor: [
            'Champagne lovers seeking low-impact luxury',
            'Sommeliers curating grand cru sustainability flights',
            'Press highlighting agroforestry in cool-climate regions',
          ],
        },
        {
          id: 'piccini',
          name: 'Piccini 1882',
          shortName: 'Piccini',
          tagline: 'Tuscan heritage, solar-powered future',
          description:
            'The Piccini family’s five estates share solar microgrids, water recycling, and biodiversity corridors from Chianti Classico to Maremma, showing how scale accelerates sustainability.',
          address: 'Località Piazzole, 53011 Castellina in Chianti SI, Italy',
          neighborhood: 'Chianti Classico',
          phone: '+39 0577 742037',
          email: 'info@piccini1882.it',
          hours: {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Closed',
          },
          images: {
            hero: '/images/wineries/piccini/hero.jpg',
            gallery: [
              '/images/wineries/piccini/gallery-1.jpg',
              '/images/wineries/piccini/gallery-2.jpg',
              '/images/wineries/piccini/gallery-3.jpg',
            ],
          },
          features: [
            'Solar canopies shading fermentation courts across estates',
            'Rainwater catchment and reuse feeding Tuscan olive groves',
            'Tuscan oak restoration program connecting wildlife corridors',
            'Reusable PET-lined kegs for on-premise Orvieto and Chianti',
          ],
          signature:
            'Visitors tour solar microgrids, walk through heritage Sangiovese blocks now home to owl boxes, and taste the “Vini Naturalis” collection crafted with minimal inputs.',
          impact: {
            headline: 'Scaling sustainability across Tuscany',
            description:
              'Piccini uses its network of estates to pilot circular practices, sharing learnings across Chianti, Maremma, and Basilicata.',
            metrics: [
              {
                label: 'Renewable Energy',
                value: '82%',
                supportingText: 'Estate-wide demand met through onsite solar and battery storage',
              },
              {
                label: 'Water Reclaimed',
                value: '45M L',
                supportingText: 'Annual rainwater captured and repurposed for vineyard and olive irrigation',
              },
              {
                label: 'Habitat Bridges',
                value: '16 km',
                supportingText: 'Continuous biodiversity corridors linking estate forests and vineyards',
              },
            ],
          },
          commitments: {
            focus: 'Circular Heritage',
            details: [
              'Zero-waste cellar initiative diverting 96% of material from landfill',
              'Employee mobility program with e-bikes across Tuscan villages',
              'Certified Equalitas estates championing social accountability',
            ],
          },
          perfectFor: [
            'Buyers curating solar-powered Italian portfolios',
            'Educators comparing regenerative practices across terroirs',
            'Travel partners building multi-estate sustainability itineraries',
          ],
        },
        {
          id: 'san-simeon',
          name: 'San Simeon Wines',
          shortName: 'San Simeon',
          tagline: 'Central Coast innovation with ocean guardianship',
          description:
            'Fourth-generation vintners the Riboli Family deploy coastal wind power, desalination offsets, and kelp restoration to protect Paso Robles and Monterey vineyards.',
          address: '2015 Gaffey Street, Los Angeles, CA 90731',
          neighborhood: 'Central Coast Estates',
          phone: '(323) 223-1401',
          email: 'sustainability@sansimeonwines.com',
          hours: {
            monday: '9:00 AM - 5:00 PM',
            tuesday: '9:00 AM - 5:00 PM',
            wednesday: '9:00 AM - 5:00 PM',
            thursday: '9:00 AM - 5:00 PM',
            friday: '9:00 AM - 5:00 PM',
            saturday: 'By appointment',
            sunday: 'Closed',
          },
          images: {
            hero: '/images/wineries/san-simeon/hero.jpg',
            gallery: [
              '/images/wineries/san-simeon/gallery-1.jpg',
              '/images/wineries/san-simeon/gallery-2.jpg',
              '/images/wineries/san-simeon/gallery-3.jpg',
            ],
          },
          features: [
            'Wind turbines powering Paso Robles fermentation and bottling',
            'Kelp reforestation partnerships offsetting desalination impacts',
            'Reverse-osmosis reuse system closing the loop in the cellar',
            'Soil carbon pilot tracking regenerative blocks across AVAs',
          ],
          signature:
            'The San Simeon story links ocean health with vineyard vitality—guests trace wind-powered energy flows, taste kelp-aged Chardonnay, and explore tech-forward sustainability labs.',
          impact: {
            headline: 'Ocean-to-vineyard resilience',
            description:
              'San Simeon marries renewable energy with coastal restoration to future-proof Central Coast terroirs.',
            metrics: [
              {
                label: 'Wind Energy',
                value: '3.2 MW',
                supportingText: 'Clean power generated annually by on-site turbines',
              },
              {
                label: 'Desal Offset',
                value: '100%',
                supportingText: 'Kelp reef restoration mitigating desalination draw-down',
              },
              {
                label: 'Soil Carbon Lift',
                value: '+0.8%',
                supportingText: 'Organic matter gain across regen pilot blocks in three seasons',
              },
            ],
          },
          commitments: {
            focus: 'Blue Planet Stewardship',
            details: [
              'Funding Monterey Bay Aquarium Seafood Watch research',
              'Paso Robles CAB Collective founding sustainability member',
              'Electric fleet transition goal of 90% by 2027',
            ],
          },
          perfectFor: [
            'Writers exploring ocean–vineyard climate connections',
            'Retailers building resilient California lineups',
            'ESG teams highlighting renewable energy case studies',
          ],
        },
        {
          id: 'willakenzie',
          name: 'WillaKenzie Estate',
          shortName: 'WillaKenzie',
          tagline: 'Willamette Valley biodiversity in motion',
          description:
            'Perched above the Chehalem Mountains, WillaKenzie pairs mosaic Pinot Noir blocks with prairie restoration, carbon-smart barrels, and inclusive mentorship for future stewards.',
          address: '19143 NE Laughlin Road, Yamhill, OR 97148',
          neighborhood: 'Yamhill-Carlton AVA',
          phone: '(503) 662-3280',
          email: 'info@willakenzie.com',
          hours: {
            monday: '11:00 AM - 5:00 PM',
            tuesday: '11:00 AM - 5:00 PM',
            wednesday: '11:00 AM - 5:00 PM',
            thursday: '11:00 AM - 5:00 PM',
            friday: '11:00 AM - 5:00 PM',
            saturday: '10:00 AM - 5:00 PM',
            sunday: '10:00 AM - 5:00 PM',
          },
          images: {
            hero: '/images/wineries/willakenzie/hero.jpg',
            gallery: [
              '/images/wineries/willakenzie/gallery-1.jpg',
              '/images/wineries/willakenzie/gallery-2.jpg',
              '/images/wineries/willakenzie/gallery-3.jpg',
            ],
          },
          features: [
            '167 acres of native prairie and oak savanna restoration',
            'Gravity-flow winery minimizing pumping and energy demand',
            'Carbon-smart barrel program using biochar-infused staves',
            'Fellowship program for BIPOC and first-generation vintners',
          ],
          signature:
            'Guests hike biodiversity corridors, sample terroir-driven Pinot and Chardonnay, and join sensory labs linking soil biology to aromatics.',
          impact: {
            headline: 'Biodiversity as a winemaking ingredient',
            description:
              'WillaKenzie measures success in acres restored, carbon stored, and people welcomed into wine.',
            metrics: [
              {
                label: 'Habitat Restored',
                value: '167 acres',
                supportingText: 'Oak savanna and prairie re-established with Willamette Partnership',
              },
              {
                label: 'Energy Reduction',
                value: '26% ↓',
                supportingText: 'Gravity-flow design versus traditional pump-driven wineries',
              },
              {
                label: 'Fellows Mentored',
                value: '32',
                supportingText: 'Future stewards graduating from the Rooted in Resilience program',
              },
            ],
          },
          commitments: {
            focus: 'People & Place',
            details: [
              'LIVE and Salmon-Safe certified vineyards',
              'Reusable lightweight bottles deployed across core wines',
              'Paid mentorship pairing fellows with viticulture leadership',
            ],
          },
          perfectFor: [
            'Trade partners celebrating regenerative Willamette Pinot Noir',
            'Educators designing biodiversity field programs',
            'DEI advocates highlighting inclusive wine careers',
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
