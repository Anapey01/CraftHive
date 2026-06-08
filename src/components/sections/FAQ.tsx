'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'Can I upload my own artwork to preview?',
    a: 'Absolutely. Our preview tool accepts JPG, PNG, and WEBP files up to 20MB. Upload your piece, choose a frame and mount, and see a realistic render before placing any order.',
  },
  {
    q: 'Do you offer mount colour recommendations?',
    a: 'Yes. Our team guides you through the best option based on artwork type, dominant colours, interior style, and budget. You can also experiment freely with our preview tool.',
  },
  {
    q: 'How long does a custom framing order take?',
    a: 'Standard turnaround is 7–10 working days. Rush orders (3–5 days) are available for an additional fee. Corporate and restoration projects are quoted individually.',
  },
  {
    q: 'What glass options do you offer?',
    a: 'We stock float glass, non-reflective glass, UV-protective conservation glass, and museum-grade Tru Vue® Optium. All are available in standard and custom sizes.',
  },
  {
    q: 'Do you handle corporate and hotel installations?',
    a: "Yes. We've installed in hotels, boardrooms, restaurants, and private residences across the region. We handle everything from curation to white-glove install and lighting recommendations.",
  },
  {
    q: 'Can I request a quote before committing?',
    a: 'Of course. Use our preview tool to build your configuration and click "Request a Quote." One of our framers will contact you within 24 hours with a detailed breakdown.',
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
        <span className="font-display text-xl md:text-2xl text-[#f4efe3] leading-snug">{q}</span>
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
            <p className="font-body text-[#f4efe3]/70 text-base leading-relaxed pb-6 max-w-2xl">{a}</p>
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
          <p className="text-[#c31b07] font-body text-xs tracking-[0.25em] uppercase mb-4">FAQ</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#f4efe3] leading-[0.9]">
            Questions
            <br />
            <em>collectors ask</em>
          </h2>
          <p className="font-body text-[#f4efe3]/70 text-base leading-relaxed mt-6">
            Everything you need to know before framing your first piece with us.
          </p>
          <a
            href="#contact"
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
