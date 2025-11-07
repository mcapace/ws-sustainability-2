'use client';

import { Container } from '@/components/ui/Container';
import { lounges } from '@/data/lounges';

export function Footer() {
  return (
    <footer className="bg-luxury-charcoal border-t border-cigar-gold/20">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold gradient-text text-display mb-4">
                Luxury Cigar Lounges
              </h3>
              <p className="text-luxury-cream/80 mb-6 max-w-md">
                Experience the epitome of luxury at our premium cigar lounges. 
                Two exclusive venues offering world-class cigars, fine spirits, 
                and sophisticated ambiance for the discerning connoisseur.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-cigar-gold hover:text-cigar-copper transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-cigar-gold hover:text-cigar-copper transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721v12.562h8.558V7.707z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-cigar-gold hover:text-cigar-copper transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-semibold text-cigar-gold mb-4">Locations</h4>
              <div className="space-y-3">
                {lounges.map((lounge) => (
                  <div key={lounge.id}>
                    <h5 className="font-medium text-luxury-cream">{lounge.name}</h5>
                    <p className="text-sm text-luxury-cream/70">{lounge.address}</p>
                    <p className="text-sm text-luxury-cream/70">{lounge.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-cigar-gold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#lounges" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Our Lounges
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#events" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-luxury-cream/80 hover:text-cigar-gold transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cigar-gold/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-luxury-cream/60 text-sm">
                © {new Date().getFullYear()} Luxury Cigar Lounges. All rights reserved.
              </p>
              <p className="text-luxury-cream/60 text-sm mt-2 md:mt-0">
                Crafted with passion for the discerning connoisseur.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
