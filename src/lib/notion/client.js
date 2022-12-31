import { Client } from '@notionhq/client';

// Initializing a client
export const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});
