import type { Metadata } from "next";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import ClientLayout from "@/client-layout";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter"
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crafthive.com"),
  title: {
    template: "%s | CraftHive",
    default: "CraftHive — Custom Picture Framing & Art Studio in Weija",
  },
  description:
    "Looking for the best custom picture framing near you? CraftHive at the Weija Tollbooth specializes in premium shadow boxes, personalized wooden gifts, and expert framing services.",
  openGraph: {
    title: "CraftHive — Custom Picture Framing & Art Studio in Weija",
    description:
      "Looking for the best custom picture framing near you? CraftHive at the Weija Tollbooth specializes in premium shadow boxes, personalized wooden gifts, and expert framing services.",
    url: "https://crafthive.com",
    siteName: "CraftHive",
    images: [
      {
        url: "/CraftHive.png",
        width: 1200,
        height: 630,
        alt: "CraftHive Logo",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftHive — Custom Picture Framing & Art Studio in Weija",
    description:
      "Looking for the best custom picture framing near you? CraftHive at the Weija Tollbooth specializes in premium shadow boxes, personalized wooden gifts, and expert framing services.",
    images: ["/CraftHive.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CraftHive Framing Studio",
    "image": "https://crafthive.com/CraftHive.png",
    "url": "https://crafthive.com",
    "telephone": "+233206564018",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tuba Road, Weija Tollbooth",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra Region",
      "addressCountry": "GH"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  return (
    <html lang="en" className="grain" data-scroll-behavior="smooth">
      <body className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ViewTransitions>
          <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
