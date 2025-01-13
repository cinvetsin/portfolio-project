import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class", // Enable dark mode based on a CSS class
  content: ["./src/**/*.tsx"], // Define paths to your components for Tailwind to scan
  theme: {
    extend: {
      fontFamily: {
        grace: ["var(--font-covered-by-your-grace)", "cursive", ...fontFamily.sans],
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        roboto: ["var(--font-roboto)", "Helvetica", "sans-serif"],
        comingSoon: ["var(--font-coming-soon)", "cursive"],
        singleDay: ["var(--font-single-day)", "cursive"],
      },
      spacing: {
        // Custom spacings for fine-tuned alignment
        'timeline-left': '-1rem', // Adjust timeline icon position
        'timeline-line': '4rem', // Distance for timeline line
      },
      screens: {
        // Responsive breakpoints for timeline
        sm: "640px", // Small screens and up
        md: "768px", // Medium screens and up
      },
      colors: {
        // Add custom color shades if needed
        blue: {
          100: "#EBF8FF",
          300: "#90CDF4",
          500: "#4299E1",
          700: "#2B6CB0",
          900: "#1A365D",
        },
        gray: {
          100: "#F7FAFC",
          300: "#E2E8F0",
          500: "#A0AEC0",
          700: "#4A5568",
          900: "#1A202C",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
