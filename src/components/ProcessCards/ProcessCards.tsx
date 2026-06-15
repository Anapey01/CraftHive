"use client";

import * as React from "react";
import { useEffect } from "react";
import "./ProcessCards.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProcessCardData = {
  index: string;
  title: string;
  image: string;
  description: string;
};

const processCardsData: ProcessCardData[] = [
  {
    index: "01",
    title: "Craftmanship",
    image: "/process/craftmanship.jpg",
    description:
      "Every piece is held to the highest standard of finish and durability — because work done well is work that lasts.",
  },
  {
    index: "02",
    title: "Creativity",
    image: "/process/creativity.jpg",
    description:
      "No two commissions are the same. We bring fresh thinking to every project, always in service of the person it is made for.",
  },
  {
    index: "03",
    title: "Integrity",
    image: "/process/integrity.jpg",
    description:
      "Honest about process. Clear on pricing. Committed to delivering exactly what we promise.",
  },
  {
    index: "04",
    title: "Preservation",
    image: "/process/preservation.jpg",
    description:
      "Whether framing a photograph or crafting a Shadow Box, our goal is always to create something that endures well beyond the moment it was made.", 
  },
];

const ProcessCards: React.FC = () => {
  useEffect(() => {
    const processCards = Array.from(
      document.querySelectorAll<HTMLDivElement>(".process-card")
    );

    processCards.forEach((card, index) => {
      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: processCards[processCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `card-pin-${index}`,
        });
      }

      if (index < processCards.length - 1) {
        ScrollTrigger.create({
          trigger: processCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;

            gsap.set(card, {
              scale,
              rotation,
              "--after-opacity": afterOpacity,
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(processCards);
    };
  }, []);

  return (
    <div className="process-cards">
      {processCardsData.map((cardData) => (
        <div key={cardData.index} className="process-card">
          <div className="process-card-index">
            <h1>{cardData.index}</h1>
          </div>
          <div className="process-card-content">
            <div className="process-card-content-wrapper">
              <h1 className="process-card-header">{cardData.title}</h1>

              <div className="process-card-copy">
                <div className="process-card-copy-description">
                  <p>{cardData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessCards;
