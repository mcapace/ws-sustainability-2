'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Mesh } from 'three';
import { useTexture } from '@react-three/drei';

interface ImageDissolveProps {
  imageUrl: string;
  progress: number; // 0 to 1
}

export function ImageDissolve({ imageUrl, progress }: ImageDissolveProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.progress.value = progress;
  }, [progress]);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float progress;
    uniform float time;
    varying vec2 vUv;

    // Noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Smooth noise
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec4 color = texture2D(uTexture, vUv);
      
      // Create dissolve pattern
      vec2 noiseCoord = vUv * 10.0;
      float noiseValue = noise(noiseCoord + time * 0.1);
      
      // Create wave-like dissolve
      float wave = sin(vUv.x * 20.0 + time * 2.0) * 0.1;
      float dissolve = smoothstep(progress - 0.1, progress + 0.1, noiseValue + wave);
      
      // Add edge glow
      float edge = 1.0 - smoothstep(progress - 0.05, progress + 0.05, noiseValue + wave);
      vec3 glowColor = vec3(0.83, 0.69, 0.22); // Gold color
      
      vec3 finalColor = mix(glowColor * edge, color.rgb, dissolve);
      float alpha = mix(edge, 1.0, dissolve);
      
      gl_FragColor = vec4(finalColor, alpha * color.a);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 3]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          progress: { value: progress },
          time: { value: 0 }
        }}
        transparent
      />
    </mesh>
  );
}
