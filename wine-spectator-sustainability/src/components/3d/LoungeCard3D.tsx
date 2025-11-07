'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { Text, MeshReflectorMaterial } from '@react-three/drei';
import { CigarLounge } from '@/types';
import { useMouse } from '@/hooks/useMouse';

interface LoungeCard3DProps {
  lounge: CigarLounge;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  isActive: boolean;
  onClick: () => void;
}

export function LoungeCard3D({ 
  lounge, 
  position, 
  rotation, 
  scale, 
  isActive, 
  onClick 
}: LoungeCard3DProps) {
  const meshRef = useRef<Mesh>(null);
  const mouse = useMouse();

  // Create glass material with environment mapping
  const glassMaterial = useMemo(() => ({
    transparent: true,
    opacity: 0.8,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    color: new Color(0xffffff),
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Mouse parallax effect
    const mouseInfluence = 0.3;
    const mouseX = (mouse.x - 0.5) * mouseInfluence;
    const mouseY = -(mouse.y - 0.5) * mouseInfluence;

    // Floating animation
    const floatY = Math.sin(time * 0.5 + position[0] * 0.1) * 0.05;
    
    // Hover effect
    const hoverScale = isActive ? 1.1 : scale;
    const hoverRotation = isActive ? [rotation[0], rotation[1] + mouseX * 0.2, rotation[2]] : rotation;

    meshRef.current.position.set(
      position[0] + mouseX * 0.1,
      position[1] + floatY + mouseY * 0.1,
      position[2]
    );

    meshRef.current.rotation.set(
      hoverRotation[0],
      hoverRotation[1],
      hoverRotation[2]
    );

    meshRef.current.scale.setScalar(hoverScale);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* Main Card Geometry */}
      <boxGeometry args={[2, 3, 0.1]} />
      <MeshReflectorMaterial
        {...glassMaterial}
        envMapIntensity={0.8}
        resolution={1024}
        mixBlur={1}
        mixStrength={0.5}
        roughness={0.1}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#d4af37"
        metalness={0.8}
        mirror={0.8}
      />

      {/* Card Content - Front */}
      <group position={[0, 0, 0.06]}>
        {/* Background Image Plane */}
        <mesh>
          <planeGeometry args={[1.8, 2.4]} />
          <meshBasicMaterial 
            color="#1a1a1a"
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Lounge Name */}
        <Text
          position={[0, 0.8, 0.01]}
          fontSize={0.15}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          font="/fonts/PlayfairDisplay-Bold.ttf"
          maxWidth={1.6}
        >
          {lounge.name}
        </Text>

        {/* Tagline */}
        <Text
          position={[0, 0.5, 0.01]}
          fontSize={0.08}
          color="#b87333"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.ttf"
          maxWidth={1.6}
        >
          {lounge.tagline}
        </Text>

        {/* Atmosphere Icons */}
        <group position={[0, 0.1, 0.01]}>
          <Text
            position={[-0.5, 0, 0]}
            fontSize={0.06}
            color="#f5f5dc"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Regular.ttf"
          >
            🎵 {lounge.atmosphere.music}
          </Text>
          <Text
            position={[0.5, 0, 0]}
            fontSize={0.06}
            color="#f5f5dc"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Regular.ttf"
          >
            👔 {lounge.atmosphere.dressCode}
          </Text>
        </group>

        {/* Featured Cigar Count */}
        <Text
          position={[0, -0.3, 0.01]}
          fontSize={0.07}
          color="#cd7f32"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.ttf"
        >
          {lounge.collection.featured.length} Featured Cigars
        </Text>

        {/* Location */}
        <Text
          position={[0, -0.6, 0.01]}
          fontSize={0.06}
          color="#888"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.ttf"
        >
          📍 {lounge.coordinates[0].toFixed(2)}, {lounge.coordinates[1].toFixed(2)}
        </Text>
      </group>

      {/* Card Edges - Gold Accent */}
      <group position={[0, 0, 0.05]}>
        <mesh>
          <boxGeometry args={[2.05, 0.02, 0.02]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh position={[0, -1.49, 0]}>
          <boxGeometry args={[2.05, 0.02, 0.02]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh position={[0.99, 0, 0]}>
          <boxGeometry args={[0.02, 3.05, 0.02]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh position={[-0.99, 0, 0]}>
          <boxGeometry args={[0.02, 3.05, 0.02]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      </group>

      {/* Ambient Glow */}
      {isActive && (
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[3, 4]} />
          <meshBasicMaterial 
            color="#d4af37" 
            transparent 
            opacity={0.1}
          />
        </mesh>
      )}
    </mesh>
  );
}
