/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        myBg: '#0E0E0E',
        myDark: '#161616',
        myRed: '#E81C5A',
        myTextDark: '#4D4D4D',
        myLightDark: '#1C1C1C',
        myLightDark2: '#2A2A2A',
        myGreen: '#029757',
        myGray: '#808080'
        
      },
      width: {
        '1240': '1240px',
        '300': '300px',
        '142': '142px',
        '256': '256px',
        '279': '279px',
        '436': '436px',
        '400': '400px',
        '159': '159px',
        '200': '200px',
        '222': '222px',
        '295': '295px',
        '505': '505px',
        '620': '620px',
        '870': '870px',
        '270': '270px',
      },
      height: {
        '200': '200px',
        '159': '159px',
        '76': '76px',
        '220': '220px',
        '': '',
      },
      margin: {
        '470': '470px',
        '540': '540px',
        '135': '135px',
        '450': '450px',
      },
      inset: {
        '580': '580px',
      },
    },
  },
  plugins: [],
}