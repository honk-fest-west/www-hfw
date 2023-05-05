<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { shortTime } from './util/dateFormat';

  export let schedule: Schedule;
  export let items: Bands | Stages;

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

  let slotTime: string;
</script>

<ListBox class="py-4 px-2 h-full max-w-xl mx-auto" active="bg-surface-700">
  {#each schedule as timeSlot}
    <ListBoxItem
      bind:group={slotTime}
      name="slotTime"
      value={timeSlot.time}
      on:click={() => {
        selectItem(timeSlot);
      }}
    >
      <span
        class="text-xl font-medium block text-right flex-none text-surface-200"
        slot="lead"
      >
        {shortTime(timeSlot.time)}
      </span>
      {#if itemName(timeSlot)}
        <span
          class="h-7 text-xl underline decoration-dashed decoration-1 underline-offset-4 text-right text-ellipsis overflow-hidden block w-full text-surface-50"
        >
          {itemName(timeSlot)}
        </span>
      {:else}
        <span
          class="h-7 text-xl text-right text-ellipsis overflow-hidden block w-full text-surface-50"
          >-</span
        >
      {/if}
    </ListBoxItem>
  {/each}
</ListBox>
