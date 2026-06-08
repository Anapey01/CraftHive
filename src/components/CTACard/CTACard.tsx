import Link from "next/link";
import "./CTACard.css";

export default function CTACard() {
  return (
    <section className="cta-card-section">
      <div className="cta-card-container">
        <h2 className="cta-card-title">Have a specific idea?</h2>
        <p className="cta-card-copy">
          Whether it's a rare artifact, a massive canvas, or something completely unique, 
          we can build a custom frame that perfectly captures your vision.
        </p>
        <Link href="/contact" className="cta-card-button">
          Let's Talk
        </Link>
      </div>
    </section>
  );
}
