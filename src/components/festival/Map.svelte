<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { blur } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let stages: Stage[];
  export let imageMetadata: ImageMetadata;

  let mapImgEl: HTMLImageElement;
  let mapImgWidth: number;
  let mapImgHeight: number;
  let stagePinEl: HTMLSpanElement[] = Array<HTMLSpanElement>(stages.length);

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };

  function setPinCoordinates(
    mapEl: HTMLElement,
    pinEls: HTMLElement[],
    mapImgWidth: number,
    mapImgHeight: number,
    stages: Stage[]
  ) {
    if (
      !(
        mapEl &&
        pinEls?.length &&
        mapImgWidth &&
        mapImgHeight &&
        stages?.length
      )
    ) {
      return;
    }

    const rectPin = {
      left: 950.0,
      top: 835.0,
      height: 12.0,
      width: 12.0,
    };

    const map = {
      width: 1350.0,
      height: 1800.0,
    };

    // Get the bounding client rect of element A and B

    const rectMap = mapEl.getBoundingClientRect();

    const widthQ = (rectMap.width * 1.0) / map.width;
    const mapWidth = rectMap.width;

    const heightQ = (rectMap.height * 1.0) / map.height;
    const mapHeight = rectMap.height;

    // Calculate the parent element center coordinates
    const parentCenterX = mapWidth / 2.0;
    const parentCenterY = mapHeight / 2.0;

    stages.forEach((stage, idx) => {
      // Calculate the relative position of the Pin to the center of the Map
      const relativeX = (stage.x - map.width / 2.0) * widthQ;
      const relativeY = (stage.y - map.height / 2.0) * heightQ;

      // Calculate the top and left coordinates for the absolutely positioned Pin
      const left = parentCenterX + relativeX;
      const top = parentCenterY + relativeY;

      const pinEl = pinEls[idx];
      pinEl.style.left = `${left}px`;
      pinEl.style.top = `${top}px`;
    });
  }

  $: setPinCoordinates(mapImgEl, stagePinEl, mapImgWidth, mapImgHeight, stages);
</script>

<div
  class="w-full h-full overflow-auto grid place-content-center relative"
  bind:clientWidth={mapImgWidth}
  bind:clientHeight={mapImgHeight}
>
  {#key imageMetadata}
    <div class="absolute h-fit w-full">
      <img
        src={imageMetadata.src}
        width={imageMetadata.width}
        height={imageMetadata.height}
        alt="festival map"
        bind:this={mapImgEl}
        transition:blur={{
          opacity: 100,
          duration: 200,
          easing: cubicOut,
          amount: '1rem',
        }}
        class="w-full"
      />
    </div>
  {/key}

  {#each stages as stage, idx}
    <button
      class="absolute flex h-6 w-6"
      bind:this={stagePinEl[idx]}
      on:click={() => selectStage(stage.key)}
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full bg-primary-400 opacity-75"
      />

      <span
        class="relative inline-flex h-6 w-6 bg-primary-500 text-md font-semibold text-on-surface-token justify-center"
        >{idx + 1}</span
      >
    </button>
  {/each}
</div>
