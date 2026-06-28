import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Gallery & Portfolio",
  description:
    "Browse our recent projects. See our craftsmanship firsthand, from beautifully framed family portraits and canvas prints to intricate wooden signs.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
