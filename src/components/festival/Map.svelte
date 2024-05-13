<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  import FaInfo from 'svelte-icons/fa/FaInfo.svelte';
  import FaBriefcaseMedical from 'svelte-icons/fa/FaBriefcaseMedical.svelte';
  import FaRestroom from 'svelte-icons/fa/FaRestroom.svelte';

  export let stages: Stage[];
  export let coordinates: Coordinates;
  export let imageMetadata: ImageMetadata;
  export let day: Day;

  let mapImgEl: HTMLElement;
  let infoPinEl: HTMLSpanElement;
  let medicPinEl: HTMLSpanElement;
  let pottyPinEl: HTMLSpanElement;

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };

  $: animatePing = (stageKey: string) => {
    const currentTime = new Date();
    const stage = stages.find((stage) => stage.key === stageKey);
    return stage?.schedule.find((timeSlot) => {
      const timeSlotEnd = new Date(
        timeSlot.time.getTime() + day.slotDuration * 60000,
      );
      return (
        currentTime >= timeSlot.time &&
        currentTime <= timeSlotEnd &&
        (timeSlot.bandKey?.length || 0) > 0
      );
    })
      ? 'animate-ping'
      : '';
  };

  const setPinCoordinates = async (
    mapEl: HTMLElement,
    stages: Stage[],
    other: Coordinates,
  ) => {
    if (!mapEl) return;

    const map = {
      width: imageMetadata.width,
      height: imageMetadata.height,
    };

    // Get the bounding client rect of element A and B
    await new Promise((r) => setTimeout(r, 100));
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
  };

  $: setPinCoordinates(mapImgEl, stages, coordinates);
</script>

<svelte:window
  on:resize={() => setPinCoordinates(mapImgEl, stages, coordinates)}
/>

<div
  class="w-full h-full overflow-auto grid place-content-center relative sm:bg-surface-700"
>
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
        duration: 200,
        amount: '1rem',
      }}
    />
  </div>

  <!-- Stage Pins -->
  {#each stages as stage, idx}
    {#if stage}
      <button
        class="absolute flex h-8 w-8 rounded shadow-lg"
        bind:this={stage.pinEl}
        on:click={() => selectStage(stage.key)}
      >
        <span
          class={`absolute inline-flex h-full w-full bg-primary-400 opacity-75 rounded ${animatePing(
            stage.key,
          )}`}
        />

        <span
          class="relative inline-flex h-8 w-8 bg-primary-500 text-md font-semibold text-on-surface-token justify-center items-center rounded"
          >{idx + 1}</span
        >
      </button>
    {/if}
  {/each}

  <!-- Info Pin -->
  <span
    class="absolute flex h-6 w-6 justify-center items-center rounded-full overflow-hidden shadow-lg"
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
    class="absolute flex h-6 w-6 justify-center items-center rounded-t-lg overflow-hidden shadow-lg"
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
    class="absolute flex h-6 w-6 justify-center items-center rounded overflow-hidden shadow-lg"
    bind:this={pottyPinEl}
  >
    <span class="absolute inline-flex h-full w-full bg-blue-500" />
    <span
      class="relative inline-flex h-4 w-4 bg-blue-500 text-md font-semibold text-blue-50 justify-center"
      ><FaRestroom /></span
    >
  </span>
</div>
