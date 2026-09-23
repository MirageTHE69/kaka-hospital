import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        radiograph: { DEFAULT: "#0F2A3F", 800: "#153650", 700: "#1C4462" },
        film: { DEFAULT: "#CFE3EE", 50: "#EEF5F9", 100: "#E2EEF4" },
        clinic: "#FBFCFD",
        ward: { DEFAULT: "#2E7D6B", 600: "#276B5B", 700: "#20594C", 50: "#EAF4F1" },
        signal: { DEFAULT: "#D62839", 600: "#B81F2F", 50: "#FDECEE" },
        slate: { ...colors.slate, DEFAULT: "#334155" },
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["17px", { lineHeight: "1.65" }],
        "body-lg": ["18px", { lineHeight: "1.65" }],
      },
      borderRadius: {
        lightbox: "20px",
        card: "12px",
        input: "10px",
      },
      maxWidth: {
        site: "1200px",
        prose: "70ch",
        read: "68ch",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
