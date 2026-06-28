import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import "./Menu.css";

const ADINKRA_SYMBOLS = [
  { name: "Gye Nyame", src: "/adinkra/adinkra_1.png" },
  { name: "Sankofa", src: "/adinkra/adinkra_2.png" },
  { name: "Adinkrahene", src: "/adinkra/adinkra_6.png" },
  { name: "Dwennimmen", src: "/adinkra/adinkra_4.png" },
  { name: "Funtunfunefu", src: "/adinkra/adinkra_3.png" },
  { name: "Nyame Dua", src: "/adinkra/adinkra_5.png" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const isDarkTheme = pathname === "/about" || pathname === "/contact" || pathname === "/services/custom-framing";

  useEffect(() => {
    gsap.from(".nav-link", {
      y: -20,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".nav-logo", {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".nav-actions", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    });

    const handleScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 80) {
        navRef.current.classList.add("scrolled");
      } else {
        navRef.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [mobileOpen, lenis]);

  return (
    <>
      <nav ref={navRef} className={`${mobileOpen ? "menu-open" : ""} ${isDarkTheme ? "dark-theme" : ""}`}>
        {/* LEFT */}
        <div className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/about" className="nav-link">
            About
          </Link>

          <div className="dropdown">
            <Link href="/services" className="nav-link dropdown-trigger">
              Services
            </Link>
            <div className="dropdown-menu">
              <Link href="/services/custom-framing">Custom Framing</Link>
              <Link href="/services/shadow-box">Shadow Boxes</Link>
              <Link href="/services/handicrafts">Handicrafts</Link>
            </div>
          </div>

          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>
        </div>

        {/* CENTER */}
        <div className="nav-logo">
          <Link href="/">
            <Image
              src="/filled.png"
              alt="CraftHive"
              width={180}
              height={60}
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="nav-actions">
          <Link href="/contact" className="contact-btn-small">
            Contact Us
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>

        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>

        <button 
          className="mobile-services-btn" 
          onClick={() => setServicesOpen(!servicesOpen)}
        >
          Services
        </button>
        <div className={`mobile-services ${servicesOpen ? "open" : ""}`}>
          <Link href="/services" onClick={() => setMobileOpen(false)}>All Services</Link>
          <Link href="/services/custom-framing" onClick={() => setMobileOpen(false)}>Custom Framing</Link>
          <Link href="/services/shadow-box" onClick={() => setMobileOpen(false)}>Shadow Boxes</Link>
          <Link href="/services/handicrafts" onClick={() => setMobileOpen(false)}>Handicrafts</Link>
        </div>

        <Link href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>

        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        <div className="mobile-menu-symbols">
          {ADINKRA_SYMBOLS.map((sym) => (
            <div className="mobile-menu-symbol-cell" key={sym.name}>
              <Image
                src={sym.src}
                alt={sym.name}
                width={24}
                height={24}
                className="mobile-menu-symbol-img"
              />
            </div>
          ))}
        </div>
        <div className="mobile-menu-kente" />
      </div>
    </>
  );
}