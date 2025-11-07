'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationForm } from '@/components/reservation/ReservationForm';
import { Container } from '@/components/ui/Container';

export function PremiumReservation() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <section id="reservations" className="section-padding bg-luxury-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cigar-gold/10 via-transparent to-cigar-gold/10" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-display mb-6">
            <span className="gradient-text">Premium</span>
            <br />
            <span className="text-luxury-cream">Reservations</span>
          </h2>
          <p className="text-xl text-luxury-cream/80 max-w-3xl mx-auto text-accent mb-8">
            Secure your table at our exclusive luxury cigar lounges. 
            Experience personalized service and exceptional hospitality.
          </p>

          {/* CTA Button */}
          {!isFormVisible && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormVisible(true)}
              className="px-8 py-4 bg-gradient-to-r from-cigar-gold to-amber-400 text-luxury-black rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-cigar-gold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Make a Reservation
            </motion.button>
          )}
        </motion.div>

        {/* Reservation Form */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="bg-luxury-charcoal/20 backdrop-blur-xl rounded-3xl p-8 border border-luxury-slate/20 shadow-2xl"
            >
              <ReservationForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Grid */}
        {!isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl border border-luxury-slate/20"
            >
              <div className="w-16 h-16 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-luxury-cream mb-3">Easy Booking</h3>
              <p className="text-luxury-cream/70">
                Simple 5-step reservation process with real-time availability and instant confirmation.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl border border-luxury-slate/20"
            >
              <div className="w-16 h-16 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-luxury-cream mb-3">Personalized Service</h3>
              <p className="text-luxury-cream/70">
                Customize your experience with seating preferences, special requests, and occasion details.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl border border-luxury-slate/20"
            >
              <div className="w-16 h-16 bg-cigar-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-luxury-cream mb-3">Guaranteed Seating</h3>
              <p className="text-luxury-cream/70">
                Your table is reserved exclusively for you with premium amenities and service.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Information */}
        {!isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-8 border border-luxury-slate/20">
              <h3 className="text-2xl font-bold text-luxury-cream mb-6">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-cigar-gold text-lg font-semibold mb-2">Manhattan Location</div>
                  <div className="text-luxury-cream/80">123 Park Avenue, New York, NY 10001</div>
                  <div className="text-cigar-gold font-medium">(212) 555-LUXE</div>
                </div>
                <div className="text-center">
                  <div className="text-cigar-gold text-lg font-semibold mb-2">Hamptons Location</div>
                  <div className="text-luxury-cream/80">456 Ocean Drive, East Hampton, NY 11937</div>
                  <div className="text-cigar-gold font-medium">(631) 555-OCEAN</div>
                </div>
              </div>
              <div className="mt-6 text-luxury-cream/70">
                <p>📧 reservations@luxurycigarlounge.com</p>
                <p>🕒 Open Daily: 11 AM - 1 AM (Manhattan) | 10 AM - 11 PM (Hamptons)</p>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
