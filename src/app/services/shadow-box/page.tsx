

import Footer from "@/components/ui/Footer";
import "./shadow.css";
import ArtGallery from "@/components/ArtGallery";
import Image from "next/image";

const ArtBoxesPage = () => (
  <div className="page">

    {/* ── Hero ─────────────────────────────────────────── */}
    <section className="ab-hero">
      <div className="ab-hero__copy">
        <div className="ab-hero__eyebrow"><span>Heritage · Craft · Art</span></div>
        <h1>Art Boxes<br /><em>Stories Framed</em></h1>
        <p>
          Discover unique mixed-media compositions that celebrate the rich
          cultural heritage of African artistry through sophisticated design.
        </p>
        <div className="ab-hero__actions">
          <a href="#work" className="btn btn-red">Explore Collection</a>
          <a href="#gallery" className="btn btn-outline">View Gallery</a>
        </div>
      </div>
      <div className="ab-hero__img">
        <Image
          src="/shadow/art_4.jpg"
          alt="Ornate African shadow box with decorative medallions crafted in Ghana"
          width={800} height={1000} style={{ width: '100%', height: 'auto' }} priority
        />
      </div>
    </section>

    {/* ── Feature 1 ─────────────────────────────────────── */}
    <section className="feature" id="work">
      <div className="feature__img">
        <Image
          src="/shadow/art_5.jpg"
          alt="Traditional African symbolic artwork framed in deep shadow box"
          width={800} height={1000} style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="feature__copy">
        <span className="sec-label">Heritage</span>
        <h2>Crafting stories through traditional African symbolism</h2>
        <p>
          Craftline's Art Boxes blend cultural narratives with contemporary
          design, transforming traditional symbols into modern artistic
          expressions that endure across generations.
        </p>
        <div className="feature__actions">
          <a href="#" className="btn btn-red">Explore</a>
          <a href="#" className="btn btn-ghost">View more</a>
        </div>
      </div>
    </section>

    {/* ── Materials ──────────────────────────────────────── */}
    <section className="materials">
      <div className="materials__head">
        <h2>Made from the earth,<br />shaped by hand</h2>
        <p>
          Every piece is crafted from natural, sustainably sourced materials
          that honour centuries of artisan tradition across the continent.
        </p>
      </div>
      <div className="materials-grid">
        {[
          { n: "01", name: "Jute Materials",   desc: "Natural fibres that connect us with traditional African craftsmanship and slow making." },
          { n: "02", name: "Plantain Bark",     desc: "Sustainable materials that tell a story of cultural resilience and ecological care." },
          { n: "03", name: "Brass Elements",    desc: "Metalwork reflecting the intricate details of African artistic tradition and heritage." },
          { n: "04", name: "Wooden Designs",    desc: "Handcrafted wooden components that showcase exceptional artisan skill and patience." },
        ].map(m => (
          <div className="mat-card" key={m.n}>
            <div className="mat-card__num">{m.n}</div>
            <h3>{m.name}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── Feature 2 ─────────────────────────────────────── */}
    <section className="feature flip">
      <div className="feature__img">
        <Image
          src="/shadow/setup.jpg"
          alt="Close detail of a CraftHive art box surface pattern and texture"
          width={800} height={1000} style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="feature__copy">
        <span className="sec-label">Craft</span>
        <h2>Every box carries a hundred-year story</h2>
        <p>
          Each piece passes through the hands of master craftspeople whose
          techniques have been refined across generations. No two boxes are
          ever exactly alike — that is the point.
        </p>
        <div className="feature__actions">
          <a href="#" className="btn btn-red">Explore</a>
          <a href="#" className="btn btn-ghost">View more</a>
        </div>
      </div>
    </section>

    {/* ── Gallery ────────────────────────────────────────── */}
    <ArtGallery/>
   
    <Footer />
  </div>
);

export default ArtBoxesPage;
