import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    name: "Classic Murukku",
    image: "/products/murukku.jpg",
    ingredients: "Rice flour, urad dal, sesame seeds, cumin, pure ghee",
    desc: "Crispy, golden spirals of joy. Our signature item."
  },
  {
    name: "Kai Murukku",
    image: "/products/kai-murukku.jpg",
    ingredients: "Hand-twisted rice flour, black pepper, butter",
    desc: "Intricately hand-twisted traditional specialty."
  },
  {
    name: "Adhirasam",
    image: "/products/adhirasam.jpg",
    ingredients: "Rice flour, premium jaggery, cardamom, dry ginger",
    desc: "Sweet, soft-centered traditional delicacy."
  },
  {
    name: "Ribbon Pakoda",
    image: "/products/ribbon-pakoda.jpg",
    ingredients: "Besan flour, rice flour, chili powder, asafoetida",
    desc: "Crispy, flat ribbons with a spicy kick."
  },
  {
    name: "Special Mixture",
    image: "/products/mixture.jpg",
    ingredients: "Omapodi, boondi, roasted peanuts, cashews, curry leaves",
    desc: "The perfect blend of crunch, spice, and nuts."
  },
  {
    name: "Sweet Snacks",
    image: "/products/sweet-snacks.jpg",
    ingredients: "Jaggery, nuts, ghee, traditional flour blends",
    desc: "Festive sweets crafted for celebrations."
  }
];

export const ProductShowcase: React.FC = () => {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#FFF8EE] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-sans tracking-[0.2em] text-[#C7852B] uppercase mb-4"
          >
            Our Collection
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3B2314]"
          >
            Handcrafted Delights
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} index={i} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a href="#bulk" className="px-10 py-4 border border-[#3B2314] text-[#3B2314] hover:bg-[#3B2314] hover:text-[#FFF8EE] rounded-full font-medium transition-all duration-300 tracking-wide">
            View Full Menu
          </a>
        </div>

      </div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: any, index: number }) => {
  const imageUrl = import.meta.env.BASE_URL.replace(/\/$/, '') + product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col items-center cursor-pointer"
    >
      {/* Golden accent blob behind image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D9A520]/20 rounded-full blur-2xl transition-all duration-500 group-hover:bg-[#D9A520]/40 group-hover:scale-110 -z-10" />

      {/* Image Container */}
      <div className="w-full aspect-square rounded-full overflow-hidden mb-6 relative border-4 border-transparent group-hover:border-[#D9A520]/30 transition-all duration-500 shadow-xl shadow-[#3B2314]/10 group-hover:shadow-2xl group-hover:shadow-[#D9A520]/20 z-10 bg-[#3B2314]">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B2314]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <span className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 px-6 py-2 bg-[#D9A520] text-[#3B2314] rounded-full text-sm font-semibold tracking-wide">
            Order Now
          </span>
        </div>
      </div>

      <div className="text-center z-10 w-full px-4">
        <div className="inline-block px-3 py-1 bg-[#FFF8EE] border border-[#D9A520]/30 text-[#C7852B] text-xs font-bold tracking-wider uppercase rounded-full mb-3 shadow-sm">
          Traditional Recipe
        </div>
        <h4 className="font-display text-2xl text-[#3B2314] mb-2 group-hover:text-[#C7852B] transition-colors">{product.name}</h4>
        <p className="font-sans text-sm text-[#3B2314]/60 mb-2 leading-relaxed">{product.desc}</p>
        <p className="font-sans text-xs text-[#3B2314]/40 italic">{product.ingredients}</p>
      </div>

    </motion.div>
  );
};
