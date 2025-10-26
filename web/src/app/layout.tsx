import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ["latin"], weight: ['400', '700'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: "TMS Estates - Luxury Real Estate in Limassol",
  description: "The definitive guide to luxury real estate in Limassol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}