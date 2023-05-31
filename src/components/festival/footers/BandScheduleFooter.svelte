<script lang="ts">
  import { getContext } from 'svelte';
  import MdMore from 'svelte-icons/md/MdMore.svelte';
  import { elasticOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';
  import FaClock from 'svelte-icons/fa/FaRegClock.svelte';
  import type { AppStateSend } from '../machines/app.machine';
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
  import { formatLongDay } from '../util/dateFormat';
  import Schedule from '../Schedule.svelte';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: selectedBandKey = $state.context.selectedBandKey;
  $: allStages = $state.context.stages;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;

  const viewBandSchedule = () => {
    drawerStore.open();
  };

  const selectStage = (event: { detail: string }) => {
    drawerStore.close();
    send('GOTO_STAGE', { stageKey: event.detail });
  };
</script>

{#if selectedBand}
  <div class="flex gap-4 bg-surface-800 p-4 items-center">
    {#if selectedBand.url?.length && selectedBand.url !== '#'}
      <a
        href={selectedBand.url}
        class="btn border-2 border-surface-400 bg-primary-500 rounded-xl text-on-surface-token px-2 h-12"
      >
        <MdMore />
      </a>
    {/if}
    <button
      type="button"
      on:click={viewBandSchedule}
      in:scale={{
        duration: 600,
        delay: 200,
        start: 0.5,
        easing: elasticOut,
      }}
      class="w-full border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
    >
      <span class="w-6 h-6 bg-primary-500 p-1 rounded">
        <FaClock />
      </span>
      <span class="block text-2xl">Schedule</span>
    </button>
  </div>

  <Drawer position="bottom" bgDrawer="bg-surface-800" height="h-fit">
    <div class="py-5 px-6">
      <h2 class="text-surface-50 w-full mb-3 -mt-2 flex justify-center">
        {formatLongDay(selectedDay.date)}
      </h2>
      <Schedule
        day={selectedDay}
        schedule={selectedBand.scheduleByDay[selectedDayIdx]}
        items={allStages}
        on:selectStage={selectStage}
      />
    </div>
  </Drawer>
{/if}
