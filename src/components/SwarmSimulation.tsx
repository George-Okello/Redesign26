import { MagneticWrapper } from "./MagneticWrapper";
import React, { useEffect, useRef, useState } from 'react';

export const SwarmSimulation = React.memo(function SwarmSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [alignmentWeight, setAlignmentWeight] = useState(1.0);
  const [cohesionWeight, setCohesionWeight] = useState(1.0);
  const [separationWeight, setSeparationWeight] = useState(1.5);

  const weightsRef = useRef({ alignment: 1.0, cohesion: 1.0, separation: 1.5 });

  useEffect(() => {
    weightsRef.current = {
      alignment: alignmentWeight,
      cohesion: cohesionWeight,
      separation: separationWeight
    };
  }, [alignmentWeight, cohesionWeight, separationWeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let shockwave: { x: number, y: number, radius: number, maxRadius: number } | null = null;
    let mousePos: { x: number, y: number } | null = null;
    let isMouseDown = false;

    // Responsive boid count for optimal performance
    const isMobile = window.innerWidth < 768;
    const numBoids = isMobile ? 80 : 140;
    const visualRange = 60;
    const visualRangeSq = visualRange * visualRange; // 3600
    const separationRangeSq = 400; // 20 * 20
    const maxSpeed = 4.0;
    const cellSize = visualRange;

    class Boid {
      x: number;
      y: number;
      dx: number;
      dy: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.color = 'rgba(252, 250, 247, 0.7)';
      }
    }

    let boids: Boid[] = [];

    const initBoids = () => {
      boids = [];
      const width = canvas.width / (window.devicePixelRatio > 1 ? Math.min(window.devicePixelRatio, 2) : 1);
      const height = canvas.height / (window.devicePixelRatio > 1 ? Math.min(window.devicePixelRatio, 2) : 1);
      for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(width || 800, height || 500));
      }
    };

    const getCanvasCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      shockwave = { x, y, radius: 0, maxRadius: 300 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = getCanvasCoords(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      isMouseDown = true;
      if (e.touches.length > 0) {
        const { x, y } = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
        mousePos = { x, y };
        shockwave = { x, y, radius: 0, maxRadius: 200 };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      if (e.touches.length > 0) {
        mousePos = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseDown = false;
      mousePos = null;
    };

    const handleMouseLeave = () => {
      mousePos = null;
      isMouseDown = false;
    };

    const handleMouseDown = () => { isMouseDown = true; };
    const handleMouseUp = () => { isMouseDown = false; };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.scale(dpr, dpr);
      }
      initBoids();
    };

    const draw = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : canvas.width;
      const height = parent ? parent.clientHeight : canvas.height;

      // Trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const weights = weightsRef.current;

      // Spatial Grid partitioning for O(N) neighbor searching
      const cols = Math.max(1, Math.ceil(width / cellSize));
      const rows = Math.max(1, Math.ceil(height / cellSize));
      const grid: Boid[][] = Array.from({ length: cols * rows }, () => []);

      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        const col = Math.min(cols - 1, Math.max(0, Math.floor(b.x / cellSize)));
        const row = Math.min(rows - 1, Math.max(0, Math.floor(b.y / cellSize)));
        grid[row * cols + col].push(b);
      }

      if (shockwave) {
        ctx.beginPath();
        ctx.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(252, 250, 247, ${1 - shockwave.radius / shockwave.maxRadius})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        shockwave.radius += 15;
        if (shockwave.radius >= shockwave.maxRadius) shockwave = null;
      }

      if (mousePos) {
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, isMouseDown ? 80 : 40, 0, Math.PI * 2);
        ctx.fillStyle = isMouseDown ? 'rgba(252, 250, 247, 0.05)' : 'rgba(252, 250, 247, 0.02)';
        ctx.fill();
        ctx.strokeStyle = isMouseDown ? 'rgba(252, 250, 247, 0.2)' : 'rgba(252, 250, 247, 0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Batched quantum gravity web tether lines
        ctx.beginPath();
        ctx.strokeStyle = isMouseDown ? 'rgba(244, 63, 94, 0.3)' : 'rgba(14, 165, 233, 0.2)';
        ctx.lineWidth = isMouseDown ? 1.0 : 0.6;

        const mX = mousePos.x;
        const mY = mousePos.y;
        for (let i = 0; i < boids.length; i++) {
          const b = boids[i];
          const dx = b.x - mX;
          const dy = b.y - mY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 40000) { // 200^2
            ctx.moveTo(mX, mY);
            ctx.lineTo(b.x, b.y);
          }
        }
        ctx.stroke();
      }

      for (let i = 0; i < boids.length; i++) {
        const boid = boids[i];
        boid.color = 'rgba(252, 250, 247, 0.6)';

        // Find neighbors using spatial grid (3x3 cell neighborhood)
        const bCol = Math.min(cols - 1, Math.max(0, Math.floor(boid.x / cellSize)));
        const bRow = Math.min(rows - 1, Math.max(0, Math.floor(boid.y / cellSize)));

        let centerX = 0, centerY = 0, numNeighbors = 0;
        let moveX = 0, moveY = 0;
        let avgDX = 0, avgDY = 0;

        const minC = Math.max(0, bCol - 1);
        const maxC = Math.min(cols - 1, bCol + 1);
        const minR = Math.max(0, bRow - 1);
        const maxR = Math.min(rows - 1, bRow + 1);

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const cellBoids = grid[r * cols + c];
            for (let j = 0; j < cellBoids.length; j++) {
              const other = cellBoids[j];
              if (other === boid) continue;

              const dx = other.x - boid.x;
              const dy = other.y - boid.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < visualRangeSq) {
                centerX += other.x;
                centerY += other.y;
                avgDX += other.dx;
                avgDY += other.dy;
                numNeighbors++;
              }
              if (distSq < separationRangeSq) {
                moveX -= dx;
                moveY -= dy;
              }
            }
          }
        }

        if (numNeighbors > 0) {
          centerX /= numNeighbors;
          centerY /= numNeighbors;
          boid.dx += (centerX - boid.x) * 0.005 * weights.alignment; // using alignment/cohesion factors
          boid.dy += (centerY - boid.y) * 0.005 * weights.cohesion;

          avgDX /= numNeighbors;
          avgDY /= numNeighbors;
          boid.dx += (avgDX - boid.dx) * 0.05 * weights.alignment;
          boid.dy += (avgDY - boid.dy) * 0.05 * weights.alignment;
        }

        boid.dx += moveX * 0.05 * weights.separation;
        boid.dy += moveY * 0.05 * weights.separation;

        // Interaction with shockwave
        if (shockwave) {
          const dx = boid.x - shockwave.x;
          const dy = boid.y - shockwave.y;
          const distSq = dx * dx + dy * dy;
          const r = shockwave.radius;
          const minR = r - 30;
          const maxR = r + 30;
          if (distSq > minR * minR && distSq < maxR * maxR) {
            boid.dx += dx * 0.02;
            boid.dy += dy * 0.02;
            boid.color = 'rgba(255, 100, 100, 1)';
          }
        }

        // Interaction with cursor / attraction field
        if (mousePos) {
          const dx = boid.x - mousePos.x;
          const dy = boid.y - mousePos.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 62500) { // 250^2
            const dist = Math.sqrt(distSq);
            boid.color = `rgba(252, 250, 247, ${1 - dist / 250})`;
            if (isMouseDown) {
              // Vortex effect
              const angle = Math.atan2(dy, dx);
              boid.dx += Math.cos(angle + Math.PI / 2) * 0.5;
              boid.dy += Math.sin(angle + Math.PI / 2) * 0.5;
              boid.dx -= dx * 0.02;
              boid.dy -= dy * 0.02;
            } else {
              // Gentle attraction field
              boid.dx -= dx * 0.002;
              boid.dy -= dy * 0.002;
            }
          }
        }

        // Limit speed
        const speedSq = boid.dx * boid.dx + boid.dy * boid.dy;
        const currentMaxSpeed = (mousePos && isMouseDown) ? maxSpeed * 2 : maxSpeed;
        const maxSpeedSq = currentMaxSpeed * currentMaxSpeed;

        if (speedSq > maxSpeedSq) {
          const speed = Math.sqrt(speedSq);
          boid.dx = (boid.dx / speed) * currentMaxSpeed;
          boid.dy = (boid.dy / speed) * currentMaxSpeed;
        }

        // Keep in bounds
        const margin = 40;
        const turnFactor = 0.5;
        if (boid.x < margin) boid.dx += turnFactor;
        if (boid.x > width - margin) boid.dx -= turnFactor;
        if (boid.y < margin) boid.dy += turnFactor;
        if (boid.y > height - margin) boid.dy -= turnFactor;

        boid.x += boid.dx;
        boid.y += boid.dy;

        // Optimized boid shape drawing (No Canvas Matrix stack calls)
        const curSpeedSq = boid.dx * boid.dx + boid.dy * boid.dy;
        const invSpeed = curSpeedSq > 0.0001 ? 1 / Math.sqrt(curSpeedSq) : 1;
        const ux = boid.dx * invSpeed;
        const uy = boid.dy * invSpeed;
        const vx = -uy;
        const vy = ux;

        ctx.beginPath();
        ctx.moveTo(boid.x + ux * 10, boid.y + uy * 10);
        ctx.lineTo(boid.x - ux * 5 + vx * 5, boid.y - uy * 5 + vy * 5);
        ctx.lineTo(boid.x - ux * 3, boid.y - uy * 3);
        ctx.lineTo(boid.x - ux * 5 - vx * 5, boid.y - uy * 5 - vy * 5);
        ctx.closePath();
        ctx.fillStyle = boid.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full h-[350px] md:h-[500px] relative bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]/10 overflow-hidden shadow-2xl group">
        <div className="absolute top-4 left-4 right-4 md:right-auto md:top-6 md:left-6 z-10 flex flex-col gap-1 mix-blend-difference pointer-events-none text-[#fcfaf7]">
          <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest leading-tight">Attractor Field<span className="hidden md:inline"> (Separation, Alignment, Cohesion)</span></h3>
          <p className="text-[8px] md:text-[10px] uppercase tracking-wider opacity-60">Hover/touch to attract • Hold/press to form vortex</p>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-auto md:top-6 md:right-6 z-10 flex flex-col md:flex-row items-end md:items-center gap-1.5 md:gap-4 mix-blend-difference pointer-events-none text-[#fcfaf7] text-right">
          <div className="flex items-center gap-1.5 text-[8px] md:text-[9.5px] uppercase tracking-wider font-mono opacity-85">
            <span className="hidden md:inline w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Separation: {separationWeight.toFixed(1)}</span>
            <span className="inline md:hidden w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-[8px] md:text-[9.5px] uppercase tracking-wider font-mono opacity-85">
            <span className="hidden md:inline w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>Alignment: {alignmentWeight.toFixed(1)}</span>
            <span className="inline md:hidden w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 text-[8px] md:text-[9.5px] uppercase tracking-wider font-mono opacity-85">
            <span className="hidden md:inline w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cohesion: {cohesionWeight.toFixed(1)}</span>
            <span className="inline md:hidden w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 block w-full h-full cursor-crosshair touch-none"
        />
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-2 border border-[#1a1a1a]/10 p-1.5 md:p-2 rounded-2xl md:rounded-full w-full md:w-fit mx-auto mb-2">
        <MagneticWrapper><button 
          onClick={() => { setAlignmentWeight(1.0); setCohesionWeight(1.0); setSeparationWeight(1.5); }}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${alignmentWeight === 1.0 && cohesionWeight === 1.0 && separationWeight === 1.5 ? 'bg-[#1a1a1a] text-white shadow-md' : 'hover:bg-[#1a1a1a]/5 text-[#4a4a4a]'}`}
        >
          Balanced
        </button></MagneticWrapper>
        <MagneticWrapper><button 
          onClick={() => { setAlignmentWeight(1.5); setCohesionWeight(0.5); setSeparationWeight(2.5); }}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${alignmentWeight === 1.5 && cohesionWeight === 0.5 && separationWeight === 2.5 ? 'bg-[#1a1a1a] text-white shadow-md' : 'hover:bg-[#1a1a1a]/5 text-[#4a4a4a]'}`}
        >
          Predator-Prey
        </button></MagneticWrapper>
        <MagneticWrapper><button 
          onClick={() => { setAlignmentWeight(0.5); setCohesionWeight(2.5); setSeparationWeight(0.5); }}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${alignmentWeight === 0.5 && cohesionWeight === 2.5 && separationWeight === 0.5 ? 'bg-[#1a1a1a] text-white shadow-md' : 'hover:bg-[#1a1a1a]/5 text-[#4a4a4a]'}`}
        >
          Aggregation
        </button></MagneticWrapper>
        <MagneticWrapper><button 
          onClick={() => { setAlignmentWeight(0.2); setCohesionWeight(0.1); setSeparationWeight(3.0); }}
          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 ${alignmentWeight === 0.2 && cohesionWeight === 0.1 && separationWeight === 3.0 ? 'bg-[#1a1a1a] text-white shadow-md' : 'hover:bg-[#1a1a1a]/5 text-[#4a4a4a]'}`}
        >
          Dynamic Dispersion
        </button></MagneticWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] flex justify-between">
            <span>ALIGNMENT</span>
            <span>{alignmentWeight.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="0" max="3" step="0.1" 
            value={alignmentWeight} onChange={(e) => setAlignmentWeight(parseFloat(e.target.value))}
            className="w-full accent-[#1a1a1a]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] flex justify-between">
            <span>COHESION</span>
            <span>{cohesionWeight.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="0" max="3" step="0.1" 
            value={cohesionWeight} onChange={(e) => setCohesionWeight(parseFloat(e.target.value))}
            className="w-full accent-[#1a1a1a]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] flex justify-between">
            <span>SEPARATION</span>
            <span>{separationWeight.toFixed(1)}</span>
          </label>
          <input 
            type="range" min="0" max="3" step="0.1" 
            value={separationWeight} onChange={(e) => setSeparationWeight(parseFloat(e.target.value))}
            className="w-full accent-[#1a1a1a]"
          />
        </div>
      </div>
    </div>
  );
});
