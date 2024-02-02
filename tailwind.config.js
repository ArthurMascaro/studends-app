/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./renderer/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#593FD8",
        darkBlue: "#00007F",
        lightGray: "#E7EFF1",
        lightGreen: "#55FBDC",
        lightRed: "#D81CB3"
      },
      maxHeight: {
        '3/5': '60%', 
      },
    },
  },
  plugins: [],
}

