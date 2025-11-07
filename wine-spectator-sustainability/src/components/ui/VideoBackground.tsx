'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc?: string;
  imageSrc?: string;
  className?: string;
}

export function VideoBackground({ 
  videoSrc = '/videos/smoke-whiskey.mp4',
  imageSrc = '/images/textures/luxury-background.jpg',
  className = ''
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setUseVideo(true);
      setIsLoaded(true);
      video.play().catch(() => {
        // Fallback to image if video fails
        setUseVideo(false);
        setIsLoaded(true);
      });
    };

    const handleError = () => {
      setUseVideo(false);
      setIsLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Check if video can be played
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (!useVideo || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;
    
    if (!ctx || !video) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Apply blend modes and overlays
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = 'rgba(26, 26, 26, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [useVideo]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Background */}
      {useVideo ? (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ mixBlendMode: 'multiply' }}
          />
        </>
      ) : (
        /* Fallback Image */
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            filter: 'brightness(0.3) contrast(1.2) saturate(0.8)',
          }}
        />
      )}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/80 via-luxury-charcoal/60 to-luxury-slate/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent" />
      
      {/* Animated Smoke Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 bg-[url('/images/textures/smoke-overlay.png')] opacity-30 mix-blend-mode-overlay"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'smokeFloat 20s ease-in-out infinite',
        }}
      />

      {/* Loading State */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute inset-0 bg-luxury-black flex items-center justify-center"
        >
          <div className="text-cigar-gold text-lg">Loading...</div>
        </motion.div>
      )}
    </div>
  );
}
