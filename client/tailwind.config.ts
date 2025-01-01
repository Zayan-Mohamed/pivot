import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class", // Enable dark mode using the `class` strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
          700: "#374151",
          800: "#1f2937",
        },
        green: {
          200: "#A7F3D0",
          400: "#34D399",
          500: "#10B981",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "green-primary": "#10B981",
        "stroke-dark": "#2d3135",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin", // Applies to Firefox
        },
        ".scrollbar-thumb-rounded": {
          "&::-webkit-scrollbar-thumb": {
            "border-radius": "9999px",
          },
        },
        ".scrollbar-thumb-green-400": {
          "&::-webkit-scrollbar-thumb": {
            background: "#34D399", // Light mode thumb color (Green 400)
          },
        },
        ".scrollbar-track-green-200": {
          "&::-webkit-scrollbar-track": {
            background: "#A7F3D0", // Light mode track color (Green 200)
          },
        },
        ".dark\\:scrollbar-thumb-green-500": {
          "&::-webkit-scrollbar-thumb": {
            background: "#10B981", // Dark mode thumb color (Green 500)
          },
        },
        ".dark\\:scrollbar-track-green-400": {
          "&::-webkit-scrollbar-track": {
            background: "#34D399", // Dark mode track color (Green 400)
          },
        },
      });
    }),
  ],
};

export default config;
