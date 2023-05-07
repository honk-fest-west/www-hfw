<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { blur } from 'svelte/transition';
  import FaInfo from 'svelte-icons/fa/FaInfo.svelte';
  import FaBriefcaseMedical from 'svelte-icons/fa/FaBriefcaseMedical.svelte';
  import FaRestroom from 'svelte-icons/fa/FaRestroom.svelte';

  export let stages: Stage[];
  export let coordinates: Coordinates;
  export let imageMetadata: ImageMetadata;

  let mapImgEl: HTMLImageElement;
  let infoPinEl: HTMLSpanElement;
  let medicPinEl: HTMLSpanElement;
  let pottyPinEl: HTMLSpanElement;

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };

  function setPinCoordinates(
    mapEl: HTMLElement,
    stages: Stage[],
    other: Coordinates
  ) {
    if (!mapEl) return;

    console.log('calculating');
    const map = {
      width: imageMetadata.width,
      height: imageMetadata.height,
    };

    // Get the bounding client rect of element A and B
    const rectMap = mapEl.getBoundingClientRect();
    const widthQ = (rectMap.width * 1.0) / map.width;
    const heightQ = (rectMap.height * 1.0) / map.height;

    // Calculate the parent element center coordinates
    const parentCenterX = rectMap.width / 2.0;
    const parentCenterY = rectMap.height / 2.0;

    stages.forEach((stage) => {
      // Calculate the relative position of the Pin to the center of the Map
      const relativeX = (stage.x - map.width / 2.0) * widthQ;
      const relativeY = (stage.y - map.height / 2.0) * heightQ;

      // Calculate the top and left coordinates for the absolutely positioned Pin
      const left = parentCenterX + relativeX;
      const top = parentCenterY + relativeY;

      stage.pinEl && (stage.pinEl.style.left = `${left}px`);
      stage.pinEl && (stage.pinEl.style.top = `${top}px`);
    });

    Object.entries(other).forEach(([key, [x, y]]) => {
      const relativeX = (x - map.width / 2.0) * widthQ;
      const relativeY = (y - map.height / 2.0) * heightQ;

      const left = parentCenterX + relativeX;
      const top = parentCenterY + relativeY;

      if (key === 'info') {
        infoPinEl && (infoPinEl.style.left = `${left}px`);
        infoPinEl && (infoPinEl.style.top = `${top}px`);
      } else if (key === 'medic') {
        medicPinEl && (medicPinEl.style.left = `${left}px`);
        medicPinEl && (medicPinEl.style.top = `${top}px`);
      } else if (key === 'potty') {
        pottyPinEl && (pottyPinEl.style.left = `${left}px`);
        pottyPinEl && (pottyPinEl.style.top = `${top}px`);
      }
    });
  }

  $: setPinCoordinates(mapImgEl, stages, coordinates);
</script>

<svelte:window
  on:resize={() => setPinCoordinates(mapImgEl, stages, coordinates)}
/>

<div
  class="w-full h-full overflow-auto grid place-content-center relative sm:bg-surface-700"
>
  {#key imageMetadata}
    <div class="absolute h-fit w-full sm:max-w-xl">
      <img
        src={imageMetadata.src}
        width={imageMetadata.width}
        height={imageMetadata.height}
        alt="festival map"
        class="w-full"
        bind:this={mapImgEl}
        transition:blur={{
          opacity: 100,
          duration: 400,
          amount: '1rem',
        }}
      />
    </div>
  {/key}

  <!-- Stage Pins -->
  {#each stages as stage, idx}
    <button
      class="absolute flex h-8 w-8 rounded"
      bind:this={stage.pinEl}
      on:click={() => selectStage(stage.key)}
    >
      <span
        class="animate-ping absolute inline-flex h-full w-full bg-primary-400 opacity-75 rounded"
      />

      <span
        class="relative inline-flex h-8 w-8 bg-primary-500 text-md font-semibold text-on-surface-token justify-center items-center rounded"
        >{idx + 1}</span
      >
    </button>
  {/each}

  <!-- Info Pin -->
  <span
    class="absolute flex h-6 w-6 justify-center items-center rounded-full overflow-hidden"
    bind:this={infoPinEl}
  >
    <span class="absolute inline-flex h-full w-full bg-green-500" />
    <span
      class="relative inline-flex h-4 w-4 text-md font-semibold text-green-50 justify-center"
      ><FaInfo /></span
    >
  </span>

  <!-- Medic Pin -->
  <span
    class="absolute flex h-6 w-6 justify-center items-center rounded-t-lg overflow-hidden"
    bind:this={medicPinEl}
  >
    <span class="absolute inline-flex h-full w-full bg-white" />
    <span
      class="relative inline-flex h-6 w-6 text-md font-semibold text-red-500 justify-center"
      ><FaBriefcaseMedical /></span
    >
  </span>

  <!-- Potty Pin -->
  <span
    class="absolute flex h-6 w-6 justify-center items-center rounded overflow-hidden"
    bind:this={pottyPinEl}
  >
    <span class="absolute inline-flex h-full w-full bg-blue-500" />
    <span
      class="relative inline-flex h-4 w-4 bg-blue-500 text-md font-semibold text-blue-50 justify-center"
      ><FaRestroom /></span
    >
  </span>
</div>
