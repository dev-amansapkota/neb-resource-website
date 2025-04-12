/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './pages/**/*.{js,ts,jsx,tsx}', 
  ],

  theme: {
    extend: {
      colors: {
        primary: '#8a2387',
        secondary: '#e94057',
        accent: '#f27121',
      },
      animation: {
        'gradient-rotate': 'gradient-rotate 10s linear infinite', 
        'gradient-border': 'gradient-border 3s ease infinite',
      },
      
      keyframes: {
        'gradient-border': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        'gradient-rotate': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
    },
  },

  plugins: [],
};
