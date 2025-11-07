'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerContainer({ 
  children, 
  className,
  staggerDelay = 0.1,
  duration = 0.6
}: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              transition={{ duration, ease: 'easeOut' }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div 
            variants={itemVariants}
            transition={{ duration, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
      }
    </motion.div>
  );
}
