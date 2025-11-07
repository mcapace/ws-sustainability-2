# 🚬 Luxury Cigar Lounges

A premium Next.js 14 application showcasing two exclusive luxury cigar lounges with cutting-edge web technologies, immersive 3D animations, and a sophisticated user experience.

## ✨ Features

### 🎨 **Ultra-Modern Design**
- **Dark luxury aesthetic** with gold accents and premium typography
- **Glass morphism UI** with backdrop blur effects
- **Custom cursor** with magnetic effects and blend modes
- **Responsive design** from 320px to 4K displays
- **Premium loading sequences** with logo reveals

### 🎬 **Advanced Animations**
- **THREE.js particle smoke effects** (1000+ particles, 60fps)
- **Framer Motion** staggered animations and layout transitions
- **GSAP ScrollTrigger** for orchestrated scroll animations
- **Custom animation library** with text, image, and utility effects
- **Lenis smooth scrolling** with momentum
- **Parallax scrolling** with multiple layers

### 📱 **Mobile-First Experience**
- **Touch gestures** (swipe, pinch, long press, pull-to-refresh)
- **Bottom sheet navigation** and thumb-zone optimized CTAs
- **Haptic feedback simulation** with micro-animations
- **Adaptive quality** based on device capabilities
- **Collapsible sections** with smooth animations

### 🏛️ **Lounge Showcase**
- **3D card carousel** using React Three Fiber
- **Interactive lounge selector** with mouse parallax
- **Morphing SVG backgrounds** and liquid transitions
- **Magnetic buttons** that follow the cursor
- **Dynamic data structure** for lounge information

### 📸 **Premium Gallery**
- **Masonry layout** with Framer Motion
- **Advanced lightbox** with pan/zoom and touch gestures
- **Lazy loading** with blur-up technique
- **Image optimization** with Next.js Image
- **Progressive enhancement** for performance

### 🚬 **Cigar Collection**
- **Filter system** with morphing animations
- **Virtual scrolling** for performance
- **Glassmorphism cards** with tilt effects
- **Rating system** with animated stars
- **Compare mode** with side-by-side view
- **"Surprise me" button** with slot machine animation

### 📅 **Reservation System**
- **Multi-step form** with progress indicators
- **Real-time validation** with success animations
- **Calendar picker** with availability
- **Interactive maps** with custom styling
- **Confetti animations** for success states
- **Email integration** ready for backend

### 🔧 **Production-Ready**
- **Analytics & Monitoring** (Google Analytics 4, Hotjar, Sentry)
- **SEO Optimization** (Schema markup, OG tags, sitemap)
- **Security** (CSP headers, rate limiting, input sanitization)
- **Performance** (Lighthouse 95+, Core Web Vitals)
- **Accessibility** (ARIA labels, keyboard navigation, screen readers)

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **React 18** with concurrent features

### **Styling & Animation**
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations and gestures
- **GSAP** for advanced scroll animations
- **Lenis** for smooth scrolling

### **3D Graphics**
- **Three.js** with React Three Fiber
- **@react-three/drei** for helpers and effects
- **WebGL shaders** for custom effects

### **Performance & Optimization**
- **React.lazy** for code splitting
- **Suspense** boundaries with skeleton screens
- **Next.js Image** for image optimization
- **Sharp** for image processing
- **Edge functions** for performance

### **Analytics & Monitoring**
- **Google Analytics 4** for user tracking
- **Hotjar** for heatmaps and session recordings
- **Sentry** for error tracking
- **Vercel Analytics** for performance monitoring

