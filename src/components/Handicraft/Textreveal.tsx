'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import './Reveal.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textBlocks = gsap.utils.toArray<HTMLElement>(
        '.copy-block p'
      );

      if (textBlocks.length < 3) return;

      const splitInstances = textBlocks.map((block) =>
        SplitText.create(block, {
          type: 'words',
          mask: 'words',
        })
      );

      gsap.set(splitInstances[1].words, {
        yPercent: 100,
      });

      gsap.set(splitInstances[2].words, {
        yPercent: 100,
      });

      const overlapCount = 3;

      const getWordProgress = (
        phaseProgress: number,
        wordIndex: number,
        totalWords: number
      ) => {
        const totalLength =
          1 + overlapCount / totalWords;

        const scale =
          1 /
          Math.min(
            totalLength,
            1 +
              (totalWords - 1) / totalWords +
              overlapCount / totalWords
          );

        const startTime =
          (wordIndex / totalWords) * scale;

        const endTime =
          startTime +
          (overlapCount / totalWords) * scale;

        const duration =
          endTime - startTime;

        if (phaseProgress <= startTime) return 0;
        if (phaseProgress >= endTime) return 1;

        return (
          (phaseProgress - startTime) /
          duration
        );
      };

      const animateBlock = (
        outBlock: any,
        inBlock: any,
        phaseProgress: number
      ) => {
        outBlock.words.forEach(
          (word: HTMLElement, i: number) => {
            const progress =
              getWordProgress(
                phaseProgress,
                i,
                outBlock.words.length
              );

            gsap.set(word, {
              yPercent: progress * 100,
            });
          }
        );

        inBlock.words.forEach(
          (word: HTMLElement, i: number) => {
            const progress =
              getWordProgress(
                phaseProgress,
                i,
                inBlock.words.length
              );

            gsap.set(word, {
              yPercent: 100 - progress * 100,
            });
          }
        );
      };

      const indicator =
        containerRef.current?.querySelector(
          '.scroll-indicator'
        ) as HTMLElement | null;

      const marqueeTrack =
        containerRef.current?.querySelector(
          '.marquee-track'
        ) as HTMLElement | null;

      let tickerFn: (() => void) | null = null;

      if (marqueeTrack) {
        const items =
          gsap.utils.toArray<HTMLElement>(
            '.marquee-item'
          );

        items.forEach((item) => {
          marqueeTrack.appendChild(
            item.cloneNode(true)
          );
        });

        let marqueePosition = 0;

        tickerFn = () => {
          marqueePosition -= 0.95;

          const trackWidth =
            marqueeTrack.scrollWidth / 2;

          if (marqueePosition <= -trackWidth) {
            marqueePosition = 0;
          }

          gsap.set(marqueeTrack, {
            x: marqueePosition,
          });
        };

        gsap.ticker.add(tickerFn);
      }

      const trigger = ScrollTrigger.create({
  trigger: containerRef.current,
  start: "top top",
  end: "+=200%", // controls how long it stays pinned
  pin: true,
  scrub: true,
  anticipatePin: 1,
        onUpdate: (self) => {
          const scrollProgress =
            self.progress;

          if (indicator) {
            gsap.set(indicator, {
              '--progress': scrollProgress,
            });
          }

          if (scrollProgress <= 0.5) {
            const phase1 =
              scrollProgress / 0.5;

            animateBlock(
              splitInstances[0],
              splitInstances[1],
              phase1
            );
          } else {
            const phase2 =
              (scrollProgress - 0.5) / 0.5;

            gsap.set(
              splitInstances[0].words,
              {
                yPercent: 100,
              }
            );

            animateBlock(
              splitInstances[1],
              splitInstances[2],
              phase2
            );
          }
        },
      });

      return () => {
        trigger.kill();

        if (tickerFn) {
          gsap.ticker.remove(tickerFn);
        }

        splitInstances.forEach((instance) => {
          instance.revert();
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="handicraft-text-reveal-wrapper"
    >
      <section className="handicraft-reveal-hero">
        <div className="about-copy">
          <div className="copy-block">
            <p>
              We create handcrafted décor and artisan pieces with a focus on quality,
               detail, and timeless design. Every creation is thoughtfully made through 
               patience, precision, and a deep appreciation for craftsmanship.
            </p>
          </div>

          <div className="copy-block">
            <p>
              Designed with care and crafted by hand, 
              our creations bring warmth, character, 
              and artistry to every space.
            </p>
          </div>

          <div className="copy-block">
            <p>
              The final pieces capture the journey from
               raw materials to timeless creations — preserving the hands, 
              passion, and moments of craft that bring each design to life.
            </p>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            <div className="marquee-item">
              <img src="/handicrafts/handy.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/memory.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/gifts.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/coffee.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/diffuser.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/gallery-4.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/purse.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/photography/gallery-3.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/pensa.jpg" alt="" />
            </div>

            <div className="marquee-item">
              <img src="/handicrafts/nyanks.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator" />
      </section>
    </div>
  );
}