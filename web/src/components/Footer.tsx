export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-[var(--text-on-dark)] mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-2">
        <div>
          <h4 className="text-[var(--gold)] text-lg font-semibold pb-2 border-b border-white/10 inline-block">
            About Us
          </h4>
          <p className="mt-4 text-sm text-white/80 max-w-prose">
            Your trusted partner in finding the perfect property. We are committed to providing the
            best service and expertise in the real estate market.
          </p>
        </div>
        <div>
          <h4 className="text-[var(--gold)] text-lg font-semibold pb-2 border-b border-white/10 inline-block">
            Contact Us
          </h4>
          <div className="mt-4 text-sm text-white/80 space-y-1">
            <p>Email: info@tmsestates.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-white/70">
          © {new Date().getFullYear()} TMSESTATES. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
