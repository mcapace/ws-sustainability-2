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
      className={`py-20 ${isEven ? 'bg-white' : 'bg-[#F7FAF7]'}`}
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
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                {location.shortName}
              </span>
            </div>
            <h3 className="text-balance font-serif text-4xl text-[#132C24]">{location.name}</h3>
            {location.tagline && (
              <p className="text-sm uppercase tracking-[0.2em] text-[#6E8A7E]">
                {location.tagline}
              </p>
            )}
            <p className="text-lg leading-relaxed text-slate-600">{location.description}</p>
            {location.signature && location.signature !== location.description && (
              <p className="text-base italic text-slate-500">{location.signature}</p>
            )}

            {location.website && (
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={location.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#10301f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B8E4B3] transition hover:bg-[#16472f]"
                >
                  Visit winery
                </a>
              </div>
            )}

            {location.features && location.features.length > 0 && (
              <div className="rounded-2xl border border-[#DDE5DC] bg-white/70 p-6 backdrop-blur-sm">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                  Campaign Highlights
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {location.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <Sparkles className="mt-1 h-4 w-4 text-[#B8E4B3]" />
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
                        ? 'border-[#10301f]'
                        : 'border-transparent hover:border-[#B8E4B3]'
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
