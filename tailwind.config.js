const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        'main-color': {
          DEFAULT: 'var(--main-color)',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F8F2DD',
          300: '#F2E5BB',
          400: '#EBD899',
          500: 'var(--main-color)',
          600: '#DBB948',
          700: '#C4A027',
          800: '#957A1E',
          900: '#665314',
        },
        'title-primary-color': '#F1AA00',
        'accent-color': '#962C2B',
        'content-container': '#4D546A',
      },
      backgroundImage: (theme) => ({
        site: 'url(https://ik.imagekit.io/thegoldendino/hfw/shatter-background_1__yeFkQzR5s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1648439951103)',
      }),
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif'],
        emphasis: ['Alatsi', 'sans-serif'],
        base: ['Poppins', 'sans-serif'],
      },
    },
  },
};
