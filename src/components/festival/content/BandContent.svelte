<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import BandPage from '../BandPage.svelte';
  import type { AppStateSend } from '../machines/app.machine';

  const { state } = getContext<AppStateSend>('app');

  $: selectedBandKey = $state.context.selectedBandKey;

  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;
</script>

{#if $state.value === 'viewingBand' && selectedBand}
  <div
    class="h-full"
    in:fade={{ duration: 200 }}
    out:fly={{ x: $state.context.flyX, duration: 200 }}
  >
    <BandPage band={selectedBand} />
  </div>
{/if}
