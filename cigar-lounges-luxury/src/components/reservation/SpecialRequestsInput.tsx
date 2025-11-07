'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecialRequestsInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  label?: string;
}

export function SpecialRequestsInput({
  value,
  onChange,
  placeholder = "Any special requests or notes?",
  maxLength = 500,
  label = "Special Requests"
}: SpecialRequestsInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isFloating = isFocused || value.length > 0;
  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  useEffect(() => {
    if (isOverLimit) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOverLimit]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const getCharacterCountColor = () => {
    if (isOverLimit) return 'text-red-400';
    if (isNearLimit) return 'text-amber-400';
    return 'text-luxury-cream/50';
  };

  return (
    <div className="special-requests-input relative">
      <div className="relative">
        {/* Textarea */}
        <motion.textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          className={`
            w-full px-4 pt-6 pb-12 bg-luxury-black/30 border rounded-lg text-luxury-cream placeholder-transparent
            focus:outline-none focus:ring-2 transition-all duration-300 resize-none
            ${isOverLimit
              ? 'border-red-500 focus:ring-red-500/20'
              : isFocused
              ? 'border-cigar-gold focus:ring-cigar-gold/20'
              : 'border-luxury-slate/30 focus:border-cigar-gold/50'
            }
          `}
          animate={{
            x: isOverLimit && isAnimating ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Label */}
        <motion.label
          className={`
            absolute left-4 transition-all duration-300 pointer-events-none
            ${isFloating
              ? 'top-2 text-xs text-cigar-gold'
              : 'top-4 text-base text-luxury-cream/70'
            }
            ${isOverLimit ? 'text-red-500' : ''}
          `}
          animate={{
            y: isFloating ? 0 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>

        {/* Character Counter */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          {/* Progress Bar */}
          <div className="w-16 h-1 bg-luxury-slate/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-amber-400' : 'bg-cigar-gold'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(characterCount / maxLength) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Character Count */}
          <span className={`text-xs font-medium ${getCharacterCountColor()}`}>
            {characterCount}/{maxLength}
          </span>
        </div>

        {/* Focus Ring */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-cigar-gold/50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Success Animation */}
        {characterCount > 0 && !isOverLimit && !isFocused && (
          <motion.div
            className="absolute top-3 right-3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>

      {/* Character Limit Warning */}
      <AnimatePresence>
        {isOverLimit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-red-400 text-sm flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Character limit exceeded</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Near Limit Warning */}
      <AnimatePresence>
        {isNearLimit && !isOverLimit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-amber-400 text-sm flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Approaching character limit</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helpful Suggestions */}
      {characterCount === 0 && !isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-luxury-cream/50 text-xs"
        >
          💡 Consider mentioning dietary restrictions, accessibility needs, or special occasions
        </motion.div>
      )}
    </div>
  );
}
