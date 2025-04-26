/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',  // your vibrant green
        secondary: '#facc15', // a nice pastel yellow
        accent: '#fb923c',    // a soft orange
        muted: '#94a3b8',     // a nice muted blue-gray
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
