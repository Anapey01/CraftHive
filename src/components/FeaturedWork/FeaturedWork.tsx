"use client";

import "./FeaturedWork.css";
import { useRef, useEffect } from "react";
import { projects } from "./project";
import { useViewTransition } from "@/hooks/useViewTransition";

/* COMMENTED OUT GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
*/

type Project = {
  name: string;
  route: string;
  img: string;
  description: string;
  [key: string]: unknown;
};

type FeaturedWorkItemProps = {
  project: Project;
};

function FeaturedWorkItem({ project }: FeaturedWorkItemProps) {
  return (
    <div className="featured-work-item">
      <a href={project.route} className="featured-work-item-link">
        <div className="featured-work-item-img-wrapper">
          <img src={project.img} alt={project.name} className="featured-work-img" />
          <div className="featured-work-overlay"></div>
          <div className="featured-work-item-copy">
            <h3 className="featured-work-title">{project.name}</h3>
            <p className="featured-work-desc">{project.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function FeaturedWork() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();

  /* COMMENTED OUT GSAP SCROLL TRIGGER LOGIC
  const featuredWorkContainerRef = useRef<HTMLDivElement | null>(null);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  
  useGSAP(() => {
    const root = featuredWorkContainerRef.current;
    const wrapper = carouselWrapperRef.current;
    if (!root || !wrapper) return;

    const section = wrapper.closest('.featured-work');

    const tl = gsap.timeline();
    
    // Animate exactly the element's full width, offset by the viewport width
    tl.to(root, {
      xPercent: -100,
      x: () => window.innerWidth,
      ease: "none",
      duration: 1,
    });

    // Add pause by animating an invisible property so it stops at the last image
    tl.to(root, { opacity: 1, duration: 0.3 }); 

    const st1 = ScrollTrigger.create({
      trigger: section || wrapper,
      start: "top top",
      // Fixed scroll distance of exactly 8000 pixels for testing the speed/feel
      end: () => `+=${8000}`,
      pin: true,
      animation: tl,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    const handleClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        navigateWithTransition(href);
      }
    };

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>(".featured-work-item-link"));
    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
      st1.kill();
      tl.kill();
    };
  }, { scope: carouselWrapperRef, dependencies: [navigateWithTransition] });
  */

  useEffect(() => {
    // Handle link clicks gracefully since we're using a normal scroll container now
    const root = scrollContainerRef.current;
    if (!root) return;

    const handleClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        navigateWithTransition(href);
      }
    };

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>(".featured-work-item-link"));
    links.forEach((link) => link.addEventListener("click", handleClick));

    // Auto-scroll logic
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        // If reached the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll right by approximately one item width
          scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 4000); // 4 seconds auto-scroll

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
      clearInterval(interval);
    };
  }, [navigateWithTransition]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="featured-work-carousel-container">
      {/* COMMENTED OUT MANUAL CONTROLS AS REQUESTED
      <div className="featured-work-controls">
        <button className="carousel-btn left" onClick={scrollLeft}>
          &#10094;
        </button>
        <button className="carousel-btn right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
      */}

      <div className="featured-work-carousel-wrapper">
        <div className="featured-work-list manual-scroll" ref={scrollContainerRef}>
          {projects.map((project, index) => (
            <FeaturedWorkItem project={project as Project} key={`${project.route}-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
