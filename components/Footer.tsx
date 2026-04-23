"use client";

import { useState } from "react";
import { Globe, AtSign, ExternalLink, Mail, Send } from "lucide-react";

const FOOTER_LINKS = {
  "Shop By": [
    "Perfume Spray",
    "Oud Attar",
    "Bakhoor",
    "French Attars",
    "Arabic Attars",
    "Gift Sets",
  ],
  "Customer Service": [
    "Track Your Order",
    "Exchange Policy",
    "FAQs",
    "Privacy Policy",
    "Terms & Conditions",
    "Contact Us",
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-inter mb-2">
              Exclusive Offers
            </p>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-2">
              Member&apos;s Benefit
            </h3>
            <p className="text-gray-400 text-sm font-inter mb-8 max-w-md">
              Subscribe to our newsletter and get 15% off your first order,
              plus early access to new arrivals and exclusive deals.
            </p>
            {subscribed ? (
              <p className="text-gold font-inter text-sm font-medium">
                ✓ Thank you for subscribing! Your discount code is on its way.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              >
                <div className="flex-1 relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-500 text-sm py-3 pl-9 pr-4 outline-none focus:border-gold transition-colors font-inter"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gold text-charcoal px-6 py-3 text-xs font-bold tracking-widest uppercase font-inter hover:bg-gold-light transition-colors duration-200"
                >
                  Sign Up <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm font-inter text-gray-400">
              <p className="flex items-start gap-2 leading-relaxed">
                <span className="text-gold mt-0.5">📍</span>
                Phase 1, Main Boulevard, Bahria Orchard, Lahore, Pakistan
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 123 4567
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <a
                  href="mailto:info@usmanbaig.com"
                  className="hover:text-white transition-colors"
                >
                  info@usmanbaig.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">🕐</span>
                Mon – Sun: 10am – 10pm
              </p>
            </div>
          </div>

          {/* Shop By */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5">
              Shop By
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS["Shop By"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-gold transition-colors font-inter hover:pl-1 transition-all duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS["Customer Service"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-gold transition-colors font-inter hover:pl-1 transition-all duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-8">
              {[
                { icon: Globe, label: "Facebook", href: "#" },
                { icon: ExternalLink, label: "YouTube", href: "#" },
                { icon: AtSign, label: "Twitter", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:border-gold hover:text-gold transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-inter mb-3">
              We Accept:
            </p>
            <div className="flex gap-2">
              {["VISA", "Mastercard", "JazzCash", "EasyPaisa"].map((pm) => (
                <span
                  key={pm}
                  className="text-[10px] font-bold border border-white/20 px-1.5 py-0.5 text-gray-400 font-inter"
                >
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 font-inter text-center sm:text-left">
            © {new Date().getFullYear()} Usman Baig Fragrance. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-inter">
            Crafted with ❤️ in Lahore, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
