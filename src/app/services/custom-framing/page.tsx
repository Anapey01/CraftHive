"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./customframing.css";

import FramePreview from "@/components/FramePreview/FramePreview";
import Footer from "@/components/ui/Footer";

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



interface FeatureProps {
  flip?: boolean;
  label: string;
  title: string;
  body: string;
  list?: string[];
  actions: {
    label: string;
    outline?: boolean;
  }[];
  imgSrc: string;
  imgAlt: string;
}

const Feature = ({
  flip,
  label,
  title,
  body,
  list,
  actions,
  imgSrc,
  imgAlt,
}: FeatureProps) => (
  <section className={`cf-feature ${flip ? "flip" : ""}`}>
    <div
      className={`cf-feature__img ${
        flip ? "reveal-right" : "reveal-left"
      }`}
    >
      <img src={imgSrc} alt={imgAlt} />
    </div>

    <div
      className={`cf-feature__copy ${
        flip ? "reveal-left" : "reveal-right"
      }`}
    >
      <span className="cf-sec-label">{label}</span>

      <h2>{title}</h2>

      <p>{body}</p>

      {list && (
        <ul className="cf-feature__list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <div className="cf-feature__actions">
        {actions.map((action) => (
          <a
            key={action.label}
            href="#"
            className={`cf-btn cf-btn-sm ${
              action.outline ? "cf-btn-outline" : "cf-btn-red"
            }`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

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

      <Feature
        label="Craft"
        title="Frame every memory with precision and care"
        body="We specialise in transforming treasured items into beautifully preserved masterpieces."
        list={[
          "Pictures and Paintings",
          "Documents and Certificates",
          "Jerseys and Memorabilia",
        ]}
        actions={[
          { label: "Consult", outline: true },
          { label: "View", outline: true },
        ]}
        imgSrc="/services/textile-artwork.jpg"
        imgAlt="Close-up of a custom-framed textured textile artwork with raw wood moulding"
      />

      <Feature
        flip
        label="Quality"
        title="Crafting frames that stand the test of time"
        body="We use premium materials and expert craftsmanship."
        actions={[
          { label: "Details", outline: true },
          { label: "Materials", outline: true },
        ]}
        imgSrc="https://images.unsplash.com/photo-1560343787-e9432cc50c2d?w=900&q=80"
        imgAlt="Frame materials"
      />

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