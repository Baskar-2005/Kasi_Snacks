import React, { useState } from 'react';
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
