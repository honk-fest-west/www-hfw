import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import { ViteToml } from "vite-plugin-toml";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
const sitemap_filter_urls = [
  "https://honkfestwest.org/donate/thankyou/",
  "https://honkfestwest.org/portal/",
  "https://honkfestwest.org/volunteer/committee-form-success/",
  "https://honkfestwest.org/volunteer/committee-form/",
  "https://honkfestwest.org/volunteer/housing-form/",
  "https://honkfestwest.org/volunteer/new-volunteer-form-success/",
  "https://honkfestwest.org/volunteer/new-volunteer-form/",
];

// https://astro.build/config
export default defineConfig({
  site: "https://honkfestwest.org/",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap({
      filter: (url) => !sitemap_filter_urls.includes(url),
    }),
    svelte(),
  ],
  vite: {
    plugins: [yaml(), ViteToml()],
  },
  image: {
    domains: ["ik.imagekit.io"],
  },
});
