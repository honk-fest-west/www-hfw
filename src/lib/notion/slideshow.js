import { notion } from './client';
import Notion from '@data/notion.yml';

export const slides = await notion.databases
  .query({
    database_id: Notion.SLIDESHOW,
    filter: {
      property: 'Show',
      checkbox: {
        equals: true,
      },
    },
  })
  .then((response) => group_slideshow(response.results));

function group_slideshow(slideshow) {
  return slideshow.map((slide) => ({
    description: slide.properties['Description']['title'][0]['plain_text'],
    image_url: slide.properties['URL']['url'],
  }));
}
