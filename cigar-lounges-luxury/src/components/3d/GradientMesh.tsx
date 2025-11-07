'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial, Vector2, Mesh } from 'three';

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({}: GradientMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec2 uResolution;
    uniform float uTime;
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

    // FBM (Fractal Brownian Motion)
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 st = vUv * 2.0 - 1.0;
      st.x *= uResolution.x / uResolution.y;
      
      // Animated noise
      vec2 q = vec2(0.0);
      q.x = fbm(st + 0.00 * uTime);
      q.y = fbm(st + vec2(1.0));
      
      vec2 r = vec2(0.0);
      r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
      r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);
      
      float f = fbm(st + r);
      
      // Color palette - luxury golds and ambers
      vec3 color1 = vec3(0.83, 0.69, 0.22); // #d4af37
      vec3 color2 = vec3(0.72, 0.45, 0.20); // #b87333
      vec3 color3 = vec3(0.80, 0.50, 0.20); // #cd7f32
      vec3 color4 = vec3(1.0, 0.84, 0.0);   // #ffd700
      
      vec3 color = mix(color1, color2, f);
      color = mix(color, color3, length(r));
      color = mix(color, color4, 0.3);
      
      // Add subtle animation
      color += sin(uTime * 0.5 + f * 10.0) * 0.05;
      
      // Fade to transparent at edges
      float alpha = 1.0 - length(st) * 0.5;
      alpha = smoothstep(0.0, 1.0, alpha);
      
      gl_FragColor = vec4(color, alpha * 0.3);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new Vector2(viewport.width, viewport.height) }
  }), [viewport.width, viewport.height]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
