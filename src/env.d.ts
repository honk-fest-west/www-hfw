/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface Nav {
  links: Array<NavLink>;
}

export interface NavLink {
  name: string;
  link: string;
}

export interface Social {
  links: { [key: string]: string };
}

export interface Supporters {
  art: Array<Supporter>;
  grant: Array<Supporter>;
  shout_out: Array<Supporter>;
}

export interface Supporter {
  name: string;
  footer: boolean;
  url: string;
  image_url: string;
  width: number;
  height: number;
}

declare module "*.toml" {
  const value: unknown;
  export default value;
}
