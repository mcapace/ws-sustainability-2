'use client';

import { motion } from 'framer-motion';
import { ReservationStep } from '@/types/reservation';

interface ProgressIndicatorProps {
  steps: ReservationStep[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-indicator relative mb-12">
      {/* Progress Bar Background */}
      <div className="relative h-2 bg-luxury-slate/30 rounded-full overflow-hidden">
        {/* Liquid Fill Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cigar-gold via-amber-400 to-cigar-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Liquid Wave Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </motion.div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center space-y-2 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Step Circle */}
            <motion.div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                step.isCompleted
                  ? 'bg-cigar-gold text-luxury-black shadow-lg'
                  : step.isActive
                  ? 'bg-luxury-charcoal border-2 border-cigar-gold text-cigar-gold'
                  : 'bg-luxury-slate/50 text-luxury-cream/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Completed Checkmark */}
              {step.isCompleted && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  ✓
                </motion.div>
              )}

              {/* Active Pulse */}
              {step.isActive && !step.isCompleted && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cigar-gold"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}

              {/* Step Icon */}
              {!step.isCompleted && (
                <span className="text-sm">{step.icon}</span>
              )}
            </motion.div>

            {/* Step Label */}
            <div className="text-center">
              <div className={`text-sm font-medium ${
                step.isActive || step.isCompleted
                  ? 'text-luxury-cream'
                  : 'text-luxury-cream/50'
              }`}>
                {step.title}
              </div>
              <div className={`text-xs ${
                step.isActive || step.isCompleted
                  ? 'text-luxury-cream/70'
                  : 'text-luxury-cream/40'
              }`}>
                {step.description}
              </div>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-full w-full h-0.5 bg-luxury-slate/30 -translate-x-1/2" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="absolute top-8 right-0 text-sm text-cigar-gold font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
}
