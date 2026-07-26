import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function GlitchEffect() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const handleDblClick = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 800);
    };

    window.addEventListener('dblclick', handleDblClick);
    return () => window.removeEventListener('dblclick', handleDblClick);
  }, []);

  return (
    <AnimatePresence>
      {glitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 0.8, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'hue-rotate(0deg)'] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "linear" }}
          className="fixed inset-0 z-[999999] pointer-events-none mix-blend-difference"
        >
          {/* Glitch Bars */}
          <motion.div
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 0.2, repeat: 3 }}
            className="absolute left-0 right-0 h-[10vh] bg-red-500/30 blur-sm mix-blend-overlay"
          />
          <motion.div
            animate={{ y: ['110%', '-10%'] }}
            transition={{ duration: 0.15, repeat: 4 }}
            className="absolute left-0 right-0 h-[5vh] bg-blue-500/30 blur-sm mix-blend-overlay"
          />
          {/* Noise / Tear */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-30 mix-blend-color-dodge" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
