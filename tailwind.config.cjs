/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        segoeui: ['Segoe UI'],
        consolas: ['Consolas'],
      },
      transitionProperty: {
        width: 'width',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right,rgb(148 163 184/0.4),rgb(148 163 184/0))',
        'light-gradient': 'linear-gradient(to bottom right,rgb(71 85 105/0.4), rgb(71 85 105/0))',
      },
    },
  },
  plugins: [],
};
