/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#038437',
        'secondary': '#04918D'
      },
      fontFamily: {
        'sans': ['Kanit', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
