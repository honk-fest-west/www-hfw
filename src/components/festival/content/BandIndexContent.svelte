<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: bands = [...selectedDay?.bandKeys, ...selectedDay?.allDayKeys]
    .map((bandKey: string) => $state.context.bands[bandKey])
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectBand = (band: Band) => {
    send('GOTO_BAND', { bandKey: band.key });
  };
</script>

<div
  class="h-full p-4"
  in:fade={{ duration: 200 }}
  out:fly={{
    x: $state.context.flyX,
    duration: 200,
  }}
>
  {#if bands.length === 0}
    <p class="unstyled text-center text-2xl mt-6">Coming Soon</p>
  {/if}

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {#each bands as band}
      <button
        type="button"
        on:click={() => selectBand(band)}
        class="border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex flex-col px-1 py-2 items-center justify-between gap-2"
      >
        <div class="w-full rounded-xl overflow-hidden">
          {#if band.image}
            <img
              class="w-full"
              src={band.image.src}
              alt={band.name}
              width={band.image.width}
              height={band.image.height}
            />
          {/if}
        </div>

        <span class="block sm:text-2xl">{band.name}</span>
      </button>
    {/each}
  </div>
</div>
