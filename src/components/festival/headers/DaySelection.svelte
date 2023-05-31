<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { formatShortDay, formatDate } from '../util/dateFormat';

  export let selectedDayIdx: number;
  export let days: Array<Day>;
  export let logoImg: ImageMetadata;

  const dispatch = createEventDispatcher<{ selectDay: number }>();

  const selectDayIdx = (idx: number) => {
    dispatch('selectDay', idx);
  };

  const selectedClass = (idx: number) => {
    return `${idx}` === `${selectedDayIdx}` ? 'bg-surface-700' : '';
  };
</script>

<div
  class="flex justify-around variant-filled rounded-none max-w-2xl mx-auto divide-x-2 divide-surface-800 items-center"
>
  <a href="/" class="block flex-0 px-3 py-2 sm:px-4">
    <img
      src={logoImg.src}
      width={logoImg.width}
      height={logoImg.height}
      alt="back to HONK!"
      class="w-full max-w-[8rem] mx-auto"
    />
  </a>
  {#each days as day, idx}
    <button
      type="button"
      class={`w-full flex-1 ${selectedClass(
        idx
      )} flex flex-col items-center justify-center py-3 px-4`}
      on:click={() => selectDayIdx(idx)}
    >
      <span class="text-2xl sm:text-3xl capitalize block"
        >{formatShortDay(day.date)}</span
      >
      <span class="text-sm sm:text-lg block">{formatDate(day.date)}</span>
    </button>
  {/each}
</div>
