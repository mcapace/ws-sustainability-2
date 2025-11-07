import { MetadataRoute } from 'next';
import { venueData } from '@/data/venues';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestcigarlounges.cigaraficionado.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ];

  // Venue pages
  const venuePages = venueData.brands
    .flatMap(brand => brand.locations)
    .map(location => ({
      url: `${baseUrl}/venues/${location.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...venuePages];
}