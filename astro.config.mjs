// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { ViteToml } from 'vite-plugin-toml';

import svelte from '@astrojs/svelte';


import alpinejs from '@astrojs/alpinejs';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), ViteToml()],
    server: {
      fs: {
        allow: ['..'],
      }
    }
  },

  integrations: [svelte(), alpinejs()],
  image: {
    domains: ['ik.imagekit.io'],
  }
});