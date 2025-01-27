/* eslint-disable import/no-anonymous-default-export */
const flowbite = require("flowbite-react/tailwind")
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1050px",
      xl: "1280px",
      xxl: "1536px",
      xxxl: "2000px",
    },
    fontFamily: {
      customFont: ["monserrat"],
    },
    extend: {
      colors: {
        azulads: "#005aa9",
        azuloscuroads: "#404d6a",
      },
    },
  },
  plugins: [flowbite.plugin()],
}
