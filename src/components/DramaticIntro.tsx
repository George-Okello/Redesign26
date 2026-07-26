import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function DramaticIntro() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Only run intro once per session to not annoy the user too much
    if (sessionStorage.getItem('introPlayed')) {
      setStage(5);
      return;
    }
    
    sessionStorage.setItem('introPlayed', 'true');

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2200);
    const t4 = setTimeout(() => setStage(4), 2800);
    const t5 = setTimeout(() => setStage(5), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (stage >= 5) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="dramatic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[99999] bg-[#050505] text-[#fcfaf7] flex flex-col items-center justify-center font-mono overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
        }} />
        
        <div className="relative z-10 text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col gap-4 text-center">
          {stage >= 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-orange-highlight">
              [SYSTEM.BOOT] initializing primary neural pathways...
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400">
              [OVERRIDE] accessing cognitive bias matrices...
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sky-400">
              [SYNC] synchronizing swarm intelligence protocols...
            </motion.div>
          )}
          {stage >= 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-bold text-white text-sm md:text-base mt-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              ACCESS GRANTED
            </motion.div>
          )}
        </div>

        {/* Dramatic Scanline */}
        <motion.div 
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-[2px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20"
        />
      </motion.div>
    </AnimatePresence>
  );
}
