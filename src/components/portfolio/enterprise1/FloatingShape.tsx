
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FloatingShapeProps {
    position?: [number, number, number];
    color?: string;
    speed?: number;
    distort?: number;
    scale?: number;
    shape?: 'sphere' | 'torus' | 'box';
}

const FloatingShape = ({
    position = [0, 0, 0],
    color = '#5b4dff',
    speed = 1,
    distort = 0.4,
    scale = 1,
    shape = 'sphere'
}: FloatingShapeProps) => {
    const mesh = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!mesh.current) return;

        // Initial animation
        gsap.to(mesh.current.position, {
            y: position[1] + 0.2,
            duration: 2 + Math.random(),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        gsap.to(mesh.current.rotation, {
            y: Math.PI * 2,
            duration: 20 / speed,
            ease: 'none',
            repeat: -1
        });
    }, [position, speed]);

    useFrame(() => {
        if (!mesh.current) return;

        // Subtle continuous rotation
        mesh.current.rotation.x += 0.001 * speed;
        mesh.current.rotation.z += 0.001 * speed;
    });

    const getGeometry = () => {
        switch (shape) {
            case 'torus':
                return <torusGeometry args={[1, 0.3, 16, 32]} />;
            case 'box':
                return <boxGeometry args={[1, 1, 1]} />;
            case 'sphere':
            default:
                return <sphereGeometry args={[1, 64, 64]} />;
        }
    };

    return (
        <mesh ref={mesh} position={position} scale={scale}>
            {getGeometry()}
            <MeshDistortMaterial
                color={color}
                distort={distort}
                speed={0.5}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
};

export default FloatingShape;
