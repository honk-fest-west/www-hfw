<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let selectedDayIdx: number;
  export let days: Array<Day>;
  export let logoImg: ImageMetadata;

  const dispatch = createEventDispatcher<{ selectDay: number }>();

  const selectDayIdx = (idx: number) => {
    dispatch('selectDay', idx);
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
    });
  };

  const selectedClass = (idx: number) => {
    return idx === selectedDayIdx ? 'bg-surface-700' : '';
  };
</script>

<div
  class="btn-group flex justify-around variant-filled rounded-none max-w-2xl mx-auto"
>
  <a href="/" class="flex-0">
    <img
      src={logoImg.src}
      width={logoImg.width}
      height={logoImg.height}
      alt="back to HONK!"
      class="w-full max-w-[10rem] mx-auto"
    />
  </a>
  {#each days as day, idx}
    <button
      type="button"
      class={`w-full flex-1 ${selectedClass(
        idx
      )} flex flex-col items-center justify-center`}
      on:click={() => selectDayIdx(idx)}
    >
      <span class="text-2xl sm:text-3xl capitalize block"
        >{formatDay(day.date)}</span
      >
      <span class="text-sm sm:text-lg block">{formatDate(day.date)}</span>
    </button>
  {/each}
</div>
