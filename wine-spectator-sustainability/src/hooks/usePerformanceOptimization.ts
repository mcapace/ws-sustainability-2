'use client';

import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  isLowPerformance: boolean;
}

export function usePerformanceOptimization() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    isLowPerformance: false
  });

  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detect low-end devices
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      // Check hardware concurrency
      const cores = navigator.hardwareConcurrency || 4;
      
      // Check memory (if available)
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
      
      // Check connection speed
      const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      const effectiveType = connection?.effectiveType || '4g';
      
      const isLowEnd = 
        cores < 4 || 
        memory < 4 || 
        effectiveType === 'slow-2g' || 
        effectiveType === '2g' ||
        !gl;

      setIsLowEndDevice(isLowEnd);
    };

    checkDeviceCapabilities();
  }, []);

  // Monitor performance
  const monitorPerformance = useCallback(() => {
    if (!('performance' in window)) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalRenderTime = 0;
      let frameCount = 0;

      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          if (entry.name.includes('render')) {
            totalRenderTime += entry.duration;
            frameCount++;
          }
        }
      });

      const avgRenderTime = frameCount > 0 ? totalRenderTime / frameCount : 0;
      const memoryInfo = (performance as unknown as { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit : 0;

      // Estimate FPS (simplified)
      const estimatedFPS = avgRenderTime > 0 ? Math.min(60, 1000 / avgRenderTime) : 60;
      
      setMetrics({
        fps: Math.round(estimatedFPS),
        memoryUsage: Math.round(memoryUsage * 100),
        renderTime: Math.round(avgRenderTime),
        isLowPerformance: estimatedFPS < 30 || memoryUsage > 0.8
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = monitorPerformance();
    return cleanup;
  }, [monitorPerformance]);

  // Adaptive quality settings
  const getQualitySettings = useCallback(() => {
    if (isLowEndDevice || metrics.isLowPerformance) {
      return {
        enableParticles: false,
        enable3D: false,
        enableComplexAnimations: false,
        enableBlurEffects: false,
        maxParticles: 0,
        animationQuality: 'low',
        enableShadows: false,
        enableReflections: false
      };
    }

    if (metrics.fps < 45) {
      return {
        enableParticles: true,
        enable3D: true,
        enableComplexAnimations: true,
        enableBlurEffects: true,
        maxParticles: 500,
        animationQuality: 'medium',
        enableShadows: true,
        enableReflections: false
      };
    }

    return {
      enableParticles: true,
      enable3D: true,
      enableComplexAnimations: true,
      enableBlurEffects: true,
      maxParticles: 1000,
      animationQuality: 'high',
      enableShadows: true,
      enableReflections: true
    };
  }, [isLowEndDevice, metrics]);

  return {
    metrics,
    isLowEndDevice,
    qualitySettings: getQualitySettings(),
    isLowPerformance: metrics.isLowPerformance || isLowEndDevice
  };
}

// CSS containment utilities
export function useCSSContainment() {
  useEffect(() => {
    // Add CSS containment to performance-critical elements
    const style = document.createElement('style');
    style.textContent = `
      .performance-critical {
        contain: layout style paint;
        will-change: transform, opacity;
      }
      
      .animation-container {
        contain: layout style;
        will-change: transform;
      }
      
      .parallax-layer {
        contain: layout style paint;
        will-change: transform;
      }
      
      .particle-container {
        contain: layout style paint;
        will-change: transform, opacity;
      }
      
      .glass-morphism {
        contain: layout style;
        backdrop-filter: blur(10px);
        will-change: backdrop-filter;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
}

// Intersection Observer for lazy loading
export function useLazyLoading() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [hasLoaded]);

  return { ref, isIntersecting, hasLoaded };
}
