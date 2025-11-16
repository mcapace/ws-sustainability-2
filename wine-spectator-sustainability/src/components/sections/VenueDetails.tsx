'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { VenueLocation } from '@/data/venues';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGsapTimeline } from '@/lib/animations';
import { MagneticHover } from '@/components/animations/UtilityAnimations';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';

export function WineryDetail({ location, index }: { location: VenueLocation; index: number }) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const isEven = index % 2 === 0;
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const { trackInteraction } = useInteractionAnalytics();

  const galleryImages =
    location.images?.gallery && location.images.gallery.length > 0
      ? [location.images.hero, ...location.images.gallery]
      : [location.images.hero];
  const currentImage = galleryImages[activeGalleryIndex] ?? location.images.hero;

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [location.id]);

  useGsapTimeline(() => {
    if (!sectionRef.current || !contentRef.current || !galleryRef.current) return null;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.8 },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    tl.fromTo(
      contentRef.current,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, immediateRender: false },
    ).fromTo(
      galleryRef.current,
      { y: 36, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, immediateRender: false },
      '-=0.5',
    );

    return tl;
  }, { deps: [location.id] });

  return (
    <section
      ref={sectionRef}
      id={location.id}
      className={`py-20 ${isEven ? 'bg-[#F6F2E8]' : 'bg-[#EEF3EA]'}`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            ref={contentRef}
            className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {location.article && location.article.length > 0 && (
              <div className="space-y-6">
                {location.logo && (
                  <div
                    className={`relative ${
                      ['willakenzie', 'san-simeon', 'lallier', 'gloria-ferrer'].includes(location.id)
                        ? 'h-16 w-64'
                        : 'h-12 w-48'
                    }`}
                  >
                    <Image
                      src={location.logo}
                      alt={`${location.name} logo`}
                      fill
                      className="object-contain"
                      sizes={['willakenzie', 'san-simeon', 'lallier', 'gloria-ferrer'].includes(location.id) ? '256px' : '192px'}
                      unoptimized={true}
                    />
                  </div>
                )}
                <div className="space-y-4">
                  {location.article.map((paragraph, idx) => (
                    <p key={idx} className="text-base leading-relaxed text-[#365A47]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {location.features && location.features.length > 0 && (
              <div className="mt-8 rounded-3xl border border-[#E4E8E0] bg-white/85 p-6 backdrop-blur-xl shadow-[0_24px_70px_-40px_rgba(31,77,59,0.35)]">
                <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2F6B4C]">
                  Highlights
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

            {location.website && (
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticHover>
                  <a
                    href={location.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#D86C3B] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_16px_40px_-24px_rgba(216,108,59,0.6)] transition hover:bg-[#E27D4E]"
                    onClick={() =>
                      trackInteraction('winery_cta_click', {
                        cta: 'visit_website',
                        locationId: location.id,
                      })
                    }
                  >
                    Visit winery
                  </a>
                </MagneticHover>
              </div>
            )}
          </motion.div>

          <motion.div
            ref={galleryRef}
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
                  style={{ objectPosition: location.id === 'lallier' ? '50% 20%' : 'center' }}
                />
              </div>
            </div>
            {galleryImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {galleryImages.map((img, imgIndex) => (
                  <button
                    key={img}
                    onClick={() => {
                      setActiveGalleryIndex(imgIndex);
                      trackInteraction('winery_gallery_select', {
                        locationId: location.id,
                        index: imgIndex,
                      });
                    }}
                    className={`relative h-16 sm:h-14 overflow-hidden rounded-lg border-2 transition ${
                      activeGalleryIndex === imgIndex
                        ? 'border-[#1F4D3B] ring-2 ring-[#E3C77D]/50'
                        : 'border-transparent hover:border-[#E3C77D]'
                    }`}
                    aria-label={`View ${location.name} gallery image ${imgIndex + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" unoptimized={true} loading="lazy" decoding="async" />
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

export function VenueDetails({ locations }: { locations: VenueLocation[] }) {
  return (
    <>
      {locations.map((location, index) => (
        <WineryDetail key={location.id} location={location} index={index} />
      ))}
    </>
  );
}
