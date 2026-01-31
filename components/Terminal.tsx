"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  PerspectiveCamera,
  Center,
  Float,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const Scene = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center>
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[2.5, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={16}
              resolution={512}
              transmission={1}
              roughness={0.05}
              thickness={1.5}
              ior={1.45}
              chromaticAberration={0.08}
              anisotropy={0.1}
              color="#ffffff"
            />
          </mesh>
        </Center>
      </Float>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={20} color="#6366f1" />
    </>
  );
};

export const Hero = () => {
  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={30} />
          <Scene />
        </Canvas>
      </div>
      <div className="relative z-10 text-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] font-black tracking-tighter leading-[0.8] mb-12">
            INTELLIGENCE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800">
              UNBOUND.
            </span>
          </h1>
          <div className="flex justify-center gap-24 mt-20">
            <div className="text-left">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                System Load
              </span>
              <span className="text-2xl font-black font-mono">14.2%</span>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                Neural Link
              </span>
              <span className="text-2xl font-black font-mono">ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
