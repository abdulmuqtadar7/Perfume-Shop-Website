import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        ink: {
          DEFAULT: "#0f0f0f",
          soft: "#2a2a2a",
          muted: "#6b6b6b",
        },
        cream: "#faf7f2",
        gold: {
          DEFAULT: "#b8935a",
          light: "#d4b37f",
          dark: "#8a6a3a",
        },
        bronze: "#a6703b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(.22,1,.36,1) both",
        "shimmer": "shimmer 1.8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.05), 0 10px 30px -12px rgba(0,0,0,.12)",
        "card-hover": "0 4px 8px rgba(0,0,0,.06), 0 20px 50px -18px rgba(0,0,0,.22)",
      },
    },
  },
  plugins: [],
};
export default config;
