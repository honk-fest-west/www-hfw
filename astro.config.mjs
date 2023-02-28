import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import { ViteToml } from 'vite-plugin-toml';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import partytown from '@astrojs/partytown';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
import svelte from '@astrojs/svelte';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://honkfestwest.org',
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    svelte(),
    sitemap(),
    image(),
  ],
  vite: {
    plugins: [yaml(), ViteToml()],
  },
});
