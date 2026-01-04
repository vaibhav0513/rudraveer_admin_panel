/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1F1D",
        coral: "#FF5E3A",
        coralHover:"#e14f2e",
        mint: "#A3F7BF",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
       fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
