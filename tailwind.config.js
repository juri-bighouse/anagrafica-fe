/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(82.8% 0.111 230.318)",
        primaryText: "oklch(20% 0.1 250)",
      },
    },
  },
  plugins: [],
};
