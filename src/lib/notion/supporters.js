import { notion } from './client';
import Notion from '@data/notion.yml';

export const supporters = await notion.databases
  .query({
    database_id: Notion.SUPPORTERS,
    filter: {
      property: 'Show',
      checkbox: {
        equals: true,
      },
    },
  })
  .then((response) => group_supporters(response.results));

export function supporter_by_name(name) {
  return supporters.find((supporter) => supporter.name === name);
}

export function supporters_by_type(type) {
  return supporters.filter((supporter) => supporter.type === type);
}

export const footer_supporters = supporters.filter(
  (supporter) => supporter.footer
);

function group_supporters(supporters) {
  return supporters.map((supporter) => ({
    name: supporter.properties['Name']['title'][0]['plain_text'],
    type: supporter.properties['Type']['select']['name'],
    footer: supporter.properties['Footer']['checkbox'],
    url: supporter.properties['URL']['url'],
    image_url: supporter.properties['Image URL']['url'],
    image_ratio: supporter.properties['Image Ratio'].rich_text[0].plain_text,
  }));
}
