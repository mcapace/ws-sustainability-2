'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Color, Vector3, Matrix4 } from 'three';
import { useMouse } from '@/hooks/useMouse';

interface ParticleSmokeProps {
  count?: number;
  className?: string;
}

export function ParticleSmoke({ count = 1200 }: ParticleSmokeProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  const mouse = useMouse();

  // Create particle data
  const { particles } = useMemo(() => {
    const particles = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Color palette from deep amber to gold
    const amberColor = new Color(0x8b4513); // Deep amber
    const goldColor = new Color(0xd4af37); // Gold
    const copperColor = new Color(0xb87333); // Copper
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position particles in a cloud-like formation
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particles[i3] = Math.cos(theta) * Math.sin(phi) * radius;
      particles[i3 + 1] = Math.sin(phi) * radius + (Math.random() - 0.5) * 4;
      particles[i3 + 2] = Math.sin(theta) * Math.sin(phi) * radius;
      
      // Assign colors with variation
      const colorMix = Math.random();
      let color;
      if (colorMix < 0.3) {
        color = amberColor.clone().lerp(copperColor, Math.random());
      } else if (colorMix < 0.7) {
        color = copperColor.clone().lerp(goldColor, Math.random());
      } else {
        color = goldColor.clone();
      }
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { particles };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mouseInfluence = 0.3;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const matrix = new Matrix4();
      
      // Base position
      const baseX = particles[i3];
      const baseY = particles[i3 + 1];
      const baseZ = particles[i3 + 2];
      
      // Mouse influence
      const mouseX = (mouse.x - 0.5) * mouseInfluence * viewport.width;
      const mouseY = -(mouse.y - 0.5) * mouseInfluence * viewport.height;
      
      // Organic flow animation
      const wave1 = Math.sin(time * 0.5 + i * 0.01) * 0.5;
      const wave2 = Math.cos(time * 0.3 + i * 0.02) * 0.3;
      const wave3 = Math.sin(time * 0.7 + i * 0.005) * 0.2;
      
      // Apply transformations
      const x = baseX + mouseX * 0.1 + wave1;
      const y = baseY + mouseY * 0.1 + wave2 + Math.sin(time * 0.2 + i * 0.01) * 2;
      const z = baseZ + wave3;
      
      matrix.setPosition(x, y, z);
      
      // Scale variation based on position and time
      const scale = 0.5 + Math.sin(time * 0.4 + i * 0.01) * 0.3;
      matrix.scale(new Vector3(scale, scale, scale));
      
      meshRef.current.setMatrixAt(i, matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 6]} />
      <meshBasicMaterial 
        color={0xd4af37}
        transparent
        opacity={0.6}
        vertexColors
      />
    </instancedMesh>
  );
}
