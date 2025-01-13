import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class", // or 'media' for system preference
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        grace: ["var(--font-covered-by-your-grace)", "cursive", ...fontFamily.sans],
        sans: ["var(--font-inter)", "Arial", "sans-serif",],
        roboto: ["var(--font-roboto)", "Helvetica", "sans-serif"],
        comingSoon: ["var(--font-coming-soon)", "cursive"],
        singleDay: ["var(--font-single-day)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
