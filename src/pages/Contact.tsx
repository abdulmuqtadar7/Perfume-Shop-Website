import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeader } from "../components/Section";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container-page py-14">
      <SectionHeader
        eyebrow="Contact"
        title={<>We'd love a <em className="not-italic">word</em>.</>}
        description="Questions about a scent, a gift, or a private consultation? Our team responds within 24 hours."
      />

      <div className="mt-12 grid lg:grid-cols-[1fr_420px] gap-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card p-7 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" name="name" required />
            <Field label="Email" type="email" name="email" required />
          </div>
          <Field label="Subject" name="subject" />
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/50">
              Message
            </span>
            <textarea
              required
              rows={5}
              className="mt-1.5 w-full bg-white/80 border border-ink-900/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition resize-none"
              placeholder="Tell us about the scent you're looking for..."
            />
          </label>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn-primary"
          >
            <Send size={14} /> Send message
          </motion.button>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gold-600"
            >
              Thank you — we'll be in touch within 24 hours.
            </motion.p>
          )}
        </form>

        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="font-display text-xl mb-4">The atelier</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-gold-500/15 grid place-items-center text-gold-600">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="font-medium">Rue Droite 42, Grasse, France</p>
                  <p className="text-ink-900/60">Open Tue – Sat, 10 – 18h</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-gold-500/15 grid place-items-center text-gold-600">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="font-medium">hello@maison-aura.com</p>
                  <p className="text-ink-900/60">General inquiries</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-gold-500/15 grid place-items-center text-gold-600">
                  <Phone size={14} />
                </span>
                <div>
                  <p className="font-medium">+33 4 93 00 00 00</p>
                  <p className="text-ink-900/60">By appointment</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="font-display text-xl mb-3">Private consultations</h3>
            <p className="text-sm text-ink-900/70 leading-relaxed">
              Spend 90 minutes with one of our perfumers to discover your
              signature. Available in Grasse, Paris, and on video.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };
function Field({ label, ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/50">
        {label}
      </span>
      <input
        {...rest}
        className="mt-1.5 w-full bg-white/80 border border-ink-900/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition"
      />
    </label>
  );
}
