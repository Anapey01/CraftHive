"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Ruler, Layers, ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import "./Services.css";
 import Animates from "@/components/Animates/Animate";

type SizePreset = "small" | "medium" | "large" | "custom";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

type FrameOption = {
  name: string;
  color: string;
  texture: string;
  description: string;
};

type MatColor = {
  name: string;
  color: string;
};

const services = [
  {
    title: "Custom Framing",
    text: "Premium framing for artwork, photos, certificates, jerseys, memories, and collectibles.",
  },
  {
    title: "Shadow Boxes",
    text: "Deep display frames for keepsakes, fabrics, medals, baby items, awards, and treasured objects.",
  },
  {
    title: "Handicrafts",
    text: "Culturally inspired handcrafted décor and artistic pieces for homes, offices, and galleries.",
  },
  {
    title: "Laser Engraving & Cutting",
    text: "Precision engraving and cutting for wood, acrylic, leather, signage, gifts, and branded items.",
  },
  {
    title: "Indoor & Outdoor Signs",
    text: "Clean, professional signs for brands, offices, events, retail spaces, and exhibitions.",
  },
  {
    title: "Personalized Gifts",
    text: "Custom gifts made meaningful through names, dates, messages, photos, and cultural details.",
  },
];

const frameOptions: FrameOption[] = [
  {
    name: "Kota Walnut",
    color: "#6f3f25",
    texture: "linear-gradient(135deg, #3a1f13, #8b5434, #c07945)",
    description: "Warm walnut finish with a premium handcrafted feel.",
  },
  {
    name: "Obsidian",
    color: "#111111",
    texture: "linear-gradient(135deg, #050505, #1c1c1c, #000)",
    description: "Bold black frame for gallery-style presentation.",
  },
  {
    name: "White Maple",
    color: "#f2eee4",
    texture: "linear-gradient(135deg, #fffaf0, #e8dfcf, #ffffff)",
    description: "Clean light frame for modern interiors.",
  },
  {
    name: "Burlwood Blonde",
    color: "#d7b98a",
    texture: "linear-gradient(135deg, #c99b5d, #efd6a4, #b98144)",
    description: "Soft blonde wood texture with natural warmth.",
  },
  {
    name: "Brunette",
    color: "#4a2c1c",
    texture: "linear-gradient(135deg, #2a140b, #5a3320, #8a5b3d)",
    description: "Dark brown tone for classic framing.",
  },
  {
    name: "Kota Black",
    color: "#0d0d0d",
    texture: "linear-gradient(135deg, #000, #242424, #050505)",
    description: "Minimal black frame with strong contrast.",
  },
  {
    name: "Weathered Black",
    color: "#2f2f2f",
    texture: "linear-gradient(135deg, #111, #4a4a4a, #1f1f1f)",
    description: "Textured black frame with a rustic gallery feel.",
  },
];

const matColors: MatColor[] = [
  { name: "Museum White", color: "#f7f2e8" },
  { name: "Ivory", color: "#efe3c8" },
  { name: "Charcoal", color: "#242424" },
  { name: "Warm Grey", color: "#b7afa3" },
  { name: "Deep Red", color: "#7a160d" },
  { name: "Black", color: "#050505" },
];

