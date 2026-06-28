import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Visit the CraftHive studio on Tuba Road, Weija Tollbooth. Book a consultation for custom framing, laser engraving, or bespoke woodworking in Greater Accra.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
