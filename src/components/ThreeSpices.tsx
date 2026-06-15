import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, BakeShadows, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

function SaffronStrands({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      // Moving in a gentle circular/drifting pattern
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Scale them to look like thin strands
      dummy.scale.set(0.1, 1.5, 0.1);
      
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      // Rotate entire system slowly based on mouse position
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (state.pointer.x * Math.PI) / 4, 0.05);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, (state.pointer.y * Math.PI) / 4, 0.05);
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow receiveShadow>
      <capsuleGeometry args={[0.5, 2, 4, 8]} />
      <meshStandardMaterial color="#FF9933" roughness={0.4} metalness={0.1} />
    </instancedMesh>
  );
}

function FloatingCardamom({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      ref.current.rotation.y += 0.01;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={2} speed={2}>
      <mesh ref={ref} position={position} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        {/* Deform sphere slightly to look like cardamom pod */}
        <meshStandardMaterial color="#8B9B7B" roughness={0.8} />
      </mesh>
    </Float>
  );
}

export function ThreeSpices() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-60">
      <Canvas shadows camera={{ position: [0, 0, 100], fov: 50 }}>
        <color attach="background" args={['#111111']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#D4AF37" />
        
        <SaffronStrands count={150} />
        
        {/* A few large spices floating around */}
        <FloatingCardamom position={[20, 15, -10]} />
        <FloatingCardamom position={[-25, -5, -20]} />
        <FloatingCardamom position={[10, -20, 5]} />
        
        <directionalLight position={[0, 10, 5]} intensity={0.5} color="#FFFDD0" />
        <ContactShadows position={[0, -30, 0]} opacity={0.5} scale={100} blur={2} far={40} />
      </Canvas>
    </div>
  );
}
