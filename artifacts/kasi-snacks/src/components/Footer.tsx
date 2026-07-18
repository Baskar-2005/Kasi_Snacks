import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A0F09] relative pt-20 pb-10 border-t border-[#D9A520]/30">
      
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D9A520] to-transparent shadow-[0_0_20px_rgba(217,165,32,0.8)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-[#D9A520] tracking-wider mb-4">
            KASI SNACKS
          </h2>
          <p className="font-serif text-[#FFF8EE]/60 text-lg md:text-xl italic max-w-md">
            Traditional Recipes. Premium Quality. Handmade With Love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-sans text-[#D9A520] text-sm uppercase tracking-widest mb-6 font-semibold">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Our Story', 'Process', 'Bulk Orders', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#FFF8EE]/70 hover:text-[#D9A520] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="font-sans text-[#D9A520] text-sm uppercase tracking-widest mb-6 font-semibold">Products</h4>
            <ul className="space-y-4">
              {['Murukku', 'Adhirasam', 'Ribbon Pakoda', 'Mixture', 'Seedai'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#FFF8EE]/70 hover:text-[#D9A520] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="font-sans text-[#D9A520] text-sm uppercase tracking-widest mb-6 font-semibold">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 flex items-center justify-center text-[#FFF8EE]/80 hover:bg-[#D9A520] hover:text-[#3B2314] hover:border-[#D9A520] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 flex items-center justify-center text-[#FFF8EE]/80 hover:bg-[#D9A520] hover:text-[#3B2314] hover:border-[#D9A520] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 flex items-center justify-center text-[#FFF8EE]/80 hover:bg-[#D9A520] hover:text-[#3B2314] hover:border-[#D9A520] transition-all">
                <Twitter size={18} />
              </a>
            </div>
            <a href="#" className="inline-block text-[#FFF8EE]/70 hover:text-[#D9A520] transition-colors text-sm border-b border-[#D9A520]/30 pb-1">
              WhatsApp Support
            </a>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="font-sans text-[#D9A520] text-sm uppercase tracking-widest mb-6 font-semibold">Newsletter</h4>
            <p className="text-[#FFF8EE]/60 text-sm mb-4">Stay updated with new traditional recipes and festive offers.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#FFF8EE]/5 border border-[#FFF8EE]/20 rounded-lg px-4 py-2 text-sm text-[#FFF8EE] focus:outline-none focus:border-[#D9A520] transition-colors"
              />
              <button className="bg-[#D9A520] text-[#3B2314] font-medium text-sm py-2 rounded-lg hover:bg-[#C7852B] transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-[#FFF8EE]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFF8EE]/40 text-xs">
            © {new Date().getFullYear()} Kasi Snacks. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#FFF8EE]/40 text-xs">
            <a href="#" className="hover:text-[#D9A520]">Privacy Policy</a>
            <a href="#" className="hover:text-[#D9A520]">Terms of Service</a>
            <a href="#" className="hover:text-[#D9A520]">Shipping Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
