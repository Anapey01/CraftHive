"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./customframing.css";

import FramePreview from "@/components/FramePreview/FramePreview";
import Footer from "@/components/ui/Footer";

import curatorialArchival from "./curatorial-archival.jpg";
import curatorialWorkshop from "./curatorial-workshop.jpg";

gsap.registerPlugin(SplitText, ScrollTrigger);

const CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75",
    alt: "Framed football jersey",
  },
  {
    src: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=600&q=75",
    alt: "Framed landscape painting",
  },
  {
    src: "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=75",
    alt: "Framed certificate",
  },
  {
    src: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=600&q=75",
    alt: "Ornate framed portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=75",
    alt: "Modern minimalist frame",
  },
];


type ProfileKey = "walnut" | "gold" | "whiteOak" | "honeyOak";

const PROFILES = {
  walnut: {
    name: "Roasted Walnut",
    image: "/services/framing-hero-2.jpg",
    mouldingSpec: '2.0" Roasted Walnut wood profile',
    matSpec: '2.5" Double Bevel Silk Matboard',
    glazingSpec: "Museum Acrylic with 99% UV protection",
    className: "moulding-walnut",
    desc: "A rich dark brown timber profile finished with organic wax, highlighting deep growth rings.",
  },
  gold: {
    name: "Ornate Gold Gilt",
    image: "/services/framing-hero-4.jpg",
    mouldingSpec: '1.8" Hand-Applied Gold Leaf Gilt',
    matSpec: '2.0" Warm Cotton Beveled Matboard',
    glazingSpec: "Anti-Reflective Museum Glazing",
    className: "moulding-gold",
    desc: "Bespoke gold leafing with subtle hand-burnished distressing to give classical warmth.",
  },
  whiteOak: {
    name: "Chalky White Oak",
    image: "/services/framing-hero-3.jpg",
    mouldingSpec: '1.5" Chalky White Oak profile',
    matSpec: '3.0" Minimal Off-White Matboard',
    glazingSpec: "Museum Glare-Free Acrylic",
    className: "moulding-white-oak",
    desc: "A modern, chalky-rubbed white finish showing off-white oak grain texture underneath.",
  },
  honeyOak: {
    name: "Natural Honey Oak",
    image: "/services/framing-hero-1.jpg",
    mouldingSpec: '1.4" Natural Honey Oak timber',
    matSpec: '2.5" Chalk White Matboard',
    glazingSpec: "Optium Museum Glazing",
    className: "moulding-honey-oak",
    desc: "Natural honey oak timber preserved under transparent matte lacquer for a clean, raw look.",
  },
};

const Hero = () => {
  const [selectedKey, setSelectedKey] = useState<ProfileKey>("walnut");
  const frameRef = useRef<HTMLDivElement>(null);

  const selected = PROFILES[selectedKey];

  const handleMouseMove = (e: React.MouseEvent) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const fx = rect.left + rect.width / 2;
    const fy = rect.top + rect.height / 2;
    const dx = e.clientX - fx;
    const dy = e.clientY - fy;

    const angleX = -dy * 0.05;
    const angleY = dx * 0.05;

    gsap.to(frame, {
      rotateX: Math.max(-10, Math.min(10, angleX)),
      rotateY: Math.max(-10, Math.min(10, angleY)),
      transformPerspective: 1200,
      z: 35,
      boxShadow: `${-dx * 0.08}px ${-dy * 0.08 + 25}px 45px rgba(0,0,0,0.22)`,
      duration: 0.35,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;
    gsap.to(frame, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section className="cf-workbench-hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="cf-workbench-grid-bg" />
      <h1 className="cf-workbench-bg-title caps">WORKSHOP</h1>

      <div className="cf-workbench-area">
        <div className="cf-workbench-interactive-container">
          
          {/* Blueprint Specs Callouts */}
          <div className="cf-blueprint-callout callout-moulding">
            <span className="cf-blueprint-title">[01] MOULDING</span>
            <span>{selected.mouldingSpec}</span>
          </div>

          <div className="cf-blueprint-callout callout-matting">
            <span className="cf-blueprint-title">[02] MATBOARD</span>
            <span>{selected.matSpec}</span>
          </div>

          <div className="cf-blueprint-callout callout-glazing">
            <span className="cf-blueprint-title">[03] GLAZING</span>
            <span>{selected.glazingSpec}</span>
          </div>

          {/* Interactive Beveled Frame */}
          <div ref={frameRef} className={`cf-workbench-frame-wrapper ${selected.className}`}>
            <div className="cf-frame-mat">
              <div className="cf-frame-inner">
                <div className="cf-frame-glaze" />
                <img src={selected.image} alt={selected.name} />
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic spec note & Controls */}
        <div className="cf-workbench-controls">
          {(Object.keys(PROFILES) as ProfileKey[]).map((key) => {
            const prof = PROFILES[key];
            return (
              <button
                key={key}
                className={`cf-workbench-btn ${selectedKey === key ? "active" : ""}`}
                onClick={() => setSelectedKey(key)}
              >
                <span className={`cf-swatch-dot dot-${key}`} />
                {prof.name}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

const HeroImage = () => {
  return null;
};

const Showcase = () => {
  return null;
};

const HeroHeader = () => {
  return (
    <section className="cf-header-centered">
      <p className="cf-header-label">(Custom Framing)</p>
      <h2 className="cf-header-title-centered">
        Thoughtfully handcrafted frames, made to showcase and preserve the moments that matter most.
      </h2>
      <div className="cf-header-actions-centered">
        <a href="#preview" className="cf-btn cf-btn-red">
          Enter Studio
        </a>
        <a href="/contact" className="cf-btn cf-btn-outline">
          Contact Workshop
        </a>
      </div>
    </section>
  );
};



const HangingFrame = ({ src, alt, frameClass, containerClass }: {
  src: string;
  alt: string;
  frameClass: string;
  containerClass: string;
}) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const fx = rect.left + rect.width / 2;
    const fy = rect.top + rect.height / 2;
    const dx = e.clientX - fx;
    const dy = e.clientY - fy;

    const angleX = -dy * 0.04;
    const angleY = dx * 0.04;

    gsap.to(frame, {
      rotateX: Math.max(-8, Math.min(8, angleX)),
      rotateY: Math.max(-8, Math.min(8, angleY)),
      transformPerspective: 1000,
      z: 20,
      boxShadow: `${-dx * 0.06}px ${-dy * 0.06 + 25}px 50px rgba(0,0,0,0.18)`,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;
    
    const baseRotation = frameClass.includes("frame-white-oak-mitered") ? -1.5 : 0;
    const baseShadow = frameClass.includes("frame-white-oak-mitered")
      ? "0 25px 50px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06), inset 0 0 8px rgba(0,0,0,0.15)"
      : "0 30px 60px rgba(0,0,0,0.16), 0 12px 24px rgba(0,0,0,0.08), inset 0 0 12px rgba(0,0,0,0.5)";

    gsap.to(frame, {
      rotateX: 0,
      rotateY: baseRotation,
      z: 0,
      boxShadow: baseShadow,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div className={`cf-hanging-frame-container ${containerClass}`}>
      <div className="cf-peg-hanger">
        <div className="cf-peg" />
        <div className="cf-wire" />
      </div>
      <div 
        ref={frameRef} 
        className={`cf-hanging-wire-frame ${frameClass}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cf-frame-mat">
          <div className="cf-frame-inner">
            <div className="cf-frame-glaze" />
            <img src={src} alt={alt} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CuratorialSpread = () => {
  return (
    <section className="cf-catalog-spread">
      {/* Drafting Guidelines Line */}
      <div className="cf-blueprint-draft-line" />

      {/* Spread Section 1: Archival Science */}
      <div className="cf-spread-section section-archival">
        <div className="cf-vertical-watermark watermark-left">ARCHIVAL</div>
        
        <HangingFrame
          src={curatorialArchival.src}
          alt="Archival shadow box display"
          frameClass="frame-walnut-shadowbox"
          containerClass="container-right"
        />

        {/* Floating linen placard card */}
        <div className="cf-placard-card placard-left reveal-left">
          <span className="cf-placard-tag">[ STUDY 01 // CONSERVATION ]</span>
          <h3 className="cf-placard-title">PRESERVING THE STORIES THAT SHAPE US</h3>
          <p className="cf-placard-body">
            Custom framing is a vow of preservation. We use acid-free cotton mats to prevent paper discoloration, reversible mounting techniques that protect delicate fibers, and 99% UV-filtering museum glass to shield your memories from light and time. Your history remains untouched, pristine, and preserved.
          </p>
          <div className="cf-placard-specs">
            <span>pH BALANCE: 8.5</span>
            <span>CORES: 100% COTTON</span>
            <span>GLAZE: UV 99%</span>
          </div>
        </div>
      </div>

      {/* Spread Section 2: The Workshop */}
      <div className="cf-spread-section section-workshop">
        <div className="cf-vertical-watermark watermark-right">WORKSHOP</div>

        <HangingFrame
          src={curatorialWorkshop.src}
          alt="Miter joint timber frame"
          frameClass="frame-white-oak-mitered"
          containerClass="container-left"
        />

        {/* Floating linen placard card */}
        <div className="cf-placard-card placard-right reveal-right">
          <span className="cf-placard-tag">[ STUDY 02 // MITER JOINERY ]</span>
          <h3 className="cf-placard-title">THE ARCHITECTURE OF SOLID TIMBER</h3>
          <p className="cf-placard-body">
            We build frames using honest, solid hardwoods — grown by nature and hand-shaped in our workshop. Each corner is joined with hidden maple splines, a centuries-old wood joinery technique that prevents wrapping and ensures structural integrity. No plastic, no composites, just pure timber and mitered precision.
          </p>
          <div className="cf-placard-specs">
            <span>TIMBERS: WALNUT & OAK</span>
            <span>JOINT: MITER SPLINES</span>
            <span>FINISH: RAW OIL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;

    const animation = gsap.to(track, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    const pause = () => animation.pause();
    const play = () => animation.resume();

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
      animation.kill();
    };
  }, []);

  return (
    <section className="cf-luxury-gallery">
      <div className="cf-gallery-header reveal">
        <span>Selected Works</span>
        <h2>Crafted For Generations</h2>
      </div>

      <div className="cf-marquee-container">
        <div ref={trackRef} className="cf-marquee-track">
          {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map(
            (img, i) => (
              <div
                key={i}
                className="cf-marquee-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => (
  <section className="cf-testimonial">
    <blockquote className="reveal">
      "CraftHive transformed my family photos into stunning
      pieces of art. Their attention to detail exceeded my
      expectations."
    </blockquote>

    <div className="cf-testimonial__author reveal">
      <strong>Ama Boateng</strong>
      <span>Artist, Freelance</span>
    </div>
  </section>
);

const Process = () => (
  <section className="cf-process">
    <div className="cf-process__img reveal-left">
      <img
        src="https://images.unsplash.com/photo-1607532941433-304659e8198a?w=900&q=80"
        alt="Framing process"
      />
    </div>

    <div className="cf-process__steps reveal-right">
      <h2>Our Framing Process</h2>

      <div className="cf-step">
        <h3>Initial Consultation</h3>
        <p>
          We discuss your artwork and recommend the best
          framing solution.
        </p>
      </div>

      <div className="cf-step">
        <h3>Design Selection</h3>
        <p>
          Choose moulding, matting and finishes that suit your
          piece.
        </p>
      </div>

      <div className="cf-step">
        <h3>Craftsmanship</h3>
        <p>
          Every frame is handcrafted with precision and care.
        </p>
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="cf-cta-banner">
    <h2 className="reveal">
      Ready to frame your memories?
    </h2>

    <p className="reveal">
      Let our team transform your artwork into something
      timeless.
    </p>

    <div className="cf-cta-banner-btns reveal">
      <a href="#" className="cf-btn cf-btn-red">
        Consult
      </a>

      <a href="/contact" className="cf-btn cf-btn-outline">
        Contact
      </a>
    </div>
  </section>
);

export default function CustomFramingPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const bgTitle = root.querySelector<HTMLHeadingElement>(".cf-workbench-bg-title");
    const frameWrapper = root.querySelector<HTMLElement>(".cf-workbench-frame-wrapper");
    const callouts = root.querySelectorAll(".cf-blueprint-callout");
    const controls = root.querySelector(".cf-workbench-controls");

    let split: SplitText | null = null;

    if (bgTitle) {
      split = SplitText.create(bgTitle, {
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
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    }

    if (frameWrapper) {
      gsap.fromTo(
        frameWrapper,
        { opacity: 0, scale: 0.85, y: 50, rotateX: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          delay: 0.6,
          ease: "power4.out",
        }
      );
    }

    if (callouts.length > 0) {
      gsap.fromTo(
        callouts,
        { opacity: 0, x: (i) => (i % 2 === 0 ? -40 : 40) },
        {
          opacity: 0.85,
          x: 0,
          duration: 1.0,
          stagger: 0.15,
          delay: 1.0,
          ease: "power3.out",
        }
      );
    }

    if (controls) {
      gsap.fromTo(
        controls,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.2,
          ease: "power3.out",
        }
      );
    }

    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-left").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    gsap.utils.toArray(".reveal-right").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      split?.revert();
    };
  }, []);

  return (
    <div className="custom-framing-wrapper" ref={pageRef}>
      <Hero />
      <HeroHeader />


      <CuratorialSpread />

      <WorkCarousel />

      <Testimonial />

      <Process />

      <section id="preview" className="preview-tool">
        <FramePreview />
      </section>

      <CTABanner />

      <Footer />
    </div>
  );
}