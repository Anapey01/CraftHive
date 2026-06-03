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
  const clientReviewsContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reviewCards = document.querySelectorAll<HTMLElement>(".review-card");
      const cardContainers = document.querySelectorAll<HTMLElement>(".review-card-container");

      cardContainers.forEach((cardContainer, index) => {
        const rotation = index % 2 === 0 ? 3 : -3;
        gsap.set(cardContainer, { rotation: rotation });
      });

      const scrollTriggerInstances: ScrollTrigger[] = [];

      gsap.delayedCall(0.1, () => {
        reviewCards.forEach((card, index) => {
          if (index < reviewCards.length - 1) {
            const trigger = ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: reviewCards[reviewCards.length - 1],
              end: "top top",
              pin: true,
              pinSpacing: false,
              scrub: 1,
            });
            scrollTriggerInstances.push(trigger);
          }
        });
      });

      const refreshHandler = (): void => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("orientationchange", refreshHandler);
      const onLoad = (): void => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad, { passive: true });

      return (): void => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
        window.removeEventListener("orientationchange", refreshHandler);
        window.removeEventListener("load", onLoad);
      };
    },
    { scope: clientReviewsContainerRef }
  );

  return (
    <div className="client-reviews" ref={clientReviewsContainerRef}>
      {(clientReviewsData as ClientReviewItem[]).map((item, index) => (
        <div className="review-card" key={index}>
          <div
            className="review-card-container"
            id={`review-card-${index + 1}`}
          >
            <div className="review-card-content">
              <div className="review-card-content-wrapper">
                <h3 className="review-card-text lg">{item.review}</h3>
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
  );
};

export default ClientReviews;
