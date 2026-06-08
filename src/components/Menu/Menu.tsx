"use client";

import { useRef, useState, useEffect, RefObject } from "react";
import "./Menu.css";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(SplitText);

type MenuItem = {
  label: string;
  route: string;
};

type MenuProps = {
  pageRef: RefObject<HTMLDivElement>;
};

const Menu = ({ pageRef }: MenuProps) => {
  const navToggleRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuImageRef = useRef<HTMLImageElement>(null);
  const menuLinksWrapperRef = useRef<HTMLDivElement>(null);
  const linkHighlighterRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuLinkContainersRef = useRef<Array<HTMLDivElement | null>>([]);
  const openLabelRef = useRef<HTMLParagraphElement>(null);
  const closeLabelRef = useRef<HTMLParagraphElement>(null);
  const menuColsRef = useRef<Array<HTMLDivElement | null>>([]);

  const splitTextInstances = useRef<SplitText[]>([]);
  const menuColSplitTextInstances = useRef<SplitText[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const lenis = useLenis();
  const { navigateWithTransition } = useViewTransition();

  const menuItems: MenuItem[] = [
    { label: "Home", route: "/" },
    { label: "Services", route: "/services" },
    { label: "About Us", route: "/about" },
    { label: "Gallery", route: "/gallery" },
    { label: "Contact", route: "/contact" },
  ];

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lerpFactor = 0.05;

  const currentHighlighterX = useRef(0);
  const targetHighlighterX = useRef(0);
  const currentHighlighterWidth = useRef(0);
  const targetHighlighterWidth = useRef(0);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMenuOpen) return;

    const menuCols = menuColsRef.current;
    if (!menuCols || menuCols.length === 0) return;

    menuColSplitTextInstances.current.forEach((split) => split.revert());
    menuColSplitTextInstances.current = [];

    menuCols.forEach((col) => {
      if (!col) return;

      const elements = col.querySelectorAll<HTMLElement>("p, a");

      elements.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        menuColSplitTextInstances.current.push(split);
        gsap.set(split.lines, { y: "100%" });
      });
    });
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const menuLinks = menuLinksRef.current;
      const menuOverlay = menuOverlayRef.current;
      const menuLinksWrapper = menuLinksWrapperRef.current;
      const linkHighlighter = linkHighlighterRef.current;
      const menuImage = menuImageRef.current;
      const menuLinkContainers = menuLinkContainersRef.current;

      if (!menuOverlay || !menuLinksWrapper || !linkHighlighter) return;

      splitTextInstances.current.forEach((split) => split.revert());
      splitTextInstances.current = [];

      menuLinks.forEach((link) => {
        if (!link) return;

        const chars = link.querySelectorAll<HTMLSpanElement>("span");
        chars.forEach((char, charIndex) => {
          const split = new SplitText(char, { type: "chars" });
          splitTextInstances.current.push(split);
          split.chars.forEach((c) => {
            (c as HTMLElement).classList.add("char");
          });
          if (charIndex === 1) {
            gsap.set(split.chars, { y: "110%" });
          }
        });
      });

      if (menuImage) {
        gsap.set(menuImage, { y: 0, scale: 0.5, opacity: 0.25 });
      }
      gsap.set(menuLinks.filter(Boolean), { y: "150%" });
      gsap.set(linkHighlighter, { y: "150%" });

      const defaultLinkText = menuLinksWrapper.querySelector<HTMLSpanElement>(
        ".menu-link:first-child a span"
      );
      if (defaultLinkText) {
        const linkWidth = defaultLinkText.offsetWidth;
        linkHighlighter.style.width = linkWidth + "px";
        currentHighlighterWidth.current = linkWidth;
        targetHighlighterWidth.current = linkWidth;

        const defaultLinkTextElement =
          menuLinksWrapper.querySelector<HTMLDivElement>(".menu-link:first-child");
        if (defaultLinkTextElement) {
          const linkRect = defaultLinkTextElement.getBoundingClientRect();
          const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
          const initialX = linkRect.left - menuWrapperRect.left;
          currentHighlighterX.current = initialX;
          targetHighlighterX.current = initialX;
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1000) return;

        const mouseX = e.clientX;
        const viewportWidth = window.innerWidth;
        const menuLinksWrapperWidth = menuLinksWrapper.offsetWidth;

        const maxMoveLeft = 0;
        const maxMoveRight = viewportWidth - menuLinksWrapperWidth;

        const sensitivityRange = viewportWidth * 0.5;
        const startX = (viewportWidth - sensitivityRange) / 2;
        const endX = startX + sensitivityRange;

        let mousePercentage;
        if (mouseX <= startX) {
          mousePercentage = 0;
        } else if (mouseX >= endX) {
          mousePercentage = 1;
        } else {
          mousePercentage = (mouseX - startX) / sensitivityRange;
        }

        targetX.current =
          maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
      };

      menuLinkContainers.forEach((link) => {
        if (!link) return;

        const handleMouseEnter = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll<HTMLSpanElement>("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const visibleChars = visibleCopy.querySelectorAll<HTMLElement>(".char");
          gsap.to(visibleChars, {
            y: "-110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const animatedChars =
            animatedCopy.querySelectorAll<HTMLElement>(".char");
          gsap.to(animatedChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const linkRect = link.getBoundingClientRect();
          const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

          targetHighlighterX.current = linkRect.left - menuWrapperRect.left;

          const linkCopyElement =
            link.querySelector<HTMLSpanElement>("a span");
          targetHighlighterWidth.current = linkCopyElement
            ? linkCopyElement.offsetWidth
            : link.offsetWidth;
        };

        const handleMouseLeave = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll<HTMLSpanElement>("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const animatedChars =
            animatedCopy.querySelectorAll<HTMLElement>(".char");
          gsap.to(animatedChars, {
            y: "110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const visibleChars = visibleCopy.querySelectorAll<HTMLElement>(".char");
          gsap.to(visibleChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        (link as any)._mouseEnterHandler = handleMouseEnter;
        (link as any)._mouseLeaveHandler = handleMouseLeave;
      });

      const handleMenuLinksWrapperMouseLeave = () => {
        const defaultLinkText = menuLinksWrapper.querySelector<HTMLDivElement>(
          ".menu-link:first-child"
        );
        if (!defaultLinkText) return;

        const defaultLinkTextSpan =
          defaultLinkText.querySelector<HTMLSpanElement>("a span");
        if (!defaultLinkTextSpan) return;

        const linkRect = defaultLinkText.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

        targetHighlighterX.current = linkRect.left - menuWrapperRect.left;
        targetHighlighterWidth.current = defaultLinkTextSpan.offsetWidth;
      };

      menuOverlay.addEventListener("mousemove", handleMouseMove);
      menuLinksWrapper.addEventListener(
        "mouseleave",
        handleMenuLinksWrapperMouseLeave
      );

      const animate = () => {
        currentX.current +=
          (targetX.current - currentX.current) * lerpFactor;
        currentHighlighterX.current +=
          (targetHighlighterX.current - currentHighlighterX.current) *
          lerpFactor;
        currentHighlighterWidth.current +=
          (targetHighlighterWidth.current - currentHighlighterWidth.current) *
          lerpFactor;

        gsap.to(menuLinksWrapper, {
          x: currentX.current,
          duration: 0.3,
          ease: "power4.out",
        });

        gsap.to(linkHighlighter, {
          x: currentHighlighterX.current,
          width: currentHighlighterWidth.current,
          duration: 0.3,
          ease: "power4.out",
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        menuOverlay.removeEventListener("mousemove", handleMouseMove);
        menuLinksWrapper.removeEventListener(
          "mouseleave",
          handleMenuLinksWrapperMouseLeave
        );

        menuLinkContainers.forEach((link) => {
          if (!link) return;
          const mouseEnterHandler = (link as any)._mouseEnterHandler;
          const mouseLeaveHandler = (link as any)._mouseLeaveHandler;
          if (mouseEnterHandler)
            link.removeEventListener("mouseenter", mouseEnterHandler);
          if (mouseLeaveHandler)
            link.removeEventListener("mouseleave", mouseLeaveHandler);
        });

        splitTextInstances.current.forEach((split) => {
          if (split && split.revert) split.revert();
        });
        splitTextInstances.current = [];
      };
    },
    { scope: menuOverlayRef }
  );

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const menuOverlay = menuOverlayRef.current;
    const menuImage = menuImageRef.current;
    const menuLinks = menuLinksRef.current.filter(Boolean);
    const linkHighlighter = linkHighlighterRef.current;
    const menuLinksWrapper = menuLinksWrapperRef.current;
    const openLabel = openLabelRef.current;
    const closeLabel = closeLabelRef.current;
    const menuCols = menuColsRef.current.filter(Boolean);

    if (!menuOverlay || !menuLinksWrapper || !linkHighlighter) return;

    if (!isMenuOpen) {
      if (openLabel) {
        gsap.to(openLabel, {
          y: "-100%",
          duration: 1,
          ease: "power3.out",
        });
      }

      if (closeLabel) {
        gsap.to(closeLabel, {
          y: "-100%",
          duration: 1,
          ease: "power3.out",
        });
      }

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(".menu-link", { overflow: "visible" });
          setIsMenuOpen(true);
          setIsMenuAnimating(false);
        },
      });

      if (menuImage) {
        gsap.to(menuImage, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
        });
      }

      gsap.to(menuLinks, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
      });

      gsap.to(linkHighlighter, {
        y: "0%",
        duration: 1,
        delay: 1,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          delay: 0.5,
          ease: "expo.out",
        });
      });
    } else {
      if (openLabel) {
        gsap.to(openLabel, {
          y: "0%",
          duration: 1,
          ease: "power3.out",
        });
      }

      if (closeLabel) {
        gsap.to(closeLabel, {
          y: "0%",
          duration: 1,
          ease: "power3.out",
        });
      }

      if (menuImage) {
        gsap.to(menuImage, {
          y: "-25svh",
          opacity: 0.5,
          duration: 1.25,
          ease: "expo.out",
        });
      }

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "-100%",
          duration: 1,
          stagger: 0,
          ease: "expo.out",
        });
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(menuOverlay, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(menuLinks, { y: "150%" });
          gsap.set(linkHighlighter, { y: "150%" });
          if (menuImage) {
            gsap.set(menuImage, { y: "0", scale: 0.5, opacity: 0.25 });
          }
          gsap.set(".menu-link", { overflow: "hidden" });

          menuCols.forEach((col) => {
            if (!col) return;
            const splitLines = col.querySelectorAll(".split-line");
            gsap.set(splitLines, { y: "100%" });
          });

          gsap.set(menuLinksWrapper, { x: 0 });
          currentX.current = 0;
          targetX.current = 0;

          setIsMenuOpen(false);
          setIsMenuAnimating(false);
        },
      });
    }
  };

  return (
    <>
      <nav>
        {/* Desktop Links (Left) */}
        <div className="nav-desktop-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <div className="nav-dropdown" style={{display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer"}}>
            <Link href="/services">Services</Link>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Logo (Center Desktop, Left Mobile) */}
        <div className="nav-logo">
          <a
            href="/"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                return;
              }
              navigateWithTransition("/", isMenuOpen ? toggleMenu : undefined);
            }}
          >
            <img src="/filled.jpg" alt="Transparent Logo" className="logo" />
          </a>
        </div>

        {/* Desktop Actions (Right) */}
        <div className="nav-desktop-actions">
          <Link href="/contact" className="contact-btn">Contact</Link>
        </div>

        {/* Mobile Toggle (Right Mobile) */}
        <div className="nav-toggle" ref={navToggleRef} onClick={toggleMenu}>
          <div className="nav-toggle-wrapper">
            <p ref={openLabelRef} className="open-label">
              Menu
            </p>

            <p ref={closeLabelRef} className="close-label">
              Close
            </p>
          </div>
        </div>
      </nav>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <div
            className="menu-col"
            ref={(el) => {
              if (el) menuColsRef.current[0] = el;
            }}
          >
            <div className="menu-content-group">
              <p>&copy; CraftHIve</p>
              <p>Tuba Road, Weija Tollbooth</p>
              <p>Accra</p>
            </div>

            <div className="menu-content-group">
              <p>Crafting...</p>
              <p>Version 1.0</p>
            </div>

            <div className="menu-content-group">
              <p>Say Hello</p>
              <p><Link href="mailto:crafthiveghana@gmail.com" />crafthiveghana@gmail.com</p>
            </div>

            <div className="menu-content-group">
              <p>Hotline</p>
              <p><a href="tel:+233244699121">0244699121</a></p>
            </div>
          </div>
          <div
            className="menu-col"
            ref={(el) => {
              if (el) menuColsRef.current[1] = el;
            }}
          >
            <div className="menu-content-group">
              <p>Field Log</p>

              <a href="https://tinyurl.com/38ffkv9h" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>

              <a href="https://tinyurl.com/yn4uu4xh" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>

            <div className="menu-content-group">
              <p>Creative Canvas</p>
              <p>Fine Art & Frames</p>
            </div>

            <div className="menu-content-group">
              <p>Credits</p>
              <p>Made by Rare Devs</p>
              <p>CraftHive - All rights reserved.</p>
            </div>
          </div>
        </div>

        <div className="menu-img">
          <img ref={menuImageRef} src="/menu_img.jpg" alt="" />
        </div>

        <div className="menu-links-wrapper" ref={menuLinksWrapperRef}>
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="menu-link"
              ref={(el) => {
                if (el) menuLinkContainersRef.current[index] = el;
              }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                const currentPath = window.location.pathname;
                if (currentPath === item.route) {
                  if (isMenuOpen) {
                    toggleMenu();
                  }
                  return;
                }
                navigateWithTransition(
                  item.route,
                  isMenuOpen ? toggleMenu : undefined
                );
              }}
            >
              <a
                href={item.route}
                ref={(el) => {
                  if (el) menuLinksRef.current[index] = el;
                }}
              >
                <span>{item.label}</span>
                <span>{item.label}</span>
              </a>
            </div>
          ))}

          <div className="link-highlighter" ref={linkHighlighterRef}></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
