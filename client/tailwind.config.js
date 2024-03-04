// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // Enable dark mode by adding this line
  plugins: [
    require("@tailwindcss/line-clamp"),
    // Add other Tailwind CSS plugins here using import
  ],
};
