/* UPDATED: src/components/ai/AIChatWidget.tsx */
"use client";

import { useChat, type Message } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Headset, User } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import MiniPropertyCard from './MiniPropertyCard';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');

  const { messages, isLoading, append } = useChat({
    maxSteps: 3, 
    api: '/api/chat',
    onError: (error) => {
      console.error("AI Error:", error);
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    const text = localInput;
    setLocalInput('');
    await append({ role: 'user', content: text });
  };

  const handleSuggestionClick = async (text: string) => {
    setLocalInput('');
    await append({ role: 'user', content: text });
  };

  return (
    <div className="fixed z-[9999] font-sans pointer-events-none inset-0 flex flex-col justify-end items-end p-4 sm:p-6">
      
      {/* --- THE CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Animation: Pop up from bottom-right
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            
            className="pointer-events-auto mb-2 sm:mb-2 md:mb-4 
                       w-full md:w-[380px] h-[60vh] md:h-[600px] 
                       flex flex-col overflow-hidden rounded-2xl border border-white/20 
                       bg-[#0A2342]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342]">
                  <Headset size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">TMS Concierge</h3>
                  <p className="text-[10px] text-white/60">AI Property Specialist</p>
                </div>
              </div>
              {/* ✅ This is now the ONLY close button when open */}
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="mt-12 text-center text-white/40 space-y-4 px-4">
                  <p className="text-sm font-medium">Welcome to TMS Estates.</p>
                  <p className="text-xs">I can check our live database for you. Try asking:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button 
                        type="button" 
                        onClick={() => handleSuggestionClick("Show me villas in Paphos")} 
                        className="text-[10px] border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition cursor-pointer"
                    >
                        Villas in Paphos
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleSuggestionClick("Apartments near Limassol")} 
                        className="text-[10px] border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition cursor-pointer"
                    >
                        Limassol Apartments
                    </button>
                  </div>
                </div>
              )}
              
              {messages.map((m: Message) => (
                <div key={m.id} className={`mb-4 flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-white/10' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Headset size={16} />}
                  </div>

                  <div className={`flex flex-col gap-2 max-w-[85%]`}>
                    {m.content && (
                        <div className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                            m.role === 'user' 
                            ? 'bg-white text-[#0A2342]' 
                            : 'bg-white/5 text-white/90 border border-white/10'
                        }`}>
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                    )}

                    {m.toolInvocations?.map((toolInvocation) => {
                      const { toolName, toolCallId, state } = toolInvocation;

                      if (state === 'result' && toolName === 'show_property') {
                        const result = toolInvocation.result as any;
                        if (!result || result.error) return null;
                        
                        return (
                          <div key={toolCallId} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                             <MiniPropertyCard data={result} />
                          </div>
                        );
                      }
                      return (
                         <div key={toolCallId} className="w-full h-24 bg-white/5 rounded-xl animate-pulse flex items-center justify-center border border-white/5">
                            <span className="text-xs text-white/30">Searching...</span>
                         </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 text-white/40 text-xs ml-12 items-center">
                  <span className="animate-pulse">Typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleFormSubmit} className="border-t border-white/10 p-3 bg-[#0A2342] shrink-0 relative z-50">
              <div className="relative flex items-center">
                <input
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  value={localInput} 
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask about properties..."
                />
                <button
                  type="submit"
                  disabled={isLoading || !localInput.trim()}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE FLOATING TOGGLE BUTTON --- */}
      {/* ✅ FIX: AnimatePresence ensures it smoothly scales out when chat opens */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            // Initial mount animation (scale up)
            initial={{ scale: 0, rotate: -90 }}
            // When visible (scale normal)
            animate={{ scale: 1, rotate: 0 }}
            // When removing (scale down)
            exit={{ scale: 0, rotate: 90 }}
            
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto absolute bottom-6 right-[90px] md:right-24 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] cursor-pointer z-[10000]"
          >
            {/* Just the Headset icon now, since the X is inside the window */}
            <Headset size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
