"use client";

import "./FeaturedWork.css";
import { useRef, useEffect } from "react";
import { projects } from "./project";
import { useViewTransition } from "@/hooks/useViewTransition";
import gsap from "gsap";



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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();

  const scrollToIdx = (idxOffset: number) => {
    const root = scrollContainerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(".featured-work-item"));
    if (items.length === 0) return;
    
    const activeIdx = items.findIndex(item => item.classList.contains("active"));
    let targetIdx = activeIdx + idxOffset;
    
    if (targetIdx < 0) targetIdx = items.length - 1;
    if (targetIdx >= items.length) targetIdx = 0;

    const targetEl = items[targetIdx] as HTMLElement;
    if (targetEl) {
      const targetScrollLeft = targetEl.offsetLeft - root.clientWidth / 2 + targetEl.clientWidth / 2;
      gsap.to(root, { scrollLeft: targetScrollLeft, duration: 1.2, ease: "power2.inOut" });
    }
  };

  useEffect(() => {
    const root = scrollContainerRef.current;
    const container = containerRef.current;
    if (!root || !container) return;

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

    const items = Array.from(root.querySelectorAll(".featured-work-item"));

    const handleScroll = () => {
      if (!root) return;
      const scrollCenter = root.scrollLeft + root.clientWidth / 2;
      
      let closestIdx = 0;
      let minDistance = Infinity;

      items.forEach((item, idx) => {
        const el = item as HTMLElement;
        const center = el.offsetLeft + el.clientWidth / 2;
        const distance = Math.abs(center - scrollCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      items.forEach((item, idx) => {
        if (idx === closestIdx) {
          if (!item.classList.contains("active")) item.classList.add("active");
        } else {
          if (item.classList.contains("active")) item.classList.remove("active");
        }
      });
    };

    root.addEventListener("scroll", handleScroll, { passive: true });
    
    setTimeout(() => {
      handleScroll();
      if (items.length > 0) {
        const firstEl = items[0] as HTMLElement;
        root.scrollLeft = firstEl.offsetLeft - root.clientWidth / 2 + firstEl.clientWidth / 2;
      }
    }, 100);

    let isHovered = false;
    const setHovered = () => { isHovered = true; };
    const setUnhovered = () => { isHovered = false; };
    
    let touchTimeout: NodeJS.Timeout;
    const setTouchHovered = () => {
      isHovered = true;
      clearTimeout(touchTimeout);
    };
    const setTouchUnhovered = () => {
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => { isHovered = false; }, 2000);
    };

    container.addEventListener("mouseenter", setHovered);
    container.addEventListener("mouseleave", setUnhovered);
    container.addEventListener("touchstart", setTouchHovered, { passive: true });
    container.addEventListener("touchend", setTouchUnhovered, { passive: true });

    const interval = setInterval(() => {
      if (!root || isHovered) return;
      
      const activeIdx = items.findIndex(item => item.classList.contains("active"));
      let nextIdx = activeIdx + 1;
      if (nextIdx >= items.length) nextIdx = 0;
      
      const nextEl = items[nextIdx] as HTMLElement;
      if (nextEl) {
        const targetScrollLeft = nextEl.offsetLeft - root.clientWidth / 2 + nextEl.clientWidth / 2;
        gsap.to(root, { scrollLeft: targetScrollLeft, duration: 1.2, ease: "power2.inOut" });
      }
    }, 4500);

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
      root.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mouseenter", setHovered);
      container.removeEventListener("mouseleave", setUnhovered);
      container.removeEventListener("touchstart", setTouchHovered);
      container.removeEventListener("touchend", setTouchUnhovered);
      clearInterval(interval);
      clearTimeout(touchTimeout);
      gsap.killTweensOf(root);
    };
  }, [navigateWithTransition]);

  return (
    <div className="featured-work-carousel-container" ref={containerRef}>
      <div className="featured-work-controls">
        <button 
          className="carousel-btn prev" 
          onClick={() => scrollToIdx(-1)} 
          aria-label="Previous work"
        >
          &#8592;
        </button>
        <button 
          className="carousel-btn next" 
          onClick={() => scrollToIdx(1)} 
          aria-label="Next work"
        >
          &#8594;
        </button>
      </div>

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
