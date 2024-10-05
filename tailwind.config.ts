import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'sans-serif'], // Custom font
    },
    animation: {
      'pulse-animation': 'pulse-animation 3s ease-in-out infinite', // Custom animation
    },
    keyframes: {
      'pulse-animation': {
        '0%, 100%': { transform: 'scale(1) rotate(0deg)' }, // Starting and ending state
        '50%': { transform: 'scale(1.2) rotate(10deg)' },   // Middle of the animation
      },
    },
  },
  plugins: [],
};
export default config;
