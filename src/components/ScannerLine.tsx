import React from 'react';
import { motion } from 'motion/react';

export function ScannerLine() {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 z-[150] h-[2px] opacity-20 mix-blend-screen"
      style={{
        background: 'linear-gradient(to right, transparent, var(--color-orange-highlight), transparent)',
        boxShadow: '0 0 20px 2px var(--color-orange-highlight)'
      }}
      initial={{ top: '-10%' }}
      animate={{ top: '110%' }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 5
      }}
    />
  );
}
