"use client";

import { useChat, type Message } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, Send, User, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MiniPropertyCard from "./MiniPropertyCard";

const suggestions = [
  "Show me available apartments",
  "Explain investment benefits",
  "I want to arrange a viewing",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [hideToggle, setHideToggle] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, append } = useChat({
    maxSteps: 5,
    api: "/api/chat",
    onError: (error) => console.error("AI Error:", error),
  });

  const scrollToBottom = () => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 150;

    if (isNearBottom) scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowInvite(false);
      setTimeout(scrollToBottom, 100);
    };

    const timer = window.setTimeout(() => setShowInvite(true), 5200);

    const checkFooter = () => {
      const footer = document.getElementById("page-footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      setHideToggle(rect.top < window.innerHeight);
    };

    window.addEventListener("open-ai-chat", handleOpen);
    window.addEventListener("scroll", checkFooter, { passive: true });
    checkFooter();

    return () => {
      window.removeEventListener("open-ai-chat", handleOpen);
      window.removeEventListener("scroll", checkFooter);
      window.clearTimeout(timer);
    };
  }, []);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!localInput.trim() || isLoading) return;

    const text = localInput.trim();
    setLocalInput("");
    await append({ role: "user", content: text });
    setTimeout(scrollToBottom, 100);
  };

  const handleSuggestionClick = async (text: string) => {
    if (isLoading) return;

    setShowInvite(false);
    await append({ role: "user", content: text });
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-end justify-end p-4 sm:p-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.96 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mb-3 flex h-[min(680px,calc(100svh-2rem))] w-full max-w-[430px] flex-col overflow-hidden border border-[#F5F0E8]/12 bg-[#242124] shadow-[0_32px_110px_rgba(0,0,0,0.48)]"
          >
            <div className="chat-gold-line h-px w-full shrink-0" />

            <div className="relative flex shrink-0 items-center justify-between border-b border-[#F5F0E8]/10 bg-[#242124] px-5 py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(194,161,57,0.14),transparent_34%)]" />

              <div className="relative z-10 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center border border-[#C2A139]/55 bg-[#05070B]/24 text-[#C2A139]">
                  <Bot className="h-5 w-5" strokeWidth={1.8} />
                </span>

                <div>
                  <h3 className="font-montserrat text-sm font-semibold tracking-[-0.02em] text-[#F5F0E8]">
                    TMS Concierge
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#C2A139]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/48">
                      AI Property Assistant
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative z-10 grid h-10 w-10 place-items-center border border-[#F5F0E8]/10 text-[#F5F0E8]/58 transition-colors hover:border-[#C2A139]/50 hover:text-[#C2A139]"
                aria-label="Close AI chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto bg-[#05070B]/16 px-4 py-5 scroll-smooth"
            >
              {messages.length === 0 ? (
                <div className="mx-auto mt-8 max-w-[310px] text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center border border-[#C2A139]/45 bg-[#242124] text-[#C2A139]">
                    <Bot className="h-5 w-5" />
                  </div>

                  <p className="mt-5 font-montserrat text-xl font-semibold leading-tight tracking-[-0.04em] text-[#F5F0E8]">
                    How can we help with your property search?
                  </p>

                  <p className="mt-3 text-sm leading-6 text-[#F5F0E8]/58">
                    Ask about available properties, investment benefits, project
                    details, or arrange a follow-up with the team.
                  </p>

                  <div className="mt-6 grid gap-2 text-left">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        className="group flex items-center justify-between border border-[#F5F0E8]/10 bg-[#242124]/72 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#F5F0E8]/72 transition-colors hover:border-[#C2A139]/50 hover:text-[#C2A139]"
                      >
                        {item}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {messages.map((message: Message) => (
                <div
                  key={message.id}
                  className={`mb-5 flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center border ${
                      message.role === "user"
                        ? "border-[#F5F0E8]/14 bg-[#F5F0E8]/8 text-[#F5F0E8]"
                        : "border-[#C2A139]/38 bg-[#242124] text-[#C2A139]"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex max-w-[84%] flex-col gap-2">
                    {message.content ? (
                      <div
                        className={`chat-message border px-4 py-3 text-sm leading-7 ${
                          message.role === "user"
                            ? "border-[#C2A139]/28 bg-[#F5F0E8] text-[#242124]"
                            : "border-[#F5F0E8]/10 bg-[#242124]/82 text-[#F5F0E8]/86"
                        }`}
                      >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : null}

                    {message.toolInvocations?.map((tool: any) => {
                      if (tool.state === "result") {
                        if (
                          tool.toolName === "show_property" &&
                          tool.result &&
                          !tool.result.error
                        ) {
                          return (
                            <div key={tool.toolCallId} className="mt-1">
                              <MiniPropertyCard data={tool.result} />
                            </div>
                          );
                        }

                        if (tool.toolName === "register_interest") {
                          const success = tool.result && tool.result.success;

                          return (
                            <div
                              key={tool.toolCallId}
                              className={`mt-2 flex items-center gap-3 border p-3 text-xs ${
                                success
                                  ? "border-[#C2A139]/35 bg-[#C2A139]/10 text-[#F5F0E8]"
                                  : "border-red-400/30 bg-red-500/10 text-[#F5F0E8]"
                              }`}
                            >
                              {success ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C2A139]" />
                              ) : (
                                <X className="h-4 w-4 shrink-0 text-red-300" />
                              )}
                              <span>
                                {success
                                  ? "Details sent to the team."
                                  : tool.result?.error || "Request could not be processed."}
                              </span>
                            </div>
                          );
                        }
                      }

                      if (tool.state !== "result") {
                        return (
                          <div
                            key={tool.toolCallId}
                            className="mt-1 border border-[#F5F0E8]/10 bg-[#242124]/58 p-3 text-xs italic text-[#F5F0E8]/42"
                          >
                            Processing request...
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="ml-11 flex items-center gap-2 text-xs text-[#F5F0E8]/42">
                  <span className="h-1.5 w-1.5 animate-pulse bg-[#C2A139]" />
                  TMS Concierge is typing
                </div>
              ) : null}
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="shrink-0 border-t border-[#F5F0E8]/10 bg-[#242124] p-3"
            >
              <div className="relative flex items-center">
                <input
                  className="chat-input h-12 w-full border border-[#F5F0E8]/12 bg-[#05070B] px-4 pr-14 text-sm font-medium text-white caret-[#C2A139] outline-none transition-all placeholder:text-[#F5F0E8]/42 focus:border-[#C2A139]/70 focus:bg-[#05070B] focus:text-white focus:shadow-[0_0_0_3px_rgba(194,161,57,0.14)]"
                  value={localInput}
                  onChange={(event) => setLocalInput(event.target.value)}
                  placeholder="Ask about properties, projects, or investment..."
                />

                <button
                  type="submit"
                  disabled={isLoading || !localInput.trim()}
                  className="absolute right-1.5 grid h-9 w-9 place-items-center border border-[#C2A139]/50 bg-[#C2A139] text-[#242124] transition-all hover:bg-[#F5F0E8] disabled:pointer-events-none disabled:opacity-45"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && !hideToggle ? (
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 12 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute bottom-6 right-6 z-[10000] flex flex-col items-end"
          >
            <AnimatePresence>
              {showInvite ? (
                <motion.div
                  initial={{ opacity: 0, x: 16, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 12, y: 8 }}
                  className="mb-4 w-64 border border-[#F5F0E8]/12 bg-[#242124] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)]"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowInvite(false);
                    }}
                    className="absolute right-2 top-2 text-[#F5F0E8]/38 transition-colors hover:text-[#C2A139]"
                    aria-label="Dismiss chat invite"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <p className="pr-5 text-xs font-bold uppercase tracking-[0.16em] text-[#C2A139]">
                    Need Assistance?
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#F5F0E8]/66">
                    Ask about available properties, investment benefits, or
                    project details.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowInvite(false);
              }}
              className="group relative grid h-14 w-14 place-items-center overflow-hidden border border-[#C2A139]/70 bg-[#242124] text-[#C2A139] shadow-[0_18px_60px_rgba(0,0,0,0.34)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_22px_72px_rgba(194,161,57,0.25)]"
              aria-label="Open AI property assistant"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
              <span className="relative z-10">
                <Bot className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 bg-red-500 ring-2 ring-[#242124]" />
              </span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style jsx global>{`
        .chat-gold-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.32),
            rgba(194, 161, 57, 0.96),
            rgba(245, 240, 232, 0.56),
            rgba(194, 161, 57, 0.32),
            transparent
          );
          background-size: 240% 100%;
          animation: chatGoldSweep 6.5s ease-in-out infinite;
        }

        .chat-message p {
          margin: 0;
        }

        .chat-message p + p {
          margin-top: 0.75rem;
        }

        .chat-message ul,
        .chat-message ol {
          margin: 0.65rem 0 0;
          padding-left: 1.1rem;
        }

        .chat-message li + li {
          margin-top: 0.35rem;
        }

        .chat-input {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff;
        }

        .chat-input::placeholder {
          color: rgba(245, 240, 232, 0.42);
          -webkit-text-fill-color: rgba(245, 240, 232, 0.42);
        }

        .chat-input:-webkit-autofill,
        .chat-input:-webkit-autofill:hover,
        .chat-input:-webkit-autofill:focus {
          box-shadow: 0 0 0 1000px #05070b inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #c2a139;
        }

        @keyframes chatGoldSweep {
          0% {
            background-position: 120% 0;
            opacity: 0.36;
          }
          45% {
            opacity: 1;
          }
          100% {
            background-position: -120% 0;
            opacity: 0.36;
          }
        }
      `}</style>
    </div>
  );
}
