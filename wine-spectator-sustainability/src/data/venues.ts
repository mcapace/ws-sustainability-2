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
  cardIntro: string;
  intro?: string;
  description: string;
  website: string;
  logo: string;
  logoScale?: number;
  address?: string;
  neighborhood?: string;
  phone?: string;
  email?: string;
  hours?: VenueHours;
  images: {
    hero: string;
    gallery: string[];
    bottle?: string;
  };
  bottleDimensions?: {
    width: number;
    height: number;
  };
  socials?: {
    website: string;
    instagram?: string;
    facebook?: string;
    x?: string;
    youtube?: string;
  };
  article?: string[];
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
          name: 'Lallier Champagne',
          shortName: 'Lallier',
          tagline: 'Champagne heritage rooted in biodiversity',
          cardIntro:
            'Since its founding, Lallier Champagne has embraced a deep respect for terroir and nature. Certified HVE and VDC, Lallier nurtures biodiversity through its partnership with local company Terr\'Api—welcoming back wild bees, trees, and flowering plants around its Oger winemaking facility. Using no herbicides or pesticides, Lallier lets nature inspire its ongoing pursuit of excellence.',
          intro:
            'A Grand Cru Maison crafting expressive Champagnes while rewilding its Oger estate through Terr\'Api-led biodiversity projects.',
          description:
            'Since its founding, Lallier Champagne has cherished its relationship with terroir and nature—crafting remarkable Champagnes guided by sincerity, curiosity, and respect for the environment.',
          website: 'https://www.champagne-lallier.com',
          logo: '/images/logos/lallier.png',
          images: {
            hero: '/Sustainability/Lallier/Preferred%20main%20photo%20LALLIER_SOME_BTV_DOMINIQUE_PORTRAIT_09_2024.jpg',
            gallery: [
              '/Sustainability/Lallier/LALLIER_SOME_FRUITSOFNATURE_BIODIVERSITE_BOURDON_2024.jpg',
              '/Sustainability/Lallier/DSC00249.jpg',
              '/Sustainability/Lallier/LALLIER_SOME_BTW_MATHIEU_VIGNES_EQUIPE_06_2024_002.jpg',
              '/Sustainability/Lallier/LALLIER%20-%20ETUI%20BRUT%201A%20HD.jpg',
              '/Sustainability/Lallier/DSC05335.jpg',
              '/Sustainability/Lallier/DSC00364.jpg',
              '/Sustainability/Lallier/DSC04547.jpg',
              '/Sustainability/Lallier/DSC08742.jpg',
              '/Sustainability/Lallier/LALLIER_SOME_FRUITSOFNATURE_VIGNE_06_2024_001.jpg',
            ],
            bottle: '/images/bottles/lallier-bottle.png',
          },
          bottleDimensions: { width: 248, height: 800 },
          socials: {
            website: 'https://www.champagne-lallier.com',
            instagram: 'https://www.instagram.com/champagne_lallier/',
            facebook: 'https://www.facebook.com/pages/Champagne-Lallier/129079373797349',
          },
          signature:
            'Certified HVE and VDC Maison reintroducing biodiversity around its Oger winemaking facility in partnership with Terr\'Api.',
          features: [
            'Founded in 1906 in the Grand Cru village of Aÿ, Lallier Champagne continues a century-old tradition rooted in craftsmanship, patience, and respect for terroir.',
            'Guided by curiosity and expertise, Lallier unites intuition with invention to create Champagnes that honor heritage while embracing modern expression.',
            'With a touch of Aÿ Grand Cru in every blend, each cuvée reflects the freshness, purity, intensity, and depth that define Lallier\'s signature style.',
            'Committed to sustainable viticulture, Lallier nurtures biodiversity and Champagne terroir through HVE and VDC certifications and the Terr\'Api partnership.',
          ],
          article: [
            'Founded in 1906 in the Grand Cru village of Aÿ, Lallier Champagne embodies a century-old legacy rooted in craftsmanship, patience, and respect for terroir. From its beginnings, the Maison has cherished its deep connection to nature, crafting wines that honor both heritage and innovation. Guided by curiosity and expertise, Lallier unites intuition with invention to create Champagnes that reflect the freshness, purity, intensity, and depth that define its signature style.',
            'Lallier\'s cellars in Aÿ and its modern winemaking facility in Oger together capture the soul of Champagne\'s greatest terroirs. The House\'s commitment to sustainable viticulture extends far beyond certification -it\'s a philosophy woven into every stage of production. Certified HVE (High Environmental Value) and VDC (Viticulture Durable en Champagne), Lallier promotes biodiversity through a partnership with the local company Terr\'Api, reintroducing wild bees, flowering plants, and trees around its Oger site. No herbicides or pesticides are used',
            'Under the direction of Chef de Caves Dominique Demarville, Lallier continues to innovate while preserving traditional savoir-faire. Each cuvée, from the Réflexion Brut R.021 to the elegant Blanc de Blancs and vibrant Rosé, captures a sense of place and time - Champagne in its truest form. Every bottle expresses the Maison\'s enduring belief: that nature is the finest guide to excellence.',
          ],
        },
        {
          id: 'firetree',
          name: 'Firetree Vineyards',
          shortName: 'Firetree',
          tagline: 'Regenerative Los Carneros Chardonnay in motion',
          cardIntro:
            'At Firetree Vineyards, sustainability is a living promise. The Jimenez family farms their Los Carneros Chardonnay organically and regeneratively, with goats, Babydoll sheep, and native wildflowers enriching the soil. Under the guidance of winemaker Julien Fayard, Firetree cultivates a future rooted in stewardship, excellence, and generational goals.',
          intro:
            'Family-owned Los Carneros estate farming regeneratively with goats, sheep, and native pollinator plantings.',
          description:
            'Rooted in the Los Carneros foothills, Firetree Vineyards crafts expressive, sustainably grown Chardonnay guided by the Jimenez family\'s vision for legacy, stewardship, and regenerative farming.',
          website: 'https://firetreevineyards.com',
          logo: '/images/logos/firetree.png',
          images: {
            hero: '/Sustainability/Firetree/PREFERRED%20LEAD%20PHOTO%20GM2024-Firetree-25.jpg',
            gallery: [
              '/Sustainability/Firetree/777_05.24Firetree_%C2%A9SuzanneBeckerBronk.jpg',
              '/Sustainability/Firetree/361_11.23FireTree_%C2%A9SuzanneBeckerBronk.jpg',
              '/Sustainability/Firetree/768_05.24Firetree_%C2%A9SuzanneBeckerBronk.jpg',
              '/Sustainability/Firetree/426_01.24FireTree_%C2%A9SuzanneBeckerBronk.jpg',
              '/Sustainability/Firetree/IMG_9842.png',
              '/Sustainability/Firetree/691_05.24Firetree_%C2%A9SuzanneBeckerBronk.jpg',
            ],
            bottle: '/images/bottles/firetree-bottle.png',
          },
          bottleDimensions: { width: 600, height: 753 },
          socials: {
            website: 'https://firetreevineyards.com',
            instagram: 'https://www.instagram.com/firetreevineyards/',
          },
          signature:
            'Family-owned estate working with winemaker Julien Fayard to steward Napa Green- and Fish Friendly Farming-certified vineyards through organic, regenerative practices.',
          features: [
            'Napa Green & Fish Friendly Farming certified estate in Los Carneros',
            'Practicing organic and regenerative viticulture, with permanent goat and sheep herd',
            'Participant in California\'s Healthy Soils Program and native pollinator project',
            'Family-owned estate crafting Chardonnay under winemaker Julien Fayard',
          ],
          article: [
            'When Ricardo and Dayva Jimenez purchased their Los Carneros property in April 2021, they were not just buying a vineyard—they were laying the foundation for a legacy. That year marked Firetree Vineyards\' first harvest, and from the outset, the family charted a path that fused fine Chardonnay production with an ambitious commitment to the land.',
            'Working alongside vineyard manager Ben Leachman and winemaker Julien Fayard, the Jimenez family has embraced organic and regenerative farming as a cornerstone of their approach. Firetree is Napa Green and Fish Friendly Farming certified, affirming practices that safeguard soil health, water resources, and vineyard biodiversity. The integration of a permanent herd of goats and Babydoll sheep reflects this philosophy, offering natural weed management and soil enrichment in place of mechanized solutions.',
            'Beyond certification, Firetree is investing in forward-looking initiatives. The estate participates in the California Department of Food & Agriculture\'s Healthy Soils Program, designed to increase carbon capture and soil resilience. In partnership with the Napa County Resource Conservation District, Firetree has also introduced a native pollinator cover crop—featuring species such as California Poppy, Yellow Lupine, and Baby Blue Eyes—that not only enhances vineyard ecology but underscores a long-term vision for a resilient agricultural landscape.',
            'That generational outlook extends to the family itself. Their son, Ricky, is involved in sales and marketing, while their daughter, Sophya, begins her studies in plant sciences at UC Davis this fall, inspired by her experience working among the vines.',
            'From their estate bottlings—including the FIDEM Reserve and Bunny Hills Chardonnay—to the enduring silhouettes of the two trees that overlook their vineyard, Firetree is positioning itself as both steward and storyteller in Carneros. Sustainability, for the Jimenez family, is not a buzzword, but a foundation for the future.',
          ],
        },
        {
          id: 'gloria-ferrer',
          name: 'Gloria Ferrer Winery',
          shortName: 'Gloria Ferrer',
          tagline: 'Organic sparkling excellence from Carneros',
          cardIntro:
            'In the rolling hills of Carneros, Gloria Ferrer has long been synonymous with exceptional sparkling wine. Today, the estate stands at a new milestone: with both vineyards and winery fully certified organic, the commitment to crafting wines with integrity has never been stronger. Discover where intentional farming and winemaking deliver sparkling wines of balance and enduring quality.',
          intro:
            'Carneros\' first sparkling house, now fully certified organic, crafting méthode traditionnelle wines with intentional farming.',
          description:
            'Discover Gloria Ferrer\'s certified-organic Carneros estate, where intentional farming and winemaking deliver sparkling wines of balance, integrity, and enduring quality.',
          website: 'https://www.gloriaferrer.com',
          logo: '/images/logos/gloria-ferrer.png',
          images: {
            hero: '/Sustainability/Gloria%20Ferrer/DSCF5629.jpg',
            gallery: [
              '/Sustainability/Gloria%20Ferrer/DJI_0055.MP4.00_00_45_16.Still002%20(3).jpg',
              '/Sustainability/Gloria%20Ferrer/Gloria%20Ferrer%20Final-79%20(2).jpg',
              '/Sustainability/Gloria%20Ferrer/DJI_0036.MOV.00_01_29_09.Still001%20(1).jpg',
              '/Sustainability/Gloria%20Ferrer/DJI_0051.MP4.00_00_30_18.Still001.jpg',
              '/Sustainability/Gloria%20Ferrer/_DSC1937%20(1).jpg',
              '/Sustainability/Gloria%20Ferrer/DJI_0060.MP4.00_00_58_09.Still001%20(3).jpg',
              '/Sustainability/Gloria%20Ferrer/DJI_0063.MP4.00_01_27_12.Still002.jpg',
              '/Sustainability/Gloria%20Ferrer/Gloria%20Ferrer%20Final-78%20(1).jpg',
              '/Sustainability/Gloria%20Ferrer/_DSC2245.jpg',
            ],
            bottle: '/images/bottles/gloria-ferrer-bottle.png',
          },
          bottleDimensions: { width: 296, height: 800 },
          socials: {
            website: 'https://www.gloriaferrer.com',
            instagram: 'https://www.instagram.com/gloriaferrer/',
            facebook: 'https://www.facebook.com/GloriaFerrerWinery/',
          },
          signature:
            'Over 40 years of méthode traditionnelle craftsmanship now backed by dual organic and CSWA certifications.',
          features: [
            'Both Gloria Ferrer\'s Carneros vineyards and winery are now fully certified organic by the CCOF and certified Sustainable by the CSWA, underscoring a deep commitment to our purity and stewardship.',
            'Every sparkling and still wine is crafted with intention and purpose, which can be tasted in the purity of fruit, balance, and aging ability of the wines.',
            'Over 40 years of crafting méthode traditionnelle sparkling wines showcase the precision and elegance of Carneros fruit.',
            'Award-winning hospitality in the heart of Sonoma, with tastings, vineyard views, and culinary pairings that bring the wines to life.',
            'A balance of classic techniques and modern sustainability practices, including regenerative farming and small-lot still wine exploration.',
          ],
          article: [
            'Gloria Ferrer: A Legacy of Intentional Winemaking in Carneros',
            'In the rolling hills of Carneros, Gloria Ferrer has long been synonymous with exceptional sparkling wine. Today, the estate stands at a new milestone: with both vineyards and winery fully certified organic, the commitment to crafting wines with integrity has never been stronger.',
            'Farming organically across the estate\'s 330 acres is more than a certification--it\'s a philosophy. Cover crops nurture soil health, native biodiversity flourishes among the vines, and water and energy conservation practices underscore a holistic approach to stewardship. Sustainability has been central to the winery\'s ethos for decades, with recognition from the California Sustainable Winegrowing Alliance reinforcing its leadership in responsible farming.',
            'Yet the transition to certified organic elevates that dedication, ensuring each bottle--sparkling or still--reflects the purest expression of Carneros. From Pinot Noir and Chardonnay-driven méthode traditionnelle sparkling wines to small-lot still bottlings of single-vineyard Pinot Noirs and Chardonnays,  every decision is made with intention, balancing tradition with forward-thinking practices.',
            'The result is wines of precision, balance, and age-worthiness, crafted not only for today\'s enjoyment but for the future. The estate\'s winemaking team believes that purity of farming directly translates to clarity in the glass, delivering textures, flavors, and structure that speak honestly of place.',
            'As Gloria Ferrer looks ahead, the goal remains clear: to celebrate Carneros through wines that marry sustainability, craftsmanship, and a deep respect for the land. With each vintage, the winery reaffirms its belief that the best wines are those that honor both people and place--sparkling with intention.',
          ],
        },
        {
          id: 'piccini',
          name: 'Piccini 1882',
          shortName: 'Piccini',
          tagline: 'Tuscan heritage with organic innovation',
          cardIntro:
            'For over 140 years, the Piccini family has transformed the landscape of Chianti winemaking, rooted in the heart of Tuscany. Today, Piccini stands as a symbol of innovation and heritage—bridging the timeless allure of Chianti with a fresh perspective for modern wine lovers. But their legacy goes beyond tradition and innovation: Piccini is leading the way in sustainable and organic viticulture.',
          intro:
            'Five generations of Chianti innovation, blending organic viticulture, renewable energy, and a modern take on Tuscan classics.',
          description:
            'Piccini is one of Tuscany\'s most established wine families, blending 140 years of heritage with a courageous commitment to innovation and sustainability.',
          website: 'https://www.piccini1882.it/en',
          logo: '/images/logos/piccini.png',
          logoScale: 0.9,
          images: {
            hero: '/Sustainability/PIccini/Landscape%20Geografico%20(hi-res).jpg',
            gallery: [
              '/Sustainability/PIccini/Mario%20Piccini.jpg',
              '/Sustainability/PIccini/Piccini-8506.jpg',
              '/Sustainability/PIccini/Vendemmia%20Piccini%2008-10-2019-96.JPG',
              '/Sustainability/PIccini/DSC01425.jpg',
              '/Sustainability/PIccini/Piccini%20Tasting%20Room.jpg',
              '/Sustainability/PIccini/Piccini%20Vineyards.jpg',
              '/Sustainability/PIccini/Piccini%20Pressing%20Room.jpg',
              '/Sustainability/PIccini/Piccini-9254.jpg',
              '/Sustainability/PIccini/Piccini-9292.jpg',
              '/Sustainability/PIccini/DSC01451.jpg',
              '/Sustainability/PIccini/DSCF6819.JPG',
              '/Sustainability/PIccini/DSCF6838.JPG',
            ],
            bottle: '/images/bottles/piccini-bottle.png',
          },
          bottleDimensions: { width: 199, height: 800 },
          socials: {
            website: 'https://www.piccini1882.it/en',
          },
          signature:
            'Five generations evolving from a 7-hectare vineyard into a global ambassador for eco-forward Chianti.',
          features: [
            'Five generations of Piccini family ownership growing from a 7-hectare vineyard in 1882 to a global exporter.',
            'Extensive organic viticulture practices help preserve biodiversity and reduce chemical use in Tuscany\'s vineyards.',
            'The winery invests in renewable energy initiatives to minimize its carbon footprint and promote responsible production.',
            'Piccini\'s commitment to sustainability sets a benchmark for eco-friendly winemaking in the region.',
            'By prioritizing environmental stewardship, Piccini ensures the long-term health of the land for future generations.',
          ],
          article: [
            'For more than 140 years, the Piccini family has been a driving force in transforming the landscape of Chianti winemaking, deeply rooted in the heart of Tuscany. What began as a modest family venture has grown into a renowned name, synonymous with both tradition and forward-thinking innovation. Today, Piccini stands as a symbol of how heritage can be harmoniously blended with modernity, offering wine lovers a fresh perspective on the timeless allure of Chianti.',
            'The Piccini family\'s journey is marked by a relentless pursuit of excellence. Each generation has contributed to refining winemaking techniques, embracing new technologies while honoring the region\'s rich history. Their vineyards, nestled among the rolling hills of Tuscany, produce wines that capture the essence of the land--balancing classic flavors with contemporary appeal. Piccini\'s commitment to quality is evident in every bottle, reflecting a deep respect for the terroir and the traditions that have shaped it.',
            'Yet, the Piccini legacy extends beyond tradition and innovation. In recent years, the family has emerged as a leader in sustainable and organic viticulture. By adopting environmentally friendly practices, such as reducing chemical use and promoting biodiversity, Piccini is helping to preserve Tuscany\'s natural beauty for future generations. Their dedication to sustainability not only enhances the quality of their wines but also sets a benchmark for responsible winemaking in the region.',
            'In essence, the Piccini family\'s story is one of evolution--where heritage meets progress, and where a passion for winemaking is matched by a commitment to the land and its people. Their influence continues to redefine Tuscany, inspiring both seasoned connoisseurs and new enthusiasts to appreciate the enduring magic of Chianti.',
          ],
        },
        {
          id: 'san-simeon',
          name: 'San Simeon Wines',
          shortName: 'San Simeon',
          tagline: 'Central Coast estate-grown stewardship',
          cardIntro:
            'San Simeon Wines are crafted from 100% estate-grown fruit from certified sustainable vineyards in both Monterey and Paso Robles. Made with generations of expertise and passion, each bottle reflects the Riboli family\'s unwavering commitment to quality and environmental stewardship—sustainability from ground to glass.',
          intro:
            'Fourth-generation Riboli family wines from CSWA-certified Monterey and Paso Robles estates, soon opening a Willow Creek tasting room.',
          description:
            'San Simeon wines are crafted from 100% estate-grown, certified sustainable vineyards in Monterey and Paso Robles—reflecting generations of Riboli family expertise.',
          website: 'https://sansimeonwines.com',
          logo: '/images/logos/san-simeon.png',
          images: {
            hero: '/Sustainability/San%20Simeone/Paso%20Robles%20Vineyard.jpg',
            gallery: [
              '/Sustainability/San%20Simeone/Riboli%20Creston%20Vineyard%20-%2028.jpg',
              '/Sustainability/San%20Simeone/Sarmento%20Vineyard%20-%2010.jpg',
              '/Sustainability/San%20Simeone/Pretty%20Penny%20Vineyard%20-%204.jpg',
              '/Sustainability/San%20Simeone/Riboli%20Creston%20Vineyard%20-%2035.jpg',
              '/Sustainability/San%20Simeone/1.png',
              '/Sustainability/San%20Simeone/2.png',
            ],
            bottle: '/images/bottles/san-simeon-bottle.png',
          },
          bottleDimensions: { width: 214, height: 800 },
          socials: {
            website: 'https://www.sansimeonwines.com',
            instagram: 'https://www.instagram.com/sansimeonwines/',
            facebook: 'https://www.facebook.com/SanSimeonWines',
          },
          signature:
            'Fourth-generation family ownership marrying coastal elegance with innovation across CSWA-certified vineyards.',
          features: [
            'Family-owned and Operated since 1917, with over 100 years of winemaking excellence',
            '100% estate-grown wines from certified sustainable (CSWA) vineyards in Monterey and Paso Robles',
            'New tasting room opening in early 2026 in Paso Robles\' Willow Creek District',
          ],
          article: [
            'For those drawn to the coastal elegance of California wines, San Simeon Wines delivers a refined expression of place--one rooted in sustainability, family tradition, and a deep respect for the land.',
            'Crafted by the Riboli family, fourth generation owned and operated, San Simeon wines are made exclusively from 100% estate-grown fruit sourced from certified sustainable (Certified California Sustainable Vineyard and Winery, CSWA) vineyards in Monterey and Paso Robles. These two distinct growing regions provide a dynamic contrast: Monterey\'s cool marine climate shapes vibrant whites and delicate reds like Chardonnay and Pinot Noir, while Paso Robles\' sun-drenched days and cool nights yield bold, structured varieties such as Cabernet Sauvignon, Petite Sirah, and the flagship Bordeaux-style blend, Stormwatch.',
            'Each bottle reflects a harmonious blend of innovation and tradition. Meticulous vineyard management and modern winemaking techniques come together to create expressive, food-friendly wines that have earned 90+ point accolades from top publications. From vine to glass, San Simeon is a testament to the Riboli family\'s enduring commitment to quality and environmental stewardship.',
            'While San Simeon wines are available online and at select retailers nationwide, soon fans will be able to experience them where they begin. In early 2026, the brand will unveil its first dedicated winery and tasting room in Paso Robles\' esteemed Willow Creek District--offering guests an intimate, terroir-driven tasting experience in the heart of wine country.',
          ],
        },
        {
          id: 'willakenzie',
          name: 'WillaKenzie Estate',
          shortName: 'WillaKenzie',
          tagline: 'LIVE-certified Willamette Valley stewardship',
          cardIntro:
            'WillaKenzie Estate, founded in 1992 in the Yamhill-Carlton AVA, is named for the sedimentary soil on which our vines are planted. As the first LIVE-certified winery in the northwest, we have remained committed to sustainable practices since breaking ground. Our estate is a study in diversity and complexity, offering a collection of distinctive single-vineyard Pinot Noirs.',
          intro:
            'LIVE Certified #001 estate celebrating Willamette Valley diversity with salmon-safe farming and terroir-driven Pinot Noirs.',
          description:
            'Discover the many expressions of Oregon\'s Willamette Valley at WillaKenzie Estate—where diverse soils, elevations, and craftsmanship create distinctive, terroir-driven wines.',
          website: 'https://www.willakenzie.com',
          logo: '/images/logos/willakenzie.png',
          images: {
            hero: '/Sustainability/WillaKenzie/WKZ_149_Lifestyle_MBattey_7-2025.jpg',
            gallery: [
              '/Sustainability/WillaKenzie/WillaKenzie%20Estate_20130701_144-Edit_sm.jpg',
              '/Sustainability/WillaKenzie/WKZ_243_Lifestyle_MBattey_7-2025.jpg',
              '/Sustainability/WillaKenzie/WKZ_129_Lifestyle_MBattey_7-2025.jpg',
              '/Sustainability/WillaKenzie/WKZ_16_Lifestyle_MBattey_7-2025.jpg',
              '/Sustainability/WillaKenzie/WKE_1583_AJohnson_7-2013.jpg',
              '/Sustainability/WillaKenzie/WKE%20TR%202024-17.jpg',
            ],
            bottle: '/images/bottles/willakenzie-bottle.png',
          },
          bottleDimensions: { width: 235, height: 800 },
          socials: {
            website: 'https://www.willakenzie.com',
            instagram: 'https://www.instagram.com/willakenzie/',
            facebook: 'https://www.facebook.com/willakenzie',
          },
          signature:
            'Oregon\'s first LIVE-certified winery with Salmon-Safe stewardship across a 420-acre mosaic of microclimates.',
          features: [
            'A TAPESTRY OF TERRIOR: With its range of benches, ridgelines, elevations, slopes, exposures, soils, microclimates, and clonal plantings, WillaKenzie Estate is one of the most diverse estates in the Willamette Valley.',
            'LIVE-CERTIFIED: As Oregon\'s LIVE-Certified winery #001, WillaKenzie Estate proudly upholds the organization\'s standards, including use of flowering and cover crops in the vineyard to serve as a food source for pollinators and wildlife.',
            'SALMON-SAFE: WillaKenzie Estate is committed to reducing runoff, protecting water quality, and enhancing native biodiversity in our vineyard.',
            'TEXTURE, PURITY, FINESSE: All WillaKenzie Estate wines are unified by a focus on texture and vibrancy — each bottle showcases the winegrowing team\'s emphasis on purity of fruit and finesse-driven wines that showcase the diversity of our continuous estate vineyard.',
            'TASTING EXPERIENCES: WillaKenzie Estate offers a range of curated tasting experiences, including guided estate flights, intimate fireplace tastings, scenic al fresco pours, private group tastings, and immersive vineyard tours, that showcase its exceptional wines in a breathtaking setting, highlighting the estate\'s diverse terroir and commitment to sustainability.',
          ],
          article: [
            'Nestled in Oregon\'s Yamhill-Carlton AVA, WillaKenzie Estate stands among the Willamette Valley\'s most distinctive wineries. Founded in 1991 by Bernard Lacroute--who was inspired by the rolling hills reminiscent of his native Burgundy--the estate was built on a simple belief: great wines reflect a true sense of place. Its name honors the marine sedimentary WillaKenzie soil series, which imparts the depth, texture, and minerality that define its wines.',
            'The natural diversity of the estate drives WillaKenzie\'s commitment to sustainability and minimal intervention. Spanning 420 acres, the complex topography of ridgelines, benches, and varying exposures creates a mosaic of microclimates and terroirs, allowing for remarkable varietal expression. As Oregon\'s first winery to achieve LIVE (Low Input Viticulture and Enology) certification, WillaKenzie also maintains Salmon-Safe status, protecting regional waterways and wildlife. More than 75% of the property remains in its natural state, supporting over 30,000 honeybees, a herd of longhorn cattle for grazing and erosion control, and an on-site solar array that offsets nearly half of its energy use--creating a balanced ecosystem that sustains both land and vines.',
            'Winemaker Erik Kramer, who joined in 2017 after a decade crafting acclaimed Willamette Valley wines, combines scientific precision with deep respect for vineyard individuality. A former hydrogeologist, he approaches each block and vintage with curiosity and restraint, producing wines that are elegant, textured, and expressive of place. The portfolio includes six single-parcel Pinot Noirs, the Estate Cuvée Pinot Noir and Chardonnay, and, in exceptional vintages, the pinnacle La Crête Pinot Noir and Chardonnay. Additional bottlings--such as Gamay Noir, Pinot Blanc, and the Alsatian-inspired Tourdion Blanc--highlight the estate\'s versatility and exploration of diverse varietals.',
            'Guests can explore WillaKenzie\'s terroir and dedication to sustainable practices through curated tastings, from guided Estate Flights to intimate Fireplace Tastings and scenic Al Fresco Patio experiences with vineyard views. The private Overlook Room offers bottle service or paired tastings, while the seasonal Vines to Wines Tour offers an immersive ATV journey through the estate\'s terrain, ending with limited-production wines enjoyed in the very vineyards where they were grown.',
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
