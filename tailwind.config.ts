import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        null: {
          black: "#121212",
          surface: "#1E1E1E",
          card: "#242424",
          border: "#333333",
          text: "#FCFCFC",
          muted: "#D4D4D4",
          amber: "#F59E0B"
        }
      },
      fontFamily: {
        sans: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "SFMono-Regular",
          "ui-monospace",
          "monospace"
        ]
      },
      boxShadow: {
        amber: "0 0 36px rgba(245, 158, 11, 0.18)"
      },
      backgroundImage: {
        scanline:
          "linear-gradient(rgba(245,158,11,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
