<script lang="ts">
  import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
  import { timeRange } from '../util/dateFormat';
  import { getContext } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  const { state } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
</script>

{#key selectedDayIdx}
  <h2 class="text-right" in:fly={{ x: 10, duration: 220, delay: 40 }}>
    <a class="unstyled flex flex-col items-end" href={selectedDay.mapUrl}>
      <span class="text-2xl block">{selectedDay.location}</span>
      <span class="text-lg block"
        >{timeRange(selectedDay.startTime, selectedDay.endTime)}
      </span>
    </a>
  </h2>
{/key}
<a
  href={selectedDay.mapUrl}
  class="btn-icon bg-surface-600 p-2 mx-3 sm:mr-0 rounded-xl flex-0 border-2 border-surface-400 text-surface-50"
>
  <FaMapMarkedAlt />
</a>
