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
        primary: "#526FB0",
        bg_primary: "#5270b02d",
      },
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      
    },
  },
  plugins: [
    // require('daisyui')
  ],
};
