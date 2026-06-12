"use client";

import { useState } from "react";

export default function ContactForm({ projects }: { projects: { id: string | number; title: string }[] }) {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Thank you for your interest. Our advisors will be in touch shortly!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
          Full Name
        </label>
        <input 
          required 
          type="text" 
          className="w-full bg-white/5 border border-white/20 rounded-md p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors" 
          placeholder="John Doe" 
        />
      </div>
      
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
          Email Address
        </label>
        <input 
          required 
          type="email" 
          className="w-full bg-white/5 border border-white/20 rounded-md p-4 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors" 
          placeholder="john@example.com" 
        />
      </div>
      
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
          Interested Project
        </label>
        <div className="relative">
            <select 
              defaultValue=""
              className="w-full bg-[#111111]/80 border border-white/20 rounded-md p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
            >
              <option value="" disabled>Select a project</option>
              {projects.map(p => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
              <option value="General Inquiry">General Inquiry</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bold uppercase tracking-widest p-4 rounded-md transition-colors mt-4"
      >
        Submit Inquiry
      </button>
      
      {status && (
        <div className="text-center p-4 bg-green-900/40 border border-green-500/50 rounded-md mt-4">
            <p className="text-sm text-green-300 font-medium">{status}</p>
        </div>
      )}
    </form>
  );
}
