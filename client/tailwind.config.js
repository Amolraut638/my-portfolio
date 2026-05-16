/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0F19",
        darkCard: "#111827",
        primary: "#6366F1",
        accent: "#8B5CF6",
        lightText: "#E5E7EB",
        mutedText: "#9CA3AF",
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.5)",
      }
    },
  },
  plugins: [],
}