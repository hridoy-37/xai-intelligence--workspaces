'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stages = [
  { id: 1, label: "PHASE_01", title: "Ingest Data", description: "Multi-modal ingestion pipeline." },
  { id: 2, label: "PHASE_02", title: "Analyze AI", description: "Multi-context vector mapping." },
  { id: 3, label: "PHASE_03", title: "Synthesis", description: "Actionable strategic intelligence." }
];

export const InsightFlow: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.insight-panel');
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${triggerRef.current?.offsetWidth}`,
        }
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="bg-black py-40 overflow-hidden border-t border-white/5">
      <div ref={containerRef} className="flex flex-nowrap w-[300%] h-[60vh]">
        {stages.map((stage) => (
          <div key={stage.id} className="insight-panel w-full px-24 flex items-center">
            <div className="max-w-4xl">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.4em] mb-4">{stage.label}</div>
              <h3 className="text-7xl font-bold tracking-tighter mb-6">{stage.title}</h3>
              <p className="text-xl text-zinc-400 font-medium leading-relaxed">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};