"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./GalleryParallax.css";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      animation: gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        { yPercent: 15, ease: "none" }
      ),
      scrub: 1,
    });
  }, { scope: containerRef });

  return (
    <section className="gallery-wall-parallax-container" ref={containerRef}>
      <div 
        className="gallery-wall-parallax-image" 
        ref={imageRef}
        style={{ backgroundImage: 'url(/gallery-wall.jpeg)' }}
      ></div>
      <div className="gallery-wall-parallax-overlay"></div>
    </section>
  );
}
