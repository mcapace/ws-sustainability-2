'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGsapTimeline } from '@/lib/animations';
import { MagneticHover } from '@/components/animations/UtilityAnimations';
import { useInteractionAnalytics } from '@/components/providers/AnalyticsProvider';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const { trackInteraction } = useInteractionAnalytics();

  useGsapTimeline(() => {
    if (!parallaxRef.current || !sectionRef.current) return null;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    timeline.to(parallaxRef.current, { yPercent: -18, scale: 1.05 }, 0);

    return timeline;
  }, { deps: [] });

  useGsapTimeline(() => {
    if (!sectionRef.current) return null;

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    timeline
      .fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, immediateRender: false },
      )
      .fromTo(
        highlightRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, immediateRender: false },
        0.2,
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, immediateRender: false },
        0.6,
      );

    return timeline;
  }, { deps: [] });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center bg-[#143024]"
    >
      <div className="absolute inset-0" ref={parallaxRef}>
        <Image
          src="/images/hero/sustainability-collection-hero.jpeg"
          alt="Sunlit vineyard terraces with sustainable farming"
          fill
          priority
          className="object-cover object-[center_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e221a]/80 via-[#143024]/70 to-[#0b1a14]/85" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#143024] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/hero/pattern-noise.png')] opacity-15 mix-blend-soft-light" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(227,199,125,0.28),transparent_45%)]"
          ref={highlightRef}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-28 pt-40 text-center sm:px-10">
        <motion.span
          className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#E3C77D]/90"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Wine Spectator Sustainability 2025
        </motion.span>

        <motion.h1
          className="max-w-5xl text-balance font-serif text-[2.75rem] text-white sm:text-[3.25rem] lg:text-[3.75rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Wines Leading the Way for a Sustainable Future
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-balance text-lg text-white/90 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Their forward-thinking approaches to biodiversity, renewable energy, and environmental stewardship
          are shaping a more sustainable and resilient future. Their commitment proves that great wines can
          honor both craft and the planet.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          ref={ctaRef}
        >
          <MagneticHover>
            <a
              href="#producers"
              className="rounded-full bg-[#D86C3B] px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_18px_44px_-24px_rgba(216,108,59,0.65)] transition hover:bg-[#E27D4E]"
              onClick={() =>
                trackInteraction('hero_cta_click', {
                  target: 'producers',
                })
              }
            >
              Meet the producers
            </a>
          </MagneticHover>
        </motion.div>

        <motion.dl
          className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-6 text-left text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Producers</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">6</dd>
            <p className="text-sm text-white/60">Regenerative leaders curated by Wine Spectator.</p>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-white/50">Regions</dt>
            <dd className="mt-2 text-3xl font-semibold text-white">4</dd>
            <p className="text-sm text-white/60">California, Oregon, Tuscany &amp; Champagne.</p>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
