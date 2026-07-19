import { useEffect, useRef } from 'react';

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      
      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseSize = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        // Subtle drift towards center if they get too far, but mostly random
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isNeon = document.documentElement.classList.contains('neon-active') || document.body.classList.contains('neon-active');
      const rgb = isNeon ? '57, 255, 20' : '26, 26, 26';
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        
        // Check mouse distance
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            ctx.beginPath();
            // Lines get stronger near the mouse to simulate "attention" or "activation"
            let opacity = 0.08 - dist / 2250;
            if (distMouse < 200) {
              opacity += (200 - distMouse) * 0.0005;
            }
            ctx.strokeStyle = `rgba(${rgb}, ${Math.max(0, opacity)})`;
            ctx.lineWidth = distMouse < 200 ? 1.5 : 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            
            // Soft curve instead of straight line for organic feel
            const midX = (particles[i].x + particles[j].x) / 2 + (Math.sin(Date.now() * 0.001 + i) * 10);
            const midY = (particles[i].y + particles[j].y) / 2 + (Math.cos(Date.now() * 0.001 + j) * 10);
            
            ctx.quadraticCurveTo(midX, midY, particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Draw particle
        ctx.beginPath();
        let size = particles[i].baseSize;
        if (distMouse < 150) {
          size += (150 - distMouse) * 0.03;
        }
        ctx.arc(particles[i].x, particles[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = distMouse < 100 ? `rgba(${rgb}, 0.6)` : `rgba(${rgb}, 0.15)`;
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcfaf7] via-[#f7f4ed] to-[#f0ece1] opacity-50" />
      <div 
        className="absolute inset-0 opacity-30 mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full mix-blend-multiply"
      />
    </div>
  );
}
