/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            },
            colors: {
                primary: {
                    50: '#F0EFFF',
                    200: '#A7A3FF',
                    500: '#4D47C3',
                    600: '#37329a'
                }
            },
            spacing: {
                128: '32rem'
            }
        }
    },
    plugins: []
};
