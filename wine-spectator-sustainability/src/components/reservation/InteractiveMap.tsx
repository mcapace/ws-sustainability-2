'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapLocation, WeatherData } from '@/types/reservation';

interface InteractiveMapProps {
  location: MapLocation;
  weatherData: WeatherData;
  onLocationClick?: (location: MapLocation) => void;
}

export function InteractiveMap({ location, weatherData, onLocationClick }: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [is3DHover, setIs3DHover] = useState(false);

  useEffect(() => {
    // Initialize Mapbox (mock implementation for now)
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      // Mock map initialization - in real implementation, you would use Mapbox GL JS
      const mockMap = {
        on: () => {},
        off: () => {},
        remove: () => {},
        flyTo: () => {},
        addSource: () => {},
        addLayer: () => {},
        setLayoutProperty: () => {},
        queryRenderedFeatures: () => []
      };

      mapRef.current = mockMap;
      setIsMapLoaded(true);

      // Simulate map loading
      setTimeout(() => {
        setIsMapLoaded(true);
      }, 1000);
    };

    initializeMap();

    return () => {
      if (mapRef.current && typeof mapRef.current === 'object' && 'remove' in mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
      }
    };
  }, [location]);

  const handleMapClick = () => {
    if (onLocationClick) {
      onLocationClick(location);
    }
  };

  const handleBuildingHover = (hovered: boolean) => {
    setIs3DHover(hovered);
  };

  return (
    <div className="interactive-map bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-luxury-cream">Location</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-luxury-cream/70">Live</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapContainer}
          className="w-full h-64 bg-gradient-to-br from-luxury-black to-luxury-charcoal rounded-lg overflow-hidden relative cursor-pointer"
          onClick={handleMapClick}
        >
          {/* Map Loading State */}
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-luxury-cream/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Map Content */}
          {isMapLoaded && (
            <>
              {/* Map Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-luxury-black to-green-900/20" />
              
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* 3D Building Model */}
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-20 bg-gradient-to-t from-luxury-charcoal to-luxury-slate rounded-t-lg shadow-lg cursor-pointer"
                onMouseEnter={() => handleBuildingHover(true)}
                onMouseLeave={() => handleBuildingHover(false)}
                animate={{
                  y: is3DHover ? -5 : 0,
                  scale: is3DHover ? 1.05 : 1,
                  rotateX: is3DHover ? -10 : 0,
                  rotateY: is3DHover ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Building Windows */}
                <div className="absolute inset-2 grid grid-cols-3 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 rounded-sm ${
                        Math.random() > 0.3 ? 'bg-cigar-gold/80' : 'bg-luxury-black/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Building Glow */}
                {is3DHover && (
                  <motion.div
                    className="absolute inset-0 bg-cigar-gold/20 rounded-t-lg blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              {/* Location Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              </motion.div>

              {/* Animated Route Drawing */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.path
                  d="M 50 200 Q 150 100 250 150 T 450 120"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-luxury-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-luxury-cream hover:bg-luxury-black/70 transition-colors duration-300"
                >
                  +
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-luxury-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-luxury-cream hover:bg-luxury-black/70 transition-colors duration-300"
                >
                  −
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Location Info Overlay */}
        <motion.div
          className="absolute bottom-4 right-4 bg-luxury-black/80 backdrop-blur-lg rounded-lg p-3 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-cigar-gold font-bold text-sm mb-1">
            {location.address}
          </div>
          <div className="text-luxury-cream/80 text-xs">
            {location.city}, {location.state} {location.zipCode}
          </div>
        </motion.div>
      </div>

      {/* Weather Widget */}
      <motion.div
        className="mt-4 bg-luxury-black/30 rounded-lg p-4 border border-luxury-slate/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{weatherData.icon}</div>
            <div>
              <div className="text-luxury-cream font-bold">
                {weatherData.temperature}°F
              </div>
              <div className="text-luxury-cream/70 text-sm">
                {weatherData.condition}
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-luxury-cream/70">
            <div>Humidity: {weatherData.humidity}%</div>
            <div>Wind: {weatherData.windSpeed} mph</div>
          </div>
        </div>
      </motion.div>

      {/* Map Instructions */}
      <motion.div
        className="mt-4 text-center text-luxury-cream/50 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        💡 Click on the map to view detailed directions
      </motion.div>
    </div>
  );
}
