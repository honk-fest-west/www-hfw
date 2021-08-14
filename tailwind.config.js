const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    colors: {
      'main-color': {
        DEFAULT: '#202945',
        50: '#8494C6',
        100: '#7385BE',
        200: '#5067AE',
        300: '#40528B',
        400: '#303E68',
        500: '#202945',
        600: '#101422',
        700: '#000000',
        800: '#000000',
        900: '#000000',
      },
      'title-primary-color': '#8494C6',
      'accent-color': '#F57F45',
      'content-container': '#4D546A',
      gray: colors.coolGray,
      white: colors.white,
      transparent: 'transparent',
    },
    extend: {
      backgroundImage: (theme) => ({
        site: 'url(/assets/images/birds-background.png)',
      }),
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif'],
        emphasis: ['Alatsi', 'sans-serif'],
        base: ['Poppins', 'sans-serif'],
      },
    },
  },
};
