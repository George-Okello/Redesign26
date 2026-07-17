import { useEffect, useRef, useState } from 'react';

export function SwarmSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [alignmentWeight, setAlignmentWeight] = useState(1.0);
  const [cohesionWeight, setCohesionWeight] = useState(1.0);
  const [separationWeight, setSeparationWeight] = useState(1.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let boids: Boid[] = [];
    let animationFrameId: number;
    let shockwave: { x: number, y: number, radius: number, maxRadius: number } | null = null;
    let mousePos: { x: number, y: number } | null = null;
    let isMouseDown = false;

    const numBoids = 150;
    const visualRange = 60;
    const maxSpeed = 4.0;

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

    const initBoids = () => {
      boids = [];
      for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid(canvas.width, canvas.height));
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      shockwave = { x, y, radius: 0, maxRadius: 300 };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mousePos = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      isMouseDown = true;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX - rect.left) * scaleX;
        const y = (e.touches[0].clientY - rect.top) * scaleY;
        mousePos = { x, y };
        shockwave = { x, y, radius: 0, maxRadius: 200 };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX - rect.left) * scaleX;
        const y = (e.touches[0].clientY - rect.top) * scaleY;
        mousePos = { x, y };
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

    const distance = (boid1: { x: number, y: number }, boid2: { x: number, y: number }) => {
      return Math.sqrt((boid1.x - boid2.x) ** 2 + (boid1.y - boid2.y) ** 2);
    };

    const drawBoid = (ctx: CanvasRenderingContext2D, boid: Boid) => {
      const angle = Math.atan2(boid.dy, boid.dx);
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-5, 5);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-5, -5);
      ctx.closePath();
      
      ctx.fillStyle = boid.color;
      ctx.fill();
      
      ctx.rotate(-angle);
      ctx.translate(-boid.x, -boid.y);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      initBoids();
    };

    const draw = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
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

        // Draw futuristic quantum gravity web tether lines to nearby boids!
        boids.forEach(b => {
          const dist = distance(b, mousePos!);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(mousePos!.x, mousePos!.y);
            ctx.lineTo(b.x, b.y);
            // Alpha increases as distance decreases
            const alpha = (1 - dist / 200) * (isMouseDown ? 0.35 : 0.15);
            ctx.strokeStyle = isMouseDown ? `rgba(244, 63, 94, ${alpha})` : `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.5 + (1 - dist / 200) * 1.2;
            ctx.stroke();
          }
        });
      }

      for (let boid of boids) {
        boid.color = 'rgba(252, 250, 247, 0.6)';
        
        // Cohesion
        let centerX = 0, centerY = 0, numNeighbors = 0;
        let moveX = 0, moveY = 0;
        let avgDX = 0, avgDY = 0;

        for (let otherBoid of boids) {
          if (otherBoid !== boid) {
            const dist = distance(boid, otherBoid);
            if (dist < visualRange) {
              centerX += otherBoid.x;
              centerY += otherBoid.y;
              avgDX += otherBoid.dx;
              avgDY += otherBoid.dy;
              numNeighbors++;
            }
            if (dist < 20) {
              moveX += boid.x - otherBoid.x;
              moveY += boid.y - otherBoid.y;
            }
          }
        }

        if (numNeighbors > 0) {
          centerX /= numNeighbors;
          centerY /= numNeighbors;
          boid.dx += (centerX - boid.x) * 0.005 * cohesionWeight;
          boid.dy += (centerY - boid.y) * 0.005 * cohesionWeight;

          avgDX /= numNeighbors;
          avgDY /= numNeighbors;
          boid.dx += (avgDX - boid.dx) * 0.05 * alignmentWeight;
          boid.dy += (avgDY - boid.dy) * 0.05 * alignmentWeight;
        }

        boid.dx += moveX * 0.05 * separationWeight;
        boid.dy += moveY * 0.05 * separationWeight;
        
        // Interaction
        if (shockwave) {
           const dist = distance(boid, shockwave);
           if (Math.abs(dist - shockwave.radius) < 30) {
             boid.dx += (boid.x - shockwave.x) * 0.2;
             boid.dy += (boid.y - shockwave.y) * 0.2;
             boid.color = 'rgba(255, 100, 100, 1)';
           }
        }

        if (mousePos) {
           const dist = distance(boid, mousePos);
           if (dist < 250) {
             boid.color = `rgba(252, 250, 247, ${1 - dist / 250})`;
             if (isMouseDown) {
               // Vortex effect
               const angle = Math.atan2(boid.y - mousePos.y, boid.x - mousePos.x);
               boid.dx += Math.cos(angle + Math.PI / 2) * 0.5;
               boid.dy += Math.sin(angle + Math.PI / 2) * 0.5;
               boid.dx -= (boid.x - mousePos.x) * 0.02;
               boid.dy -= (boid.y - mousePos.y) * 0.02;
             } else {
               // Gentle attraction
               boid.dx -= (boid.x - mousePos.x) * 0.002;
               boid.dy -= (boid.y - mousePos.y) * 0.002;
             }
           }
        }
        
        // Limit speed
        const speed = Math.sqrt(boid.dx * boid.dx + boid.dy * boid.dy);
        const currentMaxSpeed = (mousePos && distance(boid, mousePos) < 250 && isMouseDown) ? maxSpeed * 2 : maxSpeed;
        if (speed > currentMaxSpeed) {
          boid.dx = (boid.dx / speed) * currentMaxSpeed;
          boid.dy = (boid.dy / speed) * currentMaxSpeed;
        }
        
        // Keep in bounds
        const margin = 50;
        const turnFactor = 0.5;
        if (boid.x < margin) boid.dx += turnFactor;
        if (boid.x > canvas.width - margin) boid.dx -= turnFactor;
        if (boid.y < margin) boid.dy += turnFactor;
        if (boid.y > canvas.height - margin) boid.dy -= turnFactor;

        boid.x += boid.dx;
        boid.y += boid.dy;
        drawBoid(ctx, boid);
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
  }, [alignmentWeight, cohesionWeight, separationWeight]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full h-[350px] md:h-[500px] relative bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]/10 overflow-hidden shadow-2xl group">
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex flex-col gap-1 mix-blend-difference pointer-events-none text-[#fcfaf7]">
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest">Attractor Field</h3>
          <p className="text-[9px] md:text-[10px] uppercase tracking-wider opacity-60">Hover/touch to attract • Hold/press to form vortex</p>
        </div>

        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 block w-full h-full cursor-crosshair touch-none"
        />
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
}
