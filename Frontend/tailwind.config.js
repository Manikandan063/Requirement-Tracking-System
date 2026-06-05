/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#0F172A',
        primary: '#F97316',
        hover: '#EA580C',
        background: '#FFF7ED',
        card: '#FFFFFF',
        accent: '#FB923C'
      }
    },
  },
  plugins: [],
}
