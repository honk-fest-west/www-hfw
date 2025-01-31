import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { parse as parseToml } from "toml";

const nav = defineCollection({
	loader: file("src/data/nav.toml", {parser: (text) => parseToml(text).links }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		link: z.string(),
	}),
});

export const collections = { nav };