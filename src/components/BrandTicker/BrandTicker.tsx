import "./BrandTicker.css";

const pressLogos = [
  "VOGUE",
  "MONOCLE",
  "KINFOLK",
  "ELLE DECOR",
  "GQ",
  "ARCHITECTURAL DIGEST",
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
                <div className="press-logo-placeholder" key={i}>
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
