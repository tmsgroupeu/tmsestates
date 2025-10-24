import "./globals.css";
import "@/styles/theme.css";
import { Montserrat, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-montserrat" });
const openSans   = Open_Sans({ subsets: ["latin"], weight: ["400","600"], variable: "--font-open-sans" });

export const metadata = {
  title: "TMS Estates",
  description: "Your trusted partner in premium real estate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="bg-[var(--light-blue)] text-[var(--text)] antialiased">
      <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
      </body>
    </html>
  );
}
