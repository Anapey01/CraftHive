import "./BrandTicker.css";

const pressLogos = [
  { type: "image", src: "/logos/art-africa.png", alt: "Art Africa" },
  { type: "image", src: "/logos/heritage-ghana.png", alt: "The House of Heritage Ghana" },
  { type: "image", src: "/logos/designexpress.png", alt: "DesignExpress interiors" },
  { type: "image", src: "/logos/african-urban.png", alt: "African Urban Village" },
  { type: "text", content: "GQ" },
  { type: "text", content: "ARCHITECTURAL DIGEST" },
];

export default function BrandTicker() {
  return (
    <section className="press-recognition">
      <div className="container">
        <div className="press-content">
          <div className="press-main-logo">
            <h2>The Art & Design</h2>
            <h1>JOURNAL</h1>
          </div>
          
          <h3 className="press-statement">
            "CraftHive is quietly redefining the art of custom framing, bringing museum-quality craftsmanship directly to your home."
          </h3>
          
          <div className="press-also-loved">
            <p className="also-loved-heading">Also Featured In</p>
            <div className="press-logos-row">
              {pressLogos.map((logo, i) => (
                <div className={`press-logo-placeholder ${logo.type === 'image' ? 'has-image' : ''}`} key={i}>
                  {logo.type === "image" ? (
                    <img src={logo.src} alt={logo.alt} className="press-logo-img" />
                  ) : (
                    logo.content
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
