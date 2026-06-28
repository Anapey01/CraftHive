"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CategorySelector } from "./CategorySelector";

import "./customframing.css";

import FramePreview from "@/components/FramePreview/FramePreview";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Carousel images removed as requested
const HeroImageBg = () => (
  <section className="cf-hero-image-bg">
    <div className="cf-hero-overlay"></div>
    <div className="cf-hero-content reveal">
      <h1>True Custom Framing</h1>
      <p>Handcrafted for every piece, made with premium materials.<br/><br/>Custom framing made easy.</p>
      <a 
        href="#preview" 
        className="cf-hero-btn"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        START FRAMING
      </a>
    </div>
  </section>
);

const MadeForPieces = () => (
  <section className="cf-text-section">
    <div className="cf-text-container reveal">
      <h2>Made For The Pieces That Matter</h2>
      <p>
        Great framing shouldn't mean expensive trips or complicated setups. We've made custom framing effortless, with everything you need delivered straight to your door.
      </p>
      <p>
        Each frame is handcrafted to fit your artwork perfectly and includes all the hardware and easy-to-follow instructions for assembly. In just a few minutes, your artwork is ready to take center stage.
      </p>
    </div>
  </section>
);

const ImageGrid = () => (
  <section className="cf-image-grid-section">
    <div className="cf-image-grid">
      <div className="cf-grid-img reveal-left">
        <Image src="/services/cf-image-3.png" alt="Custom picture framing workshop setup in Weija" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="cf-grid-img reveal">
        <Image src="/services/cf-image-1.png" alt="Close up detail of museum-grade custom framing" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="cf-grid-img reveal-right">
        <Image src="/services/cf-image-2.png" alt="Gallery wall featuring custom framed artwork" width={500} height={500} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  </section>
);

const FramingOriginText = () => (
  <section className="cf-text-section-bottom">
    <div className="cf-text-container reveal">
      <p>
        Handcrafted in Kumasi, Ghana with conservation-grade materials and careful attention to detail. Museum-quality framing, made closer and more accessible.
      </p>
      <p>
        Watch the video below to see how effortless it is to frame your artwork at home.
      </p>
    </div>
  </section>
);

const Feature1 = () => (
  <section className="cf-feature">
    <div className="cf-feature-img reveal-left">
      <Image
        src="/services/framing-hero-1.jpg"
        alt="Solid hardwood frame showing mitred joints with maple spline detail"
        width={800} height={1000} style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div className="cf-feature-copy reveal-right">
      <span className="cf-sec-label">The Joinery</span>
      <h2>Honest hardwoods, joined to endure</h2>
      <p>
        We construct our frames using solid hardwoods. Each corner is reinforced with maple splines—a traditional woodworking technique that locks the miter joint forever and prevents warping.
      </p>
      <div className="cf-feature-actions">
        <a href="/contact" className="cf-btn cf-btn-red">
          Request Timber Samples
        </a>
      </div>
    </div>
  </section>
);

const MaterialsOfPreservation = () => (
  <section className="cf-materials-section">
    <div className="cf-materials-head container reveal">
      <span className="cf-sec-label">Materials</span>
      <h2>Made for conservation, finished by hand</h2>
      <p>
        Every layer of our custom frames is acid-free and museum-grade, preserving the original beauty of your artwork for generations.
      </p>
    </div>
    <div className="cf-materials-grid container">
      {[
        {
          n: "01",
          title: "Timber Mouldings",
          desc: "Solid hardwoods—Roasted Walnut, Chalky White Oak, and Honey Oak—sourced sustainably and hand-finished with organic wax."
        },
        {
          n: "02",
          title: "Conservation Matting",
          desc: "Acid-free, alkaline-buffered cotton matboards that prevent acid burns and discoloration over time."
        },
        {
          n: "03",
          title: "Museum Glazing",
          desc: "Virtually invisible glazing with 99% UV protection to block harmful light rays and eliminate glare."
        },
        {
          n: "04",
          title: "Archival Mounting",
          desc: "Reversible mounting using acid-free Japanese hinging tissue, ensuring your prints remain undamaged."
        }
      ].map((m) => (
        <div className="cf-mat-card reveal" key={m.n}>
          <span className="cf-mat-card-num">{m.n}</span>
          <h3>{m.title}</h3>
          <p>{m.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Feature2 = () => (
  <section className="cf-feature cf-feature-flip">
    <div className="cf-feature-img reveal-right">
      <Image
        src="/services/framing-hero-3.jpg"
        alt="Archival mounting of canvas print using conservation-grade materials"
        width={800} height={1000} style={{ width: '100%', height: 'auto' }}
      />
    </div>
    <div className="cf-feature-copy reveal-left">
      <span className="cf-sec-label">Conservation</span>
      <h2>Protecting your history from light and time</h2>
      <p>
        Every framing layer is acid-free. We use cotton matboards and 99% UV-filtering museum glass to ensure your photographs, relics, and canvases never fade or discolor.
      </p>
      <div className="cf-feature-actions">
        <a href="/contact" className="cf-btn cf-btn-red">
          Consult on Preservation
        </a>
      </div>
    </div>
  </section>
);

const CustomerPhotos = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const images = [
    "/services/customer-1.png",
    "/services/customer-2.png",
    "/services/customer-3.png",
    "/services/customer-4.png",
    "/services/customer-5.png",
    "/services/customer-6.png",
    "/services/customer-7.png",
  ];

  const scroll = (dir: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="cf-customer-photos">
      <div className="cf-customer-header reveal">
        <span className="cf-sec-label">In The Wild</span>
        <h2>Customer Photos</h2>
        <p>Beautifully framed pieces living in our customers' homes and studios.</p>
      </div>
      
      <div className="cf-customer-carousel-wrapper">
        <button 
          className="cf-carousel-btn cf-carousel-prev" 
          onClick={() => scroll("left")}
          aria-label="Previous photos"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="cf-customer-track" ref={trackRef}>
          {images.map((src, i) => (
            <div key={i} className={`cf-customer-item reveal delay-${(i % 3) + 1}`}>
              <Image src={src} alt={`CraftHive custom framing example ${i + 1} installed in client home`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <button 
          className="cf-carousel-btn cf-carousel-next" 
          onClick={() => scroll("right")}
          aria-label="Next photos"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};


const CTABanner = () => (
  <section className="cf-cta-immersive">
    <div className="cf-cta-content">
      <span className="cf-cta-tag">CRAFT HIVE</span>
      <h2>
        Ready to frame
        <br />
        your memories?
      </h2>
      <p>
        Whether it is a family photograph, a gallery-grade canvas, or a cherished heirloom—consult with our workshop to build something that lasts.
      </p>
      <div className="cf-cta-actions">
        <a href="/contact" className="cf-cta-btn">
          Consult Workshop
        </a>
        <a href="#preview" className="cf-cta-btn-outline">
          Try Preview Tool
        </a>
      </div>
    </div>
    <div className="cf-cta-glow" />
  </section>
);

export default function CustomFramingPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

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
    <div className="custom-framing-wrapper" ref={pageRef}>
      <HeroImageBg />
      <MadeForPieces />
      <ImageGrid />
      <FramingOriginText />
      <CustomerPhotos />
      <CategorySelector />

      <section id="preview" className="preview-tool">
        <FramePreview />
      </section>

      <CTABanner />

      <Footer />
    </div>
  );
}
