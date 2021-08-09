import YAML from 'yaml';

export default async function YamlParser(url) {
  const response = await fetch(url);
  const text = await response.text();
  return YAML.parse(text);
}
