<script lang="ts">
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@skeletonlabs/skeleton/themes/theme-modern.css';

  import fscreen from 'fscreen';
  import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
  import { slide, blur, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import IoIosMusicalNotes from 'svelte-icons/io/IoIosMusicalNotes.svelte';

  import { AppShell, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import { useMachine } from '@xstate/svelte';
  import { appMachine, type AppCtx } from './machines/app.machine.js';
  import { process } from './util/import.js';
  import Map from './Map.svelte';
  import StagePage from './StagePage.svelte';
  import BandPage from './BandPage.svelte';
  import DaySelection from './DaySelection.svelte';
  import { onDestroy, onMount } from 'svelte';
  import { element } from 'svelte/internal';

  export let schedule: Partial<ImportSchedule> = {};
  export let stages: ImportStages = {};
  export let bands: ImportBands = {};
  export let logoImg: ImageMetadata = [];
  export let mapMetadata: Array<ImageMetadata> = [];
  export let bandImgs: Array<ImageMetadata> = [];

  const { pdays, pstages, pbands } = process(schedule, stages, bands, bandImgs);
  const initialContext: AppCtx = {
    days: pdays(),
    stages: pstages(),
    bands: pbands(),
    selectedDayIdx: 0,
    selectedStageKey: null,
    selectedBandKey: null,
  };
  const { state, send } = useMachine(appMachine, { context: initialContext });

  $: days = $state.context.days;
  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayStages =
    selectedDay?.stageKeys.map(
      (stageKey: string) => $state.context.stages[stageKey]
    ) || [];
  $: selectedStageKey = $state.context.selectedStageKey;
  $: selectedStage = selectedStageKey
    ? $state.context.stages[selectedStageKey]
    : null;
  $: selectedBandKey = $state.context.selectedBandKey;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;
  $: dayMapMetadata = mapMetadata[selectedDayIdx];

  $: allBands = $state.context.bands;

  const requestFullscreen = () => {
    if (fscreen.fullscreenElement === null) {
      fscreen.requestFullscreen(document.documentElement);
    }
  };

  const selectDay = (event: { detail: number }) => {
    requestFullscreen();
    send('SELECT_DAY', { dayIdx: event.detail });
  };

  const selectStage = (event: { detail: string }) => {
    requestFullscreen();
    send('SELECT_STAGE', { stageKey: event.detail });
  };

  const selectBand = (event: { detail: string }) => {
    requestFullscreen();
    send('SELECT_BAND', { bandKey: event.detail });
  };

  const viewMap = () => {
    send('VIEW_MAP');
  };

  const viewStage = () => {
    send('VIEW_STAGE');
  };
</script>

<AppShell title="Festival App" class="bg-surface-900">
  <div slot="header">
    {#key selectedDayIdx}
      <DaySelection
        {selectedDayIdx}
        {days}
        {logoImg}
        on:selectDay={selectDay}
      />
    {/key}
    <div
      class="flex justify-end px-6 py-2 gap-2 bg-primary-500 text-on-surface-token font-bold items-center"
    >
      {#if $state.value === 'viewingMap'}
        <h2 class="text-right">{selectedDay.location}</h2>
        <a
          href={selectedDay.mapUrl}
          class="btn-icon bg-surface-600 p-2 ml-6 mr-3 rounded flex-0 border-2 border-surface-400"
        >
          <FaMapMarkedAlt />
        </a>
      {:else if $state.value === 'viewingStage' && selectedStage}
        <button type="button" class="btn btn-icon p-2 flex-0" on:click={viewMap}
          ><IoMdArrowRoundBack /></button
        >
        <h2 class="flex-1 text-right">{selectedStage.name}</h2>
        <a
          href={selectedStage.mapUrl}
          class="btn-icon bg-surface-600 p-2 ml-6 mr-3 rounded flex-0 border-2 border-surface-400"
        >
          <FaMapMarkedAlt />
        </a>
      {:else if $state.value === 'viewingBand' && selectedBand}
        <button
          type="button"
          class="btn btn-icon p-2 flex-0"
          on:click={viewStage}><IoMdArrowRoundBack /></button
        >
        <h2 class="flex-1 text-right">{selectedBand.name}</h2>
        <a
          class="btn-icon bg-surface-600 p-2 ml-6 mr-3 rounded flex-0 border-2 border-surface-400"
          href={selectedBand.url}
        >
          <IoIosMusicalNotes />
        </a>
      {/if}
    </div>
  </div>
  {#if $state.value === 'viewingMap'}
    <div class="h-full" transition:fly={{ y: 200, duration: 200 }}>
      <Map
        stages={dayStages}
        imageMetadata={dayMapMetadata}
        on:selectStage={selectStage}
      />
    </div>
  {:else if $state.value === 'viewingStage' && selectedStage}
    <div class="h-full" transition:fly={{ y: 200, duration: 200 }}>
      <StagePage
        bands={allBands}
        {selectedStage}
        on:selectBand={selectBand}
        on:viewMap={viewMap}
      />
    </div>
  {:else if $state.value === 'viewingBand' && selectedBand}
    <div class="h-full" transition:fly={{ y: 200, duration: 200 }}>
      <BandPage {selectedBand} on:viewStage={viewStage} />
    </div>
  {/if}

  <div slot="footer" class="text-on-surface-token">
    {#if $state.value === 'viewingMap'}
      <div
        transition:slide={{
          delay: 0,
          duration: 200,
          easing: quintOut,
          axis: 'y',
        }}
        class="p-4 bg-surface-900"
      >
        <header class="card-header text-center font-bold text-2xl -mt-6 mb-2">
          <span class="text-surface-50">Stages</span>
        </header>
        <section>
          <ListBox
            rounded="rounded"
            active="bg-primary-500"
            class="bg-surface-700"
          >
            {#each dayStages as stage, idx}
              <ListBoxItem
                bind:group={selectedStageKey}
                on:click={() => selectStage({ detail: stage.key })}
                name="stage"
                value={stage.key}
                class="w-full border-2 border-surface-400"
              >
                <span
                  class="text-md font-semibold block bg-primary-500 rounded-full w-6 h-6 text-center"
                  slot="lead">{idx + 1}</span
                >
                <span class="text-xl">{stage.name}</span>
              </ListBoxItem>
            {/each}
          </ListBox>
        </section>
      </div>
    {:else if $state.value === 'viewingStage' && selectedDay}
      <button
        type="button"
        on:click={viewMap}
        class="w-full text-center bg-surface-700 p-4"
        transition:slide={{
          delay: 0,
          duration: 200,
          easing: quintOut,
          axis: 'y',
        }}
      >
        <span
          class="text-2xl text-on-surface-token border-2 border-surface-400 bg-surface-600 block rounded"
          >{selectedDay.location} Map</span
        >
      </button>
    {:else if $state.value === 'viewingBand' && selectedStage}
      <button
        type="button"
        on:click={viewStage}
        class="w-full text-center bg-surface-700 p-4"
      >
        <span
          class="text-2xl text-on-surface-token border-2 border-surface-400 bg-surface-600 block rounded"
          >{selectedStage.name}</span
        >
      </button>
    {/if}
  </div>
</AppShell>

<style global>
  html {
    overflow: hidden;
    width: 100%;
  }
  body {
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
