<script lang="ts">
  import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';

  export let selectedStage: Stage;
  export let bands: Bands;

  const dispatch = createEventDispatcher();

  const selectBand = (timeSlot: TimeSlot) => {
    if (timeSlot.bandKey?.length) {
      dispatch('selectBand', timeSlot.bandKey);
    }
  };

  const bandName = (timeSlot: TimeSlot) => {
    return timeSlot.bandKey?.length ? bands[timeSlot.bandKey].name : '';
  };

  function shortTime(time: string): string {
    const date = new Date(Date.parse('1970-01-01T' + time));

    const formatted = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return trimHours(formatted);
  }

  function trimHours(timeString: string) {
    let [time, meridiem] = timeString.split(' ');
    let [_, minutes] = time.split(':');
    if (parseInt(minutes) > 0) {
      meridiem = '';
    }
    return `${time} ${meridiem}`;
  }

  let slotTime: string;
</script>

<div>
  <ListBox class="py-4 px-2 h-full" active="bg-surface-700">
    {#each selectedStage.schedule as timeSlot}
      <ListBoxItem
        bind:group={slotTime}
        name="slotTime"
        value={timeSlot.time}
        on:click={() => {
          selectBand(timeSlot);
        }}
      >
        <span
          class="text-xl font-medium block text-right flex-none text-surface-200"
          slot="lead"
        >
          {shortTime(timeSlot.time)}
        </span>
        <span
          class="h-7 text-xl underline decoration-dashed decoration-1 underline-offset-4 text-right text-ellipsis overflow-hidden block w-full text-surface-100"
        >
          {bandName(timeSlot)}
        </span>
      </ListBoxItem>
    {/each}
  </ListBox>
</div>
