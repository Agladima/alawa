import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#0c0c0c",
        bg2:     "#111111",
        bg3:     "#181818",
        surface: "#1e1e1e",
        border:  "#2a2a2a",
        gold:    "#c9a84c",
        gold2:   "#e8c97a",
        muted:   "#6b6560",
        accent:  "#ff5c3a",
        ptext:   "#e8e2d9",
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
