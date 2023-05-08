<script lang="ts">
  export let band: Band;
</script>

<div class="flex flex-col my-4 sm:my-8 gap-3 items-center px-4">
  <a href={band.url} class="block w-52 rounded-xl overflow-hidden">
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
  <p class="max-w-xl">{band.description}</p>

  <a
    href={band.url}
    class="btn bg-surface-600 text-surface-100 font-bold mt-7 border-2 border-surface-400 rounded-xl"
  >
    more info &raquo;
  </a>
</div>
