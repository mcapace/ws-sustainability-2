'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice, useHapticFeedback } from '@/hooks/useMobile';
import { MobileNavigationItem, QuickAction } from '@/types/mobile';
import { BottomSheet, QuickActionsSheet, NavigationSheet } from './BottomSheet';

interface MobileNavigationProps {
  items: MobileNavigationItem[];
  quickActions?: QuickAction[];
  className?: string;
}

export function MobileNavigation({ items, quickActions, className = '' }: MobileNavigationProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isQuickActionsOpen, setQuickActionsOpen] = useState(false);
  const { deviceInfo } = useDevice();
  const { triggerHaptic } = useHapticFeedback();

  // Don't render on desktop
  if (!deviceInfo?.isMobile) return null;

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
    triggerHaptic('light');
  };

  const handleQuickActionsToggle = () => {
    setQuickActionsOpen(!isQuickActionsOpen);
    triggerHaptic('light');
  };

  return (
    <>
      {/* Fixed Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed bottom-0 left-0 right-0 bg-luxury-charcoal/95 backdrop-blur-lg border-t border-luxury-slate/20 z-30 ${className}`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-around py-2">
          {/* Quick Actions Button */}
          {quickActions && quickActions.length > 0 && (
            <button
              onClick={handleQuickActionsToggle}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-luxury-slate/30 transition-colors"
            >
              <span className="text-2xl">⚡</span>
              <span className="text-xs text-luxury-cream/70">Quick</span>
            </button>
          )}

          {/* Main Menu Items */}
          {items.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action?.();
                triggerHaptic('selection');
              }}
              disabled={item.disabled}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-luxury-slate/30 transition-colors disabled:opacity-50"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-luxury-cream/70">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-cigar-gold text-black rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* Hamburger Menu */}
          <button
            onClick={handleMenuToggle}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-luxury-slate/30 transition-colors"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
            <span className="text-xs text-luxury-cream/70">Menu</span>
          </button>
        </div>
      </motion.nav>

      {/* Quick Actions Sheet */}
      {quickActions && (
        <QuickActionsSheet
          isOpen={isQuickActionsOpen}
          onClose={() => setQuickActionsOpen(false)}
          actions={quickActions.map(action => ({
            id: action.id,
            label: action.label,
            icon: action.icon,
            action: () => {
              action.action();
              action.haptic && triggerHaptic(action.haptic.type);
            },
            color: action.color,
          }))}
        />
      )}

      {/* Full Menu Sheet */}
      <NavigationSheet
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        items={items}
      />
    </>
  );
}

// Hamburger Icon with Morphing Animation
interface HamburgerIconProps {
  isOpen: boolean;
  size?: number;
}

function HamburgerIcon({ isOpen, size = 24 }: HamburgerIconProps) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.span
        className="absolute block h-0.5 w-full bg-luxury-cream"
        style={{ top: '20%' }}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: 8 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute block h-0.5 w-full bg-luxury-cream"
        style={{ top: '50%' }}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute block h-0.5 w-full bg-luxury-cream"
        style={{ top: '80%' }}
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: -45, y: -8 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Floating Action Button
interface FloatingActionButtonProps {
  onClick: () => void;
  icon: string;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export function FloatingActionButton({
  onClick,
  icon,
  label,
  position = 'bottom-right',
  size = 'medium',
  color = 'cigar-gold',
}: FloatingActionButtonProps) {
  const { triggerHaptic } = useHapticFeedback();

  const sizeClasses = {
    small: 'w-12 h-12 text-lg',
    medium: 'w-14 h-14 text-xl',
    large: 'w-16 h-16 text-2xl',
  };

  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <motion.button
      onClick={() => {
        onClick();
        triggerHaptic('medium');
      }}
      className={`fixed ${positionClasses[position]} ${sizeClasses[size]} bg-${color} text-black rounded-full shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center justify-center`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <span>{icon}</span>
      {label && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-luxury-cream whitespace-nowrap">
          {label}
        </span>
      )}
    </motion.button>
  );
}

// Mobile Header with Hamburger
interface MobileHeaderProps {
  title: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  rightActions?: React.ReactNode;
  className?: string;
}

export function MobileHeader({
  title,
  onMenuToggle,
  isMenuOpen,
  rightActions,
  className = '',
}: MobileHeaderProps) {
  const { deviceInfo } = useDevice();

  if (!deviceInfo?.isMobile) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 bg-luxury-charcoal/95 backdrop-blur-lg border-b border-luxury-slate/20 z-40 ${className}`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-luxury-slate/30 transition-colors"
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>

        <h1 className="text-lg font-semibold text-luxury-cream truncate flex-1 text-center mx-4">
          {title}
        </h1>

        <div className="flex items-center space-x-2">
          {rightActions || null}
        </div>
      </div>
    </motion.header>
  );
}

// Pull to Refresh Component
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  className?: string;
}

export function PullToRefresh({ onRefresh, children, className = '' }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY > 0) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0) {
      e.preventDefault();
      const distance = Math.min(deltaY * 0.6, 120);
      setPullDistance(distance);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 80) {
      setIsRefreshing(true);
      setPullDistance(0);
      await onRefresh();
      setIsRefreshing(false);
    } else {
      setPullDistance(0);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-luxury-charcoal/80 backdrop-blur-sm"
        style={{
          height: `${Math.max(pullDistance, 0)}px`,
          transform: `translateY(-${Math.max(pullDistance, 0)}px)`,
        }}
        animate={{
          opacity: pullDistance > 20 ? 1 : 0,
        }}
      >
        <div className="flex items-center space-x-2 text-cigar-gold">
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
          >
            🔄
          </motion.div>
          <span className="text-sm">
            {pullDistance > 80 ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ transform: `translateY(${Math.max(pullDistance, 0)}px)` }}>
        {children}
      </div>
    </div>
  );
}
