/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary color - deep blue
        primary: {
          50: '#eef0ff',
          100: '#dfe2ff',
          200: '#c4c9ff',
          300: '#a2a7ff',
          400: '#8183ff',
          500: '#6366f1', // Original primary
          600: '#4f46e5', // Original primary
          700: '#35367E', // New brand color - deep blue
          800: '#2e2f6a',
          900: '#232455',
          950: '#121230',
        },
        // Brand secondary color
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // Dark mode colors
        dark: {
          100: '#d1d1d1', // Lightest text in dark mode
          200: '#a3a3a3', // Light text in dark mode
          300: '#636363', // Muted text in dark mode
          400: '#474747', // Border colors in dark mode
          500: '#2E2E2E', // New brand color - dark gray (cards, sections)
          600: '#262626', // Slightly darker than 500
          700: '#1e1e1e', // Original darkCard
          800: '#171717', // Dark surfaces
          900: '#121212', // Original darkBg (background)
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}