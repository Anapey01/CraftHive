"use client";

import { useEffect, useRef } from "react";
import "./studio.css";

import Copy from "@/components/Copy/Copy";
import Link from "next/link";
import Button from "@/components/Button/Button";
import WhoWeAre from "@/components/sections/WhoWeAre/WhoWeAre";
import ProcessCards from "@/components/ProcessCards/ProcessCards";
import Footer from "@/components/ui/Footer";
import Animates from "@/components/Animates/Animate";

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
          <div className="studio-header-col-sm">
            <p className="smcaps text-[#c31b07]">
              (About Us)
            </p>
          </div>
          <div className="studio-header-col-lg">
            <div className="studio-header-copy">
              <Copy>
                <h2>
                  Born from a love of heritage and skilled hands, 
                  CraftHive is a craft and art store where every piece is made with intention — 
                  from bespoke Shadow Boxes rooted in Adinkra symbolism, 
                  to custom framing, laser engraving, personalised gifts, 
                  and handcrafted home decor. Quality materials. Cultural pride.
                  Built to last.
                </h2>
              </Copy>
            </div>
          </div>
        </section>

        <WhoWeAre />

        <section className="mission-intro">
          <div className="mission-intro-col-sm"></div>
          <div className="mission-intro-col-lg">
            <div className="mission-intro-copy">
              <Copy>
                <h3>
                  We are craftspeople, storytellers, and guardians of culture.
                   Every piece that leaves CraftHive has been shaped by careful hands
                    and genuine care — for the family preserving a precious memory, 
                    the business commissioning a statement piece,
                     and the gift-giver searching for something that truly means something.
                </h3>
              </Copy>

              <div className="mission-link">
                <Button href="/gallery" dark={true}>
                  View Work
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div>
          <h1 className="process-label">OUR VALUES</h1>
        <ProcessCards />
        </div>

        <section className="tapered-section">
          <div className="tapered-content">
            <Copy>
              <div className="tapered-header">
                <p className="tapered-subtitle">THE</p>
                <h2 className="tapered-title">RECOGNITION</h2>
                <div className="tapered-line"></div>
              </div>
              <div className="tapered-body">
                {/* Desktop Pyramid Shape (Max 65 chars to prevent wrapping on laptops) */}
                <p className="desktop-tapered hidden md:block">
                  Our work is trusted by homeowners, businesses, collectors, 
                  and designers who know that quality craftsmanship is never accidental. 
                  Every piece we create is a quiet declaration that some things are worth doing beautifully — and keeping forever.
                </p>

                {/* Mobile Pyramid Shape */}
                <p className="mobile-tapered block md:hidden">
                  Our work is valued by homeowners, businesses, <br />
                  collectors, and art enthusiasts who appreciate <br />
                  quality craftsmanship and attention to detail. <br />
                  From bespoke framing and shadow box <br />
                  artworks to handcrafted décor and <br />
                  cultural artefacts, every piece is <br />
                  thoughtfully created to preserve <br />
                  memories, celebrate heritage, <br />
                  and inspire meaningful <br />
                  connections for <br />
                  generations <br />
                  to come.
                </p>
              </div>
            </Copy>
          </div>
        </section>

        {/* Sustainability Section */}
<section className="about-sustainability">
  <div className="about-sustainability__overlay" />

  <div className="about-sustainability__content">
    <span className="about-section-label">
      Sustainability
    </span>

    <h2>Crafted Responsibly</h2>
    <Copy>
    <p>
      At CraftHive, sustainability is not a talking point —
      it shows up in the materials we choose. We work with
      natural, locally sourced materials including jute,
      plantain backs and leaves, and coconut husks,
      giving organic matter a second life as something
      beautiful and enduring.
    </p>
 </Copy>
 <Animates animateOnScroll={true} delay={0.25}>
    <p>
      Where we can reduce waste, we do. Where we can
      choose a material that respects the environment,
      we always will.
    </p>
    </Animates>

    <blockquote>
      “Good craft doesn't cost the earth.
      It honours it.”
    </blockquote>
  </div>
</section>

{/* CTA Section */}
<section className="about-cta">
   <div className="interactive-grid grid-left"></div>
    <div className="interactive-grid grid-right"></div>
  <div className="about-cta__content">
    <span className="about-section-label">Let's Create</span>
    <h2>Have something special in mind?</h2>
    <p> Whether it's a commission, a custom gift,
      or simply an idea you haven't seen anywhere else —
      we'd love to hear it. Bring it to us and let's
      make something worth keeping.
    </p>
    <Link href="/contact" className="about-cta-btn">
      Get in Touch
    </Link>
  </div>
</section>
      </div>
      <Footer />
    </>
  );
};

export default StudioPage;
