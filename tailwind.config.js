/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6ecf3',
          200: '#c1cde0',
          300: '#9aaccb',
          400: '#7390b8',
          500: '#1a365d',  // base color
          600: '#162f52',
          700: '#112745',
          800: '#0d1f39',
          900: '#08172c',
        },
      },
    },
  },
  plugins: [],
};
