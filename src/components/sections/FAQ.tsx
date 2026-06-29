'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'Can I preview how my piece will look before committing?',
    a: 'Yes — our interactive Frame Preview Tool lets you select frame type, mat margin, mat colour, and frame finish to see how your piece might look before you decide. We also offer a popular hollow frame option with no mat border, which has been in high demand for its clean, contemporary look. For a fully personalised consultation, you are welcome to visit us in-store and we will walk you through your options with real samples.',
  },
  {
    q: 'Do you offer mat colour recommendations?',
    a: 'Absolutely. Our team will guide you through colour choices that complement your artwork, photograph, or the room it will hang in. Visit us in-store and we will show you physical samples alongside your actual piece. Not sure where to start? Neutral mounts tend to work beautifully with most artworks and photography — and our team is always happy to advise.',
  },
  {
    q: 'How long does a custom framing or Shadow Box order take?',
    a: 'Most orders are completed within 2–10 working days, depending on complexity and size. Shadow Box commissions may vary based on the level of customisation involved. Have a deadline? Speak to us directly and we will do our best to work around it.',
  },
  {
    q: 'What glass options do you offer?',
    a: 'We offer four options to suit different needs — standard clear glass, UV-protective glass (ideal for preserving photographs and artworks from fading), non-reflective glass for brightly lit spaces, and plexiglass, a lightweight shatter-resistant alternative that is a great choice for larger pieces or anywhere breakage is a concern. Our team will help you choose the right fit for your piece.',
  },
  {
    q: 'Do you handle corporate and hotel installations?',
    a: "Yes. We work with businesses, hotels, offices, and commercial spaces on framing, signage, and decor projects of all scales. Whether it's a single statement piece or a full installation, get in touch and we'll put together a tailored proposal for you.",
  },
  {
    q: 'Can I request a quote before committing?',
    a: 'Of course — no obligation whatsoever. Reach us via the contact form, by phone, or visit us in-store. The more detail you can share about your piece — size, type, any preferences — the more accurate our initial estimate will be.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left"
      >
        <span className="text-xl md:text-2xl text-[#f4efe3] leading-snug">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5"
        >
          <Plus size={16} className="text-[#c31b07]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0, 1] }}
            className="overflow-hidden"
          >
            <p className=" text-[#f4efe3]/70 text-base leading-relaxed pb-6 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-24 md:py-40 px-6 md:px-16 border-t border-white/5">
      <div ref={ref} className="max-w-7xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="md:sticky md:top-32 self-start"
        >
          <p className="text-[#c31b07] text-xs tracking-[0.25em] uppercase mb-4">FAQ</p>
          <h2 className="text-5xl md:text-6xl text-[#f4efe3] leading-[0.9]">
            Questions
            <br />
            <em>collectors ask</em>
          </h2>
          <p className=" text-[#f4efe3]/70 text-base leading-relaxed mt-6">
            Everything you need to know before framing your first piece with us.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[#c31b07]/30 text-[#c31b07] font-body text-xs tracking-widest uppercase hover:bg-[#c31b07]/10 transition-all duration-300"
          >
            Ask us directly →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
        </motion.div>
      </div>
    </section>
  );
}
