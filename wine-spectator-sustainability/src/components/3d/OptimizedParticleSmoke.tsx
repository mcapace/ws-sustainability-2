'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Matrix4, Vector3, Color } from 'three';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface OptimizedParticleSmokeProps {
  mousePosition?: { x: number; y: number };
}

export function OptimizedParticleSmoke({ mousePosition }: OptimizedParticleSmokeProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  const { qualitySettings } = usePerformanceOptimization();

  // Adaptive particle count based on performance
  const particleCount = useMemo(() => {
    if (!qualitySettings.enableParticles) return 0;
    return qualitySettings.maxParticles;
  }, [qualitySettings]);

  // Generate particles with LOD optimization
  const particles = useMemo(() => {
    if (particleCount === 0) return [];
    
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 5;
      
      // LOD: Different complexity based on quality settings
      const complexity = qualitySettings.animationQuality === 'high' ? 1 : 
                        qualitySettings.animationQuality === 'medium' ? 0.7 : 0.4;
      
      const speed = 0.005 + Math.random() * 0.01 * complexity;
      const scale = (0.01 + Math.random() * 0.03) * complexity;
      const opacity = 0.3 + Math.random() * 0.4 * complexity;
      
      temp.push({ 
        position: new Vector3(x, y, z), 
        speed, 
        scale, 
        opacity,
        originalY: y,
        timeOffset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [particleCount, viewport.width, viewport.height, qualitySettings]);

  // Mouse interaction with performance scaling
  const mouseInfluence = useMemo(() => {
    return qualitySettings.enableComplexAnimations ? 0.02 : 0.01;
  }, [qualitySettings]);

  useFrame((state, delta) => {
    if (!meshRef.current || particleCount === 0) return;

    const dummy = new Matrix4();
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Basic movement
      particle.position.y -= particle.speed * delta * 100;
      
      // Mouse interaction (only if complex animations enabled)
      if (qualitySettings.enableComplexAnimations && mousePosition) {
        const mouseX = mousePosition.x * mouseInfluence;
        const mouseY = mousePosition.y * mouseInfluence;
        
        particle.position.x += (mouseX - particle.position.x) * 0.01;
        particle.position.z += (mouseY - particle.position.z) * 0.01;
      }

      // Organic flow (simplified for lower quality)
      if (qualitySettings.animationQuality !== 'low') {
        const flowX = Math.sin(time * 0.5 + particle.timeOffset) * 0.01;
        const flowZ = Math.cos(time * 0.3 + particle.timeOffset) * 0.01;
        
        particle.position.x += flowX;
        particle.position.z += flowZ;
      }

      // Reset particles
      if (particle.position.y < -viewport.height) {
        particle.position.y = viewport.height;
        particle.position.x = (Math.random() - 0.5) * viewport.width * 2;
        particle.position.z = (Math.random() - 0.5) * 5;
      }

      // Update instance matrix
      dummy.identity();
      dummy.makeTranslation(particle.position.x, particle.position.y, particle.position.z);
      dummy.scale(new Vector3(particle.scale, particle.scale, particle.scale));
      meshRef.current?.setMatrixAt(i, dummy);
    });

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Don't render if particles are disabled
  if (particleCount === 0) {
    return null;
  }

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, qualitySettings.animationQuality === 'high' ? 8 : 6, qualitySettings.animationQuality === 'high' ? 8 : 6]} />
      <meshBasicMaterial 
        color="#d4af37" 
        transparent 
        opacity={qualitySettings.animationQuality === 'high' ? 0.6 : 0.4}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// LOD-optimized floating dust particles
export function OptimizedFloatingDust({ count = 150 }: { count?: number }) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  const { qualitySettings } = usePerformanceOptimization();

  // Adaptive particle count
  const particleCount = useMemo(() => {
    if (!qualitySettings.enableParticles) return 0;
    return Math.min(count, qualitySettings.maxParticles / 4); // Dust uses fewer particles
  }, [count, qualitySettings]);

  const particles = useMemo(() => {
    if (particleCount === 0) return [];
    
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 5;
      const speed = 0.005 + Math.random() * 0.01;
      const scale = 0.01 + Math.random() * 0.03;
      temp.push({ position: new Vector3(x, y, z), speed, scale });
    }
    return temp;
  }, [particleCount, viewport.width, viewport.height]);

  useFrame((state, delta) => {
    if (meshRef.current && particleCount > 0) {
      const dummy = new Matrix4();
      
      particles.forEach((particle, i) => {
        particle.position.y -= particle.speed * delta * 100;
        if (particle.position.y < -viewport.height) {
          particle.position.y = viewport.height;
          particle.position.x = (Math.random() - 0.5) * viewport.width * 2;
        }

        dummy.identity();
        dummy.makeTranslation(particle.position.x, particle.position.y, particle.position.z);
        dummy.scale(new Vector3(particle.scale, particle.scale, particle.scale));
        meshRef.current?.setMatrixAt(i, dummy);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (particleCount === 0) {
    return null;
  }

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
    </instancedMesh>
  );
}
