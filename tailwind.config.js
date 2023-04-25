/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
    colors: {
      dgr: "#149487",
      lgr: "#48B9B0",
      db: "#727070",
      mb: "#919191",
      lb: "#B3B2B2",
      d: "#1E1E1E",
      dye: "#C88A3E",
      lye: "#E1B67E",
      l: "#F6F6F6",
    },
  },
  plugins: [],
};
