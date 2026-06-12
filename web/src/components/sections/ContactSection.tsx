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
    <section className="relative z-10 w-full py-20 px-6 bg-transparent">
       <div className="max-w-4xl mx-auto backdrop-blur-md bg-black/30 border border-[#D4AF37]/30 p-8 md:p-16 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-4 tracking-wide">
                Get In Touch
             </h2>
             <p className="text-white/80 font-light text-lg">
                Connect with our advisors for a private consultation.
             </p>
          </div>
          <ContactForm projects={projects} />
       </div>
    </section>
  );
}
