"use client";

import { useChat, type Message } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
// ✅ FIX: Using Bot icon everywhere instead of Headset/Sparkles
import { X, Send, Bot, User, CheckCircle2 } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import MiniPropertyCard from './MiniPropertyCard';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [hideToggle, setHideToggle] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, append } = useChat({
    maxSteps: 5, 
    api: '/api/chat',
    onError: (error) => console.error("AI Error:", error)
  });
  
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
    if (isNearBottom) {
        scrollToBottom();
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(scrollToBottom, 100);
    };
    window.addEventListener("open-ai-chat", handleOpen);
    const timer = setTimeout(() => setShowInvite(true), 5000);
    
    // Hide when scrolling near footer
    const checkFooter = () => {
        const footer = document.getElementById('page-footer');
        if (!footer) return;
        const rect = footer.getBoundingClientRect();
        setHideToggle(rect.top < window.innerHeight);
    };
    window.addEventListener('scroll', checkFooter);
    
    return () => {
        window.removeEventListener("open-ai-chat", handleOpen);
        window.removeEventListener('scroll', checkFooter);
        clearTimeout(timer);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;
    const text = localInput;
    setLocalInput('');
    await append({ role: 'user', content: text });
    setTimeout(scrollToBottom, 100);
  };

  const handleSuggestionClick = async (text: string) => {
    setLocalInput('');
    await append({ role: 'user', content: text });
  };

  return (
    <div className="fixed z-[9999] font-sans pointer-events-none inset-0 flex flex-col justify-end items-end p-4 sm:p-6">
      
      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-2 sm:mb-2 md:mb-4 
                       w-full md:w-[380px] h-[60vh] md:h-[600px] 
                       flex flex-col overflow-hidden rounded-2xl border border-white/20 
                       bg-[#0A2342]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 shrink-0">
              <div className="flex items-center gap-3">
                {/* Header Icon: Bot */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">TMS Concierge</h3>
                  <div className="flex items-center gap-1.5">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                     </span>
                     <p className="text-[10px] text-white/60">AI Agent Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
               ref={messagesContainerRef}
               className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="mt-12 text-center text-white/40 space-y-4 px-4">
                  <p className="text-sm font-medium">Welcome to TMS Estates.</p>
                  <p className="text-xs">I can check our live database for you. Try asking:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button type="button" onClick={() => handleSuggestionClick("Show me villas in Limassol")} className="text-[10px] border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition cursor-pointer">Limassol Villas</button>
                    <button type="button" onClick={() => handleSuggestionClick("Apartments for rent")} className="text-[10px] border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white transition cursor-pointer">Rentals</button>
                  </div>
                </div>
              )}
              
              {messages.map((m: Message) => (
                <div key={m.id} className={`mb-4 flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-white/10' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                    {/* Message Icon: Bot */}
                    {m.role === 'user' ? <User size={14} /> : <Bot size={16} />}
                  </div>
                  <div className={`flex flex-col gap-2 max-w-[85%]`}>
                    {m.content && (
                        <div className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${m.role === 'user' ? 'bg-white text-[#0A2342]' : 'bg-white/5 text-white/90 border border-white/10'}`}>
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                    )}
                    {m.toolInvocations?.map((tool) => {
                      if (tool.state === 'result') {
                         if (tool.toolName === 'show_property' && tool.result && !tool.result.error) {
                             return <div key={tool.toolCallId} className="animate-in fade-in zoom-in duration-300 mt-1"><MiniPropertyCard data={tool.result} /></div>;
                         }
                         if (tool.toolName === 'register_interest') {
                             const success = tool.result && tool.result.success;
                             return (
                                <div key={tool.toolCallId} className={`mt-2 ${success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-1`}>
                                   {success ? <CheckCircle2 size={18} className="text-green-400 shrink-0" /> : <X size={18} className="text-red-400 shrink-0" />}
                                   <span className="text-xs text-white">{success ? "Details sent to agent." : tool.result.error || "Error processing request."}</span>
                                </div>
                             );
                         }
                      }
                      if (tool.state !== 'result') {
                         return <div key={tool.toolCallId} className="mt-1 w-full h-10 bg-white/5 rounded-xl animate-pulse flex items-center justify-center border border-white/5"><span className="text-xs text-white/30 italic">Processing request...</span></div>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
              
              {isLoading && <div className="flex gap-2 text-white/40 text-xs ml-12 items-center h-6"><span className="animate-pulse">Typing...</span></div>}
            </div>

            {/* Input */}
            <form onSubmit={handleFormSubmit} className="border-t border-white/10 p-3 bg-[#0A2342] shrink-0 relative z-50">
              <div className="relative flex items-center">
                <input
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  value={localInput} 
                  onChange={(e) => setLocalInput(e.target.value)}
                  placeholder="Ask a question..."
                />
                <button type="submit" disabled={isLoading || !localInput.trim()} className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342] transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer">
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <AnimatePresence>
        {!isOpen && !hideToggle && (
           <motion.div
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0, opacity: 0 }}
             className="pointer-events-auto absolute bottom-6 right-[90px] md:right-24 flex flex-col items-end z-[10000]"
           >
              {/* Invite Bubble */}
              <AnimatePresence>
                 {showInvite && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mb-4 mr-2 bg-white text-[#0A2342] p-4 rounded-xl shadow-xl border border-gray-100 w-64 relative"
                    >
                       <p className="text-xs font-bold mb-1">👋 Need assistance?</p>
                       <p className="text-xs text-gray-600">I can help you find properties or explain investment benefits.</p>
                       <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
                       <button onClick={(e) => { e.stopPropagation(); setShowInvite(false); }} className="absolute top-2 right-2 text-gray-400 hover:text-[#0A2342]"><X size={12}/></button>
                    </motion.div>
                 )}
              </AnimatePresence>

              {/* Floating Button: Bot Icon */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2342] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105"
              >
                <div className="relative">
                    <Bot size={24} />
                    <span className="absolute -top-2 -right-2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#D4AF37]"></span>
                    </span>
                </div>
              </button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
