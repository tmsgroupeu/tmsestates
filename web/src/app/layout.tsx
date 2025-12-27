// UPDATED: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Import the Footer
import ContactBubble from "@/components/ui/ContactBubble";
import "./globals.css";
import AIChatWidget from "@/components/ai/AIChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TMS Estates - Luxury Real Estate in Limassol",
    template: "%s | TMS Estates",
  },
  description: "The definitive guide to luxury real estate in Limassol.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer /> {/* ✅ ADD THE FOOTER HERE */}
        <ContactBubble footerId="page-footer" />

        <AIChatWidget />

      </body>
    </html>
  );
}
