/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        segoeui: ['Segoe UI, sans-serif'],
        consolas: ['Consolas, monospace'],
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