### **Development Tools**
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Husky** for git hooks

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.17 or later
- **npm** 9.0 or later
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/luxury-cigar-lounges.git
   cd luxury-cigar-lounges
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:4000
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
   ```

4. **Start the development server**
```bash
npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── mobile.css         # Mobile-specific styles
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap generation
│   ├── robots.ts          # Robots.txt configuration
│   └── api/               # API routes
│       ├── og/            # Open Graph image generation
│       └── health/        # Health check endpoint
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   ├── 3d/               # Three.js components
│   ├── animations/       # Animation components
│   ├── mobile/           # Mobile-specific components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── analytics.ts      # Analytics utilities
│   ├── seo.ts            # SEO utilities
│   ├── security.ts       # Security utilities
│   └── performance.ts    # Performance monitoring
├── types/                # TypeScript type definitions
└── data/                 # Static data and mock data
```

## 🎯 Key Components

### **Hero Section** (`LazyImmersiveHero`)
- THREE.js particle smoke effects
- Split text animations with staggered reveal
- Video background with canvas overlay
- Glass morphism navigation bar

### **Lounge Selector** (`LazyLoungeSelector`)
- 3D card carousel with mouse parallax
- Morphing SVG backgrounds
- Interactive features with magnetic buttons
- Swipe gestures for mobile

### **Premium Gallery** (`LazyPremiumGallery`)
- Masonry layout with Framer Motion
- Advanced lightbox with pan/zoom
- Lazy loading with blur-up technique
- Touch gestures for mobile

### **Cigar Collection** (`LazyCigarCollection`)
- Filter system with morphing animations
- Virtual scrolling for performance
- Glassmorphism cards with tilt effects
- Compare mode and favorites

### **Reservation System** (`LazyPremiumReservation`)
- Multi-step form with progress indicators
- Real-time validation with animations
- Interactive maps with custom styling
- Success states with confetti

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file with the following variables:

```env
# Application
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567

# SEO
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code

# Optional Services
SENTRY_DSN=your-sentry-dsn
STRIPE_PUBLISHABLE_KEY=your-stripe-key
MAPBOX_ACCESS_TOKEN=your-mapbox-token
```

### **Performance Configuration**

The application is optimized for:
- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP/AVIF with lazy loading

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push

### **Manual Deployment**

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### **Docker Deployment**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance Monitoring

### **Built-in Monitoring**
- **Web Vitals** tracking with Google Analytics
- **Error tracking** with Sentry integration
- **Performance budgets** with automatic alerts
- **Resource timing** analysis

### **Lighthouse Scores**
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🔒 Security Features

### **Implemented Security**
- **Content Security Policy** headers
- **Rate limiting** for API routes
- **Input sanitization** and validation
- **CORS configuration**
- **XSS protection**
- **CSRF protection**

### **Security Headers**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 🎨 Customization

### **Styling**
- **CSS Variables** in `globals.css` for easy theming
- **Tailwind Config** for custom utilities
- **Component variants** with consistent design tokens

### **Animations**
- **Custom animation library** in `components/animations/`
- **GSAP timelines** for complex sequences
- **Framer Motion** presets for common patterns

### **Content**
- **Data files** in `src/data/` for easy content updates
- **Image assets** in `public/images/`
- **Configuration** in `src/lib/` utilities

## 🧪 Testing

### **Testing Strategy**
- **Lighthouse CI** for performance testing
- **Cross-browser testing** checklist
- **Accessibility audit** with axe-core
- **Mobile device testing**

### **Performance Budget**
```javascript
const performanceBudget = {
  LCP: 2500,  // Largest Contentful Paint
  FID: 100,   // First Input Delay
  CLS: 0.1,   // Cumulative Layout Shift
  JS_BUNDLE_SIZE: 500,  // KB
  CSS_BUNDLE_SIZE: 100, // KB
};
```

## 📚 Documentation

### **Component Documentation**
- **Props interfaces** with TypeScript
- **Usage examples** in component files
- **Animation configurations** documented

### **API Documentation**
- **Route handlers** with TypeScript types
- **Error handling** patterns
- **Response schemas** documented

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- **TypeScript** for all new code
- **ESLint** and **Prettier** for code quality
- **Component documentation** required
- **Performance budget** compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** for 3D graphics capabilities
- **Framer Motion** for smooth animations
- **GSAP** for advanced animation controls
- **Next.js** team for the amazing framework
- **Vercel** for deployment and optimization

## 📞 Support

For support, email support@luxurycigarlounges.com or create an issue in the repository.

---

**Built with ❤️ for luxury cigar connoisseurs**