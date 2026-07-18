import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: "/gallery/gallery-1.jpg", alt: "Making Murukku", span: "row-span-2 col-span-1" },
  { src: "/gallery/gallery-2.jpg", alt: "Murukku on banana leaf", span: "row-span-1 col-span-1" },
  { src: "/gallery/gallery-3.jpg", alt: "Frying snacks", span: "row-span-2 col-span-1 md:col-span-2 lg:col-span-1" },
  { src: "/gallery/gallery-4.jpg", alt: "Mixing ingredients", span: "row-span-1 col-span-1 md:col-span-2 lg:col-span-1" },
  { src: "/gallery/gallery-5.jpg", alt: "Premium packaging", span: "row-span-2 col-span-1" },
  { src: "/gallery/gallery-6.jpg", alt: "Macro spices", span: "row-span-1 col-span-1" },
  { src: "/gallery/gallery-7.jpg", alt: "Festive spread", span: "row-span-1 col-span-1 md:col-span-2 lg:col-span-2" },
  { src: "/gallery/gallery-8.jpg", alt: "Murukku top down", span: "row-span-1 col-span-1" },
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-sans tracking-[0.2em] text-[#C7852B] uppercase mb-4"
          >
            Behind the Scenes
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3B2314]"
          >
            From Our Kitchen
          </motion.h3>
        </div>

        {/* CSS Grid Masonry approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#3B2314] ${img.span}`}
            >
              <img 
                src={import.meta.env.BASE_URL.replace(/\/$/, '') + img.src} 
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2314]/90 via-[#3B2314]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="font-display text-[#FFF8EE] text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
