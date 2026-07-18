import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Leaf, ShieldCheck, Truck, Users } from 'lucide-react';

const features = [
  {
    icon: <Heart size={28} className="text-[#D9A520]" />,
    title: "Handmade with Love",
    desc: "Every piece is crafted by experienced hands, preserving the human touch in every bite."
  },
  {
    icon: <Award size={28} className="text-[#D9A520]" />,
    title: "Generational Recipes",
    desc: "Authentic flavor profiles passed down through generations of South Indian kitchens."
  },
  {
    icon: <Leaf size={28} className="text-[#D9A520]" />,
    title: "Premium Ingredients",
    desc: "Sourced locally. Pure ghee, cold-pressed oils, and farm-fresh spices."
  },
  {
    icon: <ShieldCheck size={28} className="text-[#D9A520]" />,
    title: "No Preservatives",
    desc: "100% natural taste. No artificial colors, flavors, or harmful preservatives."
  },
  {
    icon: <Users size={28} className="text-[#D9A520]" />,
    title: "Bulk & Wholesale",
    desc: "Trusted partner for hotels, retailers, and grand wedding celebrations."
  },
  {
    icon: <Truck size={28} className="text-[#D9A520]" />,
    title: "Fresh Every Batch",
    desc: "Made to order and shipped immediately to ensure maximum crispness and aroma."
  }
];

export const WhyKasiSnacks: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#3B2314] relative overflow-hidden">
      
      {/* Subtle Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23D9A520' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-sans tracking-[0.2em] text-[#D9A520] uppercase mb-4"
          >
            The Difference
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#FFF8EE]"
          >
            Why Choose Kasi
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel-dark p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 bg-[#D9A520]/10 rounded-full flex items-center justify-center mb-6 border border-[#D9A520]/20">
                {feature.icon}
              </div>
              <h4 className="font-display text-2xl text-[#FFF8EE] mb-3">{feature.title}</h4>
              <p className="font-sans text-[#FFF8EE]/70 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
