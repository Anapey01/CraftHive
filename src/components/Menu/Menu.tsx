import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import "./Menu.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isDarkTheme = pathname === "/about";

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

    gsap.from(".contact-btn-small", {
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
              <Link href="/services#printing">Printing</Link>
              <Link href="/services#custom-framing">Custom Framing</Link>
              <Link href="/services#shadow-boxes">Shadow Boxes</Link>
              <Link href="/services#adinkra">Adinkra Pieces</Link>
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
        >
          {mobileOpen ? "✕" : "☰"}
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
          <Link href="/services#printing" onClick={() => setMobileOpen(false)}>Printing</Link>
          <Link href="/services#custom-framing" onClick={() => setMobileOpen(false)}>Custom Framing</Link>
          <Link href="/services#shadow-boxes" onClick={() => setMobileOpen(false)}>Shadow Boxes</Link>
          <Link href="/services#adinkra" onClick={() => setMobileOpen(false)}>Adinkra Pieces</Link>
        </div>

        <Link href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>

        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
      </div>
    </>
  );
}