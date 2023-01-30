/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: "#43CEA2",
          offwhite: "#CCD6F6",
        },
        secondary: {
          purple: "#9857D3",
          violet: "#2C1250",
        },
        background: "#13005A",
        chip: {
          orange: "#FAAB78",
          purple: "#FF78F0",
          cyan: "#9DF1DF",
        },
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0.78, 0.01, 1, 1) infinite",
      },
    },
  },
  plugins: [],
};
