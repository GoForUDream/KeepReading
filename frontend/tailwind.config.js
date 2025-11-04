/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // EB Garamond - Classic bookstore typography
        // Used throughout the entire app for that elegant, old-world bookstore feel
        sans: ['"EB Garamond"', 'serif'],
        serif: ['"EB Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Ant Design
  },
}
