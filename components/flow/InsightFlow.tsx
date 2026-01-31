"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    number: "01",
    title: "Ingest",
    description: "Connect unlimited data sources. Real-time streaming or batch processing.",
    icon: "↓",
    color: "indigo",
  },
  {
    number: "02",
    title: "Analyze",
    description: "AI processes patterns, anomalies, and relationships across dimensions.",
    icon: "⚡",
    color: "violet",
  },
  {
    number: "03",
    title: "Synthesize",
    description: "Generate actionable intelligence with predictive modeling.",
    icon: "◆",
    color: "purple",
  },
];

function StageCard({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="group relative bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-12 transition-all duration-500"
      >
        <div className="absolute top-0 right-0 text-[120px] font-black text-zinc-900 leading-none p-8 opacity-50">
          {stage.number}
        </div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 text-4xl group-hover:scale-110 transition-transform">
            {stage.icon}
          </div>
          
          <h3 className="text-5xl font-black mb-6 tracking-tight">{stage.title}</h3>
          <p className="text-xl text-zinc-400 leading-relaxed">{stage.description}</p>
          
          <div className="mt-8 flex gap-4">
            <div className="px-4 py-2 bg-zinc-900 rounded-lg text-sm font-mono text-zinc-500">
              Real-time
            </div>
            <div className="px-4 py-2 bg-zinc-900 rounded-lg text-sm font-mono text-zinc-500">
              Scalable
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
      </motion.div>
      
      {index < stages.length - 1 && (
        <div className="flex justify-center my-8">
          <div className="w-px h-24 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default function InsightFlow() {
  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
            Intelligence Pipeline
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            <span className="text-gradient">Three-Stage</span>
            <br />
            <span className="text-white">Transformation</span>
          </h2>
        </motion.div>
        
        <div className="space-y-0">
          {stages.map((stage, index) => (
            <StageCard key={index} stage={stage} index={index} />
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
