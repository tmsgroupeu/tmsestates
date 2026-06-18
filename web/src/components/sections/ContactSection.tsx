import { fetchProjects } from "@/lib/cms";
import ContactForm from "../ContactForm";

export default async function ContactSection() {
  const { data: rawProjects } = await fetchProjects();
  
  const projects = (rawProjects || []).map((projectItem: any) => {
      const p = projectItem.attributes || projectItem;
      const title = p.Title || p.title || "Signature Project";
      return {
          id: projectItem.id || title,
          title
      };
  });

  return (
    <section className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-b border-white/10 py-20 px-6">
       <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-6 tracking-wide leading-tight">
                Looking for Your Next <br className="hidden md:block" />Property Opportunity?
             </h2>
             <p className="text-white/80 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Whether you are searching for a new home, an investment property or information about our upcoming developments, our team is here to help.
             </p>
          </div>
          <ContactForm projects={projects} />
       </div>
    </section>
  );
}
