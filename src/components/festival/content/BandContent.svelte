<script lang="ts">
  import { getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { AppStateSend } from "../machines/app.machine";

  const { state } = getContext<AppStateSend>("app");

  $: selectedBandKey = $state.context.selectedBandKey;

  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;
</script>

{#if $state.value === "viewingBand" && selectedBand}
  <div
    class="h-full flex flex-col my-7 gap-3 items-center px-8"
    in:fade={{ duration: 200 }}
    out:fly={{ x: $state.context.flyX, duration: 200 }}
  >
    <a href={selectedBand.url} class="block w-52 rounded-xl overflow-hidden">
      {#if selectedBand.image}
        <img
          class="w-full h-full"
          src={selectedBand.image.src}
          alt={selectedBand.name}
          width={selectedBand.image.width}
          height={selectedBand.image.height}
        />
      {/if}
    </a>
    <div class="max-w-xl mt-3">
      <p class="band-description">
        {selectedBand.description}
      </p>
    </div>
  </div>
{/if}

<style>
  .band-description {
    color: white;
    opacity: 80%;
  }
  .band-description::first-line {
    text-transform: uppercase;
    letter-spacing: 3px;
  }
</style>
