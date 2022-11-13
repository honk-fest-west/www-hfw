const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    colors: {
      aqua: 'var(--colors-aqua)',
      pink: 'var(--colors-pink)',
      'pink-lt': 'var(--colors-pink-lt)',
      navy: 'var(--colors-navy)',
      cobalt: 'var(--colors-cobalt)',
      gray: colors.gray,
      transparent: colors.transparent,
    },
    extend: {
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif'],
        emphasis: ['Alatsi', 'sans-serif'],
        base: ['Poppins', 'sans-serif'],
      },
    },
  },
};
