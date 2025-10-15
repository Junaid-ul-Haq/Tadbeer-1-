/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#8FC241", // NGO Green 1
        secondary: "#90C241", // NGO Green 2
        accent: "#18BAD6", // Humanitarian Blue
        text: "#E5E5E5", // Light text for dark theme
        background: "#0D0D0D", // Deep black background
        surface: "#1A1A1A", // Card or container surfaces
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        glow: "0 0 10px rgba(143, 194, 65, 0.3)",
      },
      spacing: {
        6: "1.5rem",
        12: "3rem",
        16: "4rem",
      },
    },
  },
  plugins: [],
};
