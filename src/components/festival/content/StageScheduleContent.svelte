<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  import Schedule from '../Schedule.svelte';
  import type { AppStateSend } from '../machines/app.machine';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: selectedStage = $state.context.stages[$state.context.selectedStageKey];
  $: allBands = $state.context.bands;

  const selectBand = (event: { detail: string }) => {
    send('GOTO_BAND', { bandKey: event.detail });
  };
</script>

{#if $state.value === 'viewingStage' && selectedStage}
  <div
    class="h-full px-3 py-3"
    in:fade={{ duration: 200 }}
    out:fly={{
      x: $state.context.flyX,
      duration: 200,
    }}
  >
    <Schedule
      day={selectedDay}
      schedule={selectedStage.schedule}
      items={allBands}
      smartMer={true}
      on:selectBand={selectBand}
      on:selectPerformer={selectBand}
    />
  </div>
{/if}
