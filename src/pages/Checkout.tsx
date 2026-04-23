import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { useCart, selectCartTotal } from "../store/cart";

export function Checkout() {
  const navigate = useNavigate();
  const { items, clear } = useCart();
  const total = useCart(selectCartTotal);
  const shipping = total > 120 ? 0 : items.length === 0 ? 0 : 12;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-3xl">No compositions to checkout yet.</p>
        <Link to="/shop" className="btn-primary mt-6">
          Browse the collection
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container-page py-24 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 16 }}
          className="inline-grid place-items-center w-20 h-20 rounded-full bg-gold-500/20 text-gold-600 mx-auto"
        >
          <CheckCircle2 size={36} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl md:text-5xl mt-6"
        >
          Thank you — your scent is on its way.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-ink-900/60 mt-3 max-w-md mx-auto"
        >
          A handwritten note from our atelier will accompany your parcel. You'll
          receive a confirmation by email shortly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link to="/shop" className="btn-primary">
            Continue discovering
          </Link>
          <Link to="/" className="btn-outline">
            Back home
          </Link>
        </motion.div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    clear();
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => navigate("/checkout"), 0);
  };

  return (
    <div className="container-page py-14">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="text-ink-900/60 mt-2 flex items-center gap-2">
        <Lock size={14} /> Secure payment · Encrypted
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_400px] gap-10">
        <form onSubmit={onSubmit} className="space-y-8">
          <Fieldset title="Contact">
            <Field label="Email" type="email" name="email" placeholder="you@atelier.com" required />
          </Fieldset>

          <Fieldset title="Delivery">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" name="firstName" required />
              <Field label="Last name" name="lastName" required />
            </div>
            <Field label="Address" name="address" required />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="City" name="city" required />
              <Field label="Postal code" name="zip" required />
              <Field label="Country" name="country" defaultValue="France" required />
            </div>
          </Fieldset>

          <Fieldset title="Payment">
            <Field label="Card number" name="card" placeholder="•••• •••• •••• ••••" required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" name="exp" placeholder="MM / YY" required />
              <Field label="CVC" name="cvc" placeholder="•••" required />
            </div>
          </Fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:opacity-60"
          >
            {submitting ? "Composing your order..." : `Pay $${(total + shipping).toFixed(0)}`}
          </button>
          <p className="text-xs text-ink-900/50 text-center">
            This is a demo storefront. No real payment is processed.
          </p>
        </form>

        <aside className="card p-6 h-max lg:sticky lg:top-24">
          <h3 className="font-display text-xl mb-4">Your order</h3>
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.product.id} className="flex gap-3 items-center">
                <div
                  className={`w-14 h-16 rounded-xl bg-gradient-to-br ${i.product.accent} bg-cover bg-center shrink-0`}
                  style={{ backgroundImage: `url(${i.product.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{i.product.name}</p>
                  <p className="text-xs text-ink-900/50">
                    {i.product.size} · Qty {i.quantity}
                  </p>
                </div>
                <span className="text-sm">${(i.product.price * i.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-ink-900/10 my-5" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-900/60">Subtotal</span>
              <span>${total.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-900/60">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ink-900/10 mt-2">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-xl">
                ${(total + shipping).toFixed(0)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="font-display text-lg">{title}</h3>
      {children}
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
