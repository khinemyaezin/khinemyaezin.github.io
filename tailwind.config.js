/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#89f7fe',
        secondary: '#66a6ff',
        black: '#161616',
        dark: '#000000',
        background: '#161616',
      },
      fontFamily: {
        primary: ['"Ubuntu Mono"', 'monospace'],
        hero: ['"Reenie Beanie"', 'sans-serif'],
        title: ['"Delicious Handrawn"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'text-reveal': 'textReveal 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        textReveal: {
          '0%': { transform: 'translateY(110%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
