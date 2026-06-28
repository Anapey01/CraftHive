import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Framing & Woodworking Services",
  description:
    "We offer professional picture framing, deep shadow boxes for sports jerseys, laser cutting, and custom wooden signs for homes and businesses in Ghana.",
};

export default function ServicesLayout({
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
