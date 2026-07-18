import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Particle system - flour dust + golden sparks
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; maxAlpha: number;
      color: string; phase: number; speed: number;
      type: 'dust' | 'spark' | 'ring';
      angle: number; dist: number; scale: number;
    };

    const particles: Particle[] = [];

    const colors = [
      'rgba(217,165,32,',   // gold
      'rgba(247,201,80,',   // bright gold
      'rgba(199,133,43,',   // caramel
      'rgba(255,248,238,',  // cream
    ];

    const spawnRingParticle = (t: number) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 180;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2,
        radius: Math.random() * 2.5 + 0.5,
        alpha: 0,
        maxAlpha: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        type: 'ring',
        angle, dist, scale: 1
      });
    };

    const spawnBurstParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 1,
        alpha: 1,
        maxAlpha: 1,
        color: colors[Math.floor(Math.random() * 3)],
        phase: 0, speed, type: 'spark',
        angle, dist: 0, scale: 1
      });
    };

    let frame = 0;
    let burstDone = false;
    let animId: number;

    // Draw decorative Murukku spiral SVG-like on canvas
    const drawMurukku = (alpha: number, rotation: number, radius: number) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      for (let ring = 0; ring < 4; ring++) {
        const r = (radius * 0.25) * (ring + 1);
        const startAngle = -Math.PI / 2 + ring * 0.3;
        const endAngle = startAngle + Math.PI * 1.6;
        const lineWidth = 8 - ring * 1.5;

        const gradient = ctx.createLinearGradient(-r, 0, r, 0);
        gradient.addColorStop(0, '#C7852B');
        gradient.addColorStop(0.5, '#D9A520');
        gradient.addColorStop(1, '#F5C842');

        ctx.beginPath();
        ctx.arc(0, 0, r, startAngle, endAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#D9A520';
      ctx.fill();

      ctx.restore();
    };

    // Draw glowing circle around murukku
    const drawGlowRing = (alpha: number, radius: number, pulse: number) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.translate(cx, cy);
      const r = radius + Math.sin(pulse) * 8;

      const grad = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 1.2);
      grad.addColorStop(0, `rgba(217,165,32,${alpha * 0.4})`);
      grad.addColorStop(0.5, `rgba(217,165,32,${alpha * 0.15})`);
      grad.addColorStop(1, 'rgba(217,165,32,0)');

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(217,165,32,${alpha * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Phase 1 (0-80): ring particles swirl outward
      if (frame < 80 && frame % 2 === 0) {
        spawnRingParticle(frame);
      }

      // Phase 2 (80-160): murukku appears + glowing rings
      const murukkuProgress = Math.max(0, Math.min(1, (frame - 80) / 80));
      const murukkuRotation = frame * 0.008;
      const murukkuRadius = 80 + murukkuProgress * 20;

      // Glow rings
      drawGlowRing(murukkuProgress * 0.7, murukkuRadius + 20, frame * 0.05);
      drawGlowRing(murukkuProgress * 0.4, murukkuRadius + 45, frame * 0.03);
      drawMurukku(murukkuProgress, murukkuRotation, murukkuRadius);

      // Phase 3 (200-240): burst
      if (frame === 220 && !burstDone) {
        for (let i = 0; i < 80; i++) spawnBurstParticle();
        burstDone = true;
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.type === 'ring') {
          p.x += p.vx + Math.sin(frame * p.speed + p.phase) * 0.3;
          p.y += p.vy;
          if (p.alpha < p.maxAlpha && frame < 200) p.alpha += 0.02;
          else p.alpha -= 0.008;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gravity for sparks
          p.alpha -= 0.025;
        }

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    // Show brand text after 0.3s
    setTimeout(() => setShowContent(true), 300);

    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP text + exit animation
  useEffect(() => {
    if (!showContent) return;
    const tl = gsap.timeline();

    // Logo pop in
    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.6, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.8)' }
      );
    }

    // Brand name letter stagger
    if (brandRef.current) {
      const letters = brandRef.current.querySelectorAll('.char');
      tl.fromTo(letters,
        { opacity: 0, y: 30, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' },
        '-=0.3'
      );
    }

    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 12, letterSpacing: '0.3em' },
        { opacity: 1, y: 0, letterSpacing: '0.4em', duration: 0.7, ease: 'power2.out' },
        '-=0.2'
      );
    }

    if (progressBarRef.current) {
      tl.fromTo(progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: 'left center' },
        '-=0.2'
      );
    }

    // Golden pulse on logo
    if (logoRef.current) {
      tl.to(logoRef.current, {
        filter: 'drop-shadow(0 0 25px rgba(217,165,32,0.9))',
        duration: 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1
      }, '-=0.4');
    }

    // Hold then exit
    tl.to({}, { duration: 0.6 })
      .to([logoRef.current, brandRef.current, taglineRef.current, progressRef.current], {
        opacity: 0, y: -40, duration: 0.6, stagger: 0.05, ease: 'power2.in'
      })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        }
      }, '-=0.3');
  }, [showContent, onComplete]);

  if (!isVisible) return null;

  const brandChars = 'KASI SNACKS'.split('').map((c, i) => (
    c === ' '
      ? <span key={i} className="char inline-block w-6" />
      : <span key={i} className="char inline-block opacity-0">{c}</span>
  ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #2A1509 0%, #1A0A04 60%, #0D0502 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Ambient golden background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 600px 400px at center, rgba(217,165,32,0.06) 0%, transparent 70%)'
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 mt-48">
        {/* Logo image */}
        <img
          ref={logoRef}
          src={`${import.meta.env.BASE_URL}logo/kasi-logo.png`}
          alt="Kasi Snacks"
          className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-0"
          style={{ filter: 'drop-shadow(0 0 12px rgba(217,165,32,0.5))' }}
        />

        {/* Brand Name */}
        <div ref={brandRef} className="flex items-center justify-center">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#D9A520] tracking-[0.2em]">
            {brandChars}
          </h1>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 opacity-0" style={{ opacity: showContent ? undefined : 0 }}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D9A520]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D9A520]" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D9A520]" />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-body text-[#FFF8EE]/70 uppercase tracking-[0.4em] text-xs md:text-sm opacity-0"
        >
          Traditional · Handmade · Premium
        </p>

        {/* Progress bar */}
        <div ref={progressRef} className="mt-4 w-48 md:w-64 h-px bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{
              background: 'linear-gradient(90deg, #C7852B, #D9A520, #F5C842)',
              transform: 'scaleX(0)'
            }}
          />
        </div>
      </div>
    </div>
  );
};
