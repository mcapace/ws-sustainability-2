'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { venueData } from '@/data/venues';
import { BRAND_COLORS } from '@/lib/constants';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Users,
  Award,
  History
} from 'lucide-react';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VenueContentProps {
  venueId: string;
  className?: string;
}

export function VenueContent({ venueId, className = '' }: VenueContentProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [isOpenNow, setIsOpenNow] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const venue = venueData.brands
    .flatMap(brand => brand.locations)
    .find(location => location.id === venueId);

  useEffect(() => {
    if (!sectionRef.current || !venue) return;

    const ctx = gsap.context(() => {
      // Section reveal animations
      gsap.fromTo('.content-section', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [venue]);

  // Check if venue is currently open
  useEffect(() => {
    if (!venue) return;
    
    const checkHours = () => {
      const now = new Date();
      const day = now.toLocaleLowerCase().slice(0, 3); // mon, tue, etc.
      const currentTime = now.getHours() * 100 + now.getMinutes();
      
      const hours = venue.hours[day as keyof typeof venue.hours];
      if (hours === 'Closed') {
        setIsOpenNow(false);
        return;
      }
      
      const [openTime, closeTime] = hours.split(' - ');
      const open = parseTime(openTime);
      const close = parseTime(closeTime);
      
      setIsOpenNow(currentTime >= open && currentTime <= close);
    };
    
    checkHours();
    const interval = setInterval(checkHours, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [venue]);

  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    return hour24 * 100 + parseInt(minutes);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  if (!venue) return null;

  const brand = venueData.brands.find(b => b.locations.includes(venue));
  const isBarclayRex = venue.id === 'barclay-rex-wall-st';

  return (
    <section ref={sectionRef} className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Venue Header */}
        <div className="content-section mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {brand && (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={48}
                    className="filter brightness-0 invert"
                  />
                )}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isOpenNow 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {isOpenNow ? 'Open Now' : 'Closed'}
                </div>
              </div>
              
              <h1 className="venue-headline text-4xl lg:text-5xl font-bold text-luxury-cream mb-4">
                {venue.name}
              </h1>
              
              <p className="venue-tagline text-xl lg:text-2xl italic mb-6" 
                 style={{ color: brand?.accentColor || BRAND_COLORS.davidoff.primary }}>
                {venue.experience?.headline || venue.tagline}
              </p>
              
              <p className="venue-description text-lg text-luxury-cream/80 leading-relaxed mb-8">
                {venue.description}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={venue.images.hero}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Quick Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-luxury-charcoal/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-cigar-gold" />
                      <span className="text-luxury-cream/80">{venue.neighborhood}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-cigar-gold" />
                      <span className="text-luxury-cream/80">{venue.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience Section */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20">
                <h2 className="text-2xl font-bold text-luxury-cream mb-4">The Experience</h2>
                <p className="text-luxury-cream/80 leading-relaxed mb-4">
                  {venue.experience?.description || venue.signature}
                </p>
                <p className="text-luxury-cream/70 italic">
                  {venue.experience?.atmosphere}
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20">
                <h2 className="text-2xl font-bold text-luxury-cream mb-6">Signature Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: brand?.accentColor || BRAND_COLORS.davidoff.primary }}
                      />
                      <span className="text-luxury-cream/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collection Section */}
            {venue.collection && (
              <div className="content-section">
                <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20">
                  <h2 className="text-2xl font-bold text-luxury-cream mb-6">The Collection</h2>
                  
                  {/* Featured Collection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-cigar-gold mb-3">Featured Selections</h3>
                    <div className="space-y-2">
                      {venue.collection.featured.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Star size={16} className="text-cigar-gold" />
                          <span className="text-luxury-cream/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exclusive Offerings */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-cigar-gold mb-3">Exclusive Offerings</h3>
                    <div className="space-y-2">
                      {venue.collection.exclusive.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Award size={16} className="text-cigar-gold" />
                          <span className="text-luxury-cream/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vintage Collection (Barclay Rex only) */}
                  {venue.collection.vintage && (
                    <div>
                      <h3 className="text-lg font-semibold text-cigar-copper mb-3">Vintage Treasures</h3>
                      <div className="space-y-2">
                        {venue.collection.vintage.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <History size={16} className="text-cigar-copper" />
                            <span className="text-luxury-cream/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Perfect For Section */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20">
                <h2 className="text-2xl font-bold text-luxury-cream mb-6">Perfect For</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.perfectFor.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: brand?.accentColor || BRAND_COLORS.davidoff.primary }}
                      />
                      <span className="text-luxury-cream/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* History Section (Barclay Rex only) */}
            {venue.history && (
              <div className="content-section">
                <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-8 border border-luxury-slate/20">
                  <h2 className="text-2xl font-bold text-luxury-cream mb-6">Heritage Timeline</h2>
                  <div className="space-y-4">
                    {venue.history.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-luxury-cream flex-shrink-0"
                          style={{ backgroundColor: brand?.accentColor || BRAND_COLORS.davidoff.primary }}
                        >
                          {milestone.year}
                        </div>
                        <div>
                          <p className="text-luxury-cream/80">{milestone.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Info Card */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-6 border border-luxury-slate/20">
                <h3 className="text-lg font-bold text-luxury-cream mb-4">Visit Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-cigar-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-luxury-cream/80 text-sm">{venue.address}</p>
                      <p className="text-luxury-cream/60 text-xs">{venue.neighborhood}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-cigar-gold flex-shrink-0" />
                    <span className="text-luxury-cream/80 text-sm">{venue.phone}</span>
                  </div>
                  
                  {venue.email && (
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-cigar-gold flex-shrink-0" />
                      <span className="text-luxury-cream/80 text-sm">{venue.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-6 border border-luxury-slate/20">
                <h3 className="text-lg font-bold text-luxury-cream mb-4">Hours</h3>
                
                <div className="space-y-2">
                  {Object.entries(venue.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-luxury-cream/70 text-sm capitalize">
                        {day.slice(0, 3)}
                      </span>
                      <span className={`text-sm font-medium ${
                        hours === 'Closed' ? 'text-red-400' : 'text-luxury-cream/80'
                      }`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="content-section">
              <div className="bg-luxury-slate/10 backdrop-blur-sm rounded-2xl p-6 border border-luxury-slate/20">
                <h3 className="text-lg font-bold text-luxury-cream mb-4">Reserve Your Visit</h3>
                <p className="text-luxury-cream/70 text-sm mb-4">
                  Experience the pinnacle of luxury tobacco culture
                </p>
                
                <div className="space-y-3">
                  <motion.button
                    className="w-full bg-cigar-gold text-luxury-charcoal py-3 rounded-lg font-semibold hover:bg-cigar-gold/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reserve Your Visit
                  </motion.button>
                  
                  <motion.button
                    className="w-full bg-transparent border border-luxury-slate/30 text-luxury-cream py-3 rounded-lg font-semibold hover:border-cigar-gold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule Consultation
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
