<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

  const infoNav = [
    { name: 'Volunteer', link: '/volunteer' },
    { name: 'Supporters', link: '/supporters' },
    { name: 'Donate', link: '/donate' },
    { name: 'Media', link: '/media' },
    { name: 'About', link: '/about' },
  ];
</script>

<section>
  <span class="text-surface-50 text-2xl block mb-4 w-full text-center"
    >Free Celebration of Music and Community</span
  >
  <ListBox rounded="rounded-lg">
    {#each infoNav as nav}
      <ListBoxItem
        group="info"
        name="info"
        value={nav.link}
        class="w-full border-2 border-surface-400 text-on-surface-token bg-surface-700 hover:bg-primary-500 sm:mb-4"
      >
        <a
          href={nav.link}
          class="unstyled text-xl text-surface-50 hover:text-on-surface-token w-full block"
          >{nav.name}</a
        >
      </ListBoxItem>
    {/each}
  </ListBox>
</section>
