// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import ContactBubble from "@/components/ui/ContactBubble";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TMS Estates – Luxury Real Estate in Limassol",
    template: "%s | TMS Estates",
  },
  description:
    "Curated portfolio of luxury real estate in Limassol with exclusive mandates, premium insights, and tailored client support.",
  openGraph: {
    title: "TMS Estates – Luxury Real Estate in Limassol",
    description:
      "Explore exclusive luxury properties and curated real estate insights for Limassol.",
    url: siteUrl,
    siteName: "TMS Estates",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMS Estates – Luxury Real Estate in Limassol",
    description:
      "Exclusive mandates and handpicked properties in Limassol.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="bg-slate-950 text-slate-50 antialiased">
        <Header />
        <main className="pt-24">{children}</main>
        <ContactBubble />
      </body>
    </html>
  );
}
