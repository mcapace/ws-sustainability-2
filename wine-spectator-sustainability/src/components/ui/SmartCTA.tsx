'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, Phone } from 'lucide-react';
import { VenueLocation } from '@/types';

interface SmartCTAProps {
  venue: VenueLocation;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SmartCTA({ venue, variant = 'primary', size = 'md', className = '' }: SmartCTAProps) {
  const [ctaText, setCtaText] = useState('Reserve Your Visit');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [nextOpenTime, setNextOpenTime] = useState('');

  useEffect(() => {
    const updateCTA = () => {
      const now = new Date();
      const day = now.toLocaleLowerCase().slice(0, 3); // mon, tue, etc.
      const currentTime = now.getHours() * 100 + now.getMinutes();
      
      const hours = venue.hours[day as keyof typeof venue.hours];
      
      if (hours === 'Closed') {
        setIsOpenNow(false);
        // Find next open day
        const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const currentDayIndex = days.indexOf(day);
        
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (currentDayIndex + i) % 7;
          const nextDay = days[nextDayIndex];
          const nextDayHours = venue.hours[nextDay as keyof typeof venue.hours];
          
          if (nextDayHours && nextDayHours !== 'Closed') {
            setNextOpenTime(nextDayHours.split(' - ')[0]);
            break;
          }
        }
        
        setCtaText('Opens Soon');
        return;
      }
      
      const [openTime, closeTime] = hours.split(' - ');
      const open = parseTime(openTime);
      const close = parseTime(closeTime);
      
      if (currentTime >= open && currentTime <= close) {
        setIsOpenNow(true);
        setCtaText('Open Now - Reserve');
      } else if (currentTime < open) {
        setIsOpenNow(false);
        setCtaText(`Opens at ${openTime}`);
      } else {
        setIsOpenNow(false);
        setCtaText('Visit Tomorrow');
      }
    };
    
    updateCTA();
    const interval = setInterval(updateCTA, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [venue.hours]);

  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');
    let hour24 = parseInt(hours);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    return hour24 * 100 + parseInt(minutes);
  };

  const getCTAConfig = () => {
    const baseClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const variantClasses = {
      primary: isOpenNow 
        ? 'bg-green-500 hover:bg-green-600 text-white' 
        : 'bg-cigar-gold hover:bg-cigar-gold/90 text-luxury-charcoal',
      secondary: 'bg-transparent border border-cigar-gold text-cigar-gold hover:bg-cigar-gold hover:text-luxury-charcoal',
      outline: 'bg-transparent border border-luxury-slate/30 text-luxury-cream hover:border-cigar-gold'
    };

    return {
      className: `${baseClasses[size]} ${variantClasses[variant]} ${className} rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2`,
      icon: isOpenNow ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />
    };
  };

  const config = getCTAConfig();

  return (
    <motion.button
      className={config.className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {config.icon}
      <span>{ctaText}</span>
    </motion.button>
  );
}

// Context-specific CTA variants
export function VenueSpecificCTA({ venue, context }: { venue: VenueLocation; context: 'hero' | 'showcase' | 'comparison' }) {
  const ctaConfigs = {
    hero: {
      primary: 'Reserve Your Experience',
      secondary: 'Explore Collections'
    },
    showcase: {
      primary: 'Visit This Location',
      secondary: 'View Gallery'
    },
    comparison: {
      primary: 'Select This Experience',
      secondary: 'Learn More'
    }
  };

  const config = ctaConfigs[context];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <SmartCTA venue={venue} variant="primary" size="lg" />
      <motion.button
        className="px-6 py-3 bg-transparent border border-luxury-slate/30 text-luxury-cream rounded-lg font-semibold hover:border-cigar-gold transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {config.secondary}
      </motion.button>
    </div>
  );
}
