<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';

  export let selectedStageKey: string;
  export let dayStages: Array<Stage> = [];

  const dispatch = createEventDispatcher();

  const selectStage = (stageKey: string) => {
    dispatch('selectStage', stageKey);
  };
</script>

<header
  class="card-header text-center font-bold text-2xl -mt-6 sm:mt-0 mb-2 sm:mb-6"
>
  <span class="text-surface-50">Stages</span>
</header>
<section>
  <ListBox rounded="rounded-lg">
    {#each dayStages as stage, idx}
      <ListBoxItem
        bind:group={selectedStageKey}
        on:click={() => selectStage(stage.key)}
        name="stage"
        value={stage.key}
        class="w-full border-2 border-surface-400 text-on-surface-token bg-surface-700 hover:bg-primary-500 sm:mb-4"
      >
        <span
          class="text-md font-semibold block bg-primary-500 w-6 h-6 text-center"
          slot="lead">{idx + 1}</span
        >
        <span class="text-xl text-surface-50 hover:text-on-surface-token"
          >{stage.name}</span
        >
      </ListBoxItem>
    {/each}
  </ListBox>
</section>
