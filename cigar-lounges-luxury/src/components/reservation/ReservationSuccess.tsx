'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ReservationConfirmation } from '@/types/reservation';

interface ReservationSuccessProps {
  confirmation: ReservationConfirmation;
  isVisible: boolean;
  onClose: () => void;
  onAddToCalendar: () => void;
  onShare: () => void;
}

export function ReservationSuccess({ 
  confirmation, 
  isVisible, 
  onClose, 
  onAddToCalendar, 
  onShare 
}: ReservationSuccessProps) {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Trigger confetti animation
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch confetti from different positions
        confetti({
          particleCount: Math.floor(particleCount),
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          },
          colors: ['#d4af37', '#ffd700', '#ffbf00', '#ff8c00', '#ff4500']
        });

        confetti({
          particleCount: Math.floor(particleCount),
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#d4af37', '#ffd700', '#ffbf00', '#ff8c00', '#ff4500']
        });
      }, 250);

      // Cleanup
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-lg flex items-center justify-center p-4"
        >
          {/* Confetti Canvas */}
          <canvas
            ref={confettiRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Success Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-luxury-charcoal/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-luxury-slate/20 shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-luxury-black/50 hover:bg-luxury-black/70 rounded-full text-luxury-cream transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
              <h2 className="text-3xl font-bold text-luxury-cream mb-2">
                Reservation Confirmed!
              </h2>
              <p className="text-luxury-cream/70">
                Your table has been successfully reserved
              </p>
            </motion.div>

            {/* Confirmation Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-luxury-black/50 rounded-xl p-6 mb-6 border border-luxury-slate/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-luxury-cream/70 text-sm mb-1">Confirmation Number</div>
                  <div className="text-cigar-gold font-bold text-lg">{confirmation.confirmationNumber}</div>
                </div>
                <div>
                  <div className="text-luxury-cream/70 text-sm mb-1">Date & Time</div>
                  <div className="text-luxury-cream font-medium">
                    {formatDate(confirmation.date)} at {formatTime(confirmation.time)}
                  </div>
                </div>
                <div>
                  <div className="text-luxury-cream/70 text-sm mb-1">Party Size</div>
                  <div className="text-luxury-cream font-medium">{confirmation.partySize} guests</div>
                </div>
                <div>
                  <div className="text-luxury-cream/70 text-sm mb-1">Location</div>
                  <div className="text-luxury-cream font-medium">{confirmation.lounge}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-luxury-cream/70 text-sm mb-1">Estimated Total</div>
                  <div className="text-cigar-gold font-bold text-xl">
                    ${confirmation.estimatedTotal} {confirmation.currency}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddToCalendar}
                className="flex-1 bg-cigar-gold text-luxury-black px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Add to Calendar</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShare}
                className="flex-1 bg-luxury-slate/50 text-luxury-cream px-6 py-3 rounded-lg font-bold hover:bg-luxury-slate/70 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share Reservation</span>
              </motion.button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center text-luxury-cream/70 text-sm"
            >
              <p className="mb-2">
                📧 A confirmation email has been sent to your email address
              </p>
              <p>
                💡 Please arrive 15 minutes early for the best experience
              </p>
            </motion.div>

            {/* Celebration Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cigar-gold rounded-full"
                  initial={{
                    x: Math.random() * 400,
                    y: Math.random() * 400,
                    opacity: 0
                  }}
                  animate={{
                    y: [null, Math.random() * -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
