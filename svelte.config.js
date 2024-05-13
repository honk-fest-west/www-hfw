import { vitePreprocess } from '@astrojs/svelte';

export default {
	preprocess: vitePreprocess({
		build: {
			rollupOptions: {
				external: ['sharp'],
			}
		}
	}),
};
