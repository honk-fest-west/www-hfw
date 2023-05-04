<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { blur } from 'svelte/transition';

  export let stages: Stage[];
  export let imageMetadata: ImageMetadata;

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };
</script>

<div class="w-full h-full overflow-auto grid place-content-center relative">
  {#key imageMetadata}
    <img
      src={imageMetadata.src}
      width={imageMetadata.width}
      height={imageMetadata.height}
      alt="festival map"
      transition:blur={{
        opacity: 100,
        duration: 200,
        easing: cubicOut,
        amount: '1rem',
      }}
      class="absolute scale-150"
    />
  {/key}
  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 600"
    aria-labelledby="title"
    role="img"
  >
    <title>Festival Stages Map</title>
    {#each stages as stage (stage.key)}
      <g
        data-testid={`stage-location-${stage.key}`}
        on:click={() => selectStage(stage.key)}
        on:keyup={() => selectStage(stage.key)}
        tabindex="0"
        role="button"
        aria-label="{stage.name} Stage"
        style="cursor:pointer;"
      >
        Add your SVG shapes for each stage location here
        <circle cx={stage.x} cy={stage.y} r="30" fill="#999" />
        <text
          x={stage.x}
          y={stage.y}
          text-anchor="middle"
          dy=".3em"
          font-size="14"
        >
          {stage.name}
        </text>
      </g>
    {/each}
  </svg> -->
</div>

<!-- <style>
  .stack {
    display: grid;
    touch-action: none;
  }
  .stack > * {
    grid-area: 1 / 1;
  }
</style> -->
