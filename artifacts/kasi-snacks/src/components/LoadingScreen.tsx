import React, { useEffect, useRef, useState } from 'react';

interface Props { onComplete: () => void; }

export const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // ── Particle system ──
    type P = {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
      orbitR: number; orbitAngle: number; orbitSpeed: number;
      phase: 'orbit' | 'burst';
    };

    const GOLD = ['#D9A520', '#F5C842', '#C7852B', '#FFD966', '#E8B84B'];
    const particles: P[] = [];
    const COUNT = 220;

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2;
      const r = 80 + Math.random() * 160;
      particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0, vy: 0,
        size: Math.random() * 2.5 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        color: GOLD[Math.floor(Math.random() * GOLD.length)],
        orbitR: r,
        orbitAngle: angle,
        orbitSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        phase: 'orbit',
      });
    }

    // ── State machine ──
    let frame = 0;
    let logoAlpha = 0;
    let textAlpha = 0;
    let barProgress = 0;
    let exitAlpha = 1;
    let stage: 'orbiting' | 'converging' | 'logo' | 'text' | 'holding' | 'burst' | 'exit' = 'orbiting';
    let stageFrame = 0;
    let raf: number;

    // Load logo image
    const logo = new Image();
    logo.src = `${import.meta.env.BASE_URL}logo/kasi-logo.png`;
    let logoLoaded = false;
    logo.onload = () => { logoLoaded = true; };

    // Load font via FontFace API so canvas text looks sharp
    let fontLoaded = false;
    const poppinsFont = new FontFace(
      'Poppins',
      'url(https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2)',
      { weight: '700', style: 'normal' }
    );
    const playfairFont = new FontFace(
      'Playfair Display',
      'url(https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff2)',
      { weight: '700', style: 'normal' }
    );
    Promise.all([
      poppinsFont.load().catch(() => null),
      playfairFont.load().catch(() => null),
    ]).then(([pf, plf]) => {
      if (pf) document.fonts.add(pf);
      if (plf) document.fonts.add(plf);
      fontLoaded = true;
    });

    const drawGlowCircle = (x: number, y: number, r: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(217,165,32,${alpha * 0.35})`);
      g.addColorStop(0.5, `rgba(217,165,32,${alpha * 0.12})`);
      g.addColorStop(1, 'rgba(217,165,32,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawLogo = (alpha: number, scale: number) => {
      if (!logoLoaded || alpha <= 0) return;
      const size = 120 * scale;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(logo, cx - size / 2, cy - size / 2, size, size);
      ctx.restore();
    };

    const drawBrandText = (alpha: number) => {
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      // "KASI SNACKS" in Playfair Display Bold
      const font = fontLoaded ? '"Playfair Display"' : 'Georgia';
      ctx.font = `bold ${Math.round(W < 600 ? 38 : 56)}px ${font}, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Gold gradient on text
      const grd = ctx.createLinearGradient(cx - 200, 0, cx + 200, 0);
      grd.addColorStop(0, '#C7852B');
      grd.addColorStop(0.4, '#D9A520');
      grd.addColorStop(0.7, '#F5C842');
      grd.addColorStop(1, '#C7852B');
      ctx.fillStyle = grd;
      ctx.fillText('KASI  SNACKS', cx, cy + 95);
      // Tagline below
      const bodyFont = fontLoaded ? '"Poppins"' : 'Arial';
      ctx.font = `400 ${Math.round(W < 600 ? 10 : 12)}px ${bodyFont}, sans-serif`;
      ctx.globalAlpha = alpha * 0.6;
      ctx.fillStyle = '#FFF8EE';
      ctx.letterSpacing = '0.4em';
      ctx.fillText('TRADITIONAL  ·  HANDMADE  ·  PREMIUM', cx, cy + 130);
      ctx.restore();
    };

    const drawProgressBar = (progress: number, alpha: number) => {
      if (alpha <= 0 || progress <= 0) return;
      const bw = Math.min(260, W * 0.45);
      const bh = 2;
      const bx = cx - bw / 2;
      const by = cy + 155;
      ctx.save();
      ctx.globalAlpha = alpha * 0.25;
      ctx.fillStyle = '#FFF8EE';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 1);
      ctx.fill();
      ctx.globalAlpha = alpha;
      const g = ctx.createLinearGradient(bx, 0, bx + bw, 0);
      g.addColorStop(0, '#C7852B');
      g.addColorStop(0.5, '#D9A520');
      g.addColorStop(1, '#F5C842');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw * progress, bh, 1);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      frame++;
      stageFrame++;

      // ── Stage transitions ──
      if (stage === 'orbiting' && stageFrame > 90) {
        stage = 'converging'; stageFrame = 0;
        particles.forEach(p => { p.phase = 'burst'; });
      }
      if (stage === 'converging' && stageFrame > 55) {
        stage = 'logo'; stageFrame = 0;
      }
      if (stage === 'logo' && stageFrame > 45) {
        stage = 'text'; stageFrame = 0;
      }
      if (stage === 'text' && stageFrame > 60) {
        stage = 'holding'; stageFrame = 0;
      }
      if (stage === 'holding' && stageFrame > 55) {
        stage = 'burst'; stageFrame = 0;
      }
      if (stage === 'burst' && stageFrame > 50) {
        stage = 'exit'; stageFrame = 0;
      }

      // Derived alphas
      if (stage === 'logo' || stage === 'text' || stage === 'holding') {
        logoAlpha = Math.min(1, logoAlpha + 0.045);
      }
      if (stage === 'text' || stage === 'holding') {
        textAlpha = Math.min(1, textAlpha + 0.035);
        barProgress = Math.min(1, barProgress + 0.018);
      }
      if (stage === 'burst' || stage === 'exit') {
        logoAlpha = Math.max(0, logoAlpha - 0.055);
        textAlpha = Math.max(0, textAlpha - 0.055);
        barProgress = Math.min(1, barProgress + 0.05);
      }
      if (stage === 'exit') {
        exitAlpha = Math.max(0, exitAlpha - 0.04);
      }

      // ── Clear ──
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.save();
      ctx.globalAlpha = exitAlpha;
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H));
      bg.addColorStop(0, '#2A1509');
      bg.addColorStop(0.55, '#1A0A04');
      bg.addColorStop(1, '#0D0502');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Ambient glow
      if (exitAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = exitAlpha * Math.min(1, (logoAlpha + 0.2));
        drawGlowCircle(cx, cy, 220, 0.9);
        drawGlowCircle(cx, cy, 360, 0.5);
        ctx.restore();
      }

      // ── Update & draw particles ──
      particles.forEach(p => {
        if (p.phase === 'orbit') {
          p.orbitAngle += p.orbitSpeed;
          // Gentle drift inward during converging
          if (stage === 'orbiting') {
            p.orbitR -= 0.15;
          }
          p.x = cx + Math.cos(p.orbitAngle) * p.orbitR;
          p.y = cy + Math.sin(p.orbitAngle) * p.orbitR;
        } else {
          // Converge toward center
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (stage === 'converging') {
            p.vx += dx * 0.012;
            p.vy += dy * 0.012;
          } else if (stage === 'burst') {
            const angle = Math.atan2(dy, dx) + Math.PI + (Math.random() - 0.5) * 0.8;
            const spd = Math.random() * 8 + 3;
            p.vx = Math.cos(angle) * spd;
            p.vy = Math.sin(angle) * spd;
            p.phase = 'orbit'; // reuse orbit field as flying
          }
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;
        }

        const a = p.alpha * exitAlpha;
        if (a <= 0) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // ── Logo + text ──
      if (exitAlpha > 0) {
        drawLogo(logoAlpha * exitAlpha, 1 + (1 - logoAlpha) * 0.3);
        drawBrandText(textAlpha * exitAlpha);
        drawProgressBar(barProgress, textAlpha * exitAlpha);
      }

      if (stage !== 'exit' || exitAlpha > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        setGone(true);
        onComplete();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  if (gone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] overflow-hidden"
      style={{ background: '#0D0502' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
