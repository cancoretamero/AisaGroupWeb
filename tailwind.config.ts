import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#0E7C66",
        accent: "#8BC34A",
        ink: "#111111",
        muted: "#6B7280",
        bg: "#F7F7F7",
      },
      fontFamily: {
        display: ['"Brand Display"', '"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 48px -24px rgba(17, 17, 17, 0.25)",
        subtle: "0 16px 32px -24px rgba(17, 17, 17, 0.15)",
        card: "0 12px 32px -16px rgba(17, 17, 17, 0.18)",
      },
      borderRadius: {
        xl: "1.5rem",
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fadeSlide: "fadeSlide 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
