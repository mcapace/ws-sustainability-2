'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TimeSlot } from '@/types/reservation';

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

export function TimeSlotSelector({ timeSlots, selectedTime, onTimeSelect }: TimeSlotSelectorProps) {
  const availableSlots = timeSlots.filter(slot => slot.available);
  const unavailableSlots = timeSlots.filter(slot => !slot.available);

  return (
    <div className="time-slot-selector bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-luxury-cream mb-2">Select Time</h3>
        <p className="text-luxury-cream/70">Choose your preferred time slot</p>
      </div>

      {/* Available Time Slots */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        <AnimatePresence mode="popLayout">
          {availableSlots.map((slot, index) => (
            <motion.button
              key={slot.time}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeSelect(slot.time)}
              className={`relative p-4 rounded-lg text-center transition-all duration-300 ${
                selectedTime === slot.time
                  ? 'bg-cigar-gold text-luxury-black shadow-lg'
                  : 'bg-luxury-black/50 text-luxury-cream hover:bg-luxury-black/70 border border-luxury-slate/30'
              }`}
            >
              <div className="font-bold text-lg">{slot.time}</div>
              <div className="text-xs mt-1">
                ${slot.price} {slot.currency}
              </div>

              {/* Selected Animation */}
              {selectedTime === slot.time && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-cigar-gold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-cigar-gold/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Unavailable Time Slots */}
      {unavailableSlots.length > 0 && (
        <div className="mb-6">
          <h4 className="text-luxury-cream/70 text-sm font-medium mb-3">Fully Booked</h4>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {unavailableSlots.map((slot, index) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (availableSlots.length + index) * 0.05 }}
                className="relative p-4 rounded-lg text-center bg-luxury-black/30 text-luxury-cream/40 border border-luxury-slate/20 cursor-not-allowed"
              >
                <div className="font-bold text-lg">{slot.time}</div>
                <div className="text-xs mt-1">
                  ${slot.price} {slot.currency}
                </div>
                
                {/* Unavailable Overlay */}
                <div className="absolute inset-0 rounded-lg bg-luxury-black/50 flex items-center justify-center">
                  <span className="text-xs text-red-400 font-medium">Full</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Time Slot Info */}
      <div className="bg-luxury-black/30 rounded-lg p-4 border border-luxury-slate/20">
        <div className="flex items-center justify-between text-sm">
          <div className="text-luxury-cream/70">
            💡 Prices vary by time slot
          </div>
          <div className="text-luxury-cream/70">
            ⏱️ 2-hour minimum
          </div>
        </div>
      </div>
    </div>
  );
}
