import React, { useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { InsightFlow } from './components/InsightFlow.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { Signature } from './components/Signature.tsx';
import { Terminal } from './components/Terminal.tsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize Lenis with optimal settings for creative sites
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.1,
    });

    // Sync ScrollTrigger with Lenis raf
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Ensure GSAP ticker uses Lenis's time
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial reveal
    gsap.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <section id="hero" className="relative h-[250vh]">
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
        </Suspense>
      </section>

      <section id="terminal" className="relative py-40 bg-[#050505] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
             <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 backdrop-blur-sm"
              >
                Neural Query Engine
              </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold mb-8 tracking-tight"
            >
              Direct Interface.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Communicate with Xai's architectural core to synthesize complex workspace structures.
            </motion.p>
          </div>
          <Terminal />
        </div>
        {/* Subtle decorative elements for the terminal section */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      <section id="insight-flow" className="relative">
        <InsightFlow />
      </section>

      <section id="signature" className="relative py-40 bg-black overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Signature />
        </Suspense>
      </section>

      <section id="dashboard" className="relative py-40 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <span className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8 backdrop-blur-sm">
                Operational Hub
              </span>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">Command Center.</h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your high-fidelity environment for data orchestration and modeling.
            </p>
          </div>
          <Dashboard />
        </div>
      </section>

      <footer className="py-24 border-t border-zinc-900 bg-black relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-xl">X</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none">Xai</span>
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Workspace</span>
            </div>
          </div>
          <p className="text-zinc-600 text-sm font-medium">© 2024 Xai Architecture Labs. Built for Excellence.</p>
          <div className="flex gap-10 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">VCS</a>
            <a href="#" className="hover:text-white transition-colors">Core</a>
            <a href="#" className="hover:text-white transition-colors">Nodes</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;