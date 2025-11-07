'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { venueData, VenueLocation } from '@/data/venues';
import { MapPin, Phone, Clock, Gauge } from 'lucide-react';

const LOCATIONS = venueData.brands.flatMap(brand => brand.locations);

export function WineryDetail({ location, index }: { location: VenueLocation; index: number }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const isEven = index % 2 === 0;
  const weekdayHours =
    location.hours.monday === location.hours.friday
      ? location.hours.monday
      : `${location.hours.monday} – ${location.hours.friday}`;

  return (
    <section
      id={location.id}
      className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F7FAF7]'}`}
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
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
              {location.neighborhood}
            </span>
            <h3 className="text-balance font-serif text-4xl text-[#132C24]">{location.name}</h3>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6E8A7E]">{location.tagline}</p>
            <p className="text-lg leading-relaxed text-slate-600">{location.signature}</p>

            <div className="rounded-2xl border border-[#DDE5DC] bg-white/70 p-6 backdrop-blur-sm">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                Impact Headline
              </h4>
              <p className="mt-3 text-base font-semibold text-[#132C24]">
                {location.impact.headline}
              </p>
              <p className="mt-2 text-sm text-slate-600">{location.impact.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {location.impact.metrics.map(metric => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-[#DDE5DC] bg-[#F7FAF7] p-4 text-sm text-[#10301f]"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6E8A7E]">
                      <Gauge className="h-4 w-4 text-[#B8E4B3]" />
                      {metric.label}
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-[#132C24]">{metric.value}</p>
                    <p className="mt-1 text-xs text-slate-600">{metric.supportingText}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#356447]">
                Commitments
              </h4>
              <p className="mt-2 text-sm font-semibold text-[#10301f]">{location.commitments.focus}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {location.commitments.details.map(detail => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#B8E4B3]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-[#6E8A7E]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{location.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{weekdayHours}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${isEven ? '' : 'lg:order-1'}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative h-[420px] overflow-hidden rounded-3xl">
              <Image
                src={location.images.gallery[activeGalleryIndex] || location.images.hero}
                alt={`${location.name} sustainability`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={index === 0}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {location.images.gallery.map((img, imgIndex) => (
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
