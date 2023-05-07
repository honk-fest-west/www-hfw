<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let bands: Array<Band> = [];

  $: sortedBands = bands.sort((a, b) => a.name.localeCompare(b.name));

  const dispatch = createEventDispatcher();

  const selectBand = (band: Band) => {
    dispatch('selectBand', band.key);
  };
</script>

<div class="grid grid-cols-2 gap-3">
  {#each sortedBands as band}
    <button
      type="button"
      on:click={() => selectBand(band)}
      class="border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex flex-col px-1 py-2 items-center justify-between gap-2"
    >
      <div class="w-full rounded-xl overflow-hidden">
        {#if band.image}
          <img
            class="w-full h-full"
            src={band.image.src}
            alt={band.name}
            width={band.image.width}
            height={band.image.height}
          />
        {/if}
      </div>

      <span class="block">{band.name}</span>
    </button>
  {/each}
</div>
