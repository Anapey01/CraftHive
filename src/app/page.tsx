"use client";

import { useEffect, useRef } from "react";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import BrandTicker from "@/components/BrandTicker/BrandTicker";
import PrintAndFrame from "@/components/PrintAndFrame/PrintAndFrame";
import BeautifullyFrame from "@/components/BeautifullyFrame/BeautifullyFrame";
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
    // 1. Hero Curtain Effect: Removed as requested
    /*
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      endTrigger: ".press-recognition",
      end: "bottom top", 
      pin: true,
      pinSpacing: false,
    });
    */

    // 2. Video Curtain Effect: Commented out since Showreel is removed
    /*
    ScrollTrigger.create({
      trigger: ".showreel",
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
    */
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

            <div className="hero-footer">
              <Animates animateOnScroll={false} delay={isInitialLoad ? 6.05 : 1.15}>
                <p className="lg">
                  From treasured family photographs and cherished artworks to culturally inspired Shadow Boxes and Adinkra-infused creations — 
                  CraftHive crafts pieces that honour memory, celebrate heritage, and belong in your home forever.
                </p>
              </Animates>

              <Button delay={isInitialLoad ? 6.35 : 1.55} href="/services#preview">
                See What We Do
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* <Showreel /> */}
      <BrandTicker />

      <section className="featured-work">
        <div className="container">
          <div className="featured-work-header-content">
            <div className="featured-work-header">
              <Animates animateOnScroll={true} delay={0.25}>
                <h1 className="section-heading">From Our Studio</h1>
              </Animates>
            </div>

            <div className="featured-work-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  A selection of pieces crafted by hand, with care, for people who value what they hold dear.
                </p>
              </Copy>
            </div>
          </div>

          <FeaturedWork /> 

        </div>
      </section>

      <BeautifullyFrame />
      <PrintAndFrame />

      <div className="reviews-curtain-wrapper">
        <section className="client-reviews-header-container">
          <div className="container">
            <div className="client-reviews-header-content">
              <div className="client-reviews-header">
                <Copy animateOnScroll={true} delay={0.25}>
                  <h1 className="section-heading">What Our Clients Say</h1>
                </Copy>
              </div>

              <div className="client-reviews-header-copy">
                <Copy animateOnScroll={true} delay={0.25}>
                  <p className="lg">
                    The trust of every customer is the measure of our work.
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </section>

        <ClientReviews />
      </div>

      <section className="gallery-wall-section" style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
        <Animates animateOnScroll={true} delay={0.2}>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <img 
              src="/gallery-wall.jpg" 
              alt="A beautiful collection of framed artwork from CraftHive" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
            />
          </div>
        </Animates>
      </section>

      <CTACard />
      </div>

       <Footer /> 
    </>
  );
};

export default Page;

