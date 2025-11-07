'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { venueData, VenueLocation } from '@/data/venues';
import { Sparkles } from 'lucide-react';

const LOCATIONS = venueData.brands.flatMap(brand => brand.locations);

export function WineryDetail({ location, index }: { location: VenueLocation; index: number }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const isEven = index % 2 === 0;

  const galleryImages =
    location.images?.gallery && location.images.gallery.length > 0
      ? location.images.gallery
      : [location.images.hero];
  const currentImage = galleryImages[activeGalleryIndex] ?? location.images.hero;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [location.id]);

  return (
    <section
      id={location.id}
      className={`py-20 ${isEven ? 'bg-[#F6F2E8]' : 'bg-[#EEF3EA]'}`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-4">
              {location.logo && (
                <Image
                  src={location.logo}
                  alt={`${location.name} logo`}
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                {location.shortName}
              </span>
            </div>
            <h3 className="text-balance font-serif text-4xl text-[#1F4D3B]">{location.name}</h3>
            {location.tagline && (
              <p className="text-sm uppercase tracking-[0.2em] text-[#6E8A7E]">
                {location.tagline}
              </p>
            )}
            <p className="text-lg leading-relaxed text-[#365A47]">{location.description}</p>
            {location.signature && location.signature !== location.description && (
              <p className="text-base italic text-[#6F8277]">{location.signature}</p>
            )}

            {location.website && (
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={location.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#D86C3B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_16px_40px_-24px_rgba(216,108,59,0.6)] transition hover:bg-[#E27D4E]"
                >
                  Visit winery
                </a>
              </div>
            )}

            {location.features && location.features.length > 0 && (
              <div className="rounded-3xl border border-[#E4E8E0] bg-white/85 p-6 backdrop-blur-xl shadow-[0_24px_70px_-40px_rgba(31,77,59,0.35)]">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                  Campaign Highlights
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-[#365A47]">
                  {location.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <Sparkles className="mt-1 h-4 w-4 text-[#E3C77D]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            className={`${isEven ? '' : 'lg:order-1'}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={currentImage}
                  alt={`${location.name} sustainability spotlight`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index === 0}
                />
              </div>
            </div>
            {galleryImages.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {galleryImages.map((img, imgIndex) => (
                  <button
                    key={img}
                    onClick={() => setActiveGalleryIndex(imgIndex)}
                    className={`relative h-24 overflow-hidden rounded-xl border transition ${
                      activeGalleryIndex === imgIndex
                        ? 'border-[#1F4D3B]'
                        : 'border-transparent hover:border-[#E3C77D]'
                    }`}
                    aria-label={`View ${location.name} gallery image ${imgIndex + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="160px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function VenueDetails() {
  return (
    <>
      {LOCATIONS.map((location, index) => (
        <WineryDetail key={location.id} location={location} index={index} />
      ))}
    </>
  );
}
