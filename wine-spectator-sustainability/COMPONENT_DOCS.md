# 📚 Component Documentation

This document provides detailed documentation for all major components in the Luxury Cigar Lounges application.

## 🎯 Core Components

### **Hero Section Components**

#### `LazyImmersiveHero`
The main hero section with particle effects and video background.

**Props:**
```typescript
interface ImmersiveHeroProps {
  videoSrc?: string;
  fallbackImage?: string;
  particleCount?: number;
  enableParallax?: boolean;
  className?: string;
}
```

**Features:**
- THREE.js particle smoke effects
- Video background with canvas overlay
- Split text animations
- Glass morphism navigation
- Parallax scrolling

**Usage:**
```tsx
<LazyImmersiveHero
  videoSrc="/videos/smoke-ambient.mp4"
  particleCount={1000}
  enableParallax={true}
/>
```

#### `OptimizedParticleSmoke`
THREE.js particle system for smoke effects.

**Props:**
```typescript
interface ParticleSmokeProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  opacity?: number;
  className?: string;
}
```

**Performance Optimizations:**
- Instanced mesh rendering
- LOD (Level of Detail) system
- Automatic quality adjustment
- Memory management

### **Lounge Selector Components**

#### `LazyLoungeSelector`
3D card carousel for lounge selection.

**Props:**
```typescript
interface LoungeSelectorProps {
  lounges: CigarLounge[];
  onLoungeSelect?: (lounge: CigarLounge) => void;
  enable3D?: boolean;
  enableGestures?: boolean;
  className?: string;
}
```

**Features:**
- 3D card carousel with React Three Fiber
- Mouse parallax effects
- Swipe gestures for mobile
- Morphing SVG backgrounds
- Magnetic button interactions

#### `LoungeCard`
Individual lounge card component.

**Props:**
```typescript
interface LoungeCardProps {
  lounge: CigarLounge;
  isActive?: boolean;
  onClick?: () => void;
  enableHover?: boolean;
  className?: string;
}
```

### **Gallery Components**

#### `LazyPremiumGallery`
Premium gallery with masonry layout.

**Props:**
```typescript
interface PremiumGalleryProps {
  images: GalleryImage[];
  enableLightbox?: boolean;
  enableInfiniteScroll?: boolean;
  columns?: number;
  className?: string;
}
```

**Features:**
- Masonry layout with Framer Motion
- Advanced lightbox with pan/zoom
- Lazy loading with blur-up
- Touch gestures for mobile
- Image optimization

#### `GalleryLightbox`
Advanced lightbox component.

**Props:**
```typescript
interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}
```

**Features:**
- Pan and zoom functionality
- Touch gestures for mobile
- Keyboard navigation
- Image descriptions
- Share functionality

### **Cigar Collection Components**

#### `LazyCigarCollection`
Cigar collection with filtering and search.

**Props:**
```typescript
interface CigarCollectionProps {
  cigars: Cigar[];
  enableFilters?: boolean;
  enableSearch?: boolean;
  enableCompare?: boolean;
  className?: string;
}
```

**Features:**
- Filter system with morphing animations
- Virtual scrolling for performance
- Glassmorphism cards with tilt effects
- Compare mode with side-by-side view
- Favorites system with localStorage

#### `CigarCard`
Individual cigar card component.

**Props:**
```typescript
interface CigarCardProps {
  cigar: Cigar;
  isSelected?: boolean;
  onSelect?: (cigar: Cigar) => void;
  onFavorite?: (cigar: Cigar) => void;
  enableTilt?: boolean;
  className?: string;
}
```

#### `CigarFilter`
Filter system for cigar collection.

**Props:**
```typescript
interface CigarFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  cigarCount: number;
  className?: string;
}
```

### **Reservation Components**

#### `LazyPremiumReservation`
Multi-step reservation system.

