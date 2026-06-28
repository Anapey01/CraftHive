"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "digital-prints",
    title: "Digital Prints",
    frameWidth: 240,
    frameHeight: 180,
    borderSize: 12,
    borderColor: "#111111", // Modern Black
    matSize: 24,
    matColor: "#ffffff",
    innerImage: "/services/digital_art.png",
  },
  {
    id: "documents",
    title: "Documents",
    frameWidth: 200,
    frameHeight: 160,
    borderSize: 16,
    borderColor: "#3E2723", // Classic Dark Wood
    matSize: 20,
    matColor: "#fdfbf7",
    innerImage: "/services/document_art.png",
  },
  {
    id: "jerseys",
    title: "Jerseys",
    frameWidth: 220,
    frameHeight: 280,
    borderSize: 22,
    borderColor: "#1a1a1a", // Shadow Box Outer Edge
    matSize: 0,
    matColor: "transparent",
    innerColor: "#222222",
    innerImage: "/services/jersey_art.png",
    boxShadow: "inset 0 20px 40px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.6)", // Deep shadow box effect
  },
  {
    id: "posters",
    title: "Posters & Art",
    frameWidth: 180,
    frameHeight: 260,
    borderSize: 10,
    borderColor: "#b0bec5", // Polished Silver/Metal
    matSize: 0,
    matColor: "transparent",
    innerImage: "/services/poster_art.png",
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15)", // Subtle inner depth
  },
  {
    id: "photo-gifts",
    title: "Photo Gifts",
    frameWidth: 140,
    frameHeight: 140,
    borderSize: 14,
    borderColor: "#A1887F", // Light Wood
    matSize: 16,
    matColor: "#ffffff",
    innerImage: "/services/photo_gift.png",
  },
  {
    id: "canvas",
    title: "Canvas & Boards",
    frameWidth: 260,
    frameHeight: 180,
    borderSize: 6,
    borderColor: "#1a1a1a", // Floater edge
    matSize: 10,
    matColor: "#0a0a0a", // Floater gap (dark shadow)
    innerImage: "/services/canvas_art.png",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Canvas floating shadow
  },
];

export const CategorySelector = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="cf-category-section">
      <h2 className="cf-category-heading">What are you framing?</h2>
      
      <div className="cf-category-carousel-wrapper">
        <button 
          className="cf-carousel-btn cf-carousel-prev" 
          onClick={scrollLeft}
          aria-label="Previous categories"
        >
          <ChevronLeft size={24} strokeWidth={1.2} />
        </button>

        <div className="cf-category-track" ref={scrollRef}>
          {categories.map((cat) => (
            <div className="cf-category-card" key={cat.id}>
              <div className="cf-css-frame-wrapper">
                <div 
                  className="cf-css-frame"
                  style={{
                    width: `${cat.frameWidth}px`,
                    height: `${cat.frameHeight}px`,
                    backgroundColor: cat.borderColor,
                    padding: `${cat.borderSize}px`,
                  }}
                >
                  <div 
                    className="cf-css-mat"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: cat.matColor,
                      padding: `${cat.matSize}px`,
                      boxShadow: cat.matSize > 0 ? "inset 0 2px 6px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    <div 
                      className="cf-css-inner"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: cat.innerColor || "#fff",
                        backgroundImage: `url(${cat.innerImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        boxShadow: cat.boxShadow || "inset 0 1px 3px rgba(0,0,0,0.05)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="cf-category-title">{cat.title}</div>
            </div>
          ))}
        </div>

        <button 
          className="cf-carousel-btn cf-carousel-next" 
          onClick={scrollRight}
          aria-label="Next categories"
        >
          <ChevronRight size={24} strokeWidth={1.2} />
        </button>
      </div>
    </section>
  );
};
