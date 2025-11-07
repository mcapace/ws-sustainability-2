'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBottomSheet } from '@/hooks/useMobile';
import { BottomSheetConfig } from '@/types/mobile';

interface BottomSheetProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  config?: Partial<BottomSheetConfig>;
  className?: string;
  showHandle?: boolean;
  backdrop?: boolean;
}

export function BottomSheet({
  children,
  isOpen,
  onClose,
  config,
  className = '',
  showHandle = true,
  backdrop = true,
}: BottomSheetProps) {
  const {
    sheetRef,
    currentSnapIndex,
    translateY,
    isDragging,
    snapPoints,
    snapToIndex,
    close,
  } = useBottomSheet(
    config?.initialSnapIndex,
    config?.snapPoints || [0.25, 0.5, 0.9]
  );

  const {
    enablePanDownToClose = true,
    enableOverDrag = true,
    backdropOpacity = 0.5,
    backdropBlur = 8,
  } = config || {};

  // Close when isOpen becomes false
  useEffect(() => {
    if (!isOpen) {
      close();
    }
  }, [isOpen, close]);

  // Handle backdrop click
  const handleBackdropClick = () => {
    if (enablePanDownToClose) {
      onClose();
    }
  };

  const snapPointHeight = snapPoints[currentSnapIndex] * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: backdropOpacity }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 bg-black z-40"
              style={{
                backdropFilter: `blur(${backdropBlur}px)`,
              }}
            />
          )}

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: `${100 - snapPointHeight}%` }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={enableOverDrag ? 0.2 : 0}
            onDragEnd={(_, info) => {
              if (enablePanDownToClose && info.offset.y > 100) {
                onClose();
              }
            }}
            className={`fixed bottom-0 left-0 right-0 bg-luxury-charcoal rounded-t-3xl shadow-2xl z-50 ${className}`}
            style={{
              height: `${snapPointHeight}%`,
              transform: `translateY(${translateY}px)`,
              touchAction: 'none',
            }}
          >
            {/* Handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-luxury-slate rounded-full" />
              </div>
            )}

            {/* Snap Indicators */}
            <div className="flex justify-center space-x-2 mb-4">
              {snapPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => snapToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSnapIndex ? 'bg-cigar-gold' : 'bg-luxury-slate'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Specialized Bottom Sheet Components
interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  actions: Array<{
    id: string;
    label: string;
    icon: string;
    action: () => void;
    color?: string;
  }>;
}

export function QuickActionsSheet({ isOpen, onClose, actions }: QuickActionsSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      config={{ snapPoints: [0.4], initialSnapIndex: 0 }}
      showHandle={true}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-luxury-cream">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                action.action();
                onClose();
              }}
              className={`p-4 rounded-xl bg-luxury-slate/50 hover:bg-luxury-slate/70 transition-colors ${
                action.color ? `border-l-4 border-${action.color}` : ''
              }`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm text-luxury-cream">{action.label}</div>
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function FilterSheet({ isOpen, onClose, children, title = 'Filters' }: FilterSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      config={{ snapPoints: [0.6, 0.9], initialSnapIndex: 0 }}
      showHandle={true}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-luxury-cream">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-luxury-slate/50 hover:bg-luxury-slate/70 transition-colors"
          >
            <span className="text-luxury-cream">✕</span>
          </button>
        </div>
        {children}
      </div>
    </BottomSheet>
  );
}

interface NavigationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    label: string;
    icon: string;
    href?: string;
    action?: () => void;
    badge?: number;
  }>;
}

export function NavigationSheet({ isOpen, onClose, items }: NavigationSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      config={{ snapPoints: [0.5, 0.8], initialSnapIndex: 0 }}
      showHandle={true}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-luxury-cream">Navigation</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.action?.();
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-luxury-slate/50 hover:bg-luxury-slate/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-luxury-cream">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-xs bg-cigar-gold text-black rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
