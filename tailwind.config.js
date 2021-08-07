module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    colors: {
      background: '#a0cfc5',
    },
    extend: {
      backgroundImage: (theme) => ({
        rainier:
          'url(https://ik.imagekit.io/thegoldendino/hfw/rainer_hCqk27mKKXa.jpg?updatedAt=1628230166905)',
      }),
    },
  },
};
