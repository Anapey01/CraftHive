import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Picture Framing",
  description:
    "Don't let your memories fade in a drawer. Our Weija studio provides expert custom framing using acid-free matting, UV-protective glass, and solid hardwood frames to preserve your photos and art forever.",
};

export default function CustomFramingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://crafthive.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://crafthive.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Custom Framing",
        "item": "https://crafthive.com/services/custom-framing"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
