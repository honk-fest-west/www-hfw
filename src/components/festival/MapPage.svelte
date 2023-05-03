<script lang="ts">
  import { AppBar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import Map from './Map.svelte';
  import { createEventDispatcher } from 'svelte';

  export let stages: Stage[];
  export let imageMetadata: ImageMetadata;

  let selectedStageKey: string;

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };
</script>

<div class="flex flex-col gap-2 py-4 justify-between h-full">
  <div class="card p-4 mx-3 max-h-[50vh]">
    <Map {stages} {imageMetadata} on:selectStage />
  </div>
</div>
