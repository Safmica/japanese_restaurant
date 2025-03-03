import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backdropBlur: {
        sm: '4px',
      },
      fontFamily: {
        toragon: ["Toragon", "sans-serif"],
        jansina: ["Jansina", "sans-serif"],
        olivera: ["Olivera", "sans-serif"],
        bankai: ["Bankai", "sans-serif"],
        zyukiharu: ["Zyukiharu", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;