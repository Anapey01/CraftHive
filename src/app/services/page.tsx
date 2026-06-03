import ScrollExpandHero from '@/components/blocks/ScrollExpandHero';
import Services from '@/components/sections/Services';
// import FramingPreview from '@/components/FramingPreview/FramingPreview';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
        <>
      {/* Hero with scroll-expand */}
      <ScrollExpandHero
        mediaSrc="/services/mini.jpg"
        bgImageSrc="/services/services.jpg"
        title="Preserve what your walls deserve"
        scrollToExpand="Create statements."
      >
        {/* Content revealed after hero expands */}
        <div id="services" />
        <Services />
        <FAQ />
        <Footer />
      </ScrollExpandHero>
    </>
  );
}
