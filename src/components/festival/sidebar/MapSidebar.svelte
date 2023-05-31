<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { AppStateSend } from '../machines/app.machine';
  import { getContext } from 'svelte';

  import StageList from '../StageList.svelte';
  import FaDrum from 'svelte-icons/fa/FaDrum.svelte';
  import { formatLongDay } from '../util/dateFormat';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayStages =
    selectedDay?.stageKeys.map(
      (stageKey: string) => $state.context.stages[stageKey]
    ) || [];

  const selectStage = (event: { detail: string }) => {
    send('GOTO_STAGE', { stageKey: event.detail });
  };

  const viewDayBands = () => {
    send('GOTO_BANDS');
  };
</script>

{#if $state.value === 'viewingMap' && dayStages}
  <div
    transition:slide={{
      delay: 0,
      duration: 200,
      easing: quintOut,
      axis: 'x',
    }}
    class="p-4 bg-surface-900"
  >
    <StageList {dayStages} on:selectStage={selectStage} />

    <div class="w-full flex flex-col items-center justify-center mb-4">
      <span class="text-surface-50 text-lg block mb-2 w-56 text-center"
        >Free Celebration of Music and Community</span
      >
      <a
        href="/donate"
        class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
        >Donate</a
      >
      <a
        href="/volunteer"
        class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
        >Volunteer</a
      >
      <a
        href="/supporters"
        class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
        >Supporters</a
      >
      <a
        href="/about"
        class="unstyled text-surface-200 underline text-xs hover:text-primary-400 block"
        >About</a
      >
    </div>

    <button
      type="button"
      on:click={viewDayBands}
      class="w-full border-2 border-surface-400 bg-surface-700 rounded-lg text-on-surface-token flex px-3 py-2 items-center gap-4"
    >
      <span class="w-6 h-6 bg-primary-500 p-1 rounded ml-1">
        <FaDrum />
      </span>
      <span class="block text-xl">{formatLongDay(selectedDay.date)} Bands</span>
    </button>
  </div>
{/if}
