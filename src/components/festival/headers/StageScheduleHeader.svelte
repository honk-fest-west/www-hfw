<script lang="ts">
  import { getContext } from 'svelte';
  import { scale, fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import { elasticOut } from 'svelte/easing';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: selectedStage = $state.context.stages[$state.context.selectedStageKey];

  const goBack = () => {
    send('GOTO_DAY');
  };
</script>

<button type="button" class="btn btn-icon p-2 flex-0" on:click={goBack}
  ><IoMdArrowRoundBack /></button
>

{#if selectedStage}
  {#key selectedStage}
    <h2 class="flex-1 text-right" in:fly={{ x: 10, duration: 220, delay: 40 }}>
      <a class="unstyled flex flex-col items-end" href={selectedStage.mapUrl}>
        <span class="text-2xl block">{selectedStage.name}</span>
        <span class="text-lg block">{selectedDay.location}</span>
      </a>
    </h2>
    <a
      href={selectedStage.mapUrl}
      in:scale={{
        duration: 500,
        delay: 200,
        start: 0.5,
        easing: elasticOut,
      }}
      class="btn-icon bg-surface-600 p-2 mx-3 sm:mr-0 rounded-xl flex-0 border-2 border-surface-400 text-surface-50"
    >
      <FaMapMarkedAlt />
    </a>
  {/key}
{/if}
