/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          dark1: '#0D1117',
          dark2: '#1E2330',
          dark3: '#2A3146',
          dark4: '#343B50',
          accent: '#5993E2',
          text: '#EEF3FB',
          text2: '#D2D4D7',
        },
      },
    },
  },
  plugins: [],
};
