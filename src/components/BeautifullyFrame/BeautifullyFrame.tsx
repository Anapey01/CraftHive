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
      </div>
    </section>
  );
};

export default BeautifullyFrame;
