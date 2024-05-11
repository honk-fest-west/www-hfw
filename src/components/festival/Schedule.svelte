<script lang="ts">
  import { ListBox } from '@skeletonlabs/skeleton';
  import TimeSlotRow from './TimeSlotRow.svelte';
  import AllDayRow from './AllDayRow.svelte';

  export let schedule: Schedule;
  export let day: Day;
  export let items: Bands | Stages;
  export let smartMer: boolean = false;

  const currentTime = new Date();

  $: allDayPerformers = day.allDayKeys.map<Band>((key) => items[key] as Band);

  $: nowPlayingTime =
    schedule.find((timeSlot) => {
      const timeSlotEnd = new Date(
        timeSlot.time.getTime() + day.slotDuration * 60000
      );
      return currentTime >= timeSlot.time && currentTime <= timeSlotEnd;
    })?.time || null;
</script>

<ListBox class="h-full max-w-xl mx-auto" active="bg-surface-700">
  {#each schedule as timeSlot}
    <TimeSlotRow
      {timeSlot}
      {nowPlayingTime}
      {items}
      {smartMer}
      on:selectBand
      on:selectStage
    />
  {/each}

  <div class="bg-primary-600 bg-opacity-40">
    {#each allDayPerformers as performer}
      <AllDayRow {performer} on:selectPerformer />
    {/each}
  </div>
</ListBox>