const sizePresets = {
  small: { width: 8, height: 10 },
  medium: { width: 12, height: 16 },
  large: { width: 18, height: 24 },
};

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const frameOuterRef = useRef<HTMLDivElement | null>(null);
  const matBoardRef = useRef<HTMLDivElement | null>(null);

  const frameRef = useRef<HTMLDivElement>(null);

  const [preset, setPreset] = useState<SizePreset>("medium");
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(16);
  const [frame, setFrame] = useState(frameOptions[0]);
  const [matColor, setMatColor] = useState(matColors[0]);
  const [matMargin, setMatMargin] = useState(1.5);
  const [artType, setArtType] = useState("Artwork on Paper");
  const [savedFrame, setSavedFrame] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(420);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setContainerWidth(Math.min(420, window.innerWidth - 96));
      }
    };
    setContainerWidth(Math.min(420, window.innerWidth - 96));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".service-hero-title span", {
        y: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      gsap.from(".bento-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".frame-preview-panel", {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.from(".frame-controls", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.45,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Handle preset changes - update dimensions and reset to preset values if not custom

  const handlePresetChange = (value: SizePreset) => {
    setPreset(value);

    if (value !== "custom") {
      setWidth(sizePresets[value].width);
      setHeight(sizePresets[value].height);
    }
  };

  // Handle image upload and create object URL for preview
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      setUploadedImage(null);
    }
  };


  // Generate preview image using html2canvas and trigger download
    const handleSaveFrame = async () => {
  if (!frameRef.current) return;

  const canvas = await html2canvas(frameRef.current, {
    backgroundColor: "#ffffff",
    scale: 2, // higher quality
    useCORS: true,
  });

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "CraftHive-Custom-Frame.png";
  link.click();
};

  // Calculate preview size while maintaining aspect ratio, and ensuring it fits within max dimensions

  const previewSize = useMemo(() => {
    const maxWidth = containerWidth;
    const maxHeight = 520;

    const ratio = width / height;

    let previewWidth = maxWidth;
    let previewHeight = previewWidth / ratio;

    if (previewHeight > maxHeight) {
      previewHeight = maxHeight;
      previewWidth = previewHeight * ratio;
    }

    return {
      width: previewWidth,
      height: previewHeight,
    };
  }, [width, height]);

  // Update frame and mat styles when options change

  const frameThickness = useMemo(() => {
    return Math.max(18, Math.min(42, (width + height) * 0.9));
  }, [width, height]);

  const matPadding = useMemo(() => {
    return Math.max(22, matMargin * 28);
  }, [matMargin]);

  useEffect(() => {
    if (frameOuterRef.current) {
      frameOuterRef.current.style.width = `${previewSize.width}px`;
      frameOuterRef.current.style.height = `${previewSize.height}px`;
      frameOuterRef.current.style.padding = `${frameThickness}px`;
      frameOuterRef.current.style.background = frame.texture;
    }

    if (matBoardRef.current) {
      matBoardRef.current.style.padding = `${matPadding}px`;
      matBoardRef.current.style.background = matColor.color;
      matBoardRef.current.style.boxShadow = "inset 0 0 0 1px rgba(0,0,0,0.08)";
    }
  }, [previewSize.width, previewSize.height, frameThickness, frame.texture, matPadding, matColor.color]);

  return (
    <main ref={pageRef} className="services-page">
      <section className="services-hero">
     
        <div className="service-hero-content">
            <div className="interactive-grid grid-left"></div>
        <div className="interactive-grid grid-right"></div>
         <Animates animateOnScroll={true} delay={0.25}>
        <h1 className="service-hero-title">CraftHive Services</h1>
        </Animates>
         <Animates animateOnScroll={true} delay={0.35}>
        <p className="service-hero-copy">
          Explore our creative services and preview how your artwork could look
          in a custom CraftHive frame before sending it to us.
        </p>
        </Animates>
        </div>
      </section>

      <section className="services-bento">
        {services.map((service, index) => (
          <article
            key={service.title}
            className={`bento-card bento-card-${index + 1}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </section>

      <section id="frame-preview-tool" className="frame-tool-section">
        <div className="frame-tool-header">
          <p>Interactive Tool</p>
          <h2>Preview Your Custom Frame</h2>
          <span>
            Select your artwork type, frame size, mat margin, mat color, and
            frame finish. The preview updates instantly.
          </span>
        </div>

        <div className="frame-tool-layout">
          <div ref={frameRef} className="frame-preview-panel">
            <div className="preview-stage">
              <div
                ref={frameOuterRef}
                className="frame-outer"
              >
                <div
                  ref={matBoardRef}
                  className="mat-board"
                >
                  <div className="artwork-window">
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded Artwork"
                        className="uploaded-artwork"
                      />
                    ) : (
                      <div className="artwork-mark">
                        <ImageIcon size={34} />
                        <span>{artType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="preview-meta">
                <span>
                  {width}" × {height}"
                </span>
                <span>{frame.name}</span>
                <span>{matMargin}" mat</span>
              </div>
            </div>
          </div>

          <aside className="frame-controls">
            {/* Image upload control */}
            {artType === "Digital Photo" && (
              <div className="control-group">
                <label htmlFor="artworkUpload">Upload Your Photo</label>
                <input
                  id="artworkUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                />
              </div>
            )}
            <div className="control-group">
              <label htmlFor="artType">What are you framing?</label>
              <select
                id="artType"
                value={artType}
                onChange={(e) => setArtType(e.target.value)}
                required
              >
                <option>Please Select</option>
                <option>Artwork on Paper</option>
                <option>Digital Photo</option>
                <option>Certificate</option>
                <option>Canvas Artwork</option>
                <option>Textile / Fabric</option>
                <option>Memory Item</option>
              </select>
            </div>

            <div className="control-group">
              <label>Frame Size</label>
              <div className="preset-row">
                {(["small", "medium", "large", "custom"] as SizePreset[]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePresetChange(item)}
                      className={preset === item ? "active" : ""}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="dimension-grid">
              <div className="control-group">
                <label htmlFor="frameWidth">
                  <Ruler size={14} /> Width inches
                </label>
                <input
                  id="frameWidth"
                  type="number"
                  min={4}
                  max={40}
                  value={width}
                  onChange={(e) => {
                    setPreset("custom");
                    setWidth(Number(e.target.value));
                  }}
                />
              </div>

              <div className="control-group">
                <label htmlFor="frameHeight">
                  <Ruler size={14} /> Height inches
                </label>
                <input
                  id="frameHeight"
                  type="number"
                  min={4}
                  max={50}
                  value={height}
                  onChange={(e) => {
                    setPreset("custom");
                    setHeight(Number(e.target.value));
                  }}
                />
              </div>
            </div>

            <div className="control-group">
              <label>Customize Your Frame</label>
              <div className="frame-swatches">
                {frameOptions.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    title={item.name}
                    onClick={() => setFrame(item)}
                    className={`frame-swatch ${slugify(item.name)} ${frame.name === item.name ? "selected" : ""}`.trim()}
                  />
                ))}
              </div>

              <div className="selected-frame-info">
                <strong>{frame.name}</strong>
                <p>{frame.description}</p>
              </div>
            </div>

            <div className="control-group">
              <label htmlFor="matMargin">Mat Margin: {matMargin}"</label>
              <input
                id="matMargin"
                type="range"
                min={0.5}
                max={4}
                step={0.25}
                value={matMargin}
                onChange={(e) => setMatMargin(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Mat Color</label>
              <div className="mat-swatches">
                {matColors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    title={item.name}
                    onClick={() => setMatColor(item)}
                    className={`mat-swatch ${slugify(item.name)} ${matColor.name === item.name ? "selected" : ""}`.trim()}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveFrame}
              className="save-frame-btn"
            >
              {savedFrame ? "Frame Saved!" : "Save Frame Design"}
            </button>

            <a href="/contact" className="frame-cta">
              Send Artwork for Quote
              <ArrowRight size={16} />
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}