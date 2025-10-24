import Section from "./Section";

const items = [
  { q: "Their market knowledge is second to none. They secured our ideal seafront property off-market, handling every detail with absolute professionalism.", a: "The Petrov Family, Buyers" },
  { q: "The presentation and marketing strategy for our villa were outstanding. We achieved a record price for our area within a month.", a: "A. Demetriou, Seller" },
  { q:'As an international investor, trust and efficiency are paramount. TMS Estates delivered on both, providing clear advice and flawless execution.', a: "H. Al Jaber, Investor" },
];

export default function Testimonials() {
  return (
    <div className="bg-white">
      <Section
        id="stories"
        title="Client Success Stories"
        subtitle="Discover the outcomes we consistently achieve for our clients."
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {items.map((t, i) => (
            <figure key={i} className="p-6">
              <blockquote className="text-foreground text-lg italic leading-relaxed before:content-['“'] after:content-['”']">
                {t.q}
              </blockquote>
              <figcaption className="text-muted-foreground mt-4 font-semibold">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}