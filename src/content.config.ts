import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { parse as parseToml } from "toml";
import { boolean } from 'astro:schema';

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

const supportersSchema = z.object({
	id: z.string(),
	name: z.string(),
	footer: z.boolean().default(false),
	url: z.string().url(),
	image_url: z.string().url(),
	width: z.number(),
	height: z.number(),
});

const artSupporters = defineCollection({
	loader: file("src/data/supporters.toml", {parser: (text) => parseToml(text).art }),
	schema: supportersSchema,
});

const grantSupporters = defineCollection({
	loader: file("src/data/supporters.toml", {parser: (text) => parseToml(text).grant }),
	schema: supportersSchema,
});

const shoutoutSupporters = defineCollection({
	loader: file("src/data/supporters.toml", {parser: (text) => parseToml(text).shout_out }),
	schema: supportersSchema,
});

const media = defineCollection({
	loader: file("src/data/media.toml", {parser: (text) => parseToml(text).media }),
	schema: z.object({
		id: z.string(),
		year: z.number(),
		name: z.string(),
		type: z.enum(["photos", "video"]),
		url: z.string().url(),
	}),
});

export const collections = { nav, openPositions, artSupporters, grantSupporters, shoutoutSupporters, media };