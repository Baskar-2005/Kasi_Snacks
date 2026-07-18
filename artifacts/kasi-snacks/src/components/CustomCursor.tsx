import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const pos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Render loop for smooth trailing
    let animationFrameId: number;
    const renderLoop = () => {
      // Lerp
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Click burst effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: Math.random() * 20 + 20,
          size: Math.random() * 3 + 1
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = `rgba(217, 165, 32, ${alpha})`; // #D9A520
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(renderParticles);
    };
    renderParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
      />
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            x: mouse.current.x - 4,
            y: mouse.current.y - 4,
          }}
          transition={{ duration: 0 }}
          className="absolute top-0 left-0 w-2 h-2 bg-kasi-gold rounded-full pointer-events-none"
        />
      </div>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.4,
            borderWidth: isHovering ? '1px' : '2px',
          }}
          className="w-8 h-8 border-kasi-gold rounded-full transition-shadow duration-300 shadow-[0_0_10px_rgba(217,165,32,0.3)]"
          style={{
            boxShadow: isHovering ? '0 0 20px rgba(217,165,32,0.6)' : '0 0 10px rgba(217,165,32,0.3)'
          }}
        />
      </div>
    </>
  );
};
