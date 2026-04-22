"use client";

import { FormEvent, useMemo, useState } from "react";
import { useStore } from "@/context/store-context";

function money(value: number) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
}

export default function CheckoutPage() {
  const { cart, findProduct, cartSubtotal, createOrder, orders } = useStore();
  const [status, setStatus] = useState("");

  const shipping = useMemo(() => (cartSubtotal > 3999 ? 0 : 250), [cartSubtotal]);
  const total = cartSubtotal + shipping;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) {
      setStatus("Please add items to cart before checkout.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    createOrder({
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      city: String(formData.get("city") || ""),
      paymentMethod: String(formData.get("paymentMethod") || ""),
      subtotal: total,
      items: cart,
    });
    event.currentTarget.reset();
    setStatus("Order placed successfully! Your luxury fragrance is on the way.");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-4xl font-semibold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
        <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 p-5 md:p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Shipping & Payment</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" required className="h-11 border rounded-md px-3" placeholder="Full Name" />
            <input name="email" type="email" required className="h-11 border rounded-md px-3" placeholder="Email Address" />
            <input name="phone" required className="h-11 border rounded-md px-3" placeholder="Phone Number" />
            <input name="city" required className="h-11 border rounded-md px-3" placeholder="City" />
          </div>
          <textarea name="address" required className="w-full h-24 border rounded-md px-3 py-2" placeholder="Complete Address" />
          <div>
            <p className="font-medium mb-2">Payment Method</p>
            <div className="grid md:grid-cols-3 gap-2 text-sm">
              {[
                ["cod", "Cash on Delivery"],
                ["card", "Debit/Credit Card"],
                ["bank", "Bank Transfer"],
              ].map(([value, label]) => (
                <label key={value} className="border rounded-md px-3 py-2 flex items-center gap-2">
                  <input type="radio" name="paymentMethod" value={value} defaultChecked={value === "cod"} />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <button className="h-11 px-6 rounded-md bg-[#B48A54] text-white">Place Order</button>
          {status && <p className="text-sm text-emerald-700" role="status" aria-live="polite">{status}</p>}
        </form>

        <aside className="rounded-2xl border border-neutral-200 p-5 md:p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.length === 0 && <p className="text-sm text-neutral-500">No items in your cart.</p>}
            {cart.map((item) => {
              const product = findProduct(item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex items-center justify-between text-sm">
                  <span>{product.name} × {item.quantity}</span>
                  <span>{money(product.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{money(cartSubtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{money(total)}</span></div>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Order History</h2>
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-sm text-neutral-500">No previous orders yet.</p>}
          {orders.map((order) => (
            <article key={order.id} className="rounded-xl border border-neutral-200 p-4 text-sm">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="font-semibold">{order.id}</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <span>{order.name}</span>
                <span>{order.city}</span>
                <span className="capitalize">{order.paymentMethod}</span>
                <span className="font-semibold">{money(order.subtotal)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
