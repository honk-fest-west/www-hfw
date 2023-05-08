<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { shortTime } from './util/dateFormat';

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

<ListBox class="py-4 px-2 h-full max-w-xl mx-auto" active="bg-surface-700">
  {#each schedule as timeSlot}
    <ListBoxItem
      bind:group={nowPlaying}
      name="slotTime"
      value={timeSlot.time}
      on:click={() => {
        selectItem(timeSlot);
      }}
    >
      <div slot="lead" class="flex flex-col flex-none">
        <span class="text-xl font-medium block text-surface-200">
          {shortTime(timeSlot.time, smartMer)}
        </span>
      </div>
      <div class="text-ellipsis overflow-hidden h-full text-right w-full">
        {#if itemName(timeSlot)}
          <span
            class="underline decoration-dashed decoration-1 underline-offset-4 w-full h-7 text-xl block text-surface-50"
          >
            {itemName(timeSlot)}
          </span>
          {#if timeSlot.time === nowPlaying}
            <span class="text-md font-semibold block text-primary-400">
              Now Playing
            </span>
          {/if}
        {:else}
          <span class="text-surface-50 text-xl">-</span>
        {/if}
      </div>
    </ListBoxItem>
  {/each}
</ListBox>
