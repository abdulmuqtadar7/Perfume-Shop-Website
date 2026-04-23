import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, selectCartTotal } from "../store/cart";

export function Cart() {
  const { items, updateQuantity, removeItem, clear } = useCart();
  const total = useCart(selectCartTotal);
  const shipping = total > 120 ? 0 : total === 0 ? 0 : 12;

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-4xl md:text-5xl">Your bag awaits a scent.</p>
        <p className="text-ink-900/60 mt-4 max-w-md mx-auto">
          Begin by exploring the collection — every piece is composed in small batches.
        </p>
        <Link to="/shop" className="btn-primary mt-8">Discover fragrances</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="font-display text-4xl md:text-5xl">Shopping bag</h1>
      <p className="text-ink-900/60 mt-2">{items.length} compositions</p>

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card p-5 flex gap-5 items-center"
            >
              <Link
                to={`/shop/${item.product.id}`}
                className={`w-24 h-28 rounded-2xl bg-gradient-to-br ${item.product.accent} bg-cover bg-center shrink-0`}
                style={{ backgroundImage: `url(${item.product.image})` }}
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/shop/${item.product.id}`}
                  className="font-display text-xl hover:text-gold-600 transition"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-ink-900/60">
                  {item.product.tagline}
                </p>
                <p className="text-xs text-ink-900/50 mt-0.5">
                  {item.product.size} · {item.product.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(0)}
                </span>
                <div className="inline-flex items-center border border-ink-900/10 rounded-full">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-8 h-8 grid place-items-center hover:text-gold-600"
                    aria-label="Decrease"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-7 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-8 h-8 grid place-items-center hover:text-gold-600"
                    aria-label="Increase"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-xs text-ink-900/50 hover:text-ink-900 inline-flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </motion.div>
          ))}
          <button
            onClick={clear}
            className="text-sm text-ink-900/60 hover:text-ink-900 underline underline-offset-4"
          >
            Empty bag
          </button>
        </div>

        <aside className="card p-7 h-max lg:sticky lg:top-24">
          <h3 className="font-display text-2xl">Order summary</h3>
          <div className="mt-5 space-y-2.5 text-sm">
            <Row label="Subtotal" value={`$${total.toFixed(0)}`} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : `$${shipping}`}
              muted={shipping === 0}
            />
            <Row label="Gift wrap" value="Complimentary" muted />
            <div className="h-px bg-ink-900/10 my-3" />
            <div className="flex items-center justify-between">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl">
                ${(total + shipping).toFixed(0)}
              </span>
            </div>
          </div>

          {total < 120 && (
            <p className="text-xs text-ink-900/60 mt-5">
              Add <span className="font-medium">${(120 - total).toFixed(0)}</span> more for complimentary
              shipping.
            </p>
          )}

          <Link to="/checkout" className="btn-primary w-full mt-6">
            Proceed to checkout
          </Link>
          <Link
            to="/shop"
            className="block text-center text-sm text-ink-900/60 hover:text-ink-900 mt-3"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-900/60">{label}</span>
      <span className={muted ? "text-ink-900/60" : ""}>{value}</span>
    </div>
  );
}
