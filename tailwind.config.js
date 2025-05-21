/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
      },
      animation: {
        'shine-slow': 'shine 8s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
          '50%': { transform: 'translateX(100%) rotate(-45deg)' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)' },
        },
      },
    },
  },
  plugins: [],
}

