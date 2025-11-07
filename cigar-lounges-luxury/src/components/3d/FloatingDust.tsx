'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Matrix4, Vector3 } from 'three';

interface FloatingDustProps {
  count?: number;
  className?: string;
}

export function FloatingDust({ count = 100 }: FloatingDustProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();

  // Create particle data
  const { particles } = useMemo(() => {
    const particles = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random position within viewport
      particles[i3] = (Math.random() - 0.5) * viewport.width * 2;
      particles[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      particles[i3 + 2] = (Math.random() - 0.5) * 2;
    }
    
    return { particles };
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const matrix = new Matrix4();
      
      // Base position
      let x = particles[i3];
      let y = particles[i3 + 1];
      let z = particles[i3 + 2];
      
      // Floating animation
      x += Math.sin(time * 0.5 + i * 0.1) * 0.001;
      y += Math.cos(time * 0.3 + i * 0.15) * 0.002;
      z += Math.sin(time * 0.7 + i * 0.05) * 0.0005;
      
      // Reset position if out of bounds
      if (Math.abs(x) > viewport.width) {
        x = (Math.random() - 0.5) * viewport.width * 2;
      }
      if (Math.abs(y) > viewport.height) {
        y = (Math.random() - 0.5) * viewport.height * 2;
      }
      
      // Update stored position
      particles[i3] = x;
      particles[i3 + 1] = y;
      particles[i3 + 2] = z;
      
      matrix.setPosition(x, y, z);
      
      // Scale variation
      const scale = 0.5 + Math.sin(time * 0.4 + i * 0.2) * 0.3;
      matrix.scale(new Vector3(scale, scale, scale));
      
      meshRef.current.setMatrixAt(i, matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.01, 8, 6]} />
      <meshBasicMaterial 
        color="#d4af37"
        transparent
        opacity={0.3}
      />
    </instancedMesh>
  );
}
