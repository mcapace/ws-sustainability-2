'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingLabelInputProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  icon?: string;
  maxLength?: number;
}

export function FloatingLabelInput({
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  icon,
  maxLength
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFloating = isFocused || value.length > 0;

  useEffect(() => {
    if (error) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="floating-label-input relative">
      <div className="relative">
        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full px-4 pt-6 pb-2 bg-luxury-black/30 border rounded-lg text-luxury-cream placeholder-transparent
            focus:outline-none focus:ring-2 transition-all duration-300
            ${error
              ? 'border-red-500 focus:ring-red-500/20'
              : isFocused
              ? 'border-cigar-gold focus:ring-cigar-gold/20'
              : 'border-luxury-slate/30 focus:border-cigar-gold/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          animate={{
            x: error && isAnimating ? [0, -10, 10, -10, 10, 0] : 0,
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
            ${error ? 'text-red-500' : ''}
          `}
          animate={{
            y: isFloating ? 0 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Icon */}
        {icon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-luxury-cream/50">
            {icon}
          </div>
        )}

        {/* Character Counter */}
        {maxLength && (
          <div className="absolute bottom-1 right-2 text-xs text-luxury-cream/50">
            {value.length}/{maxLength}
          </div>
        )}

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
        {value.length > 0 && !error && !isFocused && (
          <motion.div
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
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

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-red-400 text-sm flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      {value.length > 0 && !error && !isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-green-400 text-sm flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Looks good!</span>
        </motion.div>
      )}
    </div>
  );
}
