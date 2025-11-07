# 🍇 Wine Spectator Sustainability

A Next.js 14 experience reimagining Wine Spectator's sustainability storytelling. The site adapts the luxury lounge design system into an editorial campaign hub that highlights regenerative vineyards, climate leadership, and impact metrics across the global wine community.

## ✨ Campaign Highlights

- **Immersive hero narrative** with terroir-inspired gradients, animated typography, and impact metrics.
- **Interactive initiative selector** modeled after Wine Spectator scorecards, optimized for desktop and mobile.
- **Impact gallery** celebrating vineyard biodiversity, renewable energy systems, and community partners.
- **Data-backed comparison grid** for carbon, water, and social responsibility commitments.
- **Activation hub** that captures partner inquiries and upcoming events with celebratory feedback states.

## 🛠️ Tech Stack

- **Next.js 14** (App Router) with **React 18** and **TypeScript**.
- **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Lenis** for motion, polish, and smooth scrolling.
- **Three.js** and **React Three Fiber** for 3D terroir explorations.
- **Sharp**-assisted image optimization via `next/image` routes.
- **Sentry**, **Web Vitals**, and **@vercel/analytics** for observability.

## 🚀 Getting Started

1. **Clone & install**
   ```bash
   git clone https://github.com/your-username/wine-spectator-sustainability.git
   cd wine-spectator-sustainability
   npm install
   ```
2. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   Update `.env.local` with campaign telemetry keys (GA, Hotjar, Sentry, etc.).
3. **Run the dev server**
   ```bash
   npm run dev
   ```
4. **Open the experience** at [http://localhost:4000](http://localhost:4000).

## 📁 Structure

```
src/
├── app/             # App Router, global styles, metadata
├── components/      # UI primitives, sections, 3D, providers
├── data/            # Sustainability stories, metrics, assets
├── hooks/           # Animation + accessibility hooks
├── lib/             # Analytics, SEO, security helpers
└── types/           # Shared TypeScript contracts
```

## 🌿 Key Modules

- `HeroSection` – campaign headline, metrics banner, call-to-action.
- `InitiativeShowcase` – grid of featured regions and sustainability pillars.
- `ImpactDetails` – deep dives with image galleries, certifications, and metrics.
- `ComparisonMatrix` – Wine Spectator-style scoring table for sustainability KPIs.
- `ActivationHub` – multi-step partner form with confetti celebration.

## 🔒 Quality & Compliance

- Accessibility-first (keyboard navigation, reduced motion modes, skip links).
- SEO ready (dynamic sitemap, OG image API, structured data helpers).
- Security hardened (CSP headers, sanitization utilities, rate limiting hooks).
- Performance tuned (code splitting, asset preloading, perf budget scripts).

## 📈 Analytics & Monitoring

- `@vercel/analytics` and Google Analytics for engagement.
- Hotjar/FullStory hooks for qualitative insight.
- Sentry instrumentation for error tracking.

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Run `npm run lint` and `npm run type-check` before committing.
3. Submit a PR describing sustainability copy, asset, or feature updates.

## 📬 Support

Questions or requests? Reach out at `sustainability@winespectator.com`.

---

**Crafted to celebrate responsible winemaking and the future of every pour.**