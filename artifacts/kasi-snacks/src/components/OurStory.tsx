import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const milestones = [
  { year: "2010", title: "The Beginning", desc: "A traditional family recipe passed down through three generations." },
  { year: "2013", title: "First Customers", desc: "Neighborhood favorites turned into small batch orders for special occasions." },
  { year: "2016", title: "Premium Quality", desc: "Sourcing the finest regional ingredients to perfect the authentic taste." },
  { year: "2019", title: "Growing Brand", desc: "Expanding our reach across the city while maintaining handcrafted quality." },
  { year: "2024", title: "Kasi Snacks Today", desc: "Trusted by 1000+ customers, hotels, and event organizers for authentic flavor." }
];

export const OurStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" className="w-full bg-[#FFF8EE] py-24 md:py-32 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A520]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C7852B]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Left: Text & Quote */}
          <div className="w-full md:w-5/12 flex flex-col justify-start pt-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-sm font-sans tracking-[0.2em] text-[#C7852B] uppercase mb-4"
            >
              Our Heritage
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3B2314] mb-10 leading-tight"
            >
              Preserving tradition,<br/> one batch at a time.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="p-8 md:p-10 bg-white shadow-xl shadow-[#3B2314]/5 rounded-2xl border border-[#3B2314]/5 relative"
            >
              <div className="text-[120px] font-serif text-[#D9A520]/20 absolute -top-8 -left-2 leading-none">"</div>
              <p className="font-serif text-xl md:text-2xl text-[#3B2314]/80 italic relative z-10 leading-relaxed">
                Every snack carries the memory of a grandmother's kitchen. We don't just cook; we recreate memories using recipes that have stood the test of time.
              </p>
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <div className="w-full md:w-7/12 relative pl-8 md:pl-12 py-10">
            
            {/* Timeline track */}
            <div className="absolute top-0 bottom-0 left-[15px] md:left-[23px] w-0.5 bg-[#3B2314]/10 rounded-full" />
            
            {/* Animated timeline progress */}
            <motion.div 
              className="absolute top-0 left-[15px] md:left-[23px] w-0.5 bg-gradient-to-b from-[#D9A520] to-[#C7852B] origin-top rounded-full"
              style={{ height: lineHeight }}
            />

            <div className="flex flex-col gap-12">
              {milestones.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="relative pl-10 md:pl-16 group"
    >
      {/* Dot */}
      <div className="absolute top-2 -left-[9px] md:-left-[1px] w-4 h-4 rounded-full bg-[#FFF8EE] border-4 border-[#D9A520] shadow-[0_0_10px_rgba(217,165,32,0.5)] group-hover:scale-125 transition-transform duration-300 z-10" />
      
      <span className="font-sans text-sm font-semibold tracking-wider text-[#D9A520] block mb-2">
        {item.year}
      </span>
      <h4 className="font-display text-2xl md:text-3xl text-[#3B2314] mb-3">
        {item.title}
      </h4>
      <p className="font-sans text-[#3B2314]/70 leading-relaxed max-w-md">
        {item.desc}
      </p>
    </motion.div>
  );
};
