import React from "react";
import "./PrintAndFrame.css";
import Animates from "@/components/Animates/Animate";

const steps = [
  {
    id: 1,
    title: "Upload a photo from your phone or computer.",
    img: "/featured-work/work-1.jpg",
  },
  {
    id: 2,
    title: "Choose a print size and frame options.",
    img: "/featured-work/work-2.jpg",
  },
  {
    id: 3,
    title: "We'll print and frame your photo and ship it to your door.",
    img: "/featured-work/work-3.jpg",
  },
];

const PrintAndFrame = () => {
  return (
    <section className="print-frame-section">
      <div className="container">
        <Animates animateOnScroll={true} delay={0.2}>
          <div className="print-frame-header">
            <h2>Print and Frame Your Photos in Seconds</h2>
          </div>
        </Animates>

        <div className="print-frame-grid">
          {steps.map((step, index) => (
            <Animates
              key={step.id}
              animateOnScroll={true}
              delay={0.3 + index * 0.15}
            >
              <div className="print-frame-step">
                <div className="step-image-wrapper">
                  <img src={step.img} alt={`Step ${step.id}`} className="step-img" />
                </div>
                <div className="step-number">{step.id}</div>
                <p className="step-desc">{step.title}</p>
              </div>
            </Animates>
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
