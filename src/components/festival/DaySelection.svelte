<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let selectedDayIdx: number;
  export let days: Array<Day>;

  const dispatch = createEventDispatcher<{ selectDay: number }>();

  const selectDayIdx = (idx: number) => {
    dispatch('selectDay', idx);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const selectedClass = (idx: number) => {
    return idx === selectedDayIdx ? 'bg-surface-700' : '';
  };
</script>

<div class="btn-group flex justify-around variant-filled rounded-none">
  {#each days as day, idx}
    <button
      type="button"
      class={`w-full ${selectedClass(idx)}`}
      on:click={() => selectDayIdx(idx)}
    >
      <span class="text-3xl capitalize">{formatDate(day.date)}</span>
    </button>
  {/each}
</div>
