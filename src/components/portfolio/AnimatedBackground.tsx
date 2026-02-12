import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
}

const AnimatedSphere = ({ position, color, speed, distort }: AnimatedSphereProps) => {
  const mesh = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (mesh.current) {
      gsap.to(mesh.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(mesh.current.position, {
        y: position[1] + 0.5,
        duration: 2 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, [position]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001 * speed;
      mesh.current.rotation.z += 0.001 * speed;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const FallbackGradient = () => (
  <div className="absolute inset-0 -z-10 opacity-60 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-blue-500/30"></div>
);

const AnimatedBackground: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleContextLoss = () => {
      console.warn('WebGL context lost - falling back to gradient');
      setHasError(true);
    };

    window.addEventListener('webglcontextlost', handleContextLoss, false);
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLoss, false);
    };
  }, []);

  if (!hasMounted || hasError) {
    return <FallbackGradient />;
  }

  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Suspense fallback={<FallbackGradient />}>
        <Canvas
          gl={{ preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 15] }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0xffffff), 0);
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere position={[-4, 2, -5]} color="#4f46e5" speed={1} distort={0.4} />
          <AnimatedSphere position={[4, -2, -10]} color="#8b5cf6" speed={0.5} distort={0.3} />
          <AnimatedSphere position={[-2, -3, -8]} color="#3b82f6" speed={0.8} distort={0.2} />
          <AnimatedSphere position={[3, 3, -12]} color="#6366f1" speed={0.7} distort={0.5} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default AnimatedBackground;
