import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  phone: string;
  businessType: string;
  quantity: string;
};

export const BulkOrders: React.FC = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted", data);
    reset();
  };

  const categories = [
    { title: "Hotels & Restaurants", icon: "🏨" },
    { title: "Retailers & Shops", icon: "🏪" },
    { title: "Distributors", icon: "🤝" },
    { title: "Marriage & Events", icon: "💒" },
    { title: "Corporate Gifts", icon: "🎁" },
    { title: "Export Orders", icon: "✈️" }
  ];

  return (
    <section id="bulk" className="py-24 md:py-32 bg-[#FFF8EE] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Info & Categories */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-sans tracking-[0.2em] text-[#C7852B] uppercase mb-4"
            >
              Partner With Us
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#3B2314] mb-6 leading-tight"
            >
              Bulk & Trade <br/> Orders
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-[#3B2314]/80 text-lg mb-10 max-w-md leading-relaxed"
            >
              Supplying the finest traditional snacks to businesses and celebrations across the region with customized packaging and wholesale pricing.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white p-4 rounded-xl border border-[#3B2314]/10 flex items-center gap-3 hover:border-[#D9A520] hover:shadow-md transition-all cursor-default"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-display text-sm md:text-base text-[#3B2314] font-medium leading-tight">{cat.title}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#3B2314] p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D9A520]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <h4 className="font-display text-3xl text-[#FFF8EE] mb-2 relative z-10">Request a Quote</h4>
            <p className="font-sans text-[#FFF8EE]/60 text-sm mb-8 relative z-10">Fill the form below and our wholesale team will contact you shortly.</p>

            {isSubmitSuccessful ? (
              <div className="bg-[#D9A520]/20 border border-[#D9A520] p-6 rounded-xl text-center relative z-10">
                <span className="text-4xl block mb-2">🎉</span>
                <h5 className="font-display text-xl text-[#D9A520] mb-2">Enquiry Sent!</h5>
                <p className="text-[#FFF8EE]/80 text-sm">Thank you. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => reset()}
                  className="mt-6 text-sm text-[#D9A520] underline hover:text-[#FFF8EE]"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#D9A520] mb-2">Your Name / Company</label>
                  <input 
                    {...register("name", { required: true })}
                    className="w-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/20 rounded-lg px-4 py-3 text-[#FFF8EE] focus:outline-none focus:border-[#D9A520] transition-colors"
                    placeholder="e.g. Anandha Bhavan"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-[#D9A520] mb-2">Contact Number</label>
                  <input 
                    {...register("phone", { required: true })}
                    type="tel"
                    className="w-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/20 rounded-lg px-4 py-3 text-[#FFF8EE] focus:outline-none focus:border-[#D9A520] transition-colors"
                    placeholder="+91"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#D9A520] mb-2">Business Type</label>
                    <select 
                      {...register("businessType")}
                      className="w-full bg-[#3B2314] border border-[#FFF8EE]/20 rounded-lg px-4 py-3 text-[#FFF8EE] focus:outline-none focus:border-[#D9A520] transition-colors appearance-none"
                    >
                      <option value="Retail">Retail Shop</option>
                      <option value="Hotel">Hotel / Restaurant</option>
                      <option value="Event">Marriage / Event</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-[#D9A520] mb-2">Approx. Quantity</label>
                    <input 
                      {...register("quantity", { required: true })}
                      className="w-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/20 rounded-lg px-4 py-3 text-[#FFF8EE] focus:outline-none focus:border-[#D9A520] transition-colors"
                      placeholder="e.g. 50 kg"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#D9A520] text-[#3B2314] font-bold text-lg py-4 rounded-xl mt-4 hover:bg-[#C7852B] transition-colors shadow-[0_4px_20px_rgba(217,165,32,0.3)] disabled:opacity-70 flex justify-center"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : "Send Enquiry"}
                </button>

              </form>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};
