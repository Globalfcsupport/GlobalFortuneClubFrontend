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
        
        secondary:"#ededed",
        textColour:"#6a6868",
        blueColor:"#3b5998",
        buttonbg:"#415799",
        customgey:"#9a9a9a",
        customGray: 'rgb(158, 158, 158)',
        customLightGray :"#ededed",
        customBlue : "#3D5898"

      },
      // fontFamily: {
      //   poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      //   customArial: ['CustomArial', 'Arial', 'sans-serif'],
      //   customRoborto:['CustomRoberto', 'Roboto'],
      //   inter:['inter']
        
      // },
      fontSize: {
        xss: '10px'
      },
      fontWeight: {
        'extra-bold': '800',
        'super-bold': '900',
        'light-bold': '600'
      }
      
    },
  },
  plugins: [
    // require('daisyui')
  ],
};