**Props:**
```typescript
interface PremiumReservationProps {
  lounges: CigarLounge[];
  onReservationSubmit?: (data: ReservationFormData) => void;
  enableValidation?: boolean;
  className?: string;
}
```

**Features:**
- Multi-step form with progress indicators
- Real-time validation with animations
- Calendar picker with availability
- Interactive maps
- Success states with confetti

#### `ReservationForm`
Multi-step form component.

**Props:**
```typescript
interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  initialData?: Partial<ReservationFormData>;
  enableValidation?: boolean;
}
```

#### `InteractiveMap`
Map component with custom styling.

**Props:**
```typescript
interface InteractiveMapProps {
  locations: MapLocation[];
  onLocationSelect?: (location: MapLocation) => void;
  enable3D?: boolean;
  className?: string;
}
```

## 🎨 Animation Components

### **Text Animation Components**

#### `LetterReveal`
Letter-by-letter text reveal animation.

**Props:**
```typescript
interface LetterRevealProps {
  text: string;
  config?: Partial<TextAnimationConfig>;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
}
```

**Animation Config:**
```typescript
interface TextAnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
  splitBy?: 'char' | 'word' | 'line';
  waveIntensity?: number;
}
```

#### `GlitchEffect`
Text glitch effect for emphasis.

**Props:**
```typescript
interface GlitchEffectProps {
  text: string;
  intensity?: number;
  duration?: number;
  className?: string;
}
```

#### `Typewriter`
Typewriter effect with blinking cursor.

**Props:**
```typescript
interface TypewriterProps {
  text: string;
  speed?: number;
  cursorBlinkSpeed?: number;
  className?: string;
}
```

### **Image Animation Components**

#### `KenBurnsEffect`
Ken Burns effect for images.

**Props:**
```typescript
interface KenBurnsEffectProps {
  src: string;
  alt: string;
  intensity?: number;
  duration?: number;
  className?: string;
}
```

#### `MaskReveal`
Image reveal with animated masks.

**Props:**
```typescript
interface MaskRevealProps {
  src: string;
  alt: string;
  maskType?: 'circle' | 'rectangle' | 'wave';
  duration?: number;
  className?: string;
}
```

#### `DuotoneEffect`
Duotone to full color transition.

**Props:**
```typescript
interface DuotoneEffectProps {
  src: string;
  alt: string;
  duotoneColors?: [string, string];
  duration?: number;
  className?: string;
}
```

### **Scroll Animation Components**

#### `StickySection`
Sticky section with morphing content.

**Props:**
```typescript
interface StickySectionProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
}
```

#### `HorizontalScroll`
Horizontal scroll section.

**Props:**
```typescript
interface HorizontalScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}
```

#### `ParallaxScroll`
Parallax scrolling component.

**Props:**
```typescript
interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}
```

## 🎭 Utility Animation Components

#### `CounterAnimation`
Animated number counter.

**Props:**
```typescript
interface CounterAnimationProps {
  value: number;
  duration?: number;
  format?: 'number' | 'currency' | 'percentage';
  currency?: string;
  className?: string;
}
```

#### `ProgressRing`
Animated progress ring.

**Props:**
```typescript
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}
```

#### `MagneticHover`
Magnetic hover effect.

**Props:**
```typescript
interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}
```

## 📱 Mobile Components

#### `MobileNavigation`
Bottom navigation for mobile.

**Props:**
```typescript
interface MobileNavigationProps {
  items: MobileNavigationItem[];
  activeItem?: string;
  className?: string;
}
```

#### `BottomSheet`
Bottom sheet component.

**Props:**
```typescript
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  className?: string;
}
```

#### `CollapsibleSection`
Collapsible section with smooth animations.

**Props:**
```typescript
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}
```

## 🎛️ Provider Components

#### `AnalyticsProvider`
Analytics context provider.

**Props:**
```typescript
interface AnalyticsProviderProps {
  children: React.ReactNode;
}
```

**Context Methods:**
```typescript
interface AnalyticsContextType {
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
}
```

#### `MobileProvider`
Mobile device context provider.

**Props:**
```typescript
interface MobileProviderProps {
  children: React.ReactNode;
}
```

**Context Methods:**
```typescript
interface MobileContextType {
  isMobile: boolean;
  isTablet: boolean;
  deviceInfo: DeviceInfo;
  hapticFeedback: (pattern: HapticFeedbackPattern) => void;
}
```

#### `SmoothScrollProvider`
Smooth scrolling context provider.

**Props:**
```typescript
interface SmoothScrollProviderProps {
  children: React.ReactNode;
}
```

## 🎨 UI Components

#### `Button`
Premium button component with variants.

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}
```

#### `Container`
Responsive container component.

**Props:**
```typescript
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

#### `CustomCursor`
Advanced cursor component.

**Props:**
```typescript
interface CustomCursorProps {
  isKonamiActive?: boolean;
  isReducedMotion?: boolean;
  className?: string;
}
```

## 🎯 Usage Examples

### Basic Component Usage

```tsx
import { LazyImmersiveHero } from '@/components/ui/LoadingOptimization';
import { LazyLoungeSelector } from '@/components/ui/LoadingOptimization';
import { lounges } from '@/data/lounges';

export default function Home() {
  return (
    <main>
      <LazyImmersiveHero />
      <LazyLoungeSelector lounges={lounges} />
    </main>
  );
}
```

### Animation Component Usage

```tsx
import { LetterReveal } from '@/components/animations/TextEffects';
import { KenBurnsEffect } from '@/components/animations/ImageEffects';

export default function AnimatedSection() {
  return (
    <section>
      <LetterReveal
        text="Luxury Cigar Lounges"
        config={{
          duration: 1000,
          stagger: 100,
          easing: 'easeOutElastic',
        }}
      />
      <KenBurnsEffect
        src="/images/lounge-interior.jpg"
        alt="Lounge Interior"
        intensity={0.3}
        duration={10000}
      />
    </section>
  );
}
```

### Mobile Component Usage

```tsx
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { BottomSheet } from '@/components/mobile/BottomSheet';

const mobileNavItems = [
  { id: 'home', label: 'Home', icon: '🏠', href: '/' },
  { id: 'lounges', label: 'Lounges', icon: '🏛️', href: '#lounges' },
];

export default function MobileLayout() {
  return (
    <>
      <MobileNavigation items={mobileNavItems} />
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>Bottom sheet content</div>
      </BottomSheet>
    </>
  );
}
```

## 🎨 Styling Guidelines

### CSS Classes

All components use Tailwind CSS with custom CSS variables:

```css
:root {
  --color-luxury-charcoal: #1A1A1A;
  --color-luxury-cream: #F5F5DC;
  --color-cigar-gold: #D4AF37;
  --color-cigar-copper: #8B4513;
}
```

### Component Variants

Components support multiple variants:

```tsx
// Button variants
<Button variant="primary">Primary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Animation Classes

Custom animation classes are available:

```css
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite alternate; }
.animate-shimmer { animation: shimmer 2s linear infinite; }
```

## 🔧 Customization

### Theme Customization

Modify CSS variables in `globals.css`:

```css
:root {
  /* Primary colors */
  --color-primary: #D4AF37;
  --color-secondary: #8B4513;
  
  /* Background colors */
  --color-bg-primary: #1A1A1A;
  --color-bg-secondary: #2D2D2D;
  
  /* Text colors */
  --color-text-primary: #F5F5DC;
  --color-text-secondary: #CCCCCC;
}
```

### Animation Customization

Modify animation configurations:

```tsx
const customAnimationConfig = {
  duration: 1500,
  delay: 200,
  easing: 'easeOutBack',
  stagger: 150,
};

<LetterReveal text="Custom Animation" config={customAnimationConfig} />
```

---

**For more detailed examples and advanced usage, see the individual component files in the `src/components/` directory.**
