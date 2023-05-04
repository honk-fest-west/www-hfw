<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';
  import { shortTime } from './util/dateFormat';

  export let dayIdx: number;
  export let band: Band;
  export let stages: Stages;

  const dispatch = createEventDispatcher();

  const selectStage = (timeSlot: TimeSlot) => {
    if (timeSlot.stageKey?.length) {
      dispatch('selectStage', timeSlot.stageKey);
    }
  };

  const stageName = (timeSlot: TimeSlot) => {
    return timeSlot.stageKey?.length ? stages[timeSlot.stageKey].name : '';
  };

  let slotTime: string;
</script>

<div class="grid grid-cols-2 my-4 sm:my-8 gap-5 px-4">
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
  <div class="place-self-end">
    <p class="max-w-xl">{band.description}</p>
  </div>
  <h3 class="text-center text-2xl text-on-surface-token">
    {band.location}
  </h3>
  <a
    href={band.url}
    class="btn bg-surface-600 text-surface-100 font-bold border-2 border-surface-400 rounded-xl py-0"
  >
    more info &raquo;
  </a>
  <div class="col-span-2">
    <ListBox class="py-4 px-2 h-full" active="bg-surface-700">
      {#each band.scheduleByDay[dayIdx] as timeSlot}
        <ListBoxItem
          bind:group={slotTime}
          name="slotTime"
          value={timeSlot.time}
          on:click={() => {
            selectStage(timeSlot);
          }}
        >
          <span
            class="text-xl font-medium block text-right flex-none text-surface-200"
            slot="lead"
          >
            {shortTime(timeSlot.time)}
          </span>
          <span
            class="h-7 text-xl underline decoration-dashed decoration-1 underline-offset-4 text-right text-ellipsis overflow-hidden block w-full text-surface-50"
          >
            {stageName(timeSlot)}
          </span>
        </ListBoxItem>
      {/each}
    </ListBox>
  </div>
</div>
