import { FaUserFriends, FaRegNewspaper, FaQuestionCircle } from "react-icons/fa";

export default function InfoSection() {
  const Card = ({ Icon, title, text }: any) => (
    <div className="border rounded-lg p-8 text-center bg-white hover:-translate-y-1 hover:shadow-xl transition">
      <Icon className="text-[var(--gold)] mx-auto mb-3" size={36} />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-neutral-600 mt-2">{text}</p>
      <a className="inline-block mt-3 font-semibold text-[var(--gold)] hover:text-[var(--gold-dk)]" href="#">
        Read More →
      </a>
    </div>
  );

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-semibold text-[var(--navy)]" style={{ fontFamily: "var(--font-montserrat)" }}>
          Your Guide to Real Estate
        </h2>
        <p className="text-neutral-600 mt-2">Expert insights to help you navigate the property market.</p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card Icon={FaUserFriends} title="Buyer's Guide" text="Everything you need to know before purchasing your first home, from financing to closing." />
        <Card Icon={FaRegNewspaper} title="Market Trends 2024" text="Stay updated with the latest market analysis and predictions from our top agents." />
        <Card Icon={FaQuestionCircle} title="Selling Your Home?" text="Learn our proven strategies to maximize your property's value and sell it faster." />
      </div>
    </section>
  );
}
