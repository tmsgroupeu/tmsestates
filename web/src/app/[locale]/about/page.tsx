import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('About');
  return (
    <main className="min-h-screen bg-[#0A2342] text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto apple-glass rounded-3xl p-12">
        <h1 className="text-4xl font-montserrat font-bold mb-6">TMS Estates Ltd.</h1>
        <p className="opacity-80">Content loading...</p>
      </div>
    </main>
  );
}