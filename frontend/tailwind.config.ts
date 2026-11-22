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
        brand: {
          50:  "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        amber: {
          50:  "#FFFBEB",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        rose: {
          50:  "#FFF1F2",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
        },
        emerald: {
          50:  "#ECFDF5",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        surface: {
          0:   "#FAFAF9",
          1:   "#F5F5F4",
          2:   "#E7E5E4",
        },
        ink: {
          primary:   "#1C1917",
          secondary: "#57534E",
          muted:     "#A8A29E",
        },
      },
      fontFamily: {
        sans:    ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        card:    "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)",
        "card-hover": "0 4px 12px rgba(0,0,0,.08), 0 16px 40px rgba(0,0,0,.12)",
        swipe:   "0 8px 32px rgba(124,58,237,.18)",
      },
      animation: {
        "fade-up": "fadeUp .4s ease both",
        "pop":     "pop .25s ease both",
        "wiggle":  "wiggle .3s ease both",
        "slide-in-bottom": "slideInBottom .35s cubic-bezier(.34,1.56,.64,1) both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%":   { transform: "scale(.92)", opacity: "0" },
          "100%": { transform: "scale(1)",   opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "33%":      { transform: "rotate(-4deg)" },
          "66%":      { transform: "rotate(4deg)" },
        },
        slideInBottom: {
          "0%":   { opacity: "0", transform: "translateY(24px) scale(.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
