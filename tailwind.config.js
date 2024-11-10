/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          'secondary-foreground': 'var(--color-secondary-foreground)',
          accent: 'var(--color-accent)',
          neutral: 'var(--color-neutral)',
          tertiary: 'var(--color-tertiary)',
        }
      }
    },
  },
  plugins: [],
} 