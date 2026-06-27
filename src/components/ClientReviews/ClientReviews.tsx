"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ClientReviews.css";
import gsap from "gsap";

const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="quote-icon" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-2.638 3.995-4.848h-4v-11h10zm14 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-2.638 3.996-4.848h-4v-11h10z"/>
  </svg>
);

const reviews = [
  {
    id: 1,
    quote: "Crafthive is a creative hub that delivers nothing but perfection. Expect a very high standard of innovation and professionalism.",
    author: "Sarah Koranteng",
    role: "African Urban Village",
  },
  {
    id: 2,
    quote: "CraftHive has been our trusted partner for printing, framing and wall art installations for many years. Their work is consistently neat, professional, and reliable, making them our go-to company for our interior design projects. We are always pleased with their service and highly recommend them!",
    author: "Natalie",
    role: "Design Express",
  }
];

const ClientReviews = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (!testimonialRef.current) return;
    gsap.to(testimonialRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        setCurrentIdx((prev) => (prev + 1) % reviews.length);
        gsap.fromTo(testimonialRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  }, []);

  const handlePrev = useCallback(() => {
    if (!testimonialRef.current) return;
    gsap.to(testimonialRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        setCurrentIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
        gsap.fromTo(testimonialRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  }, []);

  const handleDotClick = useCallback((idx: number) => {
    if (!testimonialRef.current) return;
    gsap.to(testimonialRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        setCurrentIdx(idx);
        gsap.fromTo(testimonialRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 6000); // Autoplay slide transition every 6 seconds

    return () => clearTimeout(timer);
  }, [currentIdx, handleNext]);

  return (
    <div className="client-reviews-wrapper">
      <div className="container">
        <div className="simple-testimonial-slider">
          <button className="slider-nav-btn prev" onClick={handlePrev} aria-label="Previous review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="testimonial-content-wrapper" ref={testimonialRef}>
            <QuoteIcon />
            <p className="simple-testimonial-quote">
              "{reviews[currentIdx].quote}"
            </p>
            <div className="simple-testimonial-author">
              <h3>{reviews[currentIdx].author}</h3>
              <p>{reviews[currentIdx].role}</p>
            </div>
          </div>

          <button className="slider-nav-btn next" onClick={handleNext} aria-label="Next review">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="slider-indicators">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${idx === currentIdx ? "active" : ""}`}
              onClick={() => {
                if (idx !== currentIdx) handleDotClick(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
