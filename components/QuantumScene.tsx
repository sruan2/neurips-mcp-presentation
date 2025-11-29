/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box, Line } from '@react-three/drei';
import * as THREE from 'three';

// AI Brain/Core - pulsing central sphere
const AICore = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Gentle pulsing effect
      const scale = 1 + Math.sin(t * 1.5) * 0.1;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={ref} args={[0.8, 32, 32]} position={position}>
      <meshStandardMaterial
        color="#4F46E5"
        emissive="#4F46E5"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
};

// MCP Server Nodes - floating cubes representing different servers
const ServerNode = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() + delay;
      ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Box ref={ref} args={[0.4, 0.4, 0.4]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.3}
      />
    </Box>
  );
};

// Data flow particles - small spheres moving along paths
const DataParticle = ({ path, color, speed, delay }: { path: THREE.Vector3[]; color: string; speed: number; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current && path.length > 0) {
      const t = (state.clock.getElapsedTime() * speed + delay) % 1;
      const index = Math.floor(t * (path.length - 1));
      const nextIndex = Math.min(index + 1, path.length - 1);
      const localT = (t * (path.length - 1)) % 1;

      ref.current.position.lerpVectors(path[index], path[nextIndex], localT);

      // Fade in/out at start and end
      const opacity = Math.sin(t * Math.PI);
      if (ref.current.material instanceof THREE.MeshStandardMaterial) {
        ref.current.material.opacity = opacity;
      }
    }
  });

  return (
    <Sphere ref={ref} args={[0.08, 16, 16]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Connection lines between AI core and servers
const ConnectionLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
};

export const HeroScene: React.FC = () => {
  // Define server positions in a circle around the AI core
  const serverPositions: [number, number, number][] = [
    [2.5, 1, 0],
    [1.8, -1, 1.8],
    [-1.8, 1, 1.8],
    [-2.5, -1, 0],
    [-1.8, 1, -1.8],
    [1.8, -1, -1.8],
  ];

  const serverColors = ['#C5A059', '#9333EA', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  // Create paths for data particles
  const createPath = (start: [number, number, number], end: [number, number, number]) => {
    const points: THREE.Vector3[] = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.5;
      const z = start[2] + (end[2] - start[2]) * t;
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  };

  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#C5A059" />

        {/* Central AI Core */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <AICore position={[0, 0, 0]} />
        </Float>

        {/* MCP Server Nodes */}
        {serverPositions.map((pos, i) => (
          <Float key={`server-${i}`} speed={1.2 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
            <ServerNode position={pos} color={serverColors[i]} delay={i * 0.5} />
          </Float>
        ))}

        {/* Connection Lines */}
        {serverPositions.map((pos, i) => (
          <ConnectionLine key={`line-${i}`} start={[0, 0, 0]} end={pos} color={serverColors[i]} />
        ))}

        {/* Data Flow Particles - bidirectional */}
        {serverPositions.map((pos, i) => (
          <React.Fragment key={`particles-${i}`}>
            {/* Outbound particles (AI to Server) */}
            <DataParticle
              path={createPath([0, 0, 0], pos)}
              color={serverColors[i]}
              speed={0.5}
              delay={i * 0.8}
            />
            {/* Inbound particles (Server to AI) */}
            <DataParticle
              path={createPath(pos, [0, 0, 0])}
              color={serverColors[i]}
              speed={0.6}
              delay={i * 0.8 + 2}
            />
          </React.Fragment>
        ))}

        {/* Orbital ring representing MCP protocol layer */}
        <Float speed={0.5} rotationIntensity={0.1}>
          <Torus args={[3.5, 0.03, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshStandardMaterial
              color="#C5A059"
              emissive="#C5A059"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </Torus>
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={800} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, 0]} position={[0, 0.5, 0]}>
            {/* Main Cryostat Structure (Gold Chandelier) */}
            
            {/* Top Plate */}
            <Cylinder args={[1.2, 1.2, 0.1, 64]} position={[0, 1, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
            </Cylinder>
            
            {/* Middle Stage */}
            <Cylinder args={[1, 1, 0.1, 64]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
            </Cylinder>
            
            {/* Bottom Stage (Mixing Chamber) */}
            <Cylinder args={[0.6, 0.6, 0.1, 64]} position={[0, -0.6, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.15} />
            </Cylinder>

            {/* Connecting Rods */}
            <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0.5, 0.6, 0]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[-0.5, 0.6, 0]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>
             <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0, 0.6, 0.5]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>
             <Cylinder args={[0.04, 0.04, 0.8, 16]} position={[0, 0.6, -0.5]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>

             {/* Lower Rods */}
             <Cylinder args={[0.03, 0.03, 0.8, 16]} position={[0.2, -0.2, 0]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.03, 0.03, 0.8, 16]} position={[-0.2, -0.2, 0]}>
               <meshStandardMaterial color="#D1D5DB" metalness={0.8} roughness={0.2} />
            </Cylinder>

            {/* Coils/Wires - Copper colored */}
            <Torus args={[0.7, 0.015, 16, 64]} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </Torus>
             <Torus args={[0.3, 0.015, 16, 64]} position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
               <meshStandardMaterial color="#B87333" metalness={0.8} roughness={0.3} />
            </Torus>
            
            {/* Central processor chip simulation at bottom */}
            <Box args={[0.2, 0.05, 0.2]} position={[0, -0.7, 0]}>
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </Box>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}