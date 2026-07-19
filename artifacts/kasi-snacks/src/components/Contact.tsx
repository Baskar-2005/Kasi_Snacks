import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#3B2314] relative" style={{ overflow: 'clip' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D9A520]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[#D9A520] text-xs tracking-[0.3em] uppercase mb-4"
          >
            Reach Out
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#D9A520]"
          >
            Get In Touch
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-[#FFF8EE]/60 mt-4 max-w-md mx-auto text-sm"
          >
            Have a question or want to place an order? We'd love to hear from you.
          </motion.p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ContactCard
            icon={<MessageCircle size={28} />}
            title="WhatsApp"
            value="+91 98765 43210"
            actionText="Chat Now"
            actionLink="https://wa.me/919876543210"
            delay={0}
          />
          <ContactCard
            icon={<Phone size={28} />}
            title="Call Us"
            value="+91 87654 32109"
            actionText="Call Now"
            actionLink="tel:+918765432109"
            delay={0.1}
          />
          <ContactCard
            icon={<Mail size={28} />}
            title="Email"
            value="orders@kasisnacks.com"
            actionText="Send Email"
            actionLink="mailto:orders@kasisnacks.com"
            delay={0.2}
          />
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden border border-[#D9A520]/25 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
        >
          {/* Info overlay */}
          <div className="absolute top-4 left-4 z-20 max-w-xs">
            <div
              className="p-5 rounded-2xl shadow-xl border border-[#D9A520]/40"
              style={{
                background: 'rgba(26, 10, 4, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-[#D9A520] shrink-0" />
                <h4 className="font-display text-base text-[#D9A520]">Visit Our Kitchen</h4>
              </div>
              <p className="font-body text-[#FFF8EE]/75 text-xs leading-relaxed mb-3">
                Kasi Snacks Kitchen<br />
                Cuddalore, Tamil Nadu, India
              </p>
              <div className="flex items-center gap-1.5 bg-[#D9A520]/10 border border-[#D9A520]/20 px-3 py-1.5 rounded-full w-fit">
                <span className="text-[#D9A520] text-xs">★ 4.9</span>
                <span className="font-body text-[#FFF8EE]/60 text-xs">on Google · 150+ Reviews</span>
              </div>
            </div>
          </div>

          {/* Google Maps iframe — embedded from the provided URL */}
          <div className="w-full h-[440px] md:h-[480px]">
            <iframe
              title="Kasi Snacks Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126163.77!2d79.7!3d11.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a36ee9c3a2f5%3A0xf1507cd57390ee10!2sCuddalore%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: 'sepia(0.3) saturate(0.8)' }}
            />
          </div>

          {/* Golden bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#3B2314]/60 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon, title, value, actionText, actionLink, delay }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  actionText: string;
  actionLink: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-7 rounded-2xl flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(217,165,32,0.1)]"
    style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(217,165,32,0.15)',
    }}
  >
    <div className="text-[#D9A520] mb-5 p-4 rounded-full bg-[#D9A520]/10 group-hover:bg-[#D9A520]/20 group-hover:scale-110 transition-all duration-300 border border-[#D9A520]/20">
      {icon}
    </div>
    <h4 className="font-body text-[#FFF8EE]/50 text-xs uppercase tracking-[0.2em] mb-1.5">{title}</h4>
    <p className="font-body font-semibold text-[#FFF8EE] text-base mb-6 leading-tight">{value}</p>
    <a
      href={actionLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto px-6 py-2.5 border border-[#D9A520]/40 text-[#D9A520] rounded-full text-sm font-medium font-body hover:bg-[#D9A520] hover:text-[#3B2314] transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,165,32,0.4)]"
    >
      {actionText}
    </a>
  </motion.div>
);
