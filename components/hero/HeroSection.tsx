"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 2000;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 4 + Math.random() * 3;
      
      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        targetPosition: new THREE.Vector3(
          (i % 40 - 20) * 0.25,
          (Math.floor(i / 40) % 40 - 20) * 0.25,
          (Math.floor(i / 1600) - 0.5) * 0.5
        ),
        centerPosition: new THREE.Vector3(0, 0, 0),
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const progress = (Math.sin(time * 0.2) + 1) / 2;
    const matrix = new THREE.Matrix4();
    
    // Scroll-based implosion effect
    const implosionFactor = Math.pow(scrollProgress, 2);
    
    particles.forEach((particle, i) => {
      // Base position interpolation
      const basePosition = new THREE.Vector3().lerpVectors(
        particle.position,
        particle.targetPosition,
        progress
      );
      
      // Add floating motion
      basePosition.y += Math.sin(time * particle.speed + i * 0.1) * 0.03;
      
      // Apply scroll-based implosion - pull particles to center
      const position = new THREE.Vector3().lerpVectors(
        basePosition,
        particle.centerPosition,
        implosionFactor
      );
      
      // Scale particles down as they approach center
      const baseScale = 0.02 + Math.sin(time + i * 0.1) * 0.01;
      const scale = baseScale * (1 - implosionFactor * 0.8);
      
      matrix.compose(
        position,
        new THREE.Quaternion(),
        new THREE.Vector3(scale, scale, scale)
      );
      meshRef.current.setMatrixAt(i, matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={1 - scrollProgress * 0.5}
      />
    </instancedMesh>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <ParticleField scrollProgress={scrollYProgress.get()} />
          </Canvas>
        </motion.div>
        
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 backdrop-blur-sm">
              Intelligence Core v4.0
            </span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="block text-gradient">DATA INTO</span>
            <span className="block text-white">INTELLIGENCE</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light"
          >
            Strategic synthesis for decision-makers
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-all hover:scale-105">
              Launch Workspace
            </button>
            <button className="px-8 py-4 border border-zinc-700 hover:border-zinc-600 rounded-lg font-bold transition-all hover:bg-zinc-900">
              View Demo
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-zinc-600 text-sm"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
