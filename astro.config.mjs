// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { ViteToml } from 'vite-plugin-toml';

import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), ViteToml()],
  },

  integrations: [svelte()],
});