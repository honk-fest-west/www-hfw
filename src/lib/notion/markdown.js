import { marked } from 'marked';

export function format_rich(rich_text) {
  return marked.parse(rich_text.map(apply_markdown).join(''));
}

function apply_markdown(rich_text) {
  const text = rich_text.plain_text;
  const href = rich_text.href;

  if (rich_text.annotations.bold) {
    return `**${rich_link(href, text)}**`;
  } else if (rich_text.annotations.italic) {
    return `*${rich_link(href, text)}*`;
  } else if (rich_text.annotations.strikethrough) {
    return `~~${rich_link(href, text)}~~`;
  } else if (rich_text.annotations.underline) {
    return `<u>${rich_link(href, text)}</u>`;
  } else if (rich_text.annotations.code) {
    return `\`${rich_link(href, text)}\``;
  } else {
    return rich_link(href, text);
  }
}

function rich_link(href, text) {
  if (href) {
    return `<a href="${text}">${text}</a>`;
  } else {
    return text;
  }
}
