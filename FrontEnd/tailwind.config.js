import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "350px", // Define custom breakpoint
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "forest"],
  },
  plugins: [daisyui],
};
