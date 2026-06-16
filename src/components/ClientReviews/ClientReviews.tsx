"use client";

import "./ClientReviews.css";
import Animates from "@/components/Animates/Animate";

const TwitterIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="#55acee" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868 4.659 4.659 0 0 0 1.441 6.216 4.63 4.63 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.662 4.662 0 0 1-2.104.08 4.66 4.66 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.4 9.4 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.1 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41l-.002-.001z"/>
  </svg>
);

const ClientReviews = () => {
  return (
    <div className="client-reviews-wrapper">
      <div className="container">
        <div className="simple-testimonial">
          <Animates animateOnScroll={true} delay={0.2}>
            <p className="simple-testimonial-quote">
              "There's simply no comparison. @crafthive is hands down the absolute finest / easiest / most premium way to custom frame your art. Period."
            </p>
          </Animates>
          
          <Animates animateOnScroll={true} delay={0.4}>
            <div className="simple-testimonial-author">
              <TwitterIcon />
              <h3>@dave.sthetics</h3>
              <p>Founder at Dave Studios</p>
            </div>
          </Animates>
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
