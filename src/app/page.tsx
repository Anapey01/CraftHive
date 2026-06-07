"use client";

import { useEffect, useRef } from "react";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import BrandTicker from "@/components/BrandTicker/BrandTicker";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/ui/Footer";
import Copy from "@/components/Copy/Copy"
import Animates from "@/components/Animates/Animate";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// import StickyCards from "@/components/ui/Card/Getstarted";


gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const theaterWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useGSAP(() => {
    // 1. Hero Curtain Effect: Hero pins, and the Video slides over it
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      endTrigger: ".showreel",
      end: "bottom top", // Unpins exactly when the Video finishes scrolling up
      pin: true,
      pinSpacing: false,
    });

    // 2. Video Curtain Effect: Video pins, and the Featured Work slides over it
    ScrollTrigger.create({
      trigger: ".showreel",
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  }, { scope: theaterWrapperRef });

  return (
    <>
      <Preloader />

      <div className="theater-wrapper" ref={theaterWrapperRef}>
        <section className="hero">
        <div className="interactive-grid grid-left"></div>
        <div className="interactive-grid grid-right"></div>
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-header">
              <Animates animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                <h1 className="header">LOOK BACK,
                  PRESERVE <span className="highlight"> WHAT </span> MATTERS.
                  CRAFTED FOR <span className="highlight">GENERATIONS.</span></h1>
              </Animates>
            </div>

            {/* <div className="hero-footer-outer">
              <Animates animateOnScroll={false} delay={isInitialLoad ? 6.35 : 1.65}>
                <p className="sm">&copy; CraftHive</p>
                <p className="sm">( Design Your Frame )</p>
              </Animates>
            </div> */}

            <div className="hero-footer">
              <Animates animateOnScroll={false} delay={isInitialLoad ? 6.05 : 1.15}>
                <p className="lg">
                  From treasured family photographs to handcrafted African artefacts and Adinkra-inspired art, 
                  we create custom framing solutions that honour culture, memory, and craftsmanship.
                </p>
              </Animates>

              <Button delay={isInitialLoad ? 6.35 : 1.55} href="/services#preview">
                Preview Your Frame
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Showreel />
      <BrandTicker />

      <section className="featured-work">
        <div className="container">
          <div className="featured-work-header-content">
            <div className="featured-work-header">
              <Animates animateOnScroll={true} delay={0.25}>
                <h1>Featured Work</h1>
              </Animates>
            </div>



            <div className="featured-work-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  From motion to concept, pieces born from quiet sketches, late
                  nights, and just the right amount of chaos.
                </p>
              </Copy>
            </div>
          </div>

          <FeaturedWork /> 

        </div>
      </section>

      <div className="reviews-curtain-wrapper">
        <section className="client-reviews-header-container">
          <div className="container">
            <div className="client-reviews-header-content">
              <div className="client-reviews-header">
                <Copy animateOnScroll={true} delay={0.25}>
                  <h1>What our clients say</h1>
                </Copy>
              </div>

              <div className="client-reviews-header-copy">
                <Copy animateOnScroll={true} delay={0.25}>
                  <p className="lg">
                    Hear from those who have experienced our unique craftsmanship.
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </section>

        <ClientReviews />
      </div>

      <CTACard />
      </div>

       <Footer /> 
    </>
  );
};

export default Page;

