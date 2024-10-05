/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode class
  content: ["./src/**/*.{html,js}"],
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
}

