import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Ingredient Selection", desc: "We source only the finest regional rice flour, besan, and whole spices — quality starts here.", img: "process/step1-ingredients.jpg" },
  { num: "02", title: "Traditional Mixing",    desc: "Flour and spices are blended perfectly with pure ghee and butter using time-honoured ratios.", img: "process/step2-mixing.jpg" },
  { num: "03", title: "Hand Kneading",         desc: "Dough is carefully kneaded by hand to achieve the perfect pliable texture — no machines.", img: "process/step3-kneading.jpg" },
  { num: "04", title: "Artisan Shaping",       desc: "Pressed through traditional brass molds or hand-rolled by our expert artisans.", img: "process/step4-shaping.jpg" },
  { num: "05", title: "Slow Frying",           desc: "Fried in premium oil at exact temperatures for that golden crisp and authentic taste.", img: "process/step5-frying.jpg" },
  { num: "06", title: "Quality Check",         desc: "Every single piece is inspected for color, crunch, and authentic flavor before moving on.", img: "process/step6-quality.jpg" },
  { num: "07", title: "Careful Packing",       desc: "Packed fresh to retain the aroma, crispness, and long shelf life you deserve.", img: "process/step7-packing.jpg" },
  { num: "08", title: "Fresh Delivery",        desc: "Delivered straight from our kitchen to your hands — fresh, intact, and full of love.", img: "process/step8-delivery.jpg" },
];

export const HandmadeProcess: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="bg-[#1A0A04] text-[#FFF8EE] py-20 overflow-hidden">

      {/* Header */}
      <div className="px-8 md:px-16 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-[#D9A520] text-xs tracking-[0.3em] uppercase mb-3"
        >
          The Process
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-white"
        >
          The Art of Making
        </motion.h3>
      </div>

      {/* Native horizontal scroll track — no GSAP pin, no conflict with Lenis */}
      <div
        ref={trackRef}
        className="flex gap-5 px-8 md:px-16 pb-6 overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',       /* Firefox */
          msOverflowStyle: 'none',      /* IE */
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: 'easeOut' }}
            className="shrink-0 w-[280px] md:w-[340px] relative group"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Big watermark number */}
            <div
              className="absolute -top-6 right-2 font-display font-bold select-none pointer-events-none z-0"
              style={{ fontSize: '110px', lineHeight: 1, color: 'rgba(217,165,32,0.05)' }}
            >
              {step.num}
            </div>

            {/* Card */}
            <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] transition-all duration-400 hover:border-[#D9A520]/45 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(217,165,32,0.1)] relative z-10">

              {/* Photo */}
              <div className="relative h-44 overflow-hidden shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}${step.img}`}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A04]/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#D9A520] text-[#3B2314] text-[10px] font-bold font-body px-2.5 py-1 rounded-full tracking-wider">
                  {step.num}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 p-5">
                <h4 className="font-display text-lg text-[#D9A520] mb-2 leading-snug">{step.title}</h4>
                <p className="font-body text-[#FFF8EE]/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drag / scroll hint */}
      <div className="px-8 md:px-16 mt-4 flex items-center gap-3 opacity-40">
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          <path d="M1 6h20M14 1l6 5-6 5" stroke="#D9A520" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-body text-[#FFF8EE]/50 text-xs tracking-widest uppercase">Drag to explore</span>
      </div>
    </section>
  );
};
