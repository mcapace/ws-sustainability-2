'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Premium Magnetic Button Effect
export function MagneticButton({ 
  children, 
  className = '',
  strength = 0.3,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  strength?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (event.clientX - centerX) * strength;
    const distanceY = (event.clientY - centerY) * strength;
    
    x.set(distanceX);
    y.set(distanceY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.button
      ref={ref}
      className={className}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Premium Glow Effect
export function GlowEffect({ 
  children, 
  color = '#D4AF37',
  intensity = 0.5,
  ...props 
}: { 
  children: React.ReactNode; 
  color?: string;
  intensity?: number;
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isHovered ? `drop-shadow(0 0 ${20 * intensity}px ${color})` : 'none',
        transition: 'filter 0.3s ease',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Premium Floating Animation
export function FloatingElement({ 
  children, 
  intensity = 10,
  duration = 3,
  ...props 
}: { 
  children: React.ReactNode; 
  intensity?: number;
  duration?: number;
  [key: string]: any;
}) {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Premium Text Reveal Animation
export function TextReveal({ 
  children, 
  delay = 0,
  duration = 0.8,
  ...props 
}: { 
  children: React.ReactNode; 
  delay?: number;
  duration?: number;
  [key: string]: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for luxury feel
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Premium Letter-by-Letter Animation
export function LetterReveal({ 
  text, 
  delay = 0,
  stagger = 0.03,
  className = '',
  ...props 
}: { 
  text: string; 
  delay?: number;
  stagger?: number;
  className?: string;
  [key: string]: any;
}) {
  const letters = text.split('');
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{
            duration: 0.6,
            delay: index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={className}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Premium Parallax Scroll Effect
export function ParallaxElement({ 
  children, 
  speed = 0.5,
  ...props 
}: { 
  children: React.ReactNode; 
  speed?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      const yPos = -(scrollY - elementTop + window.innerHeight) * speed;
      y.set(yPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, y]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Premium Counter Animation
export function AnimatedCounter({ 
  value, 
  duration = 2,
  suffix = '',
  prefix = '',
  ...props 
}: { 
  value: number; 
  duration?: number;
  suffix?: string;
  prefix?: string;
  [key: string]: any;
}) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  );
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  
  return (
    <motion.span {...props}>
      {prefix}{display}{suffix}
    </motion.span>
  );
}

// Premium Loading Spinner
export function LuxurySpinner({ 
  size = 40,
  color = '#D4AF37',
  ...props 
}: { 
  size?: number;
  color?: string;
  [key: string]: any;
}) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 border-2 border-transparent border-t-current rounded-full"
        style={{ borderTopColor: color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <motion.div
        className="absolute inset-1 border border-transparent border-r-current rounded-full"
        style={{ borderRightColor: color, opacity: 0.3 }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
}

// Premium Hover Reveal Effect
export function HoverReveal({ 
  children, 
  revealContent,
  direction = 'up',
  ...props 
}: { 
  children: React.ReactNode; 
  revealContent: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  };
  
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        animate={isHovered ? 'hidden' : 'visible'}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={isHovered ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {revealContent}
      </motion.div>
    </div>
  );
}

// Premium Shimmer Effect
export function ShimmerEffect({ 
  children, 
  duration = 2,
  ...props 
}: { 
  children: React.ReactNode; 
  duration?: number;
  [key: string]: any;
}) {
  return (
    <motion.div
      className="relative overflow-hidden"
      {...props}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
}
