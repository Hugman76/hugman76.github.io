/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      "pattern": /^grid-cols-/
    }
  ],
  theme: {
    extend: {},
  },
  plugins: []
}
