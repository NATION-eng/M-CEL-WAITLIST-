import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: "#2563EB",
          50: "#EFF4FE",
          100: "#DBE6FD",
          200: "#B8CDFB",
          300: "#8FAFF7",
          400: "#5D87F2",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1A3FB0",
          800: "#17358C",
          900: "#152E6E",
        },
        midnight: {
          DEFAULT: "#0F172A",
          50: "#F4F6F9",
          100: "#E4E8F0",
          800: "#141E33",
          900: "#0F172A",
          950: "#080D18",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          400: "#22D3EE",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.15) 0%, rgba(34,211,238,0.08) 50%, transparent 100%)",
      },
      boxShadow: {
        premium:
          "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.12)",
        "premium-lg":
          "0 2px 4px rgba(15,23,42,0.04), 0 24px 48px -12px rgba(15,23,42,0.18)",
        glow: "0 0 0 1px rgba(37,99,235,0.08), 0 8px 30px -6px rgba(37,99,235,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
