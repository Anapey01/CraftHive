import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadow Boxes",
  description:
    "Need to frame a sports jersey, medals, or a graduation gown? Our handcrafted shadow boxes provide the perfect deep display case for your 3D memorabilia.",
};

export default function ShadowBoxLayout({
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
        "name": "Shadow Boxes",
        "item": "https://crafthive.com/services/shadow-box"
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
