import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { OurStory } from '@/components/OurStory';
import { HandmadeProcess } from '@/components/HandmadeProcess';
import { ProductShowcase } from '@/components/ProductShowcase';
import { WhyKasiSnacks } from '@/components/WhyKasiSnacks';
import { BulkOrders } from '@/components/BulkOrders';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Keep a stable reference so the cleanup can remove the exact same function
    const rafLoop = (time: number) => {
      lenis.raf(time);
    };

    let rafId: number;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#D9A520] selection:text-[#3B2314]">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <main>
        <Hero />
        <OurStory />
        <HandmadeProcess />
        <ProductShowcase />
        <WhyKasiSnacks />
        <BulkOrders />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
