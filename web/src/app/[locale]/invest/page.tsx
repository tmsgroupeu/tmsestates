"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Globe,
  Landmark,
  Percent,
  Plane,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/routing";

const CLOUD_NAME = "dkbpthpxg";
const VIDEO_ID = "12626266_1920_1080_25fps_xzeheg";
const VIDEO_SRC = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${VIDEO_ID}.mp4`;

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const drivers = [
  {
    icon: Globe,
    title: "Strategic Gateway",
    text: "One of Cyprus’ greatest strengths is its strategic geographical position at the crossroads of Europe, Asia and Africa. This makes the island a natural investment gateway, supported by modern infrastructure and two international airports. Together with a warm Mediterranean climate, beautiful coastlines and a wide range of residential options, Cyprus offers a lifestyle that consistently sustains strong demand for property.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Stable",
    text: "Cyprus is also known for its safe, stable, and welcoming environment. The country benefits from a strong legal framework based on English Common Law principles, low crime rates, and a transparent property ownership system. English is widely spoken, and the multicultural population makes relocation and property ownership straightforward for foreign investors.",
  },
  {
    icon: TrendingUp,
    title: "Market Growth",
    text: "From an investment perspective, the Cyprus real estate market continues to grow, driven by tourism, residential demand, and limited supply in prime locations. These factors create attractive opportunities for both capital appreciation and steady rental income, whether through holiday rentals or long-term leasing.",
  },
];

const legalItems = [
  "Secure and clearly defined property ownership",
  "Transparent land registry procedures",
  "Reliable contract enforcement",
  "Business-friendly policies for foreign investors",
];

const taxBenefits = [
  "Extensive double taxation treaty network with over 75 countries",
  "No withholding tax on dividends, interest, or royalty payments abroad",
  "Capital gains from the sale of securities are tax exempt",
  "Reduced VAT on First Residence - Buyers acquiring a new property as their primary residence in Cyprus may qualify for a reduced VAT rate of 5%.",
];

const supportItems = [
  "Property selection and investment analysis",
  "Guidance on permanent residency requirements",
  "Coordination with legal, tax, and compliance professionals",
  "Assistance with banking setup (Cyprus, Dubai, HK)",
  "Property management and maintenance",
  "Ongoing after-sales and investor support",
];

export default function InvestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1.16]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.86, 0.42, 0.26]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 0.86]);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -48]);

  return (
    <main ref={containerRef} className="relative overflow-hidden bg-[#242124] text-[#F5F0E8]">
      <motion.div className="fixed inset-0 z-0 pointer-events-none">
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          src={VIDEO_SRC}
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="h-full w-full object-cover"
        />
        <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-[#242124]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#242124]/90 via-[#242124]/54 to-[#242124]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#242124] via-transparent to-[#242124]/62" />
      </motion.div>

      <div className="relative z-10">
        <section className="relative flex min-h-screen items-end px-6 pb-20 pt-40 md:px-10 lg:pb-28">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-20">
            <motion.div style={{ y: heroY }} initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Investment Intelligence
              </motion.p>

              <motion.h1 variants={fadeUp} className="max-w-5xl font-montserrat text-[clamp(2.75rem,6vw,7rem)] font-bold leading-[0.95] tracking-[-0.07em] text-[#F5F0E8]">
                Why Invest in
                <span className="block text-[#C2A139]">Real Estate in Cyprus</span>
              </motion.h1>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl border-l border-[#C2A139]/50 bg-[#242124]/52 px-5 py-5 shadow-[0_26px_85px_rgba(0,0,0,0.28)] backdrop-blur-[3px]">
              <motion.p variants={fadeUp} className="text-sm leading-7 text-[#F5F0E8]/86 md:text-base md:leading-8">
                Cyprus has established itself as one of Europe’s most attractive real estate destinations, offering a powerful combination of lifestyle appeal, investment security, and long-term growth potential. As a member of the European Union and a key hub in the Eastern Mediterranean, the island continues to attract international buyers, investors, and families seeking both financial returns and a high quality of life.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-5 text-sm leading-7 text-[#F5F0E8]/72 md:text-base md:leading-8">
                In addition, Cyprus offers an appealing Permanent Residency by Investment programme. Non-EU nationals who invest in qualifying real estate with a minimum value of €300,000 may apply for permanent residency for themselves and their family through a fast-track process.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="relative bg-[#242124] px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger} className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <motion.p variants={fadeUp} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                  Key Drivers
                </motion.p>
                <motion.h2 variants={fadeUp} className="font-montserrat text-[clamp(2rem,3.7vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
                  Why Cyprus Continues to Attract Investors
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="max-w-2xl text-sm leading-7 text-[#F5F0E8]/66 md:text-[0.95rem] md:leading-8">
                The island combines strategic geography, lifestyle appeal, market resilience and legal clarity, creating a strong foundation for real estate investment.
              </motion.p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {drivers.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#F5F0E8] px-6 py-16 text-[#242124] md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
              <motion.p variants={fadeUp} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Legal Framework
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-montserrat text-[clamp(2rem,3.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                Strong Legal & Business Environment
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-sm leading-7 text-[#242124]/72 md:text-[0.95rem] md:leading-8">
                Cyprus operates under a robust and well-established legal and regulatory system based on English Common Law. This framework is widely recognised for its transparency, investor protection, and reliability, making Cyprus one of the safest jurisdictions in Europe for real estate investment.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger} className="investment-panel relative overflow-hidden bg-white shadow-[0_28px_95px_rgba(36,33,36,0.16)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/14">
                <div className="investment-gold-line h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
              </div>
              <div className="grid gap-px bg-[#242124]/8 sm:grid-cols-2">
                {legalItems.map((item) => (
                  <motion.div key={item} variants={fadeUp} className="group bg-white p-6 transition-colors hover:bg-[#F5F0E8]">
                    <CheckCircle2 className="mb-6 h-6 w-6 text-[#C2A139]" />
                    <p className="text-sm font-semibold leading-7 text-[#242124]/76">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#C2A139] px-6 py-16 text-[#242124] md:px-10 md:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,33,36,0.08),transparent_24%,transparent_76%,rgba(36,33,36,0.08))]" />
          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger} className="mb-12 text-center">
              <motion.p variants={fadeUp} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#242124]/64">
                Financial Benefits
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-montserrat text-[clamp(2rem,3.7vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                Attractive Tax & Financial Benefits
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#242124]/76 md:text-[0.95rem] md:leading-8">
                Cyprus offers one of the most competitive tax regimes in the European Union, significantly enhancing the overall return on real estate and business investments.
              </motion.p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
              <div className="grid gap-px bg-[#242124]/14">
                <StatRow number="15%" label="Corporate Tax Rate (Among Lowest in EU)" />
                <StatRow number="0% / 5%" label="Dividend Tax (Non-Dom vs Domiciled)" />
                <StatRow number="0%" label="Inheritance, Succession, or Gift Taxes" />
                <StatRow number="0%" label="Immovable Property Tax" />
              </div>

              <div className="relative overflow-hidden bg-[#242124] p-7 text-[#F5F0E8] shadow-[0_28px_95px_rgba(36,33,36,0.22)] md:p-10">
                <Percent className="absolute -right-8 -top-8 h-40 w-40 text-[#C2A139]/10" />
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                  Key Benefits Include
                </p>
                <div className="grid gap-4">
                  {taxBenefits.map((item) => (
                    <CheckLine key={item} text={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#242124] px-6 py-16 text-[#F5F0E8] md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger} className="mb-12 text-center">
              <motion.p variants={fadeUp} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                EU Access
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-montserrat text-[clamp(2rem,3.7vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                Permanent Residency Options
              </motion.h2>
              <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#F5F0E8]/66 md:text-[0.95rem] md:leading-8">
                Cyprus offers different permanent residency categories to accommodate various investor profiles:
              </motion.p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              <ResidencyCard
                featured
                icon={Plane}
                eyebrow="Most Popular"
                title="Fast-Track Permanent Residency"
                price="€300,000"
                note="+VAT"
                items={[
                  "Investment in new residential property",
                  "Properties under construction are eligible",
                  "Residency valid for life",
                  "Leads to eligibility for citizenship (5 Years)",
                ]}
              />
              <ResidencyCard
                icon={Users}
                title="Permanent Residency"
                price="Standard Category"
                items={[
                  "Lower investment requirements",
                  "Suitable for individuals with stable income from abroad",
                  "Ideal for retirees or non-working residents",
                ]}
              />
            </div>

            <div className="mt-8 border border-[#F5F0E8]/12 bg-[#05070B]/24 p-7 text-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Income Requirements & Family Coverage
              </p>
              <p className="text-sm leading-7 text-[#F5F0E8]/76">
                Applicants must demonstrate sufficient income from abroad (salaries, pensions, dividends, etc.).
              </p>
              <p className="mt-2 text-sm leading-7 text-[#F5F0E8]/76">
                Permanent residency may cover: <strong>Spouse</strong>, <strong>Dependent children</strong>, and in certain cases, <strong>parents or parents-in-law</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-[#F5F0E8] px-6 py-16 text-[#242124] md:px-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger}>
              <motion.p variants={fadeUp} className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                Investor Support
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-montserrat text-[clamp(2rem,3.7vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                How TMS Estates Supports You
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-sm leading-7 text-[#242124]/72 md:text-[0.95rem] md:leading-8">
                At TMS ESTATES, we support you well beyond the purchase itself. With an in-house legal and finance team, we provide complete investment and relocation solutions tailored to each client’s objectives.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={stagger} className="grid gap-3 sm:grid-cols-2">
              {supportItems.map((item) => (
                <SupportItem key={item} text={item} />
              ))}
            </motion.div>
          </div>

          <div className="mx-auto mt-14 w-full max-w-7xl border-t border-[#242124]/10 pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A139]">
                  Invest with Confidence
                </p>
                <h3 className="font-montserrat text-[clamp(1.8rem,3vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.055em]">
                  Start Your Cyprus Investment Journey
                </h3>
              </div>
              <div>
                <p className="mb-6 max-w-2xl text-sm leading-7 text-[#242124]/66 md:text-[0.95rem] md:leading-8">
                  Whether your goal is lifestyle relocation, rental income, or long-term capital growth, Cyprus offers a secure and rewarding real estate environment.
                </p>
                <Link href="/#contact" className="group inline-flex items-center gap-3 bg-[#242124] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5F0E8] transition-all duration-300 hover:bg-[#C2A139] hover:text-[#242124]">
                  Contact TMS Estates Today
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .investment-panel {
          box-shadow:
            0 28px 95px rgba(36, 33, 36, 0.16),
            inset 0 1px 0 rgba(194, 161, 57, 0.08);
        }

        .investment-gold-line {
          animation: investmentGoldSweep 4.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(194, 161, 57, 0.45));
        }

        @keyframes investmentGoldSweep {
          0% {
            transform: translateX(-115%);
          }
          46%,
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="group relative min-h-[360px] overflow-hidden border border-[#F5F0E8]/12 bg-[#05070B]/24 p-7 transition-all duration-300 hover:border-[#C2A139]/55 hover:bg-[#05070B]/36">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C2A139]/10 via-[#F5F0E8]/[0.025] to-transparent" />
      </div>
      <div className="relative z-10">
        <div className="mb-7 flex h-12 w-12 items-center justify-center border border-[#C2A139]/34 bg-[#C2A139]/10 text-[#C2A139] transition-all duration-300 group-hover:bg-[#C2A139] group-hover:text-[#242124]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-montserrat text-2xl font-semibold tracking-[-0.04em] text-[#F5F0E8]">{title}</h3>
        <p className="mt-5 text-sm leading-7 text-[#F5F0E8]/68">{text}</p>
      </div>
    </motion.article>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex gap-4 border border-[#F5F0E8]/10 bg-[#F5F0E8]/[0.045] p-4">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C2A139]" />
      <p className="text-sm leading-7 text-[#F5F0E8]/76">{text}</p>
    </div>
  );
}

function StatRow({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-[#F5F0E8] p-6">
      <p className="font-montserrat text-4xl font-bold tracking-[-0.05em] text-[#242124] md:text-5xl">{number}</p>
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#242124]/62">{label}</p>
    </div>
  );
}

function ResidencyCard({
  icon: Icon,
  title,
  price,
  note,
  items,
  featured = false,
  eyebrow,
}: {
  icon: any;
  title: string;
  price: string;
  note?: string;
  items: string[];
  featured?: boolean;
  eyebrow?: string;
}) {
  return (
    <motion.article whileHover={{ y: -4 }} className={`relative overflow-hidden border p-7 shadow-[0_28px_95px_rgba(0,0,0,0.18)] md:p-9 ${featured ? "border-[#C2A139]/45 bg-[#05070B]/42" : "border-[#F5F0E8]/12 bg-[#05070B]/22"}`}>
      {eyebrow && (
        <div className="absolute right-0 top-0 bg-[#C2A139] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#242124]">
          {eyebrow}
        </div>
      )}
      <Icon className="mb-7 h-12 w-12 text-[#C2A139]" />
      <h3 className="font-montserrat text-2xl font-semibold tracking-[-0.045em] text-[#F5F0E8]">{title}</h3>
      <p className="mt-4 font-montserrat text-3xl font-bold tracking-[-0.05em] text-[#C2A139]">
        {price} {note && <span className="text-sm font-semibold tracking-normal text-[#F5F0E8]/52">{note}</span>}
      </p>
      <div className="mt-7 grid gap-3">
        {items.map((item) => (
          <CheckLine key={item} text={item} />
        ))}
      </div>
    </motion.article>
  );
}

function SupportItem({ text }: { text: string }) {
  return (
    <div className="group relative border border-[#242124]/10 bg-white p-5 transition-colors hover:bg-[#F5F0E8]">
      <FileText className="mb-5 h-5 w-5 text-[#C2A139]" />
      <p className="text-sm font-semibold leading-7 text-[#242124]/72">{text}</p>
    </div>
  );
}
