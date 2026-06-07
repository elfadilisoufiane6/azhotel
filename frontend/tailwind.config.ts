import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem", xl: "3rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // ─── Signature brand blue ──────────────────────
        brand: {
          50:  "#F0F4FB",
          100: "#DCE5F4",
          200: "#B8CBE8",
          300: "#93B1DD",
          400: "#5C82C7",
          500: "#2C5EAD",  // ← signature
          600: "#224B8E",
          700: "#1B3A6F",
          800: "#142950",
          900: "#0A1934",
        },
        ink: "#0A1934",
        snow: "#FFFFFF",
        bone: "#F4F6FA",
        pearl: "#FAFBFD",
      },
      fontFamily: {
        display:   ["var(--font-display)",  '"Playfair Display"', "Georgia", "serif"],
        editorial: ["var(--font-editorial)",'"DM Serif Display"', "Georgia", "serif"],
        sans:      ["var(--font-sans)",     "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 9vw, 8.5rem)",  { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "display-xl":  ["clamp(3rem, 8vw, 6.5rem)",    { lineHeight: "1.00", letterSpacing: "-0.03em"  }],
        "display-lg":  ["clamp(2.25rem, 5vw, 4.75rem)",{ lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md":  ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.12", letterSpacing: "-0.02em"  }],
      },
      letterSpacing: {
        widest: "0.32em",
        ultra:  "0.42em",
      },
      boxShadow: {
        luxe: "0 30px 80px -25px rgba(20, 41, 80, 0.45)",
        soft: "0 12px 40px -16px rgba(20, 41, 80, 0.18)",
        card: "0 1px 0 rgba(20,41,80,.04), 0 18px 40px -24px rgba(20,41,80,.18)",
      },
      backgroundImage: {
        "gradient-brand":    "linear-gradient(135deg, #2C5EAD 0%, #1B3A6F 100%)",
        "gradient-midnight": "linear-gradient(180deg, rgba(10,25,52,0) 0%, rgba(10,25,52,0.9) 100%)",
        "gradient-sheen":    "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)",
      },
      keyframes: {
        "fade-up":   { "0%": { opacity: "0", transform: "translateY(28px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "ken-burns": { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.12)" } },
        "sheen":     { "0%": { transform: "translateX(-150%)" }, "100%": { transform: "translateX(150%)" } },
      },
      animation: {
        "fade-up":  "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "ken-burns":"ken-burns 22s ease-out infinite alternate",
        "sheen":    "sheen 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
