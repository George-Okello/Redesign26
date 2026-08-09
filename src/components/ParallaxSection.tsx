import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.1 to 0.1 for subtle depth
  className?: string;
  id?: string;
}

export function ParallaxSection({
  children,
  speed = 0.08,
  className = '',
  id
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Calculate smooth subtle vertical offset transform
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  // Mouse-based subtle 3D tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [1.5, -1.5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-1.5, 1.5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to 0 -> 1 based on screen size
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef} 
      id={id} 
      className={`relative overflow-visible ${className}`}
      style={{ perspective: 1500 }}
    >
      <motion.div 
        style={{ 
          y,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }} 
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
