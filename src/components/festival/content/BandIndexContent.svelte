<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { AppStateSend } from '../machines/app.machine';

  import Bands from '../Bands.svelte';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayBands = [...selectedDay?.bandKeys, ...selectedDay?.allDayKeys].map(
    (bandKey: string) => $state.context.bands[bandKey]
  );

  const selectBand = (event: { detail: string }) => {
    send('GOTO_BAND', { bandKey: event.detail });
  };
</script>

<div
  class="h-full p-4"
  in:fade={{ duration: 200 }}
  out:fly={{
    x: $state.context.flyX,
    duration: 200,
  }}
>
  <Bands on:selectBand={selectBand} bands={dayBands} />
</div>
