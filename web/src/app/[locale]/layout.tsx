/* UPDATED: src/app/[locale]/layout.tsx */
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChatWidget from "@/components/ai/AIChatWidget";
import FloatingControls from "@/components/ui/FloatingControls";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const consentModeScript = `
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 2000
  });

  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);
`;

const gtmScript = `
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event:'gtm.js'
    });

    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';

    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-58J57KXJ');
`;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        {/* 1. Google Consent Mode defaults */}
        <script
          id="google-consent-defaults"
          dangerouslySetInnerHTML={{ __html: consentModeScript }}
        />

        {/* 2. CookieYes CMP */}
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/152e376bf1e0ea7f9827516e01983890/script.js"
        />

        {/* 3. Google Tag Manager */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{ __html: gtmScript }}
        />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58J57KXJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
          <FloatingControls>
            <AIChatWidget />
          </FloatingControls>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}