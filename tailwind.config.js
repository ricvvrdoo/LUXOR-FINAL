/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          500: '#FDB813', // Custom gold color
        },
      },
    },
  },
  plugins: [],
};