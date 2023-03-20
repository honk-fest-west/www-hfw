import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import { ViteToml } from 'vite-plugin-toml';

import tailwind from '@astrojs/tailwind';

import image from '@astrojs/image';

import svelte from '@astrojs/svelte';

import sitemap from '@astrojs/sitemap';

const sitemap_filter_urls = [
  'https://honkfestwest.org/donate/thankyou/',
  'https://honkfestwest.org/portal/',
  'https://honkfestwest.org/volunteer/committee-form-success/',
  'https://honkfestwest.org/volunteer/committee-form/',
  'https://honkfestwest.org/volunteer/housing-form/',
  'https://honkfestwest.org/volunteer/new-volunteer-form-success/',
  'https://honkfestwest.org/volunteer/new-volunteer-form/',
];

export default defineConfig({
  site: 'https://honkfestwest.org/',
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    svelte(),
    sitemap({ filter: (url) => !sitemap_filter_urls.includes(url) }),
    image(),
  ],
  vite: {
    plugins: [yaml(), ViteToml()],
  },
});
