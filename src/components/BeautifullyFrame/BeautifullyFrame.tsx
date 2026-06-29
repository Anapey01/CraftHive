import React from "react";
import "./BeautifullyFrame.css";
import Animates from "@/components/Animates/Animate";
import Image from "next/image";

const BeautifullyFrame = () => {
  return (
    <section className="beautifully-frame-section">
      <div className="container">
        <div className="beautifully-frame-header">
          <Animates animateOnScroll={true} delay={0.15}>
            <h1 className="section-heading">
              CRAFTED TO BE SEEN
            </h1>
          </Animates>
        </div>

        <div className="beautifully-frame-grid">
          <div className="beautifully-frame-item portrait">
            <Animates animateOnScroll={true} delay={0.3}>
              <div className="beautifully-frame-img-wrapper">
                <Image src="/featured-work/craft.jpg" alt="Custom framed gallery wall with heart-shaped polaroids" className="beautifully-img" width={800} height={1000} style={{ width: '100%', height: 'auto' }} />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item portrait">
            <Animates animateOnScroll={true} delay={0.45}>
              <div className="beautifully-frame-img-wrapper">
                <Image src="/featured-work/girl-chicken.jpg" alt="Artistic painting of girl and chickens in premium custom frame" className="beautifully-img" width={800} height={1000} style={{ width: '100%', height: 'auto' }} />
              </div>
            </Animates>
          </div>
          
          <div className="beautifully-frame-item landscape">
            <Animates animateOnScroll={true} delay={0.6}>
              <div className="beautifully-frame-img-wrapper">
                <Image src="/gallery/archive-05.jpg" alt="Beautifully framed traditional Ghanaian Adinkra symbols" className="beautifully-img" width={1000} height={800} style={{ width: '100%', height: 'auto' }} />
              </div>
            </Animates>
          </div>
        </div>

        <div className="beautifully-frame-text-content">
          <Animates animateOnScroll={true} delay={0.4}>
            <p>
              The memories you hold dear belong on your walls, not hidden away in a drawer or trapped on your camera roll. We've made it effortless to beautifully frame your most cherished photographs, artworks, and heritage pieces. Every <a href="/services/custom-framing">custom frame</a> or <a href="/services/custom-framing">framed print</a> is meticulously handcrafted by our artisans using museum-quality materials, and delivered right to your door.
            </p>
          </Animates>
          <Animates animateOnScroll={true} delay={0.5}>
            <p>
              Design a <a href="/services/custom-framing">custom frame for the art you already own</a>, or <a href="/services#frame-preview-tool">upload your favorite photo</a> and we will print, frame, and deliver a masterpiece that will be treasured for generations.
            </p>
          </Animates>
        </div>
      </div>
    </section>
  );
};

export default BeautifullyFrame;
