const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,astro,js,jsx,ts,tsx,vue,svelte}",
    require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Josefin Sans", "sans-serif"],
        emphasis: ["Alatsi", "sans-serif"],
        base: ["Poppins", "sans-serif"],
      },
      colors: {
        aqua: "var(--colors-aqua)",
        background: "var(--colors-site-background)",
        content_background: "var(--colors-content-background)",
        content_text: "var(--colors-content-text)",
        content_border: "var(--colors-content-border)",
        content_link: "var(--colors-content-link)",
        title_border: "var(--colors-title-border)",
        pink: "var(--colors-pink)",
        "pink-lt": "var(--colors-pink-lt)",
        navy: "var(--colors-navy)",
        cobalt: "var(--colors-cobalt)",
        gray: colors.gray,
        transparent: colors.transparent,
      },
    },
  },
  plugins: [
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
};
