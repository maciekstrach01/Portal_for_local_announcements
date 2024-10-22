const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            ...colors,
            primary: {
                100: '#F0EFFF',
                200: '#A7A3FF',
                300: '#4D47C3',
                400: '#3E38AD'
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
