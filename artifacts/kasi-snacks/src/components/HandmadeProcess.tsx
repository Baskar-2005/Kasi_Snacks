import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Ingredient Selection",
    desc: "We source only the finest regional rice flour, besan, and whole spices — quality starts here.",
    img: "process/step1-ingredients.jpg",
  },
  {
    num: "02",
    title: "Traditional Mixing",
    desc: "Flour and spices are blended perfectly with pure ghee and butter using time-honoured ratios.",
    img: "process/step2-mixing.jpg",
  },
  {
    num: "03",
    title: "Hand Kneading",
    desc: "Dough is carefully kneaded by hand to achieve the perfect pliable texture — no machines.",
    img: "process/step3-kneading.jpg",
  },
  {
    num: "04",
    title: "Artisan Shaping",
    desc: "Pressed through traditional brass molds or hand-rolled by our expert artisans.",
    img: "process/step4-shaping.jpg",
  },
  {
    num: "05",
    title: "Slow Frying",
    desc: "Fried in premium oil at exact temperatures for that golden crisp and authentic taste.",
    img: "process/step5-frying.jpg",
  },
  {
    num: "06",
    title: "Quality Check",
    desc: "Every single piece is inspected for color, crunch, and authentic flavor before moving on.",
    img: "process/step6-quality.jpg",
  },
  {
    num: "07",
    title: "Careful Packing",
    desc: "Packed fresh to retain the aroma, crispness, and long shelf life you deserve.",
    img: "process/step7-packing.jpg",
  },
  {
    num: "08",
    title: "Fresh Delivery",
    desc: "Delivered straight from our kitchen to your hands — fresh, intact, and full of love.",
    img: "process/step8-delivery.jpg",
  },
];

export const HandmadeProcess: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !scrollContainer) return;

    const pin = gsap.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth + 96),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        end: () => '+=' + scrollContainer.scrollWidth,
        invalidateOnRefresh: true,
      },
    });

    return () => { pin.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-[#1A0A04] text-[#FFF8EE] h-screen min-h-[600px] flex flex-col justify-center overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 md:px-16 mb-10 shrink-0">
        <p className="font-body text-[#D9A520] text-xs tracking-[0.3em] uppercase mb-3">The Process</p>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">The Art of Making</h3>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 px-8 md:px-16 pb-10 items-stretch w-max"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="w-[300px] md:w-[360px] shrink-0 relative group"
          >
            {/* Big step number (watermark) */}
            <div
              className="absolute -top-8 right-2 font-display font-bold select-none pointer-events-none z-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10"
              style={{ fontSize: '120px', lineHeight: 1, color: 'rgba(217,165,32,0.06)' }}
            >
              {step.num}
            </div>

            {/* Card */}
            <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-white/4 backdrop-blur-sm transition-all duration-500 hover:border-[#D9A520]/50 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(217,165,32,0.12)] relative z-10">

              {/* Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}${step.img}`}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                {/* Golden overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A04] via-transparent to-transparent opacity-60" />
                {/* Step badge */}
                <div className="absolute top-3 left-3 bg-[#D9A520] text-[#3B2314] text-xs font-bold font-body px-2.5 py-1 rounded-full tracking-wider">
                  {step.num}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 p-6">
                <h4 className="font-display text-xl text-[#D9A520] mb-3 leading-snug">{step.title}</h4>
                <p className="font-body text-[#FFF8EE]/65 text-sm leading-relaxed">{step.desc}</p>

                {/* Bottom connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-24 -right-6 w-6 h-px bg-gradient-to-r from-[#D9A520]/40 to-transparent hidden md:block" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="px-8 md:px-16 mt-2 shrink-0 flex items-center gap-3 opacity-50">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D9A520]/50" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <span className="font-body text-[#FFF8EE]/40 text-xs tracking-widest uppercase">Scroll to explore</span>
      </div>
    </section>
  );
};
