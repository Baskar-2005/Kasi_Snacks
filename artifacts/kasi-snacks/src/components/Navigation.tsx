import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#story' },
    { name: 'Process', href: '#process' },
    { name: 'Products', href: '#products' },
    { name: 'Bulk Orders', href: '#bulk' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── TRANSPARENT TOP NAV (before scroll) ── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            key="top-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-transparent"
          >
            {/* Logo */}
            <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
              <img
                src={`${import.meta.env.BASE_URL}logo/kasi-logo.png`}
                alt="Kasi Snacks Logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(217,165,32,0.6)] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-[#D9A520] text-xl tracking-wider">KASI</span>
                <span className="font-body text-[#FFF8EE]/80 text-[10px] tracking-[0.35em] uppercase font-medium -mt-0.5">Snacks</span>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-[#FFF8EE]/80 text-sm font-medium font-body tracking-wide hover:text-[#D9A520] transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D9A520] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-[#D9A520] p-1">
              <Menu size={22} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── FLOATING PILL NAV (after scroll, always visible) ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="pill-nav"
            initial={{ opacity: 0, y: -60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.8 }}
            className="fixed top-4 left-1/2 z-50 -translate-x-1/2 px-0"
            style={{ width: 'min(90vw, 780px)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-2.5 rounded-[30px] border border-[#D9A520]/35 shadow-[0_8px_40px_rgba(59,35,20,0.55),0_0_0_1px_rgba(217,165,32,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
              style={{
                background: 'rgba(30, 14, 5, 0.72)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderRadius: '9999px',
              }}
            >
              {/* Logo */}
              <button onClick={() => scrollTo('#home')} className="flex items-center gap-2.5 shrink-0 group">
                <img
                  src={`${import.meta.env.BASE_URL}logo/kasi-logo.png`}
                  alt="Kasi Snacks"
                  className="w-8 h-8 object-contain drop-shadow-[0_0_6px_rgba(217,165,32,0.6)] group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-display text-[#D9A520] text-base tracking-wider">KASI</span>
                  <span className="font-body text-[#FFF8EE]/60 text-[8px] tracking-[0.3em] uppercase -mt-0.5">Snacks</span>
                </div>
              </button>

              {/* Divider */}
              <div className="hidden md:block h-5 w-px bg-[#D9A520]/20 mx-2" />

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="text-[#FFF8EE]/75 text-xs font-medium font-body tracking-wide hover:text-[#D9A520] transition-all duration-200 px-3 py-1.5 rounded-full hover:bg-white/5"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* CTA button */}
              <button
                onClick={() => scrollTo('#bulk')}
                className="hidden md:flex shrink-0 items-center gap-1.5 bg-[#D9A520] text-[#3B2314] text-xs font-semibold font-body px-4 py-2 rounded-full hover:bg-[#F5C842] transition-colors duration-200 shadow-[0_0_14px_rgba(217,165,32,0.4)]"
              >
                Order Now
              </button>

              {/* Mobile toggle */}
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-[#D9A520] p-1">
                <Menu size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] flex flex-col justify-center items-center"
            style={{
              background: 'rgba(20, 9, 3, 0.97)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-[#D9A520] p-2">
              <X size={28} />
            </button>

            {/* Mobile logo */}
            <img
              src={`${import.meta.env.BASE_URL}logo/kasi-logo.png`}
              alt="Kasi Snacks"
              className="w-16 h-16 mb-8 drop-shadow-[0_0_20px_rgba(217,165,32,0.7)]"
            />

            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                  onClick={() => scrollTo(link.href)}
                  className="font-display text-3xl text-[#FFF8EE] hover:text-[#D9A520] transition-colors tracking-wide"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-10 font-body text-[#D9A520]/60 text-sm tracking-widest uppercase"
            >
              Handmade with Love
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
