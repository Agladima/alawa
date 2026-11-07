import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#ffffff",
        bg2:     "#f2f2ef",
        bg3:     "#e6e6e2",
        surface: "#d6d6d2",
        border:  "#b8b8b3",
        gold:    "#5f5f5b",
        gold2:   "#111111",
        muted:   "#6f6f6a",
        accent:  "#111111",
        ptext:   "#111111",
      },
      fontFamily: {
        head:  ["var(--font-syne)", "sans-serif"],
        body:  ["var(--font-dm-mono)", "monospace"],
        serif: ["var(--font-instrument)", "serif"],
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;
