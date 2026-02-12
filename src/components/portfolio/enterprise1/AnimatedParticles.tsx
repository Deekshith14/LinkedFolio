
import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const particleCount = 2000;

interface AnimatedParticlesProps {
    color?: string;
    size?: number;
    spread?: number;
}

const AnimatedParticles = ({
    color = '#5b4dff',
    size = 0.015,
    spread = 4
}: AnimatedParticlesProps) => {
    const points = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    // Generate random positions for particles
    const positions = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * spread;
            positions[i3 + 1] = (Math.random() - 0.5) * spread;
            positions[i3 + 2] = (Math.random() - 0.5) * spread;
        }

        return positions;
    }, [spread]);

    // Generate some random sizes
    const sizes = useMemo(() => {
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            sizes[i] = Math.random();
        }

        return sizes;
    }, []);

    // Animation
    useFrame((state) => {
        if (!points.current) return;

        // Make particles move slightly
        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Move particles slightly based on time
            positions[i3] += Math.sin(state.clock.elapsedTime * 0.1 + i * 0.01) * 0.001;
            positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.1 + i * 0.01) * 0.001;

            // React to mouse movement
            const mouseX = (mouse.x * viewport.width) / 2;
            const mouseY = (mouse.y * viewport.height) / 2;

            const dx = mouseX - positions[i3];
            const dy = mouseY - positions[i3 + 1];
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                positions[i3] += dx * 0.01;
                positions[i3 + 1] += dy * 0.01;
            }
        }

        points.current.geometry.attributes.position.needsUpdate = true;

        // Rotate the entire particle system
        points.current.rotation.x = state.clock.elapsedTime * 0.05;
        points.current.rotation.y = state.clock.elapsedTime * 0.03;
    });

    useEffect(() => {
        if (!points.current) return;

        // Initial animation
        gsap.from(points.current.rotation, {
            x: -Math.PI / 4,
            y: Math.PI / 4,
            duration: 2,
            ease: "power2.out"
        });

        gsap.from(points.current.position, {
            z: -10,
            duration: 2,
            ease: "power2.out"
        });
    }, []);

    return (
        <Points ref={points} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

export default AnimatedParticles;
