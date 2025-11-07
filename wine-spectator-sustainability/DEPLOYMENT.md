# 🚀 Deployment Guide

This guide covers deploying the Luxury Cigar Lounges application to various platforms with production-ready configurations.

## 📋 Prerequisites

- Node.js 18.17 or later
- npm 9.0 or later
- Git repository access
- Domain name (for production)
- SSL certificate (handled by most platforms)

## 🔧 Environment Setup

### 1. Environment Variables

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

**Required Variables:**
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567
NODE_ENV=production
```

**Optional Variables:**
```env
SENTRY_DSN=your-sentry-dsn
STRIPE_PUBLISHABLE_KEY=your-stripe-key
MAPBOX_ACCESS_TOKEN=your-mapbox-token
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### 2. Build Configuration

The application uses optimized build settings:

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};
```

## 🌐 Vercel Deployment (Recommended)

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Select the repository and click "Import"

### 2. Configure Project

**Build Settings:**
- Framework Preset: Next.js
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 3. Environment Variables

In the Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add all required variables from your `.env.local`
3. Set environment to **Production**, **Preview**, and **Development**

### 4. Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

### 5. Deploy

- **Automatic**: Pushes to main branch trigger deployments
- **Manual**: Use Vercel CLI: `vercel --prod`

## 🐳 Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Build and Run

```bash
# Build the Docker image
docker build -t luxury-cigar-lounges .

# Run the container
docker run -p 3000:3000 --env-file .env.local luxury-cigar-lounges
```

### 3. Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    restart: unless-stopped
```

## ☁️ AWS Deployment

### 1. AWS Amplify

1. Connect your repository to AWS Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### 2. AWS ECS with Fargate

1. Build and push Docker image to ECR
2. Create ECS task definition
3. Configure load balancer
4. Set up auto-scaling

### 3. AWS Lambda (Serverless)

Use the [serverless-nextjs-plugin](https://github.com/serverless-nextjs/serverless-nextjs-plugin) for serverless deployment.

## 🔧 Netlify Deployment

### 1. Build Settings

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Environment Variables

Add variables in Netlify dashboard under **Site Settings** → **Environment Variables**.

## 📊 Performance Optimization

### 1. Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
npm run optimize-images
```

### 2. CDN Configuration

**Vercel Edge Network:**
- Automatically enabled
- Global edge locations
- Image optimization included

**Custom CDN (Cloudflare):**
```javascript
// cloudflare-worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Cache static assets
    if (url.pathname.startsWith('/_next/static/')) {
      return caches.default.match(request) || fetch(request);
    }
    
    return fetch(request);
  },
};
```

### 3. Monitoring Setup

**Health Check Endpoint:**
```bash
curl https://your-domain.com/api/health
```

**Performance Monitoring:**
- Google Analytics 4 configured
- Core Web Vitals tracking
- Error tracking with Sentry

## 🔒 Security Configuration

### 1. SSL/TLS

Most platforms handle SSL automatically:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- AWS: Use ACM certificates

### 2. Security Headers

Configured in `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline'"
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        }
      ],
    },
  ];
}
```

### 3. Environment Security

- Never commit `.env.local`
- Use platform-specific secret management
- Rotate API keys regularly
- Enable 2FA on all services

## 📈 Monitoring & Analytics

### 1. Google Analytics 4

```javascript
// Configure in _app.tsx or layout.tsx
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href,
});
```

### 2. Error Tracking

Sentry configuration:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 3. Performance Monitoring

```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Environment Variables:**
- Ensure all required variables are set
- Check variable names match exactly
- Verify no trailing spaces

**Performance Issues:**
- Run Lighthouse audit
- Check bundle analyzer
- Optimize images
- Enable compression

**Deployment Errors:**
- Check build logs
- Verify Node.js version compatibility
- Ensure all dependencies are installed

### Debug Commands

```bash
# Local development
npm run dev

# Production build test
npm run build
npm start

# Lint and type check
npm run lint
npm run type-check

# Performance audit
npm run lighthouse
```

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Build passes without errors
- [ ] All tests passing
- [ ] Performance budget met
- [ ] Security headers configured
- [ ] Analytics tracking verified
- [ ] Error monitoring active
- [ ] SSL certificate valid
- [ ] Domain DNS configured
- [ ] Backup strategy in place

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Contact platform support
- Create issue in repository

---

**Happy Deploying! 🚀**
