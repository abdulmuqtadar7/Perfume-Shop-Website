"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { useUI } from "@/lib/store";

type Msg = { from: "them" | "me"; text: string };

const SEED: Msg[] = [
  {
    from: "them",
    text: "As-salamu alaykum! This is the Usman Baig team. How can we help you find your scent today?",
  },
];

export default function ChatWidget() {
  const open = useUI((s) => s.chatOpen);
  const setOpen = useUI((s) => s.setChat);
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [v, setV] = useState("");

  const send = () => {
    const text = v.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setV("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "them",
          text: "Thanks! A fragrance advisor will reply shortly. Typical response time: under an hour.",
        },
      ]);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[65] w-[min(360px,92vw)] rounded-2xl overflow-hidden bg-white border border-ink/10 shadow-card-hover"
          >
            <header className="bg-ink text-white px-4 py-3 flex items-center gap-3">
              <span className="relative w-10 h-10 rounded-full bg-gold grid place-items-center text-ink serif">
                UB
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-ink" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">Usman Baig Team</p>
                <p className="text-[11px] text-white/60">Typically replies within an hour</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 grid place-items-center"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </header>
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-cream/40">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-snug ${
                      m.from === "me"
                        ? "bg-ink text-white rounded-br-sm"
                        : "bg-white border border-ink/10 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 p-3 border-t border-ink/10 bg-white"
            >
              <input
                value={v}
                onChange={(e) => setV(e.target.value)}
                placeholder="Write a message…"
                className="flex-1 px-3 py-2 text-sm bg-cream/60 rounded-full outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="w-10 h-10 grid place-items-center rounded-full bg-ink text-white hover:bg-gold hover:text-ink transition"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-4 sm:right-6 z-[65] w-14 h-14 rounded-full bg-gold text-ink shadow-card-hover grid place-items-center hover:bg-ink hover:text-white transition"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
