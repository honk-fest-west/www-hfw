<script lang="ts">
  import { getContext } from 'svelte';
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import type { AppStateSend } from '../machines/app.machine';

  const { state, send } = getContext<AppStateSend>('app');

  $: selectedBandKey = $state.context.selectedBandKey;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;

  function goBack() {
    send('GO_BACK');
  }
</script>

{#if selectedBand}
  <button type="button" class="btn btn-icon p-2 flex-0" on:click={goBack}>
    <IoMdArrowRoundBack />
  </button>
  <h2 class="flex-1 text-right mr-5">
    <a class="unstyled" href={selectedBand.url}>
      <span class="text-2xl block">{selectedBand.name}</span>
      <span class="text-lg block">{selectedBand.location}</span></a
    >
  </h2>
{/if}
