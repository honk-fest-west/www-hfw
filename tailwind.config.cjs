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
        content_title: "var(--colors-content-title)",
        content_background: "var(--colors-content-background)",
        content_text: "var(--colors-content-text)",
        content_border: "var(--colors-content-border)",
        content_link: "var(--colors-content-link)",
        content_btt: "var(--colors-content-btt)",
        title_border: "var(--colors-title-border)",
        nav_text: "var(--colors-nav-text)",
        nav_background: "var(--colors-nav-background)",
        nav_ring: "var(--colors-nav-ring)",
        nav_active_text: "var(--colors-nav-active-text)",
        nav_active_background: "var(--colors-nav-active-background)",
        nav_active_ring: "var(--colors-nav-active-ring)",
        accent: "var(--colors-accent)",
        "accent-lt": "var(--colors-accent-lt)",


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
