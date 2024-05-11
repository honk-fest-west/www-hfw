<script lang="ts">
  import Schedule from '../Schedule.svelte';

  import { getContext } from 'svelte';
  import type { AppStateSend } from '../machines/app.machine';
  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: selectedBandKey = $state.context.selectedBandKey;
  $: allStages = $state.context.stages;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;

  const selectStage = (event: { detail: string }) => {
    send('GOTO_STAGE', { stageKey: event.detail });
  };
</script>

{#if $state.value === 'viewingBand' && selectedBand}
  <Schedule
    day={selectedDay}
    schedule={selectedBand.scheduleByDay[selectedDayIdx]}
    items={allStages}
    on:selectStage={selectStage}
  />
{/if}
