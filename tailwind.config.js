/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#121212',
        'brand-card': '#1e1e1e',
        'brand-red': '#e50914',
        'brand-red-hover': '#b80710',
        'brand-blue': '#007bc7',
      }
    },
  },
  plugins: [],
}