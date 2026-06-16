import React, { useRef } from "react";
import "./PrintAndFrame.css";
import Animates from "@/components/Animates/Animate";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Upload a photo from your phone or computer.",
    img: "/process/step1.png",
  },
  {
    id: 2,
    title: "Choose a print size and frame options.",
    img: "/process/step2.png",
  },
  {
    id: 3,
    title: "We'll print and frame your photo and ship it to your door.",
    img: "/process/step3.jpg",
  },
];

const PrintAndFrame = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const stepElements = gsap.utils.toArray(".print-frame-step");
    
    gsap.fromTo(stepElements, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".print-frame-grid",
          start: "top 85%",
          once: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="print-frame-section" ref={containerRef}>
      <div className="container">
        <Animates animateOnScroll={true} delay={0.2}>
          <div className="print-frame-header">
            <h2 className="section-heading">Print and Frame Your Photos in Seconds</h2>
          </div>
        </Animates>

        <div className="print-frame-grid">
          {steps.map((step) => (
            <div className="print-frame-step" key={step.id}>
              <div className="step-img-container">
                <img src={step.img} alt={`Step ${step.id}`} className="step-img" />
              </div>
              <div className="step-number">{step.id}</div>
              <p className="step-desc">{step.title}</p>
            </div>
          ))}
        </div>

        <Animates animateOnScroll={true} delay={0.8}>
          <div className="print-frame-action">
            <button className="upload-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              UPLOAD PHOTO
            </button>
          </div>
        </Animates>
      </div>
    </section>
  );
};

export default PrintAndFrame;
