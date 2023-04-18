<script lang='ts'>
import { fade, fly } from 'svelte/transition';
export let nav, social, currentMenuItem;

const activeListItem = (link: string) => {
  return link === currentMenuItem?.link
    ? 'hidden'
    : 'text-shadow bg-navy text-gray-200';
};

const pageName = currentMenuItem?.name;
let menuOpen = false;

const handleOutsideClick = (event) => {
  if (!event.target.closest('#mobile-menu')) {
    menuOpen = false;
  }
};

</script>

<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <div class="relative flex h-16">
    <button
      type="button"
      aria-controls="mobile-menu"
      aria-expanded="false"
      class="w-full hover:transition ease-in-out text-2xl sm:text-3xl font-title flex items-center my-2 bg-opacity-100 pt-2 pb-1 px-2 mx-4 rounded-full shadow-lg z-10 ring-4 ring-cobalt bg-pink text-gray-100 text-shadow cursor-default"
      on:click={() => (menuOpen = !menuOpen)}
    >
      <span class="w-full mx-4 sm:mx-2 block font-semibold ease-in">
        {pageName || 'Menu'}
      </span>

      <!-- Mobile menu button-->
      <div
        class="inline-flex items-center justify-center rounded-full p-2 -mt-1 absolute right-6"
      >
        <span class="sr-only">Open main menu</span>
        {#if !menuOpen}
        <svg
          class="block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
        </svg>
        {/if}
        {#if menuOpen}
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        {/if}
      </div>
    </button>
  </div>
</div>

<!-- Mobile menu, show/hide based on menu state. -->
{#if menuOpen}
<div id="mobile-menu" in:fly|fade="{{ y: -200, duration: 200 }}" out:fly|fade="{{ y: -200, duration: 200 }}">
  <ul class="px-2 pb-3 pt-2">
    <!-- MAIN NAV -->
    {#each nav.links as item}
        <li
          class={`hover:transition ease-in-out text-2xl sm:text-3xl font-title flex items-center mb-4 bg-opacity-100 pt-2 pb-1 px-2 mx-4 rounded-full shadow-lg z-10 ring-4 ring-cobalt ${activeListItem(
            item.link
          )}`}
        >
          <a
            class="w-full mx-4 sm:mx-2 block  font-semibold ease-in"
            href={item.link}
          >
            {item.name}
          </a>
        </li>
    {/each}

    <!-- SOCIAL NAV -->
    <!-- <li
      class="text-2xl text-cobalt opacity-90 ml-2 my-2 flex z-10 lg:hidden xl:flex"
    >
      {
        Object.keys(social.links).map((key) => (
          <div>
            <div class="hidden sm:block px-1 h-9 hover:transition ease-in hover:scale-105 hover:text-pink">
              <SocialLinks key={key} link={social.links[key]} size="1.875rem" />
            </div>
            <div class="block sm:hidden px-1 h-7">
              <SocialLinks key={key} link={social.links[key]} size="1.5rem" />
            </div>
          </div>
        ))
      }
    </li> -->
  </ul>
</div>
{/if}
