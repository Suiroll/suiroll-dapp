/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/view/**/*.jsx"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["aqua"],
  }
}
