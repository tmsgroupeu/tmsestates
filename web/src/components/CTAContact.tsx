export default function CTAContact() {
  return (
    <section id="contact" className="py-16 bg-navy text-text-on-dark">
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8 items-center">
          <div className="max-w-lg">
            <h3 className="text-3xl font-bold font-display">Begin Your Property Journey</h3>
            <p className="text-white/80 mt-3 text-lg">
              Whether you are buying, selling, or simply exploring options, our advisors are ready to provide a private, no-obligation consultation.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3">✓ <span className="flex-1">Access to exclusive on and off-market listings.</span></li>
              <li className="flex items-center gap-3">✓ <span className="flex-1">In-depth market analysis tailored to your goals.</span></li>
              <li className="flex items-center gap-3">✓ <span className="flex-1">A confidential and discreet service at all times.</span></li>
            </ul>
          </div>

          <form className="glass rounded-xl p-6 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input id="name" type="text" className="w-full glass-dark rounded-lg px-4 py-3 text-white placeholder-white/70 bg-transparent border border-white/20 focus:ring-gold focus:border-gold" placeholder="Full name" />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" type="email" className="w-full glass-dark rounded-lg px-4 py-3 text-white placeholder-white/70 bg-transparent border border-white/20 focus:ring-gold focus:border-gold" placeholder="Email" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input id="phone" type="tel" className="w-full glass-dark rounded-lg px-4 py-3 text-white placeholder-white/70 bg-transparent border border-white/20 focus:ring-gold focus:border-gold" placeholder="Phone (optional)" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" rows={4} className="w-full glass-dark rounded-lg px-4 py-3 text-white placeholder-white/70 bg-transparent border border-white/20 focus:ring-gold focus:border-gold" placeholder="Tell us about your property requirements..." />
            </div>
            <button type="submit" className="btn btn-primary w-full">Request Consultation</button>
          </form>
        </div>
      </div>
    </section>
  );
}