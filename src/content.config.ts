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

const openPositions = defineCollection({
	loader: file("src/data/positions.toml", {parser: (text) => parseToml(text).open }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = { nav, openPositions };