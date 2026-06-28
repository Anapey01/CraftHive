import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the artisans behind CraftHive. Based in Weija, our local woodworking team builds honest, hardwood frames and memory boxes rooted in Ghanaian culture.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
