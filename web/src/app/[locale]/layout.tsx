/* UPDATED: src/app/[locale]/layout.tsx */
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactBubble from "@/components/ui/ContactBubble";
import AIChatWidget from "@/components/ai/AIChatWidget";
import FloatingControls from "@/components/ui/FloatingControls"; 
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TMS Estates - Luxury Real Estate in Limassol",
  description: "The definitive guide to luxury real estate in Limassol.",
};

// Params is now required for the layout to know the locale
export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine direction (Right-to-Left for Arabic)
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
          <FloatingControls>
              <ContactBubble footerId="page-footer" />
              <AIChatWidget />
          </FloatingControls>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}