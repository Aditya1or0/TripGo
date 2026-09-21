/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1D70B8",
          cyan: "#0284C7",
          teal: "#14B8A6",
          dark: "#070E1A",
          navy: "#0C1E38",
        },
      },
    },
  },
  plugins: [],
};
