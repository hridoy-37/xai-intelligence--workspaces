"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function DataNode({ position, color, index }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y += Math.sin(time * 2 + index) * 0.002;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function DataCluster() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    const scale = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  const nodes = [];
  const layers = 5;
  const nodesPerLayer = 12;
  
  for (let layer = 0; layer < layers; layer++) {
    for (let i = 0; i < nodesPerLayer; i++) {
      const angle = (i / nodesPerLayer) * Math.PI * 2;
      const radius = 1 + layer * 0.4;
      const y = (layer - 2) * 0.5;
      
      nodes.push({
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ],
        color: layer % 2 === 0 ? "#6366f1" : "#8b5cf6",
        index: layer * nodesPerLayer + i,
      });
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {nodes.map((node, i) => (
        <DataNode key={i} {...node} />
      ))}
      
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.05}
        />
      </Sphere>
      
      <pointLight position={[5, 5, 5]} intensity={2} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
    </group>
  );
}

export default function SignatureInteraction() {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
              Neural Architecture
            </span>
            
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              <span className="text-white">Dynamic</span>
              <br />
              <span className="text-gradient">Data Mesh</span>
            </h2>
            
            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Real-time 3D visualization of your data topology. Watch as relationships form, 
              patterns emerge, and insights crystallize through interactive exploration.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div>
                <div className="text-4xl font-black mb-2">60+</div>
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider">
                  Data Nodes
                </div>
              </div>
              <div>
                <div className="text-4xl font-black mb-2">5</div>
                <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider">
                  Hierarchy Levels
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-sm font-mono text-indigo-400">
                Interactive
              </div>
              <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm font-mono text-purple-400">
                Real-time
              </div>
              <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-mono text-zinc-500">
                WebGL
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden"
          >
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <ambientLight intensity={0.2} />
              <DataCluster />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-3">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">
                Status
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono text-green-400">Live</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-3">
              <div className="text-xs text-zinc-500 font-mono">
                Drag to rotate • Scroll to zoom
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
