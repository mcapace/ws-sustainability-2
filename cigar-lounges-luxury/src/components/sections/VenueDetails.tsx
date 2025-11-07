'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { venueData } from '@/data/venues';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

export function VenueDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const davidoffMadison = venueData.brands[0].locations[0];
  const davidoffSixth = venueData.brands[0].locations[1];
  const barclayRex = venueData.brands[1].locations[0];

  return (
    <>
      {/* DAVIDOFF MADISON AVENUE */}
      <section id="davidoff-madison" className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[600px] gallery-container image-container">
                <Image
                  src={davidoffMadison.images.hero}
                  alt="Davidoff Madison Avenue"
                  fill
                  className="object-cover gallery-image"
                  priority
                />
              </div>
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-3 gap-2">
                {davidoffMadison.images.gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 ${
                      selectedImage === idx ? 'ring-2 ring-gold' : ''
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Davidoff Madison ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-thin text-charcoal mb-2">
                  Davidoff Madison Avenue
                </h2>
                <p className="text-xl text-gold italic font-serif mb-6">
                  The Flagship Experience
                </p>
              </div>
              
              <div className="prose prose-lg text-gray-700">
                <p>
                  Step into North America's premier Davidoff destination on Madison Avenue, 
                  where Swiss craftsmanship meets Manhattan luxury. This flagship location 
                  represents the pinnacle of the Davidoff experience, offering the most 
                  extensive collection of Davidoff cigars in the United States.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-gray-500">
                  Signature Features
                </h3>
                <ul className="space-y-2">
                  {davidoffMadison.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {davidoffMadison.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {davidoffMadison.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon-Wed: 10AM-7PM | Thu-Sat: 10AM-8PM | Sun: 12PM-6PM
                  </p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-8 py-4 bg-charcoal text-white hover:bg-gold transition-all luxury-button">
                Reserve Your Visit to Madison
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="py-16 flex justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      </div>

      {/* DAVIDOFF 6TH AVENUE */}
      <section id="davidoff-sixth" className="py-20 bg-cream">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-thin text-charcoal mb-2">
                  Davidoff 6th Avenue
                </h2>
                <p className="text-xl text-gold italic font-serif mb-6">
                  Downtown Sophistication
                </p>
              </div>
              
              <div className="prose prose-lg text-gray-700">
                <p>
                  Davidoff 6th Avenue brings Swiss precision to the heart of Manhattan's 
                  creative district. This contemporary sanctuary serves the city's innovators 
                  and tastemakers, offering a more social, energetic take on the Davidoff 
                  experience without compromising the excellence that defines our heritage.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-gray-500">
                  Signature Features
                </h3>
                <ul className="space-y-2">
                  {davidoffSixth.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {davidoffSixth.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {davidoffSixth.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon-Wed: 10AM-9PM | Thu-Sat: 10AM-11PM | Sun: 12PM-8PM
                  </p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-8 py-4 bg-charcoal text-white hover:bg-gold transition-all luxury-button">
                Reserve Your Visit to 6th Avenue
              </button>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[600px] gallery-container image-container">
                <Image
                  src={davidoffSixth.images.hero}
                  alt="Davidoff 6th Avenue"
                  fill
                  className="object-cover gallery-image"
                  priority
                />
              </div>
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-3 gap-2">
                {davidoffSixth.images.gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 ${
                      selectedImage === idx ? 'ring-2 ring-gold' : ''
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Davidoff 6th Avenue ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="py-16 flex justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      </div>

      {/* BARCLAY REX */}
      <section id="barclay-rex" className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[600px] gallery-container image-container">
                <Image
                  src={barclayRex.images.hero}
                  alt="Barclay Rex"
                  fill
                  className="object-cover gallery-image"
                  priority
                />
              </div>
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-3 gap-2">
                {barclayRex.images.gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 ${
                      selectedImage === idx ? 'ring-2 ring-gold' : ''
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`Barclay Rex ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-thin text-charcoal mb-2">
                  Barclay Rex
                </h2>
                <p className="text-xl text-gold italic font-serif mb-6">
                  A New York Institution
                </p>
              </div>
              
              <div className="prose prose-lg text-gray-700">
                <p>
                  Founded by Vincent Nastri in 1910, Barclay Rex isn't just a tobacconist—it's 
                  a living museum of American cigar history. The same family that opened our 
                  doors over a century ago still greets customers today, maintaining traditions 
                  while embracing innovation.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm uppercase tracking-wider text-gray-500">
                  Signature Features
                </h3>
                <ul className="space-y-2">
                  {barclayRex.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gold rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* History */}
              {barclayRex.history && (
                <div className="bg-cream p-4 rounded-lg">
                  <h4 className="text-gold font-medium mb-2">Heritage</h4>
                  <p className="text-gray-600 text-sm">
                    Founded in {barclayRex.history.founded} by {barclayRex.history.founder}
                  </p>
                </div>
              )}
              
              {/* Info */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {barclayRex.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {barclayRex.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Mon-Fri: 8AM-7PM | Sat: 10AM-6PM | Sun: Closed
                  </p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-8 py-4 bg-charcoal text-white hover:bg-gold transition-all luxury-button">
                Reserve Your Visit to Barclay Rex
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
