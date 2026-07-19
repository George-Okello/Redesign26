import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.classList.contains('magnetic-interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Party Mode Sparks
      const isParty = document.documentElement.classList.contains('party-active') || document.body.classList.contains('party-active');
      if (isParty) {
        const colors = ['#ff5a09', '#39ff14', '#00ffff', '#ff007f', '#ffea00', '#9d00ff'];
        setSparks((prev) => [
          ...prev.slice(-40), // Limit total sparks
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5 - 1.5, // slight upward float
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 6 + 4,
            alpha: 1.0,
          },
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5 - 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 6 + 4,
            alpha: 1.0,
          },
        ]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Hide default cursor on desktop, but keep it for touch devices
  useEffect(() => {
    // Only apply on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      const style = document.createElement('style');
      style.innerHTML = `
        body, button, a, .cursor-pointer {
          cursor: none !important;
        }
        input, textarea {
          cursor: text !important;
        }
        canvas {
          cursor: crosshair !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  useEffect(() => {
    if (sparks.length === 0) return;
    let animId: number;
    const decay = () => {
      setSparks((prevSparks) =>
        prevSparks
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            alpha: s.alpha - 0.03,
            size: s.size * 0.96,
          }))
          .filter((s) => s.alpha > 0)
      );
      animId = requestAnimationFrame(decay);
    };
    animId = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(animId);
  }, [sparks.length]);

  if (!isVisible || !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      {/* Particle trail sparks */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="fixed rounded-full pointer-events-none z-[9997]"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            opacity: spark.alpha,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${spark.size * 1.5}px ${spark.color}`,
          }}
        />
      ))}

      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-orange-highlight mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 4 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-highlight/40 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
          mass: 0.5
        }}
      />
    </>
  );
}
