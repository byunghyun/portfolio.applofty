import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  // Create circular star texture
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;

    // Create radial gradient for circular glow
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1250 * 3);
    for (let i = 0; i < 1250; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  // Generate random sizes for each star
  const starSizes = useMemo(() => {
    const sizes = new Float32Array(1250);
    for (let i = 0; i < 1250; i++) {
      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    return sizes;
  }, []);

  // Generate random lifecycle properties
  const starLifecycles = useMemo(() => {
    const lifecycles = new Float32Array(1250 * 3); // [speed, offset, duration]
    for (let i = 0; i < 1250; i++) {
      lifecycles[i * 3] = Math.random() * 0.2 + 0.15; // speed (even slower)
      lifecycles[i * 3 + 1] = Math.random() * Math.PI * 2; // offset
      lifecycles[i * 3 + 2] = Math.random() * 6 + 4; // duration (much longer: 4-10s)
    }
    return lifecycles;
  }, []);

  // Animate twinkling and fading
  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      const sizes = starsRef.current.geometry.attributes.size
        .array as Float32Array;
      const positions = starsRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 1250; i++) {
        const baseSize = starSizes[i];
        const speed = starLifecycles[i * 3];
        const offset = starLifecycles[i * 3 + 1];
        const duration = starLifecycles[i * 3 + 2];

        // Very gentle twinkle effect
        const twinkle = Math.sin(time * speed * 1.5 + offset) * 0.15 + 0.85;

        // Very smooth fade in/out cycle
        const lifecycle = ((time * speed + offset) % duration) / duration;
        let fade = 1;

        if (lifecycle < 0.15) {
          // Quick fade in (15% of lifecycle)
          fade = lifecycle / 0.15;
          // Ease in using sine curve
          fade = Math.sin(fade * Math.PI * 0.5);
        } else if (lifecycle > 0.3) {
          // Ultra slow fade out (70% of lifecycle)
          const fadeProgress = (1 - lifecycle) / 0.7;
          // Very smooth exponential-like fade out
          fade = Math.pow(fadeProgress, 0.3);
        }

        // Respawn at random position during very deep fade
        if (lifecycle > 0.95 && lifecycle < 0.96) {
          positions[i * 3] = (Math.random() - 0.5) * 100;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }

        sizes[i] = baseSize * twinkle * fade;
      }

      starsRef.current.geometry.attributes.size.needsUpdate = true;
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          args={[starPositions, 3]}
        />
        <bufferAttribute attach='attributes-size' args={[starSizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation={true}
        color='#ffffff'
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        map={starTexture}
        depthWrite={false}
      />
    </points>
  );
}

export default function StarField() {
  return (
    <div className='fixed inset-0 z-10 '>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
      >
        <color attach='background' args={['#171725']} />
        <Stars />
      </Canvas>
    </div>
  );
}
