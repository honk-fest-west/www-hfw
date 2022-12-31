import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

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
import react from '@astrojs/react';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    svelte(),
    sitemap(),
    react(),
    image(),
  ],
  vite: {
    plugins: [yaml()],
  },
});
