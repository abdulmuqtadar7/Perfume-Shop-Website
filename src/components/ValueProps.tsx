"use client";

import { RotateCcw, Truck, Headphones } from "lucide-react";

const ITEMS = [
  {
    icon: RotateCcw,
    title: "Long-Lasting & Easy Exchange",
    body: "15-day hassle-free exchange policy on all fragrances.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "4–5 working days nationwide delivery, discreetly packaged.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    body: "Our fragrance advisors are available around the clock.",
  },
];

export default function ValueProps() {
  return (
    <section aria-label="Why shop with us" className="border-y border-ink/10 bg-cream/60">
      <div className="container-x grid md:grid-cols-3 gap-4 md:gap-0 py-6">
        {ITEMS.map(({ icon: Icon, title, body }, i) => (
          <div
            key={title}
            data-aos="fade-right"
            data-aos-delay={(i + 1) * 100}
            className="flex items-start gap-4 md:px-6 md:border-r last:border-r-0 border-ink/10"
          >
            <span className="mt-0.5 w-11 h-11 grid place-items-center rounded-full bg-white border border-ink/10 text-gold shadow-sm">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-medium text-ink">{title}</p>
              <p className="text-sm text-ink-muted mt-0.5">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
