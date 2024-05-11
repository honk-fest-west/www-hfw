# Festival App

The festival app displays each day's stage map and schedule. Also lists the bands playing per day.

## Archetecture
[Sveltejs](https://svelte.dev/) application build as a [SPA (single-page-application)](https://github.com/ItalyPaleAle/svelte-spa-router).

## Data

- [Bands](../../data/bands.toml)
- [Stages](../../data/stages.toml)
- [Schedule](../../data/schedule.toml)

## Pages

- Map [Page]
- Stage Schedule [Page]
- Band List [Page]
- Band [Page]


## Machines

The behavior of this application is described in an [xstate machine](https://stately.ai/docs/category/xstate). Located in the `./machines` directory.


