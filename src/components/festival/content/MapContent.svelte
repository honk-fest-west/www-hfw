<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  import Map from '../Map.svelte';

  export let mapImgs: Array<ImageMetadata>;

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: allStages = $state.context.stages;
  $: days = $state.context.days;

  const selectStage = (event: { detail: string }) => {
    // drawerStore.close();
    send('GOTO_STAGE', { stageKey: event.detail });
  };

  const stages = (day: Day): Array<Stage> =>
    day.stageKeys.map((stageKey: string | number) => allStages[stageKey]);
</script>

{#if $state.value === 'viewingMap'}
  <div
    class="h-full"
    out:fly={{ x: $state.context.flyX, duration: 200 }}
    in:fade={{ duration: 200 }}
  >
    {#each days as day, idx}
      {#if idx === selectedDayIdx}
        <Map
          {day}
          stages={stages(day)}
          imageMetadata={mapImgs[idx]}
          coordinates={day.coordinates}
          on:selectStage={selectStage}
        />
      {/if}
    {/each}
  </div>
{/if}
