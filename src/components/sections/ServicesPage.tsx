'use client'

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Animates from "@/components/Animates/Animate";


gsap.registerPlugin(ScrollTrigger);

const heroBg = "/services/service-hero.jpg";
const heroExpand = "/services/service-hero.jpg";

type Service = {
  number: string;
  title: string;
  description: string;
  image: string;
  link: string;
  className: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Custom Framing",
    description:
      "Professional framing for photos, artworks, certificates, and collectibles. Your choice of style, mount colour, and size — tailored to your piece and your space.",
    image: "/assets/custom.jpg",
    link: "/services/custom-framing",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    number: "02",
    title: "Shadow Boxes",
    description:
      "Our flagship. Handcrafted hollow frames arranged with brass Adinkra symbols into a bespoke, culturally rooted artwork. Ready-made or fully commissioned to your story.",
    image: "/assets/shadow.jpg",
    link: "/services/shadow-box",
    className: "md:col-span-2",
  },
  {
    number: "03",
    title: "Handicrafts, Home Decor & Designer Mirrors",
    description:
      "Curated handcrafted pieces — tabletop fountains, rustic furniture, diffusers, designer mirrors, cultural artefacts, and artisanal decor. Selected for quality and character.",
    image: "/assets/mirror.jpg",
    link: "/services/handicrafts",
    className: "md:col-span-2",
  },
  {
    number: "04",
    title: "Laser Engraving & Cutting",
    description:
      "Precision engraving and cutting on wood, acrylic, leather, and more. Personal gifts, branded items, decorative panels — clean results, every time.",
    image: "/assets/laser.jpg",
    link: "/gallery",
    className: "md:col-span-2",
  },
  {
    number: "05",
    title: "Indoor & Outdoor Signs",
    description:
      "Custom signage for businesses, offices, homes, and events. Professional finish, durable materials, made to make the right impression.",
    image: "/assets/signage.jpg",
    link: "/gallery",
    className: "md:col-span-2",
  },
  {
    number: "06",
    title: "Personalised Gifts & Memory Boxes",
    description:
      "Handcrafted gifts for life's most meaningful moments — births, anniversaries, milestones. Names, dates, photos, built into something worth keeping.",
    image: "/assets/memory.jpg",
    link: "/gallery",
    className: "md:col-span-2",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLSpanElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // MASTER HERO TIMELINE
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "+=200%",
    scrub: 1.2,
    pin: true,
    anticipatePin: 1,
  },
});

// Background fades and zooms
heroTl.to(
  heroBgRef.current,
  {
    scale: 1.15,
    opacity: 0.2,
    ease: "none",
  },
  0
);

// Expanding artwork
heroTl.to(
  expandRef.current,
  {
    width: "100vw",
    height: "100vh",
    borderRadius: "0px",
    ease: "none",
  },
  0
);

// Badge exits upward
heroTl.to(
  heroBadgeRef.current,
  {
    y: -100,
    opacity: 0,
    filter: "blur(4px)",
    ease: "none",
  },
  0.15
);

// Main title left
heroTl.to(
  heroTitleRef.current,
  {
    x: () => -window.innerWidth * 0.9,
    opacity: 0,
    filter: "blur(8px)",
    ease: "none",
  },
  0.2
);

// Subtitle right
heroTl.to(
  heroSubRef.current,
  {
    x: () => window.innerWidth * 0.9,
    opacity: 0,
    filter: "blur(8px)",
    ease: "none",
  },
  0.2
);

// Scroll indicator drops away
heroTl.to(
  heroScrollRef.current,
  {
    y: 100,
    opacity: 0,
    ease: "none",
  },
  0.2
);

