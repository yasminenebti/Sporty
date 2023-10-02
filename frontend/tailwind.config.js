/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {},
    colors : {
      primary : "#5F7161",
      secondary: "#6D8B74",
      tertiary : "#C8DBBE",
      grey : "#EDE4E0",
      yellow : "#EFEAD8",
      fog : "#D0C9C0",
      smoky:"#404245",
      brown : "#373331",
      white : "#FFFFFF",
      blue : "#084177",
      red : "#D25959"

    }
  },
  plugins: [],
}

