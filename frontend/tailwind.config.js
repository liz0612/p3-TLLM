module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF9800',
        accent: '#9C27B0',
      },
      fontFamily: {
        handjet: ['Handjet', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
  plugins: [],
}