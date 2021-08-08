const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    colors: {
      'main-color': {
        DEFAULT: '#5CAD9C',
        50: '#F5FAF9',
        100: '#E4F1EE',
        200: '#C2E0DA',
        300: '#A0CFC5',
        400: '#7EBEB1',
        500: '#5CAD9C',
        600: '#488E80',
        700: '#376C61',
        800: '#254B43',
        900: '#142924',
      },
      'title-primary-color': '#489ca7',
      'title-secondary-color': '#6c757d',
      'accent-color': '#dc5849',
      gray: colors.trueGray,
      white: colors.white,
    },
    extend: {
      backgroundImage: (theme) => ({
        rainier:
          'url(https://ik.imagekit.io/thegoldendino/hfw/rainer_hCqk27mKKXa.jpg?updatedAt=1628230166905)',
      }),
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif'],
        emphasis: ['Teko', 'sans-serif'],
        base: ['Poppins', 'sans-serif'],
      },
    },
  },
};
