const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            ...colors,
            primary: {
                50: '#F0EFFF',
                200: '#A7A3FF',
                500: '#4D47C3',
                600: '#37329a'
            }
        },
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            }
        }
    },
    plugins: []
};
