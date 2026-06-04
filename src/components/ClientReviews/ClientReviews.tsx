"use client";

import "./ClientReviews.css";
import { clientReviewsData } from "./clientReviewsData";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ClientReviewItem = {
  review: string;
  clientName: string;
  clientCompany: string;
};

const ClientReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cardContainers = document.querySelectorAll<HTMLElement>(
        ".review-card-container"
      );
      cardContainers.forEach((cardContainer, index) => {
        const rotation = index % 2 === 0 ? 3 : -3;
        gsap.set(cardContainer, { rotation: rotation });
      });

      let mm = gsap.matchMedia(containerRef);

      mm.add("(max-width: 1023px)", () => {
        const reviewCards = document.querySelectorAll<HTMLElement>(".review-card");
        const scrollTriggerInstances: ScrollTrigger[] = [];

        gsap.delayedCall(0.1, () => {
          reviewCards.forEach((card, index) => {
            // Pin all cards except the very last one
            if (index < reviewCards.length - 1) {
              const trigger = ScrollTrigger.create({
                trigger: card,
                start: "top 15%", // Pin exactly under the header text
                endTrigger: ".client-reviews-stacked",
                end: "bottom bottom",
                pin: true,
                pinSpacing: false,
              });
              scrollTriggerInstances.push(trigger);
            }
          });
        });

        return () => {
          scrollTriggerInstances.forEach((trigger) => trigger.kill());
        };
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* DESKTOP MARQUEE (Hidden on mobile) */}
      <div className="client-reviews-marquee hidden md:flex">
        <div className="marquee-track">
          {[...clientReviewsData, ...clientReviewsData].map(
            (item: ClientReviewItem, index: number) => (
              <div
                className={`marquee-card card-color-${(index % 6) + 1}`}
                key={`marquee-${index}`}
              >
                <div className="marquee-card-content">
                  <h3 className="marquee-card-text lg">"{item.review}"</h3>
                  <div className="marquee-card-client-info">
                    <p className="marquee-card-client cap">{item.clientName}</p>
                    <p className="marquee-card-client-company sm">
                      {item.clientCompany}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* MOBILE STACKED CARDS (Hidden on desktop) */}
      <div className="client-reviews-stacked md:hidden">
        {(clientReviewsData as ClientReviewItem[]).map((item, index) => (
          <div className="review-card" key={`stacked-${index}`}>
            <div
              className="review-card-container"
              id={`review-card-${index + 1}`}
            >
              <div className="review-card-content">
                <div className="review-card-content-wrapper">
                  <h3 className="review-card-text lg">"{item.review}"</h3>
                  <div className="review-card-client-info">
                    <p className="review-card-client cap">{item.clientName}</p>
                    <p className="review-card-client-company sm">
                      {item.clientCompany}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
