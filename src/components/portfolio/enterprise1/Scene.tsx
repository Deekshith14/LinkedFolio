
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import AnimatedParticles from './AnimatedParticles';
import FloatingShape from './FloatingShape';

interface SceneProps {
    orbitControls?: boolean;
    particles?: boolean;
    shapes?: boolean;
    lightIntensity?: number;
    cameraPosition?: [number, number, number];
    ambient?: boolean;
}

const Scene = ({
    orbitControls = false,
    particles = true,
    shapes = true,
    lightIntensity = 0.5,
    cameraPosition = [0, 0, 5],
    ambient = true
}: SceneProps) => {
    return (
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <PerspectiveCamera makeDefault fov={75} position={cameraPosition} />

            {ambient && <ambientLight intensity={lightIntensity} />}
            <directionalLight position={[10, 10, 10]} intensity={lightIntensity} />

            <Suspense fallback={null}>
                {particles && <AnimatedParticles />}

                {shapes && (
                    <>
                        <FloatingShape
                            position={[-2, -1, -3]}
                            color="#5b4dff"
                            speed={1}
                            distort={0.3}
                            scale={0.8}
                        />
                        <FloatingShape
                            position={[2, 1, -2]}
                            color="#cb5eee"
                            speed={0.7}
                            distort={0.2}
                            scale={0.6}
                            shape="torus"
                        />
                        <FloatingShape
                            position={[0, -2, -1]}
                            color="#ff3366"
                            speed={0.5}
                            distort={0.4}
                            scale={0.5}
                            shape="box"
                        />
                    </>
                )}

                <Environment preset="city" />
            </Suspense>

            {orbitControls && <OrbitControls enableZoom={false} enablePan={false} />}
        </Canvas>
    );
};

export default Scene;
