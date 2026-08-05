import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shockwaves, setShockwaves] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let animId: number;
    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const ring = { x: -100, y: -100 };
    let visible = false;

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
    };
    const sparks: Spark[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      if (!visible) {
        visible = true;
        setIsVisible(true);
      }

      // Check hover over interactive elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (
          target.tagName?.toLowerCase() === 'button' ||
          target.tagName?.toLowerCase() === 'a' ||
          target.closest?.('button') ||
          target.closest?.('a') ||
          (target.nodeType === Node.ELEMENT_NODE && window.getComputedStyle(target).cursor === 'pointer') ||
          target.classList?.contains('magnetic-interactive')
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Add particle sparks directly to ref array without React re-renders
      const isParty = document.documentElement.classList.contains('party-active') || document.body.classList.contains('party-active');
      const isNeon = document.documentElement.classList.contains('neon-active') || document.body.classList.contains('neon-active');

      if (isParty) {
        const colors = ['#ff5a09', '#39ff14', '#00ffff', '#ff007f', '#ffea00', '#9d00ff'];
        if (sparks.length < 50) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 5 + 3,
            alpha: 1.0,
          });
        }
      } else {
        if (sparks.length < 25) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: isNeon ? '#39ff14' : '#ff5a09',
            size: Math.random() * 2 + 1,
            alpha: 0.5,
          });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const isNeon = document.documentElement.classList.contains('neon-active') || document.body.classList.contains('neon-active');
      const isParty = document.documentElement.classList.contains('party-active') || document.body.classList.contains('party-active');
      
      let baseColor = 'rgba(255, 90, 9, 0.8)';
      if (isNeon) baseColor = 'rgba(57, 255, 20, 0.8)';
      if (isParty) {
        const colors = ['rgba(255, 90, 9, 0.8)', 'rgba(57, 255, 20, 0.8)', 'rgba(0, 255, 255, 0.8)', 'rgba(255, 0, 127, 0.8)', 'rgba(255, 234, 0, 0.8)', 'rgba(157, 0, 255, 0.8)'];
        baseColor = colors[Math.floor(Math.random() * colors.length)];
      }

      const id = Date.now() + Math.random();
      setShockwaves(prev => [...prev, { id, x: e.clientX, y: e.clientY, color: baseColor }]);

      setTimeout(() => {
        setShockwaves(prev => prev.filter(s => s.id !== id));
      }, 1200);
    };

    const handleMouseLeave = () => {
      visible = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // High performance RAF loop updating DOM transforms & canvas rendering directly
    const updateLoop = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.5;
      mouse.y += (mouse.targetY - mouse.y) * 0.5;

      ring.x += (mouse.targetX - ring.x) * 0.2;
      ring.y += (mouse.targetY - ring.y) * 0.2;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouse.x - 6}px, ${mouse.y - 6}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ring.x - 16}px, ${ring.y - 16}px, 0)`;
      }

      // Draw sparks on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= 0.03;
            s.size *= 0.96;

            if (s.alpha <= 0) {
              sparks.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, Math.max(0.5, s.size), 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = Math.max(0, s.alpha);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animId = requestAnimationFrame(updateLoop);
    };

    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Hide default cursor on desktop
  useEffect(() => {
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

  if (!window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      <AnimatePresence>
        {shockwaves.map((wave) => (
          <motion.div
            key={wave.id}
            initial={{ scale: 0, opacity: 1, borderWidth: '8px' }}
            animate={{ scale: 40, opacity: 0, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed rounded-full pointer-events-none z-[9996]"
            style={{
              left: wave.x,
              top: wave.y,
              width: '20px',
              height: '20px',
              borderColor: wave.color,
              borderStyle: 'solid',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 40px ${wave.color}, inset 0 0 20px ${wave.color}`,
              mixBlendMode: 'screen'
            }}
          />
        ))}
      </AnimatePresence>

      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-3 h-3 rounded-full bg-orange-highlight mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100 ease-out ${
          isHovering ? 'scale-[4]' : 'scale-100'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-highlight/40 pointer-events-none z-[9998] transition-opacity duration-150 ease-out ${
          isHovering ? 'scale-[1.5] opacity-0' : 'scale-100 opacity-100'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
