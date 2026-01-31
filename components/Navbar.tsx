'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-8 py-6 md:px-16 md:py-10"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-black font-black text-xl leading-none">X</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tighter leading-none">Xai</span>
          <span className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-black">Workspace</span>
        </div>
      </div>
      <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
        Request Access
      </button>
    </motion.nav>
  );
};