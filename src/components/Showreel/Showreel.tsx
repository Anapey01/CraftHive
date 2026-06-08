"use client";

import "./Showreel.css";
import React, { useRef, useState, useEffect } from "react";
import { LuVolumeX, LuVolume } from "react-icons/lu";

const Showreel: React.FC = () => {
  const showreelSecRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMutedState = !videoRef.current.muted;

    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);

    if (!newMutedState && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // GSAP scroll-expand effect removed as per client feedback.

  return (
    <section className="showreel" ref={showreelSecRef}>
      <div className="showreel-container">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/def28zwct/video/upload/v1780152596/4_6021571873005898776_ii6ziv.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster="/showreel/poster.jpg"
        />
      </div>

      <div className="volume-icon" onClick={toggleMute}>
        {isMuted ? (
          <LuVolumeX color="#171412" size={25} />
        ) : (
          <LuVolume color="#171412" size={25} />
        )}
      </div>
    </section>
  );
};

export default Showreel;