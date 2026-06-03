import type { Metadata } from "next";
import "./globals.css";
import { Inter,Outfit } from "next/font/google";
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
  title: "CraftHive — Luxury Art Framing Studio",
  description:
    "Museum-grade custom framing, art restoration, and gallery consultation. Preview your artwork with our interactive framing tool before placing an order.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="grain">
      <body className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
        <ViewTransitions>
        <ClientLayout>{children}</ClientLayout>
        </ViewTransitions>
      </body>
    </html>
  );
}
