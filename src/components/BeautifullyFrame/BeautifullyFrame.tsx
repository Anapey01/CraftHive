import React from "react";
import "./BeautifullyFrame.css";
import Animates from "@/components/Animates/Animate";

const BeautifullyFrame = () => {
  return (
    <section className="beautifully-frame-section">
      <div className="container">
        <Animates animateOnScroll={true} delay={0.2}>
          <div className="beautifully-frame-header">
            <h2>Beautifully frame any photo or print without leaving the house</h2>
          </div>
        </Animates>

        <div className="beautifully-frame-grid">
          <div className="beautifully-frame-item">
            <Animates animateOnScroll={true} delay={0.3}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-1.jpg" alt="Beautifully framed photo 1" className="beautifully-img" />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item">
            <Animates animateOnScroll={true} delay={0.45}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-2.jpg" alt="Beautifully framed photo 2" className="beautifully-img" />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item">
            <Animates animateOnScroll={true} delay={0.6}>
              <div className="beautifully-frame-img-wrapper">
                <img src="/featured-work/work-3.jpg" alt="Beautifully framed photo 3" className="beautifully-img" />
              </div>
            </Animates>
          </div>
        </div>

        <Animates animateOnScroll={true} delay={0.4}>
          <div className="beautifully-frame-text-content">
            <p>
              The memories you hold dear belong on your walls, not hidden away in a drawer or trapped on your camera roll. We've made it effortless to beautifully frame your most cherished photographs, artworks, and heritage pieces. Every <a href="/services">custom frame</a> or <a href="/services">framed print</a> is meticulously handcrafted by our artisans using museum-quality materials, and delivered right to your door.
            </p>
            <p>
              Design a <a href="/services">custom frame for the art you already own</a>, or <a href="/services">upload your favorite photo</a> and we will print, frame, and deliver a masterpiece that will be treasured for generations.
            </p>
          </div>
        </Animates>
      </div>
    </section>
  );
};

export default BeautifullyFrame;
