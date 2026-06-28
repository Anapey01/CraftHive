"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Preloader.css";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP, SplitText, CustomEase);

CustomEase.create("hop", "0.9, 0, 0.1, 1");

export let isInitialLoad = true;

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const [showPreloader, setShowPreloader] = useState<boolean>(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState<boolean>(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (loaderAnimating) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader) return;

      let split: SplitText | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      setLoaderAnimating(true);

      const waitForFonts = async (): Promise<void> => {
        try {
          await document.fonts.ready;

          const customFonts = ["Outfit"];

          customFonts.forEach((fontFamily) => {
            document.fonts.check('16px "${fontFamily}');
          });

          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      };

      const initializeAnimation = async (): Promise<void> => {
        await waitForFonts();

        const header = document.querySelector(".preloader-header h1");

        if (!header) {
          setLoaderAnimating(false);
          setShowPreloader(false);
          return;
        }

        gsap.set(header, { opacity: 0 });

        split = SplitText.create(header, {
          type: "chars",
          charsClass: "char",
          mask: "chars",
        });

        const chars = split.chars as HTMLElement[];

        gsap.set(chars, {
          yPercent: (index: number) => (index % 2 === 0 ? -100 : 100),
        });

        gsap.set(header, { opacity: 1 });

        const preloaderImages = gsap.utils.toArray<HTMLElement>(
          ".preloader-images .img"
        );

        const preloaderImagesInner = gsap.utils.toArray<HTMLImageElement>(
          ".preloader-images .img img"
        );

        const tl = gsap.timeline({
          delay: 0.25,
          defaults: {
            overwrite: "auto",
          },
        });

        tl.to(".progress-bar", {
          scaleX: 1,
          duration: 4,
          ease: "power3.inOut",
        })
          .set(".progress-bar", {
            transformOrigin: "right",
          })
          .to(".progress-bar", {
            scaleX: 0,
            duration: 1,
            ease: "power3.in",
          });

        preloaderImages.forEach((preloaderImg, index) => {
          tl.to(
            preloaderImg,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 1,
              ease: "hop",
              delay: index * 0.75,
            },
            "-=5"
          );
        });

        preloaderImagesInner.forEach((preloaderImageInner, index) => {
          tl.to(
            preloaderImageInner,
            {
              scale: 1,
              duration: 1.5,
              ease: "hop",
              delay: index * 0.75,
            },
            "-=5.25"
          );
        });

        tl.to(
          chars,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
            stagger: 0.025,
          },
          "-=5"
        );

        tl.to(
          ".preloader-images",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "-=1.5"
        );

        tl.to(
          chars,
          {
            yPercent: (index: number) => (index % 2 === 0 ? 100 : -100),
            duration: 1,
            ease: "hop",
            stagger: 0.025,
          },
          "-=2.5"
        );

        tl.to(
          ".preloader",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.75,
            ease: "hop",
            onStart: () => {
              gsap.set(".preloader", {
                pointerEvents: "none",
              });
            },
            onComplete: () => {
              timeoutId = setTimeout(() => {
                setLoaderAnimating(false);
                setShowPreloader(false);
              }, 100);
            },
          },
          "-=0.5"
        );
      };

      initializeAnimation();

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (split) split.revert();
      };
    },
    {
      scope: preloaderRef,
      dependencies: [showPreloader],
    }
  );

  if (!showPreloader) return null;

  return (
    <>
      <div className="preloader" ref={preloaderRef}>
        <div className="progress-bar"></div>

        <div className="preloader-images">
          <div className="img">
            <Image src="/featured-work/work-1.png" alt="Custom framed abstract artwork" fill style={{ objectFit: 'cover' }} priority />
          </div>

          <div className="img">
            <Image src="/featured-work/carousel_7.jpg" alt="Artisan assembling premium shadow box" fill style={{ objectFit: 'cover' }} priority />
          </div>

          <div className="img">
            <Image src="/shadow/setup.jpg" alt="Laser engraved bespoke wooden decor" fill style={{ objectFit: 'cover' }} priority />
          </div>

          <div className="img">
            <Image src="/shadow/art_7.jpg" alt="Hand-sanded solid hardwood picture frame" fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>
      </div>

      <div className="preloader-header">
        <h1>Craft <span className="highlight">Hive</span></h1>
      </div>
    </>
  );
};

export default Preloader;