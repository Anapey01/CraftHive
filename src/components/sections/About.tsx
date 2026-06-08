'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Copy from '../Copy/Copy';
import ProcessCards from '../ProcessCards/ProcessCards';

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-6 md:left-16 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#c31b07]/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
        >
          <p className="text-[#c31b07] font-body text-xs tracking-[0.25em] uppercase mb-6">
            About the Studio
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#f4efe3] leading-[0.9] mb-8">
            Part atelier.
            <br />
            <em>Part memory</em>
            <br />
            preservation
            <br />
            house.
          </h2>
          <p className="font-body text-[#f4efe3]/70 text-lg leading-relaxed mb-6">
            We curate artworks, craft custom frames, restore visual treasures, and help every piece find its most powerful presence. Every measurement, mount, finish, and shadow is treated like part of the artwork itself.
          </p>
          <p className="font-body text-[#f4efe3]/70 text-lg leading-relaxed">
            Founded on the belief that framing is the last mile of art—the act that transforms a piece into a statement—we bring museum-level craft to private collectors, interior designers, and anyone who believes their walls deserve better.
          </p>

          <div className="mt-12 flex gap-12">
            {[
              ['400+', 'Artworks Framed'],
              ['18', 'Years of Craft'],
              ['12', 'Frame Collections'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-[#c31b07]">{n}</p>
                <p className="font-body text-xs text-[#f4efe3]/70 tracking-widest uppercase mt-1">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          className="relative"
        >
          <div className="relative h-[500px] md:h-[640px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=900&q=80"
              alt="Studio atelier"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>


          <section className="mission-intro">
            <div className="mission-intro-col-sm" />
            <div className="mission-intro-col-lg">
              <div className="mission-intro-copy">
                <Copy>
                  <h3>
                    We are a digital studio dedicated to creating clear and purposeful online experiences. Our work is rooted in structure, guided by systems, and shaped through close collaboration.
                  </h3>
                  <br />
                  <h3>
                    With a focus on design and development, we build scalable solutions that reflect quiet precision and long-term value. Every project is an exercise in restraint, intention, and technical care.
                  </h3>
                </Copy>
                {/* A link to show works  */}
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      <ProcessCards />

      <section className="recognition">
        <div className="recognition-copy">
          <Copy>
            <p className="sm caps">(Recognition)</p>
            <br />
            <h2>
              Our work has been recognized by digital platforms and design communities for its clarity, consistency, and attention to detail. We focus on building systems that go beyond visuals experiences.
            </h2>
          </Copy>
        </div>
      </section>
    </section>
  );
}
