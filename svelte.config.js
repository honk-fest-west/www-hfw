import { vitePreprocess } from '@astrojs/svelte';

export default {
	preprocess: vitePreprocess({
		rollupOptions: {
			external: ['sharp'],
		},
	}),
};
