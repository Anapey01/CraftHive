import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const EXPLORE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Portfolio" },
  { href: "/services#preview", label: "Frame Preview Tool" },
  { href: "/services#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const ADINKRA_SYMBOLS = [
  {
    name: "Gye Nyame",
    src: "/adinkra/adinkra_1.png",
  },
  {
    name: "Sankofa",
    src: "/adinkra/adinkra_2.png",
  },
  {
    name: "Adinkrahene",
    src: "/adinkra/adinkra_6.png",
  },
  {
    name: "Dwennimmen",
    src: "/adinkra/adinkra_4.png",
  },
  {
    name: "Funtunfunefu",
    src: "/adinkra/adinkra_3.png",
  },
  {
    name: "Nyame Dua",
    src: "/adinkra/adinkra_5.png",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Adinkra symbol band */}
      <div className={styles.symbolBand}>
        {ADINKRA_SYMBOLS.map((sym) => (
          <div className={styles.symbolCell} key={sym.name}>
            <Image
              src={sym.src}
              alt={sym.name}
              width={42}
              height={42}
              className={styles.symbolImg}
            />
            <span className={styles.symbolName}>{sym.name}</span>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className={styles.main}>
        {/* Brand column */}
        <div>
          <div className={styles.brandName}>
            Craft<span>Hive</span>
          </div>
          <div className={styles.tagline}>Where Art Finds Its Frame</div>
          <p className={styles.aboutText}>
            Accra&apos;s premier custom framing studio. We preserve your most
            treasured artwork, photographs and keepsakes with expert
            craftsmanship rooted in Ghanaian pride.
          </p>

          <div className={styles.socialRow}>
            <a href="#" className={styles.socialBtn} aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <a href="#" className={styles.socialBtn} aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a href="#" className={styles.socialBtn} aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore links */}
        <div>
          <div className={styles.colTitle}>Explore</div>
          <ul className={styles.linkList}>
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio hours */}
        <div>
          <div className={styles.colTitle}>Frame with Us</div>
          <p className={styles.hoursTagline}>
            Walk-ins welcome. Commissions open.
          </p>

          <div className={styles.hoursGrid}>
            <div className={styles.hRow}>
              <span className={styles.hDay}>Mon – Fri</span>
              <span className={styles.hTime}>9:00am – 6:00pm</span>
            </div>

            <div className={styles.hRow}>
              <span className={styles.hDay}>Saturday</span>
              <span className={styles.hTime}>10:00am – 4:00pm</span>
            </div>

            <div className={styles.hRow}>
              <span className={styles.hDay}>Sunday</span>
              <span className={styles.hTime} style={{ color: "red" }}>
                Closed
              </span>
            </div>
          </div>

          <Link href="/contact" className={styles.ctaBtn}>
            Bring Your Art to Life
          </Link>
        </div>

        {/* Location */}
        <div>
          <div className={styles.colTitle}>Location</div>

          <p className={styles.address}>
            CraftHive Framing Studio
            <br />
            Tuba Road, Weija Tollbooth
            <br />
            Accra, Greater-Accra Region
            <br />
            Ghana
          </p>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsLink}
          >
            Get Directions
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          <div className={styles.locationBadge}>
            <div className={styles.dot} />
            <div>
              <div>CraftHive Framing</div>
              <div className={styles.badgeSub}>Tuba Road, Weija · Open Now</div>
            </div>
          </div>
        </div>
      </div>

      {/* Kente strip */}
      <div className={styles.kenteStrip} />

      {/* Base bar */}
      <div className={styles.base}>
        <div className={styles.copy}>
          © {year} CraftHive Framing. All rights reserved.
        </div>

        <div className={styles.legal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>

        <div className={styles.made}>Crafted with pride in Ghana 🇬🇭</div>
      </div>
    </footer>
  );
}