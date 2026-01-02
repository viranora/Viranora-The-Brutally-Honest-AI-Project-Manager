/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'v-matte': '#1A1A1A',     // Arka plan
        'v-card': '#242424',      // Kartlar
        'v-accent': '#D4A373',    // Nostaljik deri tonu
        'v-paper': '#E8D5C4',     // Yazı ve softluk rengi
      },
    },
  },
  plugins: [],
};