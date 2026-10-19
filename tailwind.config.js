/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        primary: '#89f7fe',
        secondary: '#66a6ff',
        black: '#161616',
        dark: '#000000',
        background: '#161616',
        white: '#fff',
        gray: {
          100: '#f8f9fa',
          300: '#dee2e6',
          500: '#adb5bd',
          600: '#6c757d',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['"Ubuntu Mono"', 'monospace'],
        primary: ['"Ubuntu Mono"', 'monospace'],
        hero: ['"Reenie Beanie"', 'sans-serif'],
        title: ['"Delicious Handrawn"', 'sans-serif'],
      },
      fontSize: {
        sm: ['0.875rem', 'normal'],
        h4: ['calc(1.275rem + .3vw)', 'normal'],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'gradient-bg': 'gradientBG 5s ease infinite',
        'icon-bounce': 'iconBounce 0.5s ease',
        'shrink-jump': 'shrinkjump 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientBG: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        iconBounce: {
          '0%, 100%': { transform: 'translateY(-50%) scale(1)' },
          '50%': { transform: 'translateY(-50%) scale(1.3)' },
        },
        shrinkjump: {
          '10%, 35%': { transform: 'scale(2, 0.2) translate(0, 0)' },
          '45%, 50%': { transform: 'scale(1) translate(0, -50px)' },
          '80%': { transform: 'scale(1) translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
