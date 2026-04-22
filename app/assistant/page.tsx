"use client";

import { FormEvent, useState } from "react";

type AssistantMessage = { role: "assistant" | "user"; content: string };

const starters = [
  "Find a premium scent for weddings",
  "Suggest gifts under Rs. 3,000",
  "I need strong projection perfumes",
];

function respond(prompt: string) {
  const q = prompt.toLowerCase();
  if (q.includes("wedding")) return "For weddings, try Mughal and Velvet Bloom. They offer rich trails and premium presentation.";
  if (q.includes("gift") || q.includes("3000")) return "Great picks under Rs. 3,000: Daily Fresh, Hajj Perfume, and French Attar mini set.";
  if (q.includes("strong") || q.includes("projection")) return "Top strong projection picks: Mughal, Oud Royale, and Bakhoor Wood for indoor ambiance.";
  return "I can help by occasion, season, budget, or scent notes. Tell me your preference and I will shortlist perfect options.";
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: "assistant", content: "Welcome to Usman Baig AI Concierge. Ask me for recommendations by notes, budget, or occasion." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text }, { role: "assistant", content: respond(text) }]);
    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-4xl font-semibold">AI Fragrance Assistant</h1>
      <p className="mt-2 text-neutral-600">A dedicated assistant page to get fragrance suggestions instantly.</p>

      <div className="mt-6 rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="h-[480px] overflow-y-auto bg-neutral-50 p-4 space-y-3">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${message.role === "assistant" ? "bg-white border border-neutral-200" : "bg-neutral-900 text-white ml-auto"}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button key={starter} className="text-xs px-2 py-1 rounded-full bg-neutral-100" onClick={() => send(starter)}>
                {starter}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input className="flex-1 h-11 border border-neutral-300 rounded-md px-3" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about notes, budget, occasions..." />
            <button className="h-11 px-6 rounded-md bg-[#B48A54] text-white">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}
