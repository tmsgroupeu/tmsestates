import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center text-center">
      <Image
        src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--navy)]/70" />
      <div className="relative z-10 px-6">
        <h1 className="text-white text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
          Find Your Dream Property
        </h1>
        <p className="mt-3 text-white/90 text-lg">The perfect place to call home is just a click away.</p>

        {/* Plain GET form to /properties?search=... */}
        <form action="/properties" method="GET" className="mt-6 flex items-stretch max-w-xl mx-auto bg-white rounded-full shadow overflow-hidden">
          <input
            name="search"
            placeholder="Search by keyword…"
            className="flex-1 px-5 py-3 outline-none text-[var(--text)]"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-dk)] text-white font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
