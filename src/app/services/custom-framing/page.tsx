"use client";

import { useEffect, useRef } from "react";

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


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const wallTextRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Initial fade-in/mount animations
    // Fade in vinyl wall text
    gsap.fromTo(
      wallTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    // Hang the frames: slide down onto hooks
    frameRefs.current.forEach((frame, i) => {
      if (!frame) return;
      gsap.fromTo(
        frame,
        { opacity: 0, y: -60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          delay: 0.4 + i * 0.2,
          ease: "power4.out"
        }
      );
    });

    // 2. Parallax scroll zoom (simulating walking closer to the wall)
    const ctx = gsap.context(() => {
      // Wall text fades out and moves up
      gsap.to(wallTextRef.current, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Frames move and zoom at staggered speeds
      frameRefs.current.forEach((frame, i) => {
        if (!frame) return;
        const speeds = [-140, -60, -180, -90]; // Staggered vertical parallax
        const scaleBoost = [1.06, 1.03, 1.08, 1.04]; // Staggered zoom parallax
        gsap.to(frame, {
          y: speeds[i],
          scale: scaleBoost[i],
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Spotlight mouse follow on the wall
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    if (!hero || !spotlight) return;
    
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(spotlight, {
      left: x,
      top: y,
      duration: 0.3,
      ease: "power2.out"
    });

    // Also tilt individual frames when hovered
    frameRefs.current.forEach((frame) => {
      if (!frame) return;
      const frameRect = frame.getBoundingClientRect();
      const mx = e.clientX - frameRect.left;
      const my = e.clientY - frameRect.top;
      
      if (mx >= 0 && mx <= frameRect.width && my >= 0 && my <= frameRect.height) {
        const normX = (mx - frameRect.width / 2) / (frameRect.width / 2);
        const normY = (my - frameRect.height / 2) / (frameRect.height / 2);
        
        gsap.to(frame, {
          rotateY: normX * 8,
          rotateX: -normY * 8,
          transformPerspective: 1200,
          z: 30, // Lift off the wall in 3D
          boxShadow: "0 30px 60px rgba(0,0,0,0.18), 0 10px 20px rgba(0,0,0,0.12)",
          ease: "power2.out",
          duration: 0.4
        });
      } else {
        // Reset if mouse is outside
        gsap.to(frame, {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
          ease: "power2.out",
          duration: 0.5
        });
      }
    });
  };

  const handleMouseLeave = () => {
    // Reset all frames
    frameRefs.current.forEach((frame) => {
      if (!frame) return;
      gsap.to(frame, {
        rotateY: 0,
        rotateX: 0,
        z: 0,
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
        ease: "power2.out",
        duration: 0.6
      });
    });
  };

  return (
    <section 
      className="cf-gallery-wall-hero" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight follower overlay */}
      <div className="cf-gallery-spotlight" ref={spotlightRef} />

      <div className="cf-gallery-wall-layout">
        
        {/* Curatorial Text (Vinyl lettering on the wall) */}
        <div className="cf-vinyl-signage" ref={wallTextRef}>
          <span className="cf-vinyl-eyebrow">EXHIBITION / WALL 04</span>
          <h1 className="cf-vinyl-title">HERITAGE PRESERVED</h1>
          <div className="cf-vinyl-curator-note">
            <span className="note-label">Curator's Note:</span>
            <p>
              An installation of four custom-framed archival works, showcasing hand-milled roasted walnut, gold gilt leaf, and natural white oak. Designed to preserve three-dimensional cultural artifacts and fine art canvases for generations.
            </p>
          </div>
          <div className="cf-vinyl-actions">
            <a href="#preview" className="cf-vinyl-btn cf-vinyl-btn-red">
              Enter Studio
            </a>
            <a href="/contact" className="cf-vinyl-btn cf-vinyl-btn-outline">
              Contact Workshop
            </a>
          </div>
        </div>

        {/* The Hung Frames (Asymmetrical Gallery Composition) */}
        
        {/* Frame 1: Museum Shadow Box (Walnut) */}
        <div 
          className="cf-hung-frame frame-walnut-shadowbox"
          ref={el => { frameRefs.current[0] = el }}
        >
          <div className="cf-wood-moulding moulding-walnut">
            <div className="cf-matboard">
              <img src="/services/framing-hero-2.jpg" alt="Exhibit 01: Shadow Box" />
            </div>
          </div>
          <div className="cf-wall-label">
            <span className="label-index">01</span>
            <span className="label-text">Museum Shadow Box &mdash; Roasted Walnut</span>
          </div>
        </div>

        {/* Frame 2: Market Painting (Gold Gilt) */}
        <div 
          className="cf-hung-frame frame-gold-painting"
          ref={el => { frameRefs.current[1] = el }}
        >
          <div className="cf-wood-moulding moulding-gold">
            <div className="cf-matboard">
              <img src="/services/framing-hero-4.jpg" alt="Exhibit 02: Market Scene" />
            </div>
          </div>
          <div className="cf-wall-label">
            <span className="label-index">02</span>
            <span className="label-text">Ornate Gold &mdash; Fine Art Canvas</span>
          </div>
        </div>

        {/* Frame 3: Living Room Gallery (White Oak) */}
        <div 
          className="cf-hung-frame frame-white-gallery"
          ref={el => { frameRefs.current[2] = el }}
        >
          <div className="cf-wood-moulding moulding-white-oak">
            <div className="cf-matboard">
              <img src="/services/framing-hero-3.jpg" alt="Exhibit 03: Home Gallery" />
            </div>
          </div>
          <div className="cf-wall-label">
            <span className="label-index">03</span>
            <span className="label-text">White Oak Set &mdash; Custom Living Room Gallery</span>
          </div>
        </div>

        {/* Frame 4: Bronze Sculptures (Natural Oak) */}
        <div 
          className="cf-hung-frame frame-natural-sculptures"
          ref={el => { frameRefs.current[3] = el }}
        >
          <div className="cf-wood-moulding moulding-natural-oak">
            <div className="cf-matboard">
              <img src="/services/framing-hero-1.jpg" alt="Exhibit 04: Sculptures Setup" />
            </div>
          </div>
          <div className="cf-wall-label">
            <span className="label-index">04</span>
            <span className="label-text">Natural Oak &mdash; 3D Object Showcase</span>
          </div>
        </div>

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
  <section className={`feature ${flip ? "flip" : ""}`}>
    <div
      className={`feature__img ${
        flip ? "reveal-right" : "reveal-left"
      }`}
    >
      <img src={imgSrc} alt={imgAlt} />
    </div>

    <div
      className={`feature__copy ${
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
            className={`btn btn-sm ${
              action.outline ? "btn-outline" : "btn-red"
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
  useEffect(() => {
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
}, []);

  return (
    <>
      <Hero />

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
        imgSrc="/services/custom-framing-hero.jpg"
        imgAlt="Artisanal shelf displaying pottery and framed textile"
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
    </>
  );
}