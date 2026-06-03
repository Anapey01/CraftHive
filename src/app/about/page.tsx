"use client";

import { useEffect, useRef } from "react";
import "./studio.css";

import Copy from "@/components/Copy/Copy";
import Link from "next/link";
import WhoWeAre from "@/components/sections/WhoWeAre/WhoWeAre";
import ProcessCards from "@/components/ProcessCards/ProcessCards";
import Footer from "@/components/ui/Footer";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const StudioPage = () => {
  const studioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = studioRef.current;
    if (!root) return;

    const studioHeroH1 = root.querySelector<HTMLHeadingElement>(".studio-hero h1");
    const studioHeroImgWrapper = root.querySelector<HTMLElement>(
      ".studio-hero-img-wrapper"
    );
    const missionLinkWrapper = root.querySelector<HTMLElement>(".mission-link");

    let split: SplitText | null = null;
    const scrollTriggers: Array<ScrollTrigger> = [];

    if (studioHeroH1) {
      split = SplitText.create(studioHeroH1, {
        type: "chars",
        charsClass: "char++",
      });

      split.chars.forEach((char) => {
        const wrapper = document.createElement("span");
        wrapper.className = "char-mask";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";

        char.parentNode?.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      gsap.set(split.chars, { y: "100%" });
      gsap.to(split.chars, {
        y: "0%",
        duration: 0.8,
        stagger: 0.2,
        delay: 0.85,
        ease: "power3.out",
      });
    }

    if (studioHeroImgWrapper) {
      gsap.set(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(studioHeroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }

    if (missionLinkWrapper) {
      gsap.set(missionLinkWrapper, { y: 30, opacity: 0 });

      const trigger = ScrollTrigger.create({
        trigger: missionLinkWrapper.closest(".mission-intro-copy"),
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(missionLinkWrapper, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 1.2,
            ease: "power3.out",
          });
        },
      });

      scrollTriggers.push(trigger);
    }

    return () => {
      split?.revert();
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="studio" ref={studioRef}>
        <section className="studio-hero">
          <h1 className="caps">CH</h1>
        </section>

        <section className="studio-hero-img">
          <div className="studio-hero-img-wrapper">
            <img src="/about/hero_image.jpg" alt="Andinkra Symbols" />
          </div>
        </section>

        <section className="studio-header">
          <div className="studio-header-copy">
            <Copy>
              <h2>
                CraftHive is a craft and art store specialising in 
                bespoke Shadow Box artworks, custom picture framing, 
                laser engraving and cutting, indoor and outdoor signage,
                 personalised gifts, memory boxes, designer mirrors, and handcrafted home decor. 
                 Every product is crafted with intention,
                using sustainable and responsibly sourced materials,
                 rooted in a tradition of quality and cultural pride
              </h2>
            </Copy>
          </div>
        </section>

        <WhoWeAre />

        <section className="mission-intro">
          <div className="mission-intro-col-sm"></div>
          <div className="mission-intro-col-lg">
            <div className="mission-intro-copy">
              <Copy>
                <h3>
                  We preserve stories, celebrate heritage, 
                  and transform memories into lasting works of art 
                  through bespoke framing, handcrafted décor,
                   and culturally inspired craftsmanship.
                </h3>
                <h3>
                  At CraftHive, every frame, artefact, 
                  and handcrafted creation is designed to honour culture, 
                  capture moments, and bring timeless beauty into everyday spaces.
                </h3>
              </Copy>

              <div className="mission-link">
                <Link href="/gallery" className="button button-dark">
                  View Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ProcessCards />

        <section className="recognition">
          <div className="recognition-copy">
            <Copy>
              <p className="sm caps">(Recognition)</p>
              <br />
              <h2 className="our-work">
                Our work is valued by homeowners, businesses, collectors, 
                and art enthusiasts who appreciate quality craftsmanship 
                and attention to detail. From bespoke framing and shadow box artworks 
                to handcrafted décor and cultural artefacts, every piece is thoughtfully 
                created to preserve memories, celebrate heritage,
                and inspire meaningful connections for generations to come.
              </h2>
            </Copy>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default StudioPage;
