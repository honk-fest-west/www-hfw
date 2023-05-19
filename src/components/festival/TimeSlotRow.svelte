<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ListBoxItem } from '@skeletonlabs/skeleton';
  import { shortTime } from './util/dateFormat';

  export let nowPlayingTime: Date | null;
  export let timeSlot: TimeSlot;
  export let items: Bands | Stages;
  export let smartMer: boolean;

  const dispatch = createEventDispatcher();
  const isNowPlaying: boolean = timeSlot.time === nowPlayingTime;

  const selectItem = (timeSlot: TimeSlot) => {
    if (timeSlot.bandKey?.length) {
      dispatch('selectBand', timeSlot.bandKey);
    } else if (timeSlot.stageKey?.length) {
      dispatch('selectStage', timeSlot.stageKey);
    }
  };

  const itemName = (timeSlot: TimeSlot) => {
    if (timeSlot.bandKey?.length) {
      return items[timeSlot.bandKey]?.name;
    } else if (timeSlot.stageKey?.length) {
      return items[timeSlot.stageKey]?.name;
    }
    return null;
  };
</script>

<ListBoxItem
  bind:group={nowPlayingTime}
  name="slotTime"
  value={timeSlot.time}
  class="mt-2"
  on:click={() => {
    selectItem(timeSlot);
  }}
>
  <div slot="lead" class="flex flex-col flex-none h-full">
    {#if isNowPlaying}
      <span class="text-xl font-medium block text-surface-50">
        {shortTime(timeSlot.time, smartMer)}
      </span>
    {:else}
      <span class="text-xl font-medium block text-surface-300">
        {shortTime(timeSlot.time, smartMer)}
      </span>
    {/if}
  </div>
  <div
    class="text-ellipsis overflow-hidden h-full text-right w-full flex flex-col items-end"
  >
    {#if itemName(timeSlot) && isNowPlaying}
      <span class="w-fit h-7 text-xl block text-surface-50 overflow-hidden">
        {itemName(timeSlot)}
      </span>
      <span class="text-md font-semibold block text-primary-400 mt-1 mr-2">
        Now Playing
      </span>
    {:else if itemName(timeSlot) && !isNowPlaying}
      <span
        class="w-fit h-8 text-xl block text-surface-50 overflow-hidden border-b-2 border-surface-600 border-dashed"
      >
        {itemName(timeSlot)}
      </span>
    {:else}
      <span class="text-surface-50 text-xl">-</span>
    {/if}
  </div>
</ListBoxItem>
