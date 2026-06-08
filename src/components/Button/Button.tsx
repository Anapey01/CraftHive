"use client";

import { useTransitionRouter } from "next-view-transitions";
import { IoMdArrowForward } from "react-icons/io";
import "./Button.css";

type ButtonProps = {
  label?: string;
  route?: string;
  href?: string;
  children?: React.ReactNode;
  dark?: boolean;
  delay?: number;
};

const Button = ({
  label,
  route,
  href,
  children,
  dark = false,
  delay,
}: ButtonProps) => {
  const linkHref = href || route || "#";
  const linkLabel = label || (typeof children === "string" ? children : "");
  const router = useTransitionRouter();

  const slideInOut = (): void => {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0) scale(1)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-30%) scale(0.90)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      } as KeyframeAnimationOptions
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      } as KeyframeAnimationOptions
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    router.push(linkHref, {
      onTransitionReady: slideInOut,
    });
  };

  return (
    <a
      className={`sm caps mono ${dark ? "link-dark" : "link-light"}`}
      href={linkHref}
      onClick={handleClick}
    >
      <div
        className={`anime-link ${
          dark ? "anime-link-dark" : "anime-link-light"
        }`}
      >
        <div className="anime-link-label">
          <p className="sm caps mono">
            <span>{children || linkLabel}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default Button;
