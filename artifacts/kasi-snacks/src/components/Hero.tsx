import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const murukkuRef = useRef<SVGSVGElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; s: number; vy: number; vx: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 1,
        vy: -(Math.random() * 0.5 + 0.1),
        vx: (Math.random() - 0.5) * 0.5
      });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(217, 165, 32, 0.4)';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animations
  useEffect(() => {
    if (!headlineRef.current || !murukkuRef.current || !ingredientsRef.current) return;

    // Rotate Murukku
    gsap.to(murukkuRef.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center"
    });

    // Floating ingredients
    const labels = ingredientsRef.current.querySelectorAll('.ingredient-label');
    labels.forEach((label, i) => {
      gsap.to(label, {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });

    // Initial load animation for text
    const lines = headlineRef.current.querySelectorAll('.headline-line');
    gsap.fromTo(lines, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
    );

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(murukkuRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
      
      gsap.to(ingredientsRef.current, {
        x: -x * 0.5,
        y: -y * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ingredients = [
    { text: "Adhirasam", top: "15%", left: "10%" },
    { text: "Seedai", top: "25%", right: "15%" },
    { text: "Ribbon Pakoda", bottom: "30%", left: "15%" },
    { text: "Mixture", bottom: "20%", right: "20%" },
    { text: "Cashews", top: "50%", left: "5%" },
    { text: "Curry Leaves", top: "45%", right: "8%" },
  ];

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#3B2314]">
      {/* Background radial gradient for warm lighting */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-bl from-[#D9A520]/20 to-transparent rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#3B2314] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 pt-20">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left order-2 md:order-1 mt-10 md:mt-0 z-20">
          <div ref={headlineRef} className="mb-6">
            <h1 className="headline-line font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-[1.1] text-[#FFF8EE] mb-2 drop-shadow-lg">
              Handmade
            </h1>
            <h1 className="headline-line font-display text-[4rem] sm:text-[5rem] lg:text-[6rem] leading-[1.1] text-gradient-gold drop-shadow-lg italic">
              Tradition.
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-[#FFF8EE]/80 font-sans text-lg md:text-xl max-w-md mb-10 leading-relaxed"
          >
            Experience authentic South Indian snacks prepared using traditional recipes, premium ingredients and generations of expertise.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a href="#products" className="px-8 py-4 bg-[#D9A520] hover:bg-[#C7852B] text-[#3B2314] rounded-full font-medium transition-all duration-300 shadow-[0_0_20px_rgba(217,165,32,0.3)] hover:shadow-[0_0_30px_rgba(217,165,32,0.6)] hover:scale-105">
              Explore Snacks
            </a>
            <a href="#process" className="px-8 py-4 bg-transparent border border-[#D9A520]/50 text-[#FFF8EE] rounded-full font-medium transition-all duration-300 hover:bg-[#D9A520]/10 hover:border-[#D9A520]">
              Watch Process
            </a>
            <a href="#bulk" className="mt-4 sm:mt-0 ml-2 text-[#D9A520] font-medium group flex items-center gap-2 hover:text-[#FFF8EE] transition-colors">
              Bulk Orders <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* Right Content - Visuals */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center order-1 md:order-2">
          
          <div ref={ingredientsRef} className="absolute inset-0 z-10 pointer-events-none">
            {ingredients.map((ing, i) => (
              <div 
                key={i} 
                className="ingredient-label absolute glass-panel-dark px-4 py-2 rounded-full text-[#FFF8EE]/90 text-sm font-medium whitespace-nowrap"
                style={{ top: ing.top, left: ing.left, right: ing.right, bottom: ing.bottom }}
              >
                {ing.text}
              </div>
            ))}
          </div>

          <svg 
            ref={murukkuRef}
            className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] z-0 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D9A520" />
                <stop offset="50%" stopColor="#C7852B" />
                <stop offset="100%" stopColor="#8c5815" />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>
            
            {/* Abstract Murukku Spiral */}
            <path 
              d="M50 50 m0 -40 a40 40 0 1 1 -1 0 m1 -30 a30 30 0 1 1 -1 0 m1 -20 a20 20 0 1 1 -1 0 m1 -10 a10 10 0 1 1 -1 0" 
              fill="none" 
              stroke="url(#goldGrad)" 
              strokeWidth="6" 
              strokeLinecap="round"
              filter="url(#shadow)"
              style={{ strokeDasharray: '4 2', opacity: 0.9 }}
            />
            
            <path 
              d="M50 50 m0 -35 a35 35 0 1 1 -1 0 m1 -25 a25 25 0 1 1 -1 0 m1 -15 a15 15 0 1 1 -1 0" 
              fill="none" 
              stroke="#D9A520" 
              strokeWidth="3" 
              strokeLinecap="round"
              style={{ strokeDasharray: '8 4', opacity: 0.8 }}
            />
          </svg>
        </div>

      </div>

      {/* Floating stats bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-0 w-full z-20 hidden md:block"
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-[#FFF8EE]/60 text-sm tracking-widest uppercase font-sans">
          <span className="flex items-center gap-4"><strong className="text-[#D9A520] text-xl">30+</strong> Products</span>
          <div className="w-px h-8 bg-[#D9A520]/30" />
          <span className="flex items-center gap-4"><strong className="text-[#D9A520] text-xl">1000+</strong> Happy Customers</span>
          <div className="w-px h-8 bg-[#D9A520]/30" />
          <span>Fresh Every Batch</span>
          <div className="w-px h-8 bg-[#D9A520]/30" />
          <span>Traditional Recipe</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 md:hidden"
      >
        <span className="text-[#FFF8EE]/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D9A520] to-transparent" />
      </motion.div>

    </section>
  );
};
