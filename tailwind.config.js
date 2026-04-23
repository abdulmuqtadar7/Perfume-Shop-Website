/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF7F2",
          100: "#F5EFE6",
          200: "#EADFCC",
        },
        ink: {
          900: "#0E0B08",
          800: "#1A140F",
          700: "#2A1F17",
        },
        gold: {
          400: "#D9B26A",
          500: "#C79A4B",
          600: "#A97E36",
        },
        rose: {
          nude: "#C89A8C",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(20, 12, 6, 0.25)",
        glow: "0 0 40px 0 rgba(199, 154, 75, 0.35)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        fadeUp: "fadeUp 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
