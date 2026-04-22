"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = { sender: "bot" | "user"; text: string };

const quickReplies = [
  "Recommend a long-lasting perfume",
  "What are your delivery charges?",
  "Suggest an affordable option",
];

function getBotReply(text: string) {
  const query = text.toLowerCase();
  if (query.includes("long-lasting")) return "Try Mughal or Oud Royale — both are strong projection choices with all-day performance.";
  if (query.includes("delivery")) return "Delivery usually takes 4–5 working days. Free shipping applies above Rs. 3,999.";
  if (query.includes("affordable")) return "Daily Fresh and Hajj Perfume are customer favorites in the affordable range.";
  return "Our team typically replies within an hour. Meanwhile, I can help you find premium, affordable, or bakhoor products.";
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Usman Baig Team - Typically replies within an hour. How can we help today?" },
  ]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: message }, { sender: "bot", text: getBotReply(message) }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="w-[330px] bg-white border border-neutral-200 shadow-2xl rounded-2xl overflow-hidden mb-3">
            <div className="h-12 px-4 bg-neutral-900 text-white flex items-center justify-between">
              <p className="text-sm">Live Chat</p>
              <button onClick={() => setOpen(false)}><X size={16} /></button>
            </div>
            <div className="h-72 overflow-y-auto p-3 space-y-2 bg-neutral-50">
              {messages.map((msg, i) => (
                <div key={`${msg.sender}-${i}`} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.sender === "bot" ? "bg-white border border-neutral-200" : "bg-neutral-900 text-white ml-auto"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t space-y-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button key={reply} className="text-xs px-2 py-1 rounded-full bg-neutral-100" onClick={() => sendMessage(reply)}>{reply}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 h-10 border rounded-md px-3 text-sm" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <button className="h-10 w-10 rounded-md bg-[#B48A54] text-white grid place-items-center" onClick={() => sendMessage(input)}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((v) => !v)} className="h-14 w-14 rounded-full bg-[#B48A54] text-white grid place-items-center shadow-xl">
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
