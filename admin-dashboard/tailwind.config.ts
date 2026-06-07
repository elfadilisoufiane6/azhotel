import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./charts/**/*.{ts,tsx}",
    "./tables/**/*.{ts,tsx}",
    "./forms/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: { 800: "#0A2540", 900: "#061429" },
        gold:     { 400: "#C9A14A", 500: "#A6873A" },
        ink:      "#111111",
        bg:       "#F7F7F5",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Cormorant Garamond'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
