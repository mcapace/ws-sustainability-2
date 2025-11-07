#!/usr/bin/env node

/**
 * Comprehensive Functionality Test Script
 * Tests all critical functionality before launch
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Comprehensive Functionality Tests...\n');

// Test 1: Image Path Validation
function testImagePaths() {
  console.log('📸 Testing Image Paths...');
  
  const imageDirs = [
    'public/images/Davidoff Madison/',
    'public/images/Davidoff Sixth Ave/',
    'public/images/Barclay Rex/'
  ];
  
  const venueData = require('../src/data/venues.ts');
  
  let passed = 0;
  let failed = 0;
  
  // Check if all referenced images exist
  venueData.venueData.brands.forEach(brand => {
    brand.locations.forEach(location => {
      // Check hero image
      const heroPath = `public${location.images.hero}`;
      if (fs.existsSync(heroPath)) {
        console.log(`✅ Hero image exists: ${location.images.hero}`);
        passed++;
      } else {
        console.log(`❌ Hero image missing: ${location.images.hero}`);
        failed++;
      }
      
      // Check gallery images
      location.images.gallery.forEach(imagePath => {
        const fullPath = `public${imagePath}`;
        if (fs.existsSync(fullPath)) {
          console.log(`✅ Gallery image exists: ${imagePath}`);
          passed++;
        } else {
          console.log(`❌ Gallery image missing: ${imagePath}`);
          failed++;
        }
      });
    });
  });
  
  console.log(`\n📸 Image Test Results: ${passed} passed, ${failed} failed\n`);
  return { passed, failed, total: passed + failed };
}

// Test 2: Component Structure Validation
function testComponentStructure() {
  console.log('🧩 Testing Component Structure...');
  
  const requiredComponents = [
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/VenueShowcase.tsx',
    'src/components/sections/BrandComparison.tsx',
    'src/components/ui/Navigation.tsx',
    'src/components/ui/Footer.tsx',
    'src/components/ui/ErrorBoundary.tsx',
    'src/components/ui/OptimizedImage.tsx',
    'src/components/ui/SmartCTA.tsx',
    'src/components/ui/Timeline.tsx'
  ];
  
  let passed = 0;
  let failed = 0;
  
  requiredComponents.forEach(component => {
    if (fs.existsSync(component)) {
      console.log(`✅ Component exists: ${component}`);
      passed++;
    } else {
      console.log(`❌ Component missing: ${component}`);
      failed++;
    }
  });
  
  console.log(`\n🧩 Component Test Results: ${passed} passed, ${failed} failed\n`);
  return { passed, failed, total: passed + failed };
}

// Test 3: Data Structure Validation
function testDataStructure() {
  console.log('📊 Testing Data Structure...');
  
  try {
    const venueData = require('../src/data/venues.ts');
    
    let passed = 0;
    let failed = 0;
    
    // Check if all required fields exist
    venueData.venueData.brands.forEach(brand => {
      // Brand level checks
      if (brand.id && brand.name && brand.logo && brand.tagline) {
        console.log(`✅ Brand data complete: ${brand.name}`);
        passed++;
      } else {
        console.log(`❌ Brand data incomplete: ${brand.name}`);
        failed++;
      }
      
      brand.locations.forEach(location => {
        // Location level checks
        const requiredFields = ['id', 'name', 'tagline', 'description', 'address', 'phone', 'hours', 'images', 'features', 'signature'];
        const hasAllFields = requiredFields.every(field => location[field]);
        
        if (hasAllFields) {
          console.log(`✅ Location data complete: ${location.name}`);
          passed++;
        } else {
          console.log(`❌ Location data incomplete: ${location.name}`);
          failed++;
        }
        
        // Check hours structure
        const requiredHours = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const hasAllHours = requiredHours.every(day => location.hours[day]);
        
        if (hasAllHours) {
          console.log(`✅ Hours data complete: ${location.name}`);
          passed++;
        } else {
          console.log(`❌ Hours data incomplete: ${location.name}`);
          failed++;
        }
      });
    });
    
    console.log(`\n📊 Data Structure Test Results: ${passed} passed, ${failed} failed\n`);
    return { passed, failed, total: passed + failed };
  } catch (error) {
    console.log(`❌ Data structure test failed: ${error.message}\n`);
    return { passed: 0, failed: 1, total: 1 };
  }
}

// Test 4: SEO Metadata Validation
function testSEOMetadata() {
  console.log('🔍 Testing SEO Metadata...');
  
  const layoutFile = 'src/app/layout.tsx';
  let passed = 0;
  let failed = 0;
  
  if (fs.existsSync(layoutFile)) {
    const content = fs.readFileSync(layoutFile, 'utf8');
    
    const requiredSEOFields = [
      'title',
      'description',
      'keywords',
      'openGraph',
      'twitter',
      'robots'
    ];
    
    requiredSEOFields.forEach(field => {
      if (content.includes(field)) {
        console.log(`✅ SEO field present: ${field}`);
        passed++;
      } else {
        console.log(`❌ SEO field missing: ${field}`);
        failed++;
      }
    });
  } else {
    console.log(`❌ Layout file missing: ${layoutFile}`);
    failed++;
  }
  
  console.log(`\n🔍 SEO Metadata Test Results: ${passed} passed, ${failed} failed\n`);
  return { passed, failed, total: passed + failed };
}

// Test 5: Responsive Design Validation
function testResponsiveDesign() {
  console.log('📱 Testing Responsive Design...');
  
  const globalsCSS = 'src/app/globals.css';
  let passed = 0;
  let failed = 0;
  
  if (fs.existsSync(globalsCSS)) {
    const content = fs.readFileSync(globalsCSS, 'utf8');
    
    const requiredBreakpoints = [
      'sm:', 'md:', 'lg:', 'xl:', '2xl:',
      '@media (min-width: 640px)',
      '@media (min-width: 768px)',
      '@media (min-width: 1024px)'
    ];
    
    requiredBreakpoints.forEach(breakpoint => {
      if (content.includes(breakpoint)) {
        console.log(`✅ Responsive breakpoint present: ${breakpoint}`);
        passed++;
      } else {
        console.log(`❌ Responsive breakpoint missing: ${breakpoint}`);
        failed++;
      }
    });
  } else {
    console.log(`❌ Globals CSS missing: ${globalsCSS}`);
    failed++;
  }
  
  console.log(`\n📱 Responsive Design Test Results: ${passed} passed, ${failed} failed\n`);
  return { passed, failed, total: passed + failed };
}

// Test 6: Performance Optimization Check
function testPerformanceOptimization() {
  console.log('⚡ Testing Performance Optimization...');
  
  const nextConfig = 'next.config.js';
  let passed = 0;
  let failed = 0;
  
  if (fs.existsSync(nextConfig)) {
    const content = fs.readFileSync(nextConfig, 'utf8');
    
    const performanceFeatures = [
      'compress:',
      'swcMinify:',
      'images:',
      'formats:',
      'domains:'
    ];
    
    performanceFeatures.forEach(feature => {
      if (content.includes(feature)) {
        console.log(`✅ Performance feature present: ${feature}`);
        passed++;
      } else {
        console.log(`❌ Performance feature missing: ${feature}`);
        failed++;
      }
    });
  } else {
    console.log(`❌ Next.js config missing: ${nextConfig}`);
    failed++;
  }
  
  // Check for optimized image components
  const optimizedImage = 'src/components/ui/OptimizedImage.tsx';
  if (fs.existsSync(optimizedImage)) {
    console.log(`✅ Optimized image component present`);
    passed++;
  } else {
    console.log(`❌ Optimized image component missing`);
    failed++;
  }
  
  console.log(`\n⚡ Performance Optimization Test Results: ${passed} passed, ${failed} failed\n`);
  return { passed, failed, total: passed + failed };
}

// Run all tests
function runAllTests() {
  const results = [];
  
  results.push(testImagePaths());
  results.push(testComponentStructure());
  results.push(testDataStructure());
  results.push(testSEOMetadata());
  results.push(testResponsiveDesign());
  results.push(testPerformanceOptimization());
  
  // Calculate totals
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalFailed = results.reduce((sum, result) => sum + result.failed, 0);
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  
  console.log('🎯 FINAL TEST RESULTS');
  console.log('====================');
  console.log(`✅ Total Passed: ${totalPassed}`);
  console.log(`❌ Total Failed: ${totalFailed}`);
  console.log(`📊 Total Tests: ${totalTests}`);
  console.log(`🎯 Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
  
  if (totalFailed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Ready for launch! 🚀');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please fix issues before launch.');
    process.exit(1);
  }
}

// Run the tests
runAllTests();
