import React from 'react';

const reviews = [
  { name: "Karthik R.", city: "Chennai", text: "The murukku tastes exactly like what my grandmother used to make. The crunch is perfect, and you can smell the fresh oil." },
  { name: "Priya S.", city: "Bangalore", text: "Ordered the Sweet Snacks combo for Diwali. Absolutely premium packaging and the Adhirasam melted in the mouth." },
  { name: "Ramesh Iyer", city: "Coimbatore", text: "We buy in bulk for our hotel. Consistent quality in every batch. The Ribbon Pakoda is a huge hit with our guests." },
  { name: "Anitha V.", city: "Madurai", text: "Pure, authentic taste. No artificial flavors, just traditional goodness. Highly recommend the Mixture." },
  { name: "Suresh K.", city: "Hyderabad", text: "Their Kai Murukku is a work of art. Looks beautiful and tastes even better. Excellent service and fast delivery." },
  { name: "Meenakshi T.", city: "Chennai", text: "Best snacks I've had in years. The packaging keeps everything so fresh. Kasi Snacks is our family's go-to now." },
  { name: "Venkat P.", city: "Trichy", text: "Ordered for my daughter's wedding. The guests couldn't stop eating the Seedai. Fantastic traditional quality." },
  { name: "Lakshmi M.", city: "Salem", text: "Very premium experience from ordering to eating. You can taste the high-quality ingredients they use." }
];

export const Testimonials: React.FC = () => {
  // Split into two rows for marquee
  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4, 8);

  return (
    <section className="py-24 bg-[#3B2314] overflow-hidden">
      
      <div className="text-center mb-16 px-6">
        <h2 className="font-display text-4xl md:text-5xl text-[#D9A520] mb-4">What Our Customers Say</h2>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <span className="text-[#D9A520] flex gap-1">
            ★★★★★
          </span>
          <span className="text-[#FFF8EE]/80 text-sm font-medium">4.9/5 on Google</span>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-6">
        {/* Gradients to hide edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#3B2314] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#3B2314] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scroll Left */}
        <div className="flex w-max animate-marquee-left hover:pause-animation">
          {[...row1, ...row1].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex w-max animate-marquee-right hover:pause-animation -ml-40">
          {[...row2, ...row2].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

      </div>

    </section>
  );
};

const ReviewCard = ({ review }: { review: any }) => (
  <div className="w-[350px] md:w-[450px] shrink-0 mx-3 p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-colors hover:bg-white/10">
    <div className="flex gap-1 text-[#D9A520] text-sm mb-4">
      ★★★★★
    </div>
    <p className="font-serif text-lg md:text-xl text-[#FFF8EE] leading-relaxed mb-6 italic">
      "{review.text}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D9A520] to-[#C7852B] flex items-center justify-center text-[#3B2314] font-bold font-display text-lg">
        {review.name[0]}
      </div>
      <div>
        <h5 className="font-sans text-[#FFF8EE] font-semibold text-sm">{review.name}</h5>
        <span className="font-sans text-[#FFF8EE]/50 text-xs">{review.city}</span>
      </div>
    </div>
  </div>
);
