import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const InteractionCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const shellRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // High-precision mouse tracking with damping
      const targetRotateX = state.mouse.y * 0.5;
      const targetRotateY = state.mouse.x * 0.5;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotateX, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotateY, 0.1);
      
      const s = hovered ? 1.5 : 1.3;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
    
    if (shellRef.current) {
      shellRef.current.rotation.z = time * 0.2;
      shellRef.current.rotation.y = -time * 0.1;
    }
  });

  return (
    <group>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Fluid Geometry */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <icosahedronGeometry args={[2.5, 32]} />
          <MeshDistortMaterial
            color={hovered ? "#6366f1" : "#111111"}
            speed={4}
            distort={0.45}
            radius={1}
            transparent
            opacity={0.85}
            metalness={1}
            roughness={0.05}
          />
        </mesh>
        
        {/* Outer Atmospheric Shell */}
        <mesh ref={shellRef} scale={3.2}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial 
            color="#6366f1" 
            wireframe 
            transparent 
            opacity={0.08} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
      
      {/* Dynamic Lighting */}
      <pointLight position={[10, 10, 10]} intensity={12} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={6} color="#ffffff" />
      <spotLight position={[0, 15, 0]} intensity={2} color="#6366f1" />
    </group>
  );
};

export const Signature: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-40 flex flex-col lg:flex-row items-center gap-24 relative z-10">
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400">Interaction Engine</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-none">
            FLUID<br /><span className="text-zinc-500 italic">LOGIC.</span>
          </h2>
          
          <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-lg mb-12">
            The Xai core adapts its topology based on user intent. A neural-mesh mapping system that responds to movement in real-time.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-white uppercase tracking-widest">Responsiveness</div>
              <div className="text-zinc-700 text-xs">Sub-millisecond latency in geometric transformation.</div>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-white uppercase tracking-widest">Adaptability</div>
              <div className="text-zinc-700 text-xs">Topology dynamically reshapes to highlight critical clusters.</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 w-full aspect-square relative group">
        <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[160px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
          <Environment preset="night" />
          <InteractionCore />
        </Canvas>
        
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90">
          <span className="text-[8px] font-mono text-zinc-900 uppercase tracking-[1em]">Engine_Core_Active</span>
        </div>
      </div>
    </div>
  );
};