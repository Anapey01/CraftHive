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
  return (
    <section className="cf-hero">
      <h1 className="cf-hero-title caps">FRAME</h1>
    </section>
  );
};

const HeroImage = () => {
  return (
    <section className="cf-hero-img">
      <div className="cf-hero-img-wrapper">
        <img src="/services/custom-framing-hero.jpg" alt="Artisanal Framing Studio" />
      </div>
    </section>
  );
};

const Showcase = () => {
  return (
    <section className="cf-showcase-section">
      <div className="cf-showcase-bg-title">EXHIBIT</div>
      <div className="cf-showcase-grid">
        {/* Frame 1: Museum Shadow Box (Walnut) */}
        <div className="cf-showcase-frame cf-showcase-walnut">
          <img src="/services/framing-hero-2.jpg" alt="Roasted Walnut Shadow Box" />
          <div className="cf-showcase-label">01 &mdash; Walnut Shadowbox</div>
        </div>

        {/* Frame 2: Ornate Gold Gilt */}
        <div className="cf-showcase-frame cf-showcase-gold">
          <img src="/services/framing-hero-4.jpg" alt="Ornate Gold Gilt Frame" />
          <div className="cf-showcase-label">02 &mdash; Ornate Gold Gilt</div>
        </div>

        {/* Frame 3: White Oak Gallery */}
        <div className="cf-showcase-frame cf-showcase-white-oak">
          <img src="/services/framing-hero-3.jpg" alt="Chalky White Oak Setup" />
          <div className="cf-showcase-label">03 &mdash; White Oak Set</div>
        </div>

        {/* Frame 4: Natural Honey Oak */}
        <div className="cf-showcase-frame cf-showcase-oak">
          <img src="/services/framing-hero-1.jpg" alt="Natural Honey Oak Frame" />
          <div className="cf-showcase-label">04 &mdash; Natural Honey Oak</div>
        </div>
      </div>
    </section>
  );
};

const HeroHeader = () => {
  return (
    <section className="cf-header">
      <div className="cf-header-col-sm">
        <p className="cf-header-label">(Custom Framing)</p>
      </div>
      <div className="cf-header-col-lg">
        <div className="cf-header-copy">
          <h2>
            Preserving history with precision. Our workshop designs bespoke architectural frames, 
            blending heritage craftsmanship with archival protection. From hand-finished 
            roasted walnut shadow boxes to classic gold gilt profiles and modern chalky white oak, 
            every frame is shaped to transform your artwork, 3D artifacts, and fine art canvases 
            into generational masterworks.
          </h2>
          <div className="cf-header-actions">
            <a href="#preview" className="btn btn-red">
              Enter Studio
            </a>
            <a href="/contact" className="btn btn-outline">
              Contact Workshop
            </a>
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
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const heroH1 = root.querySelector<HTMLHeadingElement>(".cf-hero-title");
    const heroImgWrapper = root.querySelector<HTMLElement>(".cf-hero-img-wrapper");

    let split: SplitText | null = null;

    if (heroH1) {
      split = SplitText.create(heroH1, {
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
        stagger: 0.15,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    if (heroImgWrapper) {
      gsap.set(heroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      gsap.to(heroImgWrapper, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.2,
        delay: 0.7,
        ease: "power3.out",
      });
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
      <HeroImage />
      <HeroHeader />
      <Showcase />

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
    </div>
  );
}