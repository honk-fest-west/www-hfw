<script lang="ts">
  import { scale } from 'svelte/transition';

  export let band: Band;
</script>

<div class="flex flex-col my-7 gap-3 items-center px-8">
  <a
    href={band.url}
    class="block w-52 rounded-xl overflow-hidden"
    in:scale={{ duration: 200, delay: 200, start: 0.5 }}
  >
    {#if band.image}
      <img
        class="w-full h-full"
        src={band.image.src}
        alt={band.name}
        width={band.image.width}
        height={band.image.height}
      />
    {/if}
  </a>
  <p class="max-w-xl mt-3">{band.description}</p>

  <a
    href={band.url}
    class="btn bg-surface-600 text-surface-100 font-bold mt-6 border-2 border-surface-400 rounded-xl"
  >
    more info &raquo;
  </a>
</div>
