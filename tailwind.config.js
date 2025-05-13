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
        shine: 'shine 3s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%, 100%': { transform: 'translateX(-100%) skewX(-45deg)' },
          '50%': { transform: 'translateX(100%) skewX(-45deg)' },
        }
      },
    },
  },
  plugins: [],
}

