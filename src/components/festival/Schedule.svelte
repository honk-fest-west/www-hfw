<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { shortTime } from './util/dateFormat';
  import { t } from 'xstate';

  export let schedule: Schedule;
  export let day: Day;
  export let items: Bands | Stages;
  export let smartMer: boolean = false;

  const dispatch = createEventDispatcher();

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

  const currentTime = new Date();
  $: nowPlaying = schedule.find((timeSlot, idx) => {
    const timeSlotEnd = new Date(
      timeSlot.time.getTime() + day.slotDuration * 60000
    );
    return currentTime >= timeSlot.time && currentTime <= timeSlotEnd;
  })?.time;
</script>

<ListBox class="h-full max-w-xl mx-auto" active="bg-surface-700">
  {#each schedule as timeSlot}
    <ListBoxItem
      bind:group={nowPlaying}
      name="slotTime"
      value={timeSlot.time}
      class="mt-2"
      on:click={() => {
        selectItem(timeSlot);
      }}
    >
      <div slot="lead" class="flex flex-col flex-none h-full">
        {#if timeSlot.time === nowPlaying}
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
        {#if itemName(timeSlot)}
          {#if timeSlot.time === nowPlaying}
            <span
              class="w-fit h-7 text-xl block text-surface-50 overflow-hidden"
            >
              {itemName(timeSlot)}
            </span>
            <span
              class="text-md font-semibold block text-primary-400 mt-1 mr-2"
            >
              Now Playing
            </span>
          {:else}
            <span
              class="w-fit h-8 text-xl block text-surface-200 overflow-hidden border-b-2 border-surface-700 border-dashed"
            >
              {itemName(timeSlot)}
            </span>
          {/if}
        {:else}
          <span class="text-surface-50 text-xl">-</span>
        {/if}
      </div>
    </ListBoxItem>
  {/each}
</ListBox>
