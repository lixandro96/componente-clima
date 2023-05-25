/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./js/app.js","index.html"],
  theme: {
    extend: {
      colors:{
        'card-color': 'rgb(167,75,199)',
        'submit-bgc': 'rgb(110,219,76)',
        'card-color-m': 'rgb(133,19,176)',
      }
    },
  },
  plugins: [],
}