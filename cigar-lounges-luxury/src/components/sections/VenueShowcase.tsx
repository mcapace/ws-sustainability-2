'use client';

import { motion } from 'framer-motion';
import { MapPin, Award } from 'lucide-react';
import { venueData } from '@/data/venues';

export function VenueShowcase() {
  const davidoffBrand = venueData.brands.find(b => b.id === 'davidoff');
  const barclayRexBrand = venueData.brands.find(b => b.id === 'barclay-rex');
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        
        {/* Section header with space */}
        <div className="text-center mb-20">
          <h2 className="section-title text-charcoal">
            Select Your Experience
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>
        
        {/* Venue Cards - More spacing, cleaner design */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Davidoff Card (spans both locations) */}
          <div className="bg-white border border-light-gray p-8 hover:shadow-xl transition-all">
            <div className="mb-6">
              <span className="text-2xl font-bold text-charcoal">Davidoff</span>
            </div>
            <h3 className="venue-name text-3xl mb-4">Davidoff of Geneva</h3>
            <p className="text-medium-gray mb-6 leading-relaxed">
              Experience Swiss precision at two distinguished Manhattan locations
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">Madison Avenue</p>
                  <p className="text-sm text-medium-gray">Flagship Experience</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">6th Avenue</p>
                  <p className="text-sm text-medium-gray">Downtown Sophistication</p>
                </div>
              </div>
            </div>
            <button 
              className="w-full py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition luxury-button"
              onClick={() => document.getElementById('davidoff-madison')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Davidoff
            </button>
          </div>
          
          {/* Barclay Rex Card */}
          <div className="bg-white border border-light-gray p-8 hover:shadow-xl transition-all">
            <div className="mb-6">
              <span className="text-2xl font-bold text-charcoal">Barclay Rex</span>
            </div>
            <h3 className="venue-name text-3xl mb-4">Barclay Rex</h3>
            <p className="text-medium-gray mb-6 leading-relaxed">
              New York's original tobacconist, serving Wall Street since 1910
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">113 Years of Excellence</p>
                  <p className="text-sm text-medium-gray">Family-owned tradition</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">Financial District</p>
                  <p className="text-sm text-medium-gray">Historic Wall Street location</p>
                </div>
              </div>
            </div>
            <button 
              className="w-full py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition luxury-button"
              onClick={() => document.getElementById('barclay-rex')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Barclay Rex
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}