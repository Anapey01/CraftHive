import "./BrandTicker.css";
import Image from "next/image";

const pressLogos = [
  { src: "/logos/art-africa.png", alt: "Art Africa" },
  { src: "/logos/heritage-ghana.png", alt: "The House of Heritage Ghana" },
  { src: "/logos/designexpress.png", alt: "DesignExpress interiors" },
  { src: "/logos/african-urban.png", alt: "African Urban Village" },
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
                <div className="press-logo-placeholder has-image" key={i}>
                  <Image src={logo.src} alt={logo.alt} width={300} height={100} className="press-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
