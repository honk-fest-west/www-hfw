<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ListBoxItem } from '@skeletonlabs/skeleton';

  export let performer: Band;

  const dispatch = createEventDispatcher();

  const selectItem = (performer: Band) => {
    dispatch('selectPerformer', performer?.key);
  };
</script>

{#if performer}
  <ListBoxItem
    bind:group={performer}
    name="slotTime"
    value={performer.key}
    class="mt-2"
    on:click={() => {
      selectItem(performer);
    }}
  >
    <div slot="lead" class="flex flex-col flex-none h-full">
      <span class="text-xl font-medium block text-surface-300"> All Day </span>
    </div>
    <div
      class="text-ellipsis overflow-hidden h-full text-right w-full flex flex-col items-end"
    >
      <span
        class="w-fit h-8 text-xl block text-surface-50 overflow-hidden border-b-2 border-surface-600 border-dashed"
      >
        {performer.name}
      </span>
    </div>
  </ListBoxItem>
{/if}
