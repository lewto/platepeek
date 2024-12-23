/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          primary: 'var(--theme-primary)',
          secondary: 'var(--theme-secondary)',
          accent: 'var(--theme-accent)',
          background: 'var(--theme-background)',
          surface: 'var(--theme-surface)',
          text: 'var(--theme-text)',
          border: 'var(--theme-border)',
        }
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        price: 'var(--font-price)',
      }
    },
  },
  plugins: [],
};