/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        theme:{
          100:'#7c7287',
          200:'#b2edc5',
          300:'#c1fff2',
          400:'#00ffc9'
        }
      }
    },
  },
  plugins: [],
}

