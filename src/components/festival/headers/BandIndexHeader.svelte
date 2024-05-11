<script lang="ts">
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import { formatLongDay } from '../util/dateFormat';

  import { getContext } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];

  const goBack = () => {
    send('GO_BACK');
  };
</script>

<button type="button" class="btn btn-icon p-2 flex-0" on:click={goBack}>
  <IoMdArrowRoundBack />
</button>
<h2 class="flex-1 text-right mr-2" in:fly={{ x: 10, duration: 220, delay: 40 }}>
  <span class="text-2xl block">
    {formatLongDay(selectedDay.date)} Bands
  </span>
</h2>
