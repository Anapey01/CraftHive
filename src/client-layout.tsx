"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import Menu from "./components/Menu/Menu";

type LenisOptions = {
  duration: number;
  easing: (t: number) => number;
  direction: "vertical" | "horizontal";
  gestureDirection: "vertical" | "horizontal";
  smooth: boolean;
  smoothTouch: boolean;
  touchMultiplier: number;
  infinite: boolean;
  lerp: number;
  wheelMultiplier: number;
  orientation: "vertical" | "horizontal";
  smoothWheel: boolean;
  syncTouch: boolean;
};

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings: LenisOptions = isMobile
    ? {
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    <ReactLenis root options={scrollSettings}>
      <Menu />

      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
