import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const murukkuRef = useRef<SVGSVGElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating dust particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };
    const particles: Particle[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.1),
        size: Math.random() * 2.2 + 0.5,
        alpha: Math.random() * 0.45 + 0.05,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,165,32,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!headlineRef.current || !murukkuRef.current) return;

    // Slow rotation for murukku SVG
    gsap.to(murukkuRef.current, {
      rotation: 360,
      duration: 90,
      repeat: -1,
      ease: 'linear',
      transformOrigin: 'center center',
    });

    // Floating ingredient labels
    if (ingredientsRef.current) {
      const labels = ingredientsRef.current.querySelectorAll('.ing');
      labels.forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-14, 14)',
          x: 'random(-8, 8)',
          rotation: 'random(-4, 4)',
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }

    // Reveal headline lines
    const lines = headlineRef.current.querySelectorAll('.hl');
    gsap.fromTo(lines,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.4 }
    );

    // Mouse parallax
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 34;
      const y = (e.clientY / window.innerHeight - 0.5) * 34;
      gsap.to(murukkuRef.current, { x, y, duration: 1.2, ease: 'power2.out' });
      if (ingredientsRef.current) {
        gsap.to(ingredientsRef.current, { x: -x * 0.4, y: -y * 0.4, duration: 1.2, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const ingredients = [
    { text: 'Adhirasam',      top: '18%', left: '7%'   },
    { text: 'Seedai',         top: '22%', right: '10%'  },
    { text: 'Ribbon Pakoda',  bottom: '28%', left: '10%' },
    { text: 'Mixture',        bottom: '22%', right: '14%' },
    { text: 'Cashews',        top: '52%', left: '4%'   },
    { text: 'Curry Leaves',   top: '48%', right: '5%'  },
  ];

  return (
    <section id="home" className="relative w-full h-screen min-h-[760px] overflow-hidden">

      {/* ── Hero background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A04]/92 via-[#1A0A04]/70 to-[#1A0A04]/30" />
        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1A0A04] to-transparent" />
        {/* Top vignette */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1A0A04]/60 to-transparent" />
        {/* Right-side warm glow */}
        <div
          className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(217,165,32,0.08) 0%, transparent 65%)' }}
        />
      </div>

      {/* Floating dust particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 md:px-14 pt-24">

        {/* Left — text */}
        <div className="w-full md:w-[55%] flex flex-col justify-center text-left order-2 md:order-1 mt-8 md:mt-0">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-body text-[#D9A520] text-xs tracking-[0.3em] uppercase mb-5"
          >
            Since Generations · Cuddalore, Tamil Nadu
          </motion.p>

          <div ref={headlineRef} className="mb-6 overflow-hidden">
            <h1 className="hl font-display text-[3.6rem] sm:text-[4.8rem] lg:text-[5.8rem] leading-[1.05] text-[#FFF8EE] opacity-0">
              Handmade
            </h1>
            <h1 className="hl font-display text-[3.6rem] sm:text-[4.8rem] lg:text-[5.8rem] leading-[1.05] italic opacity-0"
              style={{ background: 'linear-gradient(90deg,#D9A520,#F5C842,#C7852B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Tradition.
            </h1>
            <h2 className="hl font-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.2] text-[#FFF8EE]/70 mt-2 opacity-0">
              Crafted With Love.
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-body text-[#FFF8EE]/70 text-base md:text-lg max-w-md mb-10 leading-relaxed font-light"
          >
            Authentic South Indian snacks crafted from traditional recipes, 
            premium ingredients, and generations of expertise — straight to your door.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="font-body px-8 py-3.5 bg-[#D9A520] text-[#3B2314] rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#F5C842] hover:scale-105 hover:shadow-[0_0_30px_rgba(217,165,32,0.55)]"
            >
              Explore Snacks
            </a>
            <a
              href="#process"
              className="font-body px-8 py-3.5 border border-[#D9A520]/50 text-[#FFF8EE] rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#D9A520]/10 hover:border-[#D9A520]"
            >
              Watch Process
            </a>
            <a
              href="#bulk"
              className="font-body text-[#D9A520] font-medium text-sm flex items-center gap-1.5 hover:gap-3 transition-all duration-300 group ml-1"
            >
              Bulk Orders <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-8 mt-12"
          >
            {[
              { num: '30+', label: 'Products' },
              { num: '1K+', label: 'Happy Customers' },
              { num: '100%', label: 'Handmade' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="h-8 w-px bg-[#D9A520]/25" />}
                <div>
                  <p className="font-display text-2xl text-[#D9A520]">{s.num}</p>
                  <p className="font-body text-[#FFF8EE]/50 text-xs tracking-widest uppercase mt-0.5">{s.label}</p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right — decorative murukku + ingredient pills */}
        <div className="w-full md:w-[45%] h-[46vh] md:h-full relative flex items-center justify-center order-1 md:order-2">
          <div ref={ingredientsRef} className="absolute inset-0 pointer-events-none">
            {ingredients.map((ing, i) => (
              <div
                key={i}
                className="ing absolute px-4 py-2 rounded-full text-[#FFF8EE]/85 text-xs font-body font-medium tracking-wide whitespace-nowrap"
                style={{
                  top: ing.top, left: ing.left, right: ing.right, bottom: ing.bottom,
                  background: 'rgba(59,35,20,0.55)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(217,165,32,0.25)',
                }}
              >
                {ing.text}
              </div>
            ))}
          </div>

          {/* Murukku SVG */}
          <svg
            ref={murukkuRef}
            className="w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D9A520" />
                <stop offset="50%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#8c5815" />
              </linearGradient>
              <radialGradient id="glw" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(217,165,32,0.25)" />
                <stop offset="100%" stopColor="rgba(217,165,32,0)" />
              </radialGradient>
              <filter id="shad"><feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.5" /></filter>
            </defs>
            {/* Glow background */}
            <circle cx="50" cy="50" r="50" fill="url(#glw)" />
            {/* Spiral rings */}
            <path d="M50 50 m0-40 a40 40 0 1 1-0.1 0" fill="none" stroke="url(#gg)" strokeWidth="5.5" strokeLinecap="round" strokeDasharray="5 2.5" filter="url(#shad)" opacity="0.95" />
            <path d="M50 50 m0-30 a30 30 0 1 1-0.1 0" fill="none" stroke="url(#gg)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="4 2" opacity="0.85" />
            <path d="M50 50 m0-20 a20 20 0 1 1-0.1 0" fill="none" stroke="url(#gg)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="3 1.5" opacity="0.8" />
            <path d="M50 50 m0-11 a11 11 0 1 1-0.1 0" fill="none" stroke="url(#gg)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            <circle cx="50" cy="50" r="4" fill="#D9A520" filter="url(#shad)" />
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[#FFF8EE]/35 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#D9A520]/60 to-transparent" />
      </motion.div>
    </section>
  );
};
