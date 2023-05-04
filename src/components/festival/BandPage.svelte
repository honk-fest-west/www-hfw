<script lang="ts">
  export let selectedBand: Band;
</script>

<div class="flex flex-col my-4 sm:my-8 gap-3 items-center px-4">
  <div class="w-52 rounded-xl overflow-hidden">
    {#if selectedBand.image}
      <img
        class="w-full h-full"
        src={selectedBand.image.src}
        alt={selectedBand.name}
        width={selectedBand.image.width}
        height={selectedBand.image.height}
      />
    {/if}
  </div>
  <h3 class="text-center text-2xl text-on-surface-token">
    {selectedBand.location}
  </h3>
  <p class="max-w-xl">{selectedBand.description}</p>

  <a
    href={selectedBand.url}
    class="btn bg-surface-600 text-surface-100 font-bold mt-7 border-2 border-surface-400 rounded-xl"
  >
    more info &raquo;
  </a>
</div>
