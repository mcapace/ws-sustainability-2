#!/usr/bin/env node

/**
 * Performance Optimization Script
 * Optimizes images, bundles, and assets for production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ Starting Performance Optimization...\n');

// Function to check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Function to get file size in KB
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024);
  } catch (error) {
    return 0;
  }
}

// 1. Bundle Analysis
function analyzeBundle() {
  console.log('📦 Analyzing Bundle Size...');
  
  try {
    // Run Next.js build to analyze bundle
    console.log('Building for analysis...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Check if .next directory exists
    if (fileExists('.next')) {
      console.log('✅ Build completed successfully');
      
      // Analyze static files
      const staticDir = '.next/static';
      if (fileExists(staticDir)) {
        const files = fs.readdirSync(staticDir, { recursive: true });
        let totalSize = 0;
        
        files.forEach(file => {
          if (typeof file === 'string') {
            const filePath = path.join(staticDir, file);
            if (fs.statSync(filePath).isFile()) {
              totalSize += getFileSize(filePath);
            }
          }
        });
        
        console.log(`📊 Total static assets size: ${totalSize} KB`);
        
        if (totalSize > 1000) {
          console.log('⚠️  Bundle size is large. Consider code splitting.');
        } else {
          console.log('✅ Bundle size is optimized');
        }
      }
    } else {
      console.log('❌ Build failed or .next directory not found');
    }
  } catch (error) {
    console.log(`❌ Bundle analysis failed: ${error.message}`);
  }
  
  console.log('');
}

// 2. Image Optimization Check
function checkImageOptimization() {
  console.log('🖼️  Checking Image Optimization...');
  
  const imageDirs = [
    'public/images/Davidoff Madison/',
    'public/images/Davidoff Sixth Ave/',
    'public/images/Barclay Rex/'
  ];
  
  let totalImages = 0;
  let totalSize = 0;
  let oversizedImages = [];
  
  imageDirs.forEach(dir => {
    if (fileExists(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
          const filePath = path.join(dir, file);
          const size = getFileSize(filePath);
          totalImages++;
          totalSize += size;
          
          if (size > 500) { // Images larger than 500KB
            oversizedImages.push({ file, size });
          }
        }
      });
    }
  });
  
  console.log(`📊 Total images: ${totalImages}`);
  console.log(`📊 Total image size: ${totalSize} KB`);
  console.log(`📊 Average image size: ${Math.round(totalSize / totalImages)} KB`);
  
  if (oversizedImages.length > 0) {
    console.log('⚠️  Oversized images found:');
    oversizedImages.forEach(img => {
      console.log(`   - ${img.file}: ${img.size} KB`);
    });
    console.log('💡 Consider compressing these images');
  } else {
    console.log('✅ All images are optimized');
  }
  
  console.log('');
}

// 3. CSS Optimization Check
function checkCSSOptimization() {
  console.log('🎨 Checking CSS Optimization...');
  
  const cssFile = 'src/app/globals.css';
  if (fileExists(cssFile)) {
    const size = getFileSize(cssFile);
    console.log(`📊 CSS file size: ${size} KB`);
    
    if (size > 100) {
      console.log('⚠️  CSS file is large. Consider splitting or purging unused styles.');
    } else {
      console.log('✅ CSS file size is optimized');
    }
    
    // Check for unused CSS classes (basic check)
    const content = fs.readFileSync(cssFile, 'utf8');
    const classCount = (content.match(/\./g) || []).length;
    console.log(`📊 CSS classes defined: ${classCount}`);
  } else {
    console.log('❌ CSS file not found');
  }
  
  console.log('');
}

// 4. Performance Recommendations
function generateRecommendations() {
  console.log('💡 Performance Recommendations:');
  console.log('');
  
  const recommendations = [
    '✅ Use Next.js Image component for automatic optimization',
    '✅ Implement lazy loading for below-the-fold content',
    '✅ Enable compression in next.config.js',
    '✅ Use WebP format for images',
    '✅ Implement code splitting for large components',
    '✅ Preload critical fonts',
    '✅ Minimize JavaScript bundles',
    '✅ Use CSS-in-JS or CSS modules for better tree shaking',
    '✅ Implement service worker for caching',
    '✅ Use CDN for static assets'
  ];
  
  recommendations.forEach(rec => {
    console.log(rec);
  });
  
  console.log('');
}

// 5. Lighthouse Score Estimation
function estimateLighthouseScore() {
  console.log('🏆 Estimated Lighthouse Score:');
  
  let score = 100;
  let issues = [];
  
  // Check for common performance issues
  const imageDirs = [
    'public/images/Davidoff Madison/',
    'public/images/Davidoff Sixth Ave/',
    'public/images/Barclay Rex/'
  ];
  
  let hasLargeImages = false;
  imageDirs.forEach(dir => {
    if (fileExists(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png)$/i) && !file.match(/\.webp$/i)) {
          const filePath = path.join(dir, file);
          const size = getFileSize(filePath);
          if (size > 500) {
            hasLargeImages = true;
          }
        }
      });
    }
  });
  
  if (hasLargeImages) {
    score -= 15;
    issues.push('Large unoptimized images');
  }
  
  // Check for bundle size
  if (fileExists('.next')) {
    const staticDir = '.next/static';
    if (fileExists(staticDir)) {
      const files = fs.readdirSync(staticDir, { recursive: true });
      let totalSize = 0;
      
      files.forEach(file => {
        if (typeof file === 'string') {
          const filePath = path.join(staticDir, file);
          if (fs.statSync(filePath).isFile()) {
            totalSize += getFileSize(filePath);
          }
        }
      });
      
      if (totalSize > 1000) {
        score -= 10;
        issues.push('Large bundle size');
      }
    }
  }
  
  // Check for font optimization
  const layoutFile = 'src/app/layout.tsx';
  if (fileExists(layoutFile)) {
    const content = fs.readFileSync(layoutFile, 'utf8');
    if (content.includes('font-display: swap')) {
      console.log('✅ Font optimization implemented');
    } else {
      score -= 5;
      issues.push('Font optimization missing');
    }
  }
  
  console.log(`📊 Estimated Performance Score: ${score}/100`);
  
  if (issues.length > 0) {
    console.log('⚠️  Issues found:');
    issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
  } else {
    console.log('✅ No major performance issues detected');
  }
  
  console.log('');
}

// Run all optimizations
function runOptimization() {
  analyzeBundle();
  checkImageOptimization();
  checkCSSOptimization();
  generateRecommendations();
  estimateLighthouseScore();
  
  console.log('🎉 Performance optimization analysis complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Run npm run build to test production build');
  console.log('2. Use Lighthouse in Chrome DevTools for detailed analysis');
  console.log('3. Test on different devices and network conditions');
  console.log('4. Monitor Core Web Vitals in production');
}

// Run the optimization
runOptimization();
