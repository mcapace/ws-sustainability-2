'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { MobileProvider, useMobileContext } from '@/components/providers/MobileProvider';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { BottomSheet, QuickActionsSheet, FilterSheet } from '@/components/mobile/BottomSheet';
import { FloatingActionButton } from '@/components/mobile/MobileNavigation';
import { 
  MobileCard, 
  ThumbZoneCTA, 
  CollapsibleSection, 
  AdaptiveImage, 
  MobileGallery,
  MobileParticles,
  ResponsiveText,
  MobileSpacing
} from '@/components/mobile/MobileOptimized';
import { 
  useTouchGestures,
  useSwipeGesture,
  usePinchGesture,
  useLongPressGesture,
  usePullToRefresh
} from '@/hooks/useTouchGestures';
import { MobileNavigationItem, QuickAction } from '@/types/mobile';

function MobileShowcaseContent() {
  const { deviceInfo, isMobile, performanceConfig, adaptiveQuality } = useMobileContext();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isQuickActionsOpen, setQuickActionsOpen] = useState(false);
  const [isCollapsibleOpen, setCollapsibleOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  // Navigation items
  const navigationItems: MobileNavigationItem[] = [
    { id: 'home', label: 'Home', icon: '🏠', action: () => console.log('Home') },
    { id: 'lounges', label: 'Lounges', icon: '🏛️', action: () => console.log('Lounges') },
    { id: 'gallery', label: 'Gallery', icon: '📸', action: () => console.log('Gallery') },
    { id: 'collection', label: 'Collection', icon: '🚬', action: () => console.log('Collection') },
    { id: 'reservations', label: 'Reserve', icon: '📅', action: () => console.log('Reservations') },
    { id: 'contact', label: 'Contact', icon: '📞', action: () => console.log('Contact') },
  ];

  // Quick actions
  const quickActions: QuickAction[] = [
    { id: 'call', label: 'Call Now', icon: '📞', action: () => console.log('Call'), color: 'green' },
    { id: 'directions', label: 'Directions', icon: '🧭', action: () => console.log('Directions'), color: 'blue' },
    { id: 'share', label: 'Share', icon: '📤', action: () => console.log('Share'), color: 'purple' },
    { id: 'favorite', label: 'Favorite', icon: '❤️', action: () => console.log('Favorite'), color: 'red' },
  ];

  // Sample images for gallery
  const galleryImages = [
    { id: '1', src: '/images/gallery/lounge-1.jpg', alt: 'Lounge Interior' },
    { id: '2', src: '/images/gallery/cigar-selection.jpg', alt: 'Cigar Selection' },
    { id: '3', src: '/images/gallery/whiskey-pairing.jpg', alt: 'Whiskey Pairing' },
    { id: '4', src: '/images/gallery/humidor.jpg', alt: 'Humidor' },
  ];

  // Touch gesture handlers
  const handleSwipe = (direction: 'left' | 'right') => {
    console.log('Swipe detected:', direction);
  };

  const handleSwipeGesture = (data: { startX: number; startY: number; endX: number; endY: number; deltaX: number; deltaY: number; velocity: number; direction: 'up' | 'down' | 'left' | 'right'; distance: number }) => {
    console.log('Swipe gesture detected:', data.direction, 'with velocity:', data.velocity);
  };

  const handlePinch = (data: { startDistance: number; currentDistance: number; scale: number; centerX: number; centerY: number; deltaScale: number }) => {
    console.log('Pinch scale:', data.scale, 'center:', { x: data.centerX, y: data.centerY });
  };

  const handleLongPress = (data: { x: number; y: number; duration: number; target: EventTarget | null }) => {
    console.log('Long press detected:', data.duration, 'at position:', { x: data.x, y: data.y });
    setLongPressTriggered(true);
    setTimeout(() => setLongPressTriggered(false), 2000);
  };

  const handlePullToRefresh = async () => {
    console.log('Pull to refresh triggered');
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Touch gesture hooks
  const swipeGesture = useSwipeGesture(handleSwipeGesture);
  const pinchGesture = usePinchGesture(handlePinch);
  const longPressGesture = useLongPressGesture(handleLongPress);
  const pullToRefreshGesture = usePullToRefresh(handlePullToRefresh);

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-cream">
      {/* Mobile Particles */}
      <MobileParticles count={performanceConfig?.particleCount || 100} />

      {/* Pull to Refresh */}
      <div 
        ref={pullToRefreshGesture.elementRef as React.RefObject<HTMLDivElement>}
        className="relative"
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {/* Hero Section */}
        <MobileSpacing mobile="pt-20 pb-8" tablet="pt-24 pb-12" desktop="pt-32 pb-16">
          <Container>
            <div className="text-center space-y-6">
              <ResponsiveText 
                mobile="text-3xl" 
                tablet="text-4xl" 
                desktop="text-5xl"
                className="font-bold text-cigar-gold"
              >
                Mobile Experience Showcase
              </ResponsiveText>
              
              <ResponsiveText 
                mobile="text-base" 
                tablet="text-lg" 
                desktop="text-xl"
                className="text-luxury-cream/80 max-w-2xl mx-auto"
              >
                Experience premium mobile interactions with touch gestures, haptic feedback, and adaptive performance.
              </ResponsiveText>

              {/* Device Info */}
              <MobileCard className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-cigar-gold">Device Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-luxury-cream/70">Device:</span>
                    <span className="ml-2 text-luxury-cream">{deviceInfo?.deviceType}</span>
                  </div>
                  <div>
                    <span className="text-luxury-cream/70">Performance:</span>
                    <span className="ml-2 text-luxury-cream">{performanceConfig?.level}</span>
                  </div>
                  <div>
                    <span className="text-luxury-cream/70">Orientation:</span>
                    <span className="ml-2 text-luxury-cream">{deviceInfo?.orientation}</span>
                  </div>
                  <div>
                    <span className="text-luxury-cream/70">Quality:</span>
                    <span className="ml-2 text-luxury-cream">{adaptiveQuality?.imageQuality}</span>
                  </div>
                </div>
              </MobileCard>
            </div>
          </Container>
        </MobileSpacing>

        {/* Touch Gestures Section */}
        <MobileSpacing mobile="py-8" tablet="py-12" desktop="py-16">
          <Container>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center text-cigar-gold">Touch Gestures</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Swipe Card */}
                <MobileCard 
                  enableSwipe={true}
                  onSwipe={handleSwipe}
                  className="p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-cigar-gold">Swipe Gesture</h3>
                  <p className="text-luxury-cream/70 mb-4">
                    Swipe left, right, up, or down on this card to see the gesture detection in action.
                  </p>
                  <div className="text-sm text-cigar-gold">
                    Status: {swipeGesture.isSwipeActive ? 'Active' : 'Ready'}
                  </div>
                </MobileCard>

                {/* Pinch Card */}
                <MobileCard 
                  className="p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-cigar-gold">Pinch Gesture</h3>
                  <p className="text-luxury-cream/70 mb-4">
                    Use two fingers to pinch and zoom on this card.
                  </p>
                  <div className="text-sm text-cigar-gold">
                    Status: {pinchGesture.isPinchActive ? 'Active' : 'Ready'}
                  </div>
                </MobileCard>

                {/* Long Press Card */}
                <MobileCard 
                  className="p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-cigar-gold">Long Press</h3>
                  <p className="text-luxury-cream/70 mb-4">
                    Press and hold this card for 500ms to trigger long press.
                  </p>
                  <div className="text-sm text-cigar-gold">
                    Status: {longPressTriggered ? 'Triggered!' : 'Ready'}
                  </div>
                </MobileCard>

                {/* Pull to Refresh Card */}
                <MobileCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-cigar-gold">Pull to Refresh</h3>
                  <p className="text-luxury-cream/70 mb-4">
                    Pull down from the top of the page to refresh content.
                  </p>
                  <div className="text-sm text-cigar-gold">
                    Status: {pullToRefreshGesture.isRefreshing ? 'Refreshing...' : 'Ready'}
                  </div>
                </MobileCard>
              </div>
            </div>
          </Container>
        </MobileSpacing>

        {/* Mobile Gallery */}
        <MobileSpacing mobile="py-8" tablet="py-12" desktop="py-16">
          <Container>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center text-cigar-gold">Adaptive Gallery</h2>
              <MobileGallery 
                images={galleryImages}
                onImageClick={setSelectedImage}
              />
            </div>
          </Container>
        </MobileSpacing>

        {/* Collapsible Sections */}
        <MobileSpacing mobile="py-8" tablet="py-12" desktop="py-16">
          <Container>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-cigar-gold">Collapsible Sections</h2>
              
              <CollapsibleSection
                title="Performance Settings"
                isOpen={isCollapsibleOpen}
                onToggle={() => setCollapsibleOpen(!isCollapsibleOpen)}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                      Particle Count: {performanceConfig?.particleCount}
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000" 
                      defaultValue={performanceConfig?.particleCount || 500}
                      className="w-full h-2 bg-luxury-slate rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-luxury-cream mb-2">
                      Animation Quality: {performanceConfig?.animationFrameRate} FPS
                    </label>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-luxury-slate rounded text-sm">Low</button>
                      <button className="px-3 py-1 bg-cigar-gold text-black rounded text-sm">Medium</button>
                      <button className="px-3 py-1 bg-luxury-slate rounded text-sm">High</button>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Adaptive Quality Settings"
                isOpen={false}
                onToggle={() => {}}
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-luxury-cream/70">Image Quality:</span>
                    <span className="ml-2 text-cigar-gold">{adaptiveQuality?.imageQuality}</span>
                  </div>
                  <div>
                    <span className="text-luxury-cream/70">Animation Quality:</span>
                    <span className="ml-2 text-cigar-gold">{adaptiveQuality?.animationQuality}</span>
                  </div>
                  <div>
                    <span className="text-luxury-cream/70">Advanced Features:</span>
                    <span className="ml-2 text-cigar-gold">
                      {adaptiveQuality?.enableAdvancedFeatures ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </CollapsibleSection>
            </div>
          </Container>
        </MobileSpacing>

        {/* Thumb Zone CTAs */}
        <MobileSpacing mobile="py-8" tablet="py-12" desktop="py-16">
          <Container>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center text-cigar-gold">Thumb Zone CTAs</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <ThumbZoneCTA
                  onClick={() => console.log('Primary action')}
                  size="medium"
                  color="cigar-gold"
                >
                  Primary Action
                </ThumbZoneCTA>
                
                <ThumbZoneCTA
                  onClick={() => console.log('Secondary action')}
                  size="medium"
                  color="luxury-slate"
                >
                  Secondary Action
                </ThumbZoneCTA>
              </div>
            </div>
          </Container>
        </MobileSpacing>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        items={navigationItems}
        quickActions={quickActions}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setQuickActionsOpen(true)}
        icon="⚡"
        label="Quick Actions"
        position="bottom-right"
        size="medium"
      />

      {/* Filter Sheet */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        title="Advanced Filters"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-luxury-cream mb-2">
              Performance Level
            </label>
            <select className="w-full p-3 bg-luxury-slate/50 border border-luxury-slate rounded-lg text-luxury-cream">
              <option value="low">Low Performance</option>
              <option value="medium">Medium Performance</option>
              <option value="high">High Performance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-luxury-cream mb-2">
              Enable Haptic Feedback
            </label>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" defaultChecked />
              <span className="text-luxury-cream">Enable haptic feedback</span>
            </div>
          </div>
        </div>
      </FilterSheet>

      {/* Quick Actions Sheet */}
      <QuickActionsSheet
        isOpen={isQuickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
        actions={quickActions.map(action => ({
          id: action.id,
          label: action.label,
          icon: action.icon,
          action: action.action,
          color: action.color,
        }))}
      />
    </div>
  );
}

export default function MobileShowcase() {
  return (
    <MobileProvider 
      initialConfig={{
        enableHaptics: true,
        enableGestures: true,
        reducedMotion: false,
        adaptiveQuality: true,
      }}
    >
      <MobileShowcaseContent />
    </MobileProvider>
  );
}
