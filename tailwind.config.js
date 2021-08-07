module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    colors: {
      'background-color': '#a0cfc5',
      'nav-color': '#3f746c',
    },
    extend: {
      backgroundImage: (theme) => ({
        rainier:
          'url(https://ik.imagekit.io/thegoldendino/hfw/rainer_hCqk27mKKXa.jpg?updatedAt=1628230166905)',
      }),
      fontFamily: {
        title: ['Josefin Sans', 'sans-serif'],
      },
    },
  },
};