// Overlay content fades in only after image is mostly expanded
heroTl.fromTo(
  overlayTextRef.current,
  {
    opacity: 0,
    y: 80,
  },
  {
    opacity: 1,
    y: 0,
    ease: "none",
  },
  0.7
);

      // Bento entry animation
      const cards = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Section heading reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });
    });

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* background image */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        {/* Cinematic Overlay */}
<div
  className="absolute inset-0 z-[1]"
  style={{
    background: `
      radial-gradient(circle at center,
        rgba(0,0,0,0.15) 0%,
        rgba(0,0,0,0.45) 60%,
        rgba(0,0,0,0.75) 100%
      ),
      linear-gradient(
        to bottom,
        rgba(0,0,0,.55),
        rgba(0,0,0,.35),
        rgba(0,0,0,.8)
      )
    `,
  }}
/>

        {/* Hero text */}
        <div
          ref={heroTextRef}
          className="pointer-events-none relative z-30 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <h1
            ref={heroTitleRef}
            className="text-balance text-5xl font-medium leading-[0.95] text-[oklch(0.98_0.005_80)] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)] sm:text-7xl md:text-[clamp(4rem,9vw,9rem)]"
          >
            Made with Craft.
            <br />
            <span className="italic text-[#c31b07] text-primary">Made to Last.</span>
          </h1>
          <p 
            ref={heroSubRef}
            className="mt-8 max-w-2xl text-balance text-base text-white [text-shadow:0_1px_20px_rgba(0,0,0,0.7)] sm:text-lg"
          >
            From custom framing and Adinkra-inspired Shadow Boxes to laser engraving,
            bespoke signage, and personalised gifts — everything at CraftHive is made
            by hand, built with care, and designed to endure.
          </p>
        </div>

        {/* Expanding image */}
        <div
          ref={expandRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          style={{
            width: "32vw",
            height: "48vh",
            borderRadius: "24px",
            backgroundImage: `url(${heroExpand})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            ref={overlayTextRef}
            className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-20 text-center opacity-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85), transparent 55%)",
            }}
          >
            <span className="mb-3 text-[#c31b07] font-medium text-[13px] uppercase tracking-[0.3em] text-primary">
              The CraftHive Promise
            </span>
            <h2 className="font-display max-w-3xl text-balance text-3xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              Preserve what your walls deserve.
            </h2>
          </div>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section id="services" className="relative px-6 py-32 md:py-48">
         {/* ambient red glow */}
  <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#c31b07]/15 blur-[180px]" />
  <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#c31b07]/10 blur-[180px]" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <div data-reveal className="max-w-xl">
              <span className="mb-4 inline-block text-[11px] uppercase tracking-[0.3em] text-[#c31b07]">
                — Our Services
              </span>
              <h2 className="text-balance text-5xl font-medium text-white md:text-7xl">
                Six disciplines.
                <br />
                One standard of craft.
              </h2>
            </div>
            <Animates animateOnScroll={true} delay={0.25}>
            <p
              data-reveal
              className="max-w-md text-base text-white/70 sm:text-lg"
            >
              Every piece begins with intent and ends with permanence — a quiet
              promise that what we make will outlast trends, walls, and seasons.
            </p>
             </Animates>
          </div>

          {/* BENTO GRID */}
          <div
            ref={bentoRef}
            className="mt-20 grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-4"
          >
            {services.map((s) => (
              <ServiceCard key={s.number} service={s} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={service.link}
      data-bento-card
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#c31b07]/60 hover:shadow-[0_0_60px_rgba(195,27,7,0.15)] sm:p-8 ${service.className}`}
    >
      <div
        className="absolute inset-0 opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
  style={{
    background: `
      linear-gradient(
        180deg,
        rgba(0,0,0,0.45) 0%,
        rgba(0,0,0,0.75) 45%,
        rgba(0,0,0,0.95) 100%
      )
    `,
  }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="text-3xl text-[#c31b07]">{service.number}</span>
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60 backdrop-blur">
          Service
        </span>
      </div>

      <div className="relative z-10 mt-10">
        <h3 className="leading-tight text-2xl font-medium text-white sm:text-3xl"> 
          {service.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          {service.description}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#c31b07]">
          View Collection
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c31b07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </a>
  );
}
