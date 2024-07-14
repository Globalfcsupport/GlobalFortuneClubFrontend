/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs:'500px'
      },
      colors: {
        primary: "#3B5998",
        secondary:"#e1dfdf",
        textColour:"#6a6868"
      },
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xss: '10px'
      }
    },
  },
  plugins: [
    // require('daisyui')
  ],
};
