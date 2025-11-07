'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-cream py-16 border-t border-light-gray">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Cigar Aficionado */}
          <div>
            <h5 className="font-medium text-charcoal mb-4">Cigar Aficionado</h5>
            <p className="text-sm text-medium-gray">
              Curating exceptional cigar experiences since 1992
            </p>
          </div>
          
          {/* Davidoff */}
          <div>
            <h5 className="font-medium text-charcoal mb-4">Davidoff</h5>
            <ul className="space-y-2 text-sm text-medium-gray">
              <li><a href="#" className="hover:text-gold transition">Madison Avenue</a></li>
              <li><a href="#" className="hover:text-gold transition">6th Avenue</a></li>
            </ul>
          </div>
          
          {/* Barclay Rex */}
          <div>
            <h5 className="font-medium text-charcoal mb-4">Barclay Rex</h5>
            <ul className="space-y-2 text-sm text-medium-gray">
              <li><a href="#" className="hover:text-gold transition">Wall Street</a></li>
              <li><a href="#" className="hover:text-gold transition">Heritage</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h5 className="font-medium text-charcoal mb-4">Reserve</h5>
            <button className="btn-luxury-premium text-sm">
              Book Experience
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-light-gray text-center text-sm text-medium-gray">
          © 2024 Cigar Aficionado. All rights reserved.
        </div>
      </div>
    </footer>
  );
}