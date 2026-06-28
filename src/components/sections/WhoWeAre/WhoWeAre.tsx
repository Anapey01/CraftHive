"use client";

import React, { useEffect, useRef } from "react";
import "./WhoWeAre.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ImageConfig = { id: string; endTranslateX: number };

const WhoWeAre: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const whoweareScroll = scrollRef.current;
    if (!whoweareScroll) return;

    const setup = () => {
      const containerWidth = whoweareScroll.offsetWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslateX = Math.max(containerWidth - viewportWidth, 0);
      const targetProgress = 1;
      const maxTranslateAtTarget = maxTranslateX / targetProgress;

      const images: ImageConfig[] = [
        { id: "#whoweare-img-1", endTranslateX: -800 },
        { id: "#whoweare-img-2", endTranslateX: -1200 },
        { id: "#whoweare-img-3", endTranslateX: -600 },
        { id: "#whoweare-img-4", endTranslateX: -1000 },
        { id: "#whoweare-img-5", endTranslateX: -900 },
      ];

      const clipTrigger = ScrollTrigger.create({
        trigger: ".whoweare",
        start: "top bottom",
        end: `bottom+=${window.innerHeight * 2} top`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const clipPathValue = Math.min(progress * 100, 100);

          gsap.set(".whoweare-container", {
            clipPath: `circle(${clipPathValue}% at 50% 50%)`,
          });
        },
        onLeave: () => {
          gsap.set(".whoweare-container", {
            clipPath: `circle(100% at 50% 50%)`,
          });
        },
      });

      const mainTrigger = ScrollTrigger.create({
        trigger: ".whoweare",
        start: "top top",
        end: `+=${window.innerHeight * 6}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          let opacity = 1;
          let scale = 1;
          let translateX = 0;

          if (progress <= 0.3) {
            const fadeProgress = progress / 0.3;
            opacity = fadeProgress;
            scale = 0.85 + 0.15 * fadeProgress;
            translateX = 0;
          } else {
            opacity = 1;
            scale = 1;
            const adjustedProgress = (progress - 0.3) / (1 - 0.3);
            translateX = -Math.min(
              adjustedProgress * maxTranslateAtTarget,
              maxTranslateX
            );
          }

          gsap.set(whoweareScroll, {
            opacity,
            scale,
            x: translateX,
          });
        },
      });

      const imageTriggers = images.map((img) =>
        ScrollTrigger.create({
          trigger: ".whoweare",
          start: "top top",
          end: `+=${window.innerHeight * 6}`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress >= 0.3) {
              const adjustedProgress = (progress - 0.3) / (1 - 0.3);
              gsap.set(img.id, {
                x: `${img.endTranslateX * adjustedProgress}px`,
              });
            }
          },
        })
      );

      return () => {
        clipTrigger.kill();
        mainTrigger.kill();
        imageTriggers.forEach((t) => t.kill());
      };
    };

    const cleanup = setup();

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cleanup && cleanup();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="whoweare">
      <div className="whoweare-container" ref={containerRef}>
        <div className="whoweare-scroll" ref={scrollRef}>
          <div className="whoweare-header">
            <h1>Who we are</h1>
          </div>

          <div className="whoweare-img" id="whoweare-img-1">
            <Image src="/who-we-are/team-1.jpg" alt="CraftHive artisan cutting hardwood for custom frame" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="whoweare-img" id="whoweare-img-2">
            <Image src="/who-we-are/team-2.jpg" alt="Master framer assembling a bespoke shadow box" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="whoweare-img" id="whoweare-img-3">
            <Image src="/who-we-are/team-3.jpg" alt="Precision laser engraving on custom wooden sign" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="whoweare-img" id="whoweare-img-4">
            <Image src="/who-we-are/team-4.jpg" alt="Hand-sanding wooden frame for gallery artwork" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div className="whoweare-img" id="whoweare-img-5">
            <Image src="/who-we-are/team-5.jpg" alt="CraftHive workshop interior with completed frames" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
