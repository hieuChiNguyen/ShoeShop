/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './app/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //   'gradient-conic':
            //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
            fontSize: {
                10: '10px',
                12: '12px',
                13: '13px',
                14: '14px',
                15: '15px',
                16: '16px',
                18: '18px',
                20: '20px',
                22: '22px'
            },
            width: {
                300: '300px',
                400: '400px',
                500: '500px',
                600: '600px',
                700: '700px',
                800: '800px',
                850: '850px',
                900: '900px'
            },
            height: {
                300: '300px',
                350: '350px',
                400: '400px',
                440: '440px',
                450: '450px',
                500: '500px',
                600: '600px',
                700: '700px',
                800: '800px',
                850: '850px',
                900: '900px'
            },
            gap: {
                18: '72px',
                20: '80px',
                22: '88px'
            },
            scale: {
                110: '1.1',
                120: '1.2'
            },
            borderWidth: {
                default: '1px'
            },
            borderWidth: ['focus-within'],
            borderColor: {
                default: '#ccc'
            },
            ringWidth: ['focus'],
            ringColor: ['focus'],
            backgroundColor: ['focus'],
            keyframes: {
                appearDown: {
                    '0%': { transform: 'translateY(-50%)' },
                    '50%': { transform: 'translateY(0%)' }
                }
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'spin-delay': 'spin 12s linear infinite -6s',
                appearDown: 'appearDown 1s linear'
            }
        },
        screens: {
            // Mobile
            mb: { min: '320px', max: '500px' },
            // => @media (min-width: 640px and max-width: 767px) { ... }

            // Tablet
            tl: { min: '768px', max: '1023px' },
            // => @media (min-width: 768px and max-width: 1023px) { ... }

            // Laptop
            lt: { min: '1024px' }
            // => @media (min-width: 1024px and max-width: 1279px) { ... }
        }
    },

    plugins: []
}
