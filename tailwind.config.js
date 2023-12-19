/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["manrope", "system-ui"],
      serif: ["Arapey", "serif"],
    },
    colors: {
      dark: "#323232",
      light: "#4F5561",
      dark_red: "#260303",
      red: "#400606",
      red500: "#EF4444",
      off_white: "#F2F2F2",
      white: "#FFFFFF",
      gray: "#999999",
      gray500: "#6B7280",
      dark_gray: "#444444",
      green: "rgb(20 83 45)",
      green500: "#059669",
      blue: "#60a5fa",
      blue500: "#3B82F6",
      yellow: "#fbbf24",
    },
    borderRadius: {
      full: "999px",
      rsm: "5px",
      rmd: "10px",
      rlg: "15px",
    },
    backgroundImage: {},
  },
  plugins: [import("flowbite/plugin")],
};
