'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  subtitle?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandHero = ({
  mediaSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpand = 'Scroll to explore',
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const delta = touchStartY - e.touches[0].clientY;
      if (mediaFullyExpanded && delta < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const factor = delta < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(scrollProgress + delta * factor, 0), 1);
        setScrollProgress(next);
        if (next >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (next < 0.75) setShowContent(false);
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const w = 280 + scrollProgress * (isMobile ? 600 : 1200);
  const h = 360 + scrollProgress * (isMobile ? 200 : 420);
  const tx = scrollProgress * (isMobile ? 160 : 140);

  const words = title ? title.split(' ') : [];
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* BG image fades out as media expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              {/* Expanding media */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${w}px`,
                  height: `${h}px`,
                  maxWidth: '95vw',
                  maxHeight: '88vh',
                  boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,162,92,${scrollProgress * 0.3})`,
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Image
                  src={mediaSrc}
                  alt={title || 'Hero artwork'}
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  className="absolute inset-0 bg-ink/50 rounded-xl"
                  animate={{ opacity: 0.6 - scrollProgress * 0.55 }}
                  transition={{ duration: 0.2 }}
                />
                {/* Gold vignette border at full expansion */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 0 ${scrollProgress * 2}px rgba(200,162,92,0.4)`,
                  }}
                />
              </div>

              {/* Subtitle and scroll hint */}
              <div className="flex flex-col items-center text-center relative z-10 mt-4">
                {subtitle && (
                  <motion.p
                    className="text-gold font-heading tracking-[0.25em] text-xs uppercase"
                    style={{ transform: `translateX(-${tx}vw)` }}
                    animate={{ opacity: 1 - scrollProgress * 1.5 }}
                  >
                    {subtitle}
                  </motion.p>
                )}
                <motion.p
                  className="text-white font-heading text-md tracking-widest uppercase mt-2"
                  style={{ transform: `translateX(${tx}vw)` }}
                  animate={{ opacity: 1 - scrollProgress * 1.5 }}
                >
                  {scrollToExpand}
                </motion.p>
              </div>

              {/* Title text splits apart */}
              <div className="flex flex-col items-center justify-center gap-2 w-full relative z-10 mix-blend-difference">
                <motion.h1
                  className="font-accent text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-ivory leading-none text-center"
                  style={{ transform: `translateX(-${tx}vw)` }}
                >
                  {line1}
                </motion.h1>
                <motion.h1
                  className="font-accent text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-ivory leading-none text-center"
                  style={{ transform: `translateX(${tx}vw)` }}
                >
                  {line2}
                </motion.h1>
              </div>
            </div>

            {/* Content revealed after full expansion */}
            <motion.div
              className={`w-full ${showContent ? '' : 'h-0 overflow-hidden'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandHero;
