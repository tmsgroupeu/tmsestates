/* Fully Updated: ./components/sections/OurExpertise.tsx */

import Section from "@/components/Section";
import ValueGrid from "@/components/ValueGrid";

export default function OurExpertise() {
  return (
    // This section now has a transparent background, so its children (ValueGrid)
    // will appear directly over the hero image as the user scrolls.
    <Section
      id="advantage"
      title="Why Choose Us"
      subtitle="We offer a seamless, transparent, and results-driven experience from start to finish."
      variant="dark" // Use the "dark" variant to make the title/subtitle text white
    >
      <ValueGrid />
    </Section>
  );
}