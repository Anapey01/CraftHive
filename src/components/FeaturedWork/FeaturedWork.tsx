"use client";

import "./FeaturedWork.css";
import { useEffect, useMemo, useRef } from "react";
import { projects } from "./project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  route: string;
  img: string;
  [key: string]: unknown;
};

type FeaturedWorkItemProps = {
  project: Project;
};

function FeaturedWorkItem({ project }: FeaturedWorkItemProps) {
  return (
    <div className="featured-work-item">
      <a href={project.route} className="featured-work-item-link">
        <div className="featured-work-item-img">
          <div className="featured-work-item-copy">
            <h3>{project.name}</h3>
          </div>
          <img src={project.img} alt={project.name} />
        </div>
      </a>
    </div>
  );
}

const buildProjectRows = (projectsList: Project[]) => {
  const rows: Project[][] = [];

  for (let i = 0; i < projectsList.length; i += 2) {
    rows.push(projectsList.slice(i, i + 2));
  }

  return rows;
};

export default function FeaturedWork() {
  const featuredWorkContainerRef = useRef<HTMLDivElement | null>(null);
  const { navigateWithTransition } = useViewTransition();

  const projectRows = useMemo(() => buildProjectRows(projects as Project[]), []);

  useEffect(() => {
    const root = featuredWorkContainerRef.current;
    if (!root) return;

    const featuredWorkItems = Array.from(root.querySelectorAll<HTMLElement>(".featured-work-item"));
    
    gsap.set(featuredWorkItems, { 
      y: 150, 
      opacity: 0,
      rotation: (index) => (index % 2 === 0 ? -15 : 15),
      transformOrigin: "center center"
    });

    const scrollTriggers: ScrollTrigger[] = [];

    featuredWorkItems.forEach((item) => {
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.to(item, {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
            });
          },
        })
      );
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
      scrollTriggers.forEach((trigger) => trigger.kill());
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, [navigateWithTransition]);

  return (
    <div className="featured-work-list" ref={featuredWorkContainerRef}>
      {projectRows.map((row, rowIndex) => (
        <div className="row" key={`featured-work-row-${rowIndex}`}>
          {row.map((project, index) => (
            <FeaturedWorkItem project={project} key={`${project.route}-${rowIndex}-${index}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
