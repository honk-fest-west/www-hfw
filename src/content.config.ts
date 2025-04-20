import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parse as parseToml } from "toml";

const nav = defineCollection({
	loader: file("src/data/nav.toml", { parser: (text) => parseToml(text).links }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		link: z.string(),
	}),
});

const social = defineCollection({
	loader: file("src/data/media.toml", { parser: (text) => parseToml(text).social }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		url: z.string(),
	}),
});

const openPositions = defineCollection({
	loader: file("src/data/positions.toml", { parser: (text) => parseToml(text).open }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
	}),
});

const supportersSchema = z.object({
	id: z.string(),
	type: z.enum(["art", "grant", "shoutout", "footer-only"]),
	name: z.string(),
	footer: z.boolean().default(false),
	url: z.string().url(),
	image_url: z.string().url(),
	width: z.number(),
	height: z.number(),
});

const supporters = defineCollection({
	loader: file("src/data/supporters.toml", { parser: (text) => parseToml(text).supporters }),
	schema: supportersSchema,
});

const media = defineCollection({
	loader: file("src/data/media.toml", { parser: (text) => parseToml(text).media }),
	schema: z.object({
		id: z.string(),
		year: z.number(),
		name: z.string(),
		type: z.enum(["photos", "video"]),
		url: z.string().url(),
	}),
});

const slideshow = defineCollection({
	loader: file("src/data/slideshow.toml", { parser: (text) => parseToml(text).slides }),
	schema: z.object({
		id: z.string(),
		description: z.string(),
		image_url: z.string().url(),
	}),
});

const posts = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "posts" }),
});

export const collections = { nav, social, openPositions, supporters, media, slideshow, posts };