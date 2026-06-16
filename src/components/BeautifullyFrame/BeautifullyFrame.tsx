import React from "react";
import "./BeautifullyFrame.css";
import Animates from "@/components/Animates/Animate";
import SplitText from "@/components/SplitText/SplitText";

const BeautifullyFrame = () => {
  return (
    <section className="beautifully-frame-section">
      <div className="container">
        <Animates animateOnScroll={true} delay={0.15}>
          <h2 className="beautifully-frame-heading">
            <SplitText text="Transform your photos into gallery-ready art from the comfort of home" delay={40} />
          </h2>
        </Animates>

        <div className="beautifully-frame-grid">
          <div className="beautifully-frame-item portrait">
            <Animates animateOnScroll={true} delay={0.3}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-1.png" alt="Heart-shaped polaroids wall" className="beautifully-img" />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item portrait">
            <Animates animateOnScroll={true} delay={0.45}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-2.jpg" alt="Framed street painting" className="beautifully-img" />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item landscape">
            <Animates animateOnScroll={true} delay={0.6}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-3.jpg" alt="Beautifully framed Adinkra symbols" className="beautifully-img" />
              </div>
            </Animates>
          </div>
        </div>

        <div className="beautifully-frame-text-content">
          <Animates animateOnScroll={true} delay={0.4}>
            <p>
              The memories you hold dear belong on your walls, not hidden away in a drawer or trapped on your camera roll. We've made it effortless to beautifully frame your most cherished photographs, artworks, and heritage pieces. Every <a href="/services">custom frame</a> or <a href="/services">framed print</a> is meticulously handcrafted by our artisans using museum-quality materials, and delivered right to your door.
            </p>
          </Animates>
          <Animates animateOnScroll={true} delay={0.5}>
            <p>
              Design a <a href="/services">custom frame for the art you already own</a>, or <a href="/services">upload your favorite photo</a> and we will print, frame, and deliver a masterpiece that will be treasured for generations.
            </p>
          </Animates>
        </div>
      </div>
    </section>
  );
};

export default BeautifullyFrame;
