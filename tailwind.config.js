/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./renderer/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#593FD8",
        darkBlue: "#352C48",
        lightGray: "#E7EFF1",
        lightGreen: "#55FBDC",
        lightRed: "#FF3D83"
      },
      maxHeight: {
        '3/5': '60%', 
      },
    },
  },
  plugins: [],
}

