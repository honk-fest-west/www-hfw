<script lang="ts">
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import FaQuestion from 'svelte-icons/fa/FaQuestion.svelte';
  import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
  import { getContext } from 'svelte';
  import FaDrum from 'svelte-icons/fa/FaDrum.svelte';
  import FaMusic from 'svelte-icons/fa/FaMusic.svelte';
  import Info from '../Info.svelte';
  import StageList from '../StageList.svelte';
  import type { AppStateSend } from '../machines/app.machine';
  import { formatLongDay } from '../util/dateFormat';

  export let bounce = true;

  let drawerView: 'stages' | 'info' = 'stages';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayStages =
    selectedDay?.stageKeys.map(
      (stageKey: string) => $state.context.stages[stageKey]
    ) || [];

  const viewDayBands = () => {
    send('GOTO_BANDS');
  };

  const viewInfo = () => {
    drawerView = 'info';
    drawerStore.open();
  };

  const viewDayStages = () => {
    drawerView = 'stages';
    drawerStore.open();
  };
  const selectStage = (event: { detail: string }) => {
    drawerStore.close();
    send('GOTO_STAGE', { stageKey: event.detail });
  };
</script>

{#key selectedDayIdx}
  <div class="flex gap-4 bg-surface-800 p-4">
    <button
      type="button"
      on:click={viewInfo}
      class="border-2 border-surface-400 bg-primary-500 rounded-xl text-on-surface-token px-1 py-2 w-10"
    >
      <FaQuestion />
    </button>
    <button
      type="button"
      on:click={viewDayBands}
      in:scale={{
        duration: 400,
        delay: bounce ? 100 : 0,
        start: bounce ? 0.5 : 1,
        easing: elasticOut,
      }}
      class="w-1/2 border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
    >
      <span class="w-6 h-6 mx-1">
        <FaDrum />
      </span>
      <span class="block text-xl">Bands</span>
    </button>
    <button
      type="button"
      on:click={viewDayStages}
      in:scale={{
        duration: 400,
        delay: bounce ? 200 : 0,
        start: bounce ? 0.7 : 1,
        easing: elasticOut,
      }}
      class="w-1/2 border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
    >
      <span class="w-5 h-5 mx-1">
        <FaMusic />
      </span>
      <span class="block text-xl">Stages</span>
    </button>
  </div>
{/key}

<Drawer position="bottom" bgDrawer="bg-surface-800" height="h-fit">
  <div class="py-5 px-6">
    {#if drawerView === 'stages'}
      <h2 class="text-surface-50 w-full mb-3 -mt-2 flex justify-center">
        {formatLongDay(selectedDay.date)}
      </h2>
      <StageList {dayStages} on:selectStage={selectStage} />
    {:else if drawerView === 'info'}
      <Info />
    {/if}
  </div>
</Drawer>
