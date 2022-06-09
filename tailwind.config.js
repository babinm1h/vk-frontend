module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryBlue': "#5181b8",
        'myGray': "rgb(129, 140, 153)"
      },
      boxShadow: {
        'blackSm': '0 1px 3px 0px rgba(0, 0, 0, 0.4)',
        'bigShadow': '0 3px 8px 0px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
}