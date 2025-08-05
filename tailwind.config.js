/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#2d5a8e",
        accent: "#4a9d4b",
        surface: "#f8f9fa",
        success: "#4a9d4b",
        warning: "#f39c12",
        error: "#e74c3c",
        info: "#3498db"
      },
      fontFamily: {
        display: ["DM Sans", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}