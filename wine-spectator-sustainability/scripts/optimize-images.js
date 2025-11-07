#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses images for better performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🖼️  Starting Image Optimization...\n');

// Function to check if sharp is available
function checkSharp() {
  try {
    require('sharp');
    return true;
  } catch (error) {
    return false;
  }
}

// Function to optimize image using sharp
function optimizeImage(inputPath, outputPath, quality = 85) {
  try {
    const sharp = require('sharp');
    
    return sharp(inputPath)
      .jpeg({ quality, progressive: true })
      .webp({ quality })
      .toFile(outputPath);
  } catch (error) {
    console.log(`❌ Failed to optimize ${inputPath}: ${error.message}`);
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

// Function to process directory
function processDirectory(dirPath) {
  console.log(`📁 Processing directory: ${dirPath}`);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`❌ Directory not found: ${dirPath}`);
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  let processed = 0;
  let totalSavings = 0;
  
  files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('_optimized')) {
      const inputPath = path.join(dirPath, file);
      const originalSize = getFileSize(inputPath);
      
      // Only process large images (>500KB)
      if (originalSize > 500) {
        const nameWithoutExt = path.parse(file).name;
        const optimizedPath = path.join(dirPath, `${nameWithoutExt}_optimized.jpg`);
        
        console.log(`🔄 Optimizing ${file} (${originalSize} KB)...`);
        
        if (optimizeImage(inputPath, optimizedPath)) {
          const newSize = getFileSize(optimizedPath);
          const savings = originalSize - newSize;
          const savingsPercent = Math.round((savings / originalSize) * 100);
          
          console.log(`✅ Optimized ${file}: ${originalSize} KB → ${newSize} KB (${savingsPercent}% savings)`);
          
          processed++;
          totalSavings += savings;
        }
      }
    }
  });
  
  console.log(`📊 Processed ${processed} images in ${dirPath}`);
  console.log(`💰 Total savings: ${totalSavings} KB\n`);
}

// Function to create WebP versions
function createWebPVersions(dirPath) {
  console.log(`🔄 Creating WebP versions in: ${dirPath}`);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`❌ Directory not found: ${dirPath}`);
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  let created = 0;
  
  files.forEach(file => {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(dirPath, file);
      const nameWithoutExt = path.parse(file).name;
      const webpPath = path.join(dirPath, `${nameWithoutExt}.webp`);
      
      // Skip if WebP already exists
      if (!fs.existsSync(webpPath)) {
        console.log(`🔄 Creating WebP: ${file}...`);
        
        try {
          const sharp = require('sharp');
          sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(webpPath);
          
          console.log(`✅ Created WebP: ${nameWithoutExt}.webp`);
          created++;
        } catch (error) {
          console.log(`❌ Failed to create WebP for ${file}: ${error.message}`);
        }
      }
    }
  });
  
  console.log(`📊 Created ${created} WebP versions\n`);
}

// Main optimization function
function optimizeImages() {
  if (!checkSharp()) {
    console.log('❌ Sharp is not installed. Installing...');
    try {
      execSync('npm install sharp', { stdio: 'inherit' });
      console.log('✅ Sharp installed successfully');
    } catch (error) {
      console.log('❌ Failed to install sharp. Please install manually: npm install sharp');
      return;
    }
  }
  
  const imageDirs = [
    'public/images/Davidoff Madison/',
    'public/images/Davidoff Sixth Ave/',
    'public/images/Barclay Rex/'
  ];
  
  console.log('🎯 Optimizing images for performance...\n');
  
  let totalProcessed = 0;
  let totalSavings = 0;
  
  imageDirs.forEach(dir => {
    processDirectory(dir);
    createWebPVersions(dir);
  });
  
  console.log('🎉 Image optimization complete!');
  console.log('\n💡 Recommendations:');
  console.log('1. Update your venue data to use _optimized versions');
  console.log('2. Use WebP format for better compression');
  console.log('3. Consider using Next.js Image component for automatic optimization');
  console.log('4. Implement lazy loading for below-the-fold images');
}

// Run optimization
optimizeImages();
