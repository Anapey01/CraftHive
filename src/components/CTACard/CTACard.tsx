import Link from "next/link";
import "./CTACard.css";

export default function CTACard() {
  return (
    <section className="cta-card-section">
      <div className="cta-card-container">
        <h2 className="cta-card-title section-heading">Have something special in mind?</h2>
        <p className="cta-card-copy">
          Whether it's a cherished photograph, a rare artefact, a commissioned Shadow Box,
           or something entirely your own — bring it to us. We'll help you create something that lasts.
        </p>
        <Link href="/contact" className="cta-card-button">
          Let's Talk
        </Link>
      </div>
    </section>
  );
}
