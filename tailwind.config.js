/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      "pattern": /^grid-cols-/
    },
    "animate-pulse"
  ],
  theme: {
    extend: {},
  },
  plugins: []
}
