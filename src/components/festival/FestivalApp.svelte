<script lang="ts">
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@skeletonlabs/skeleton/themes/theme-modern.css';

  import { slide, fade, fly, crossfade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
  import { useMachine } from '@xstate/svelte';

  import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
  import FaDrum from 'svelte-icons/fa/FaDrum.svelte';
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import FaMusic from 'svelte-icons/fa/FaMusic.svelte';

  import { appMachine, type AppCtx } from './machines/app.machine.js';
  import { process } from './util/import.js';
  import { formatLongDay, timeRange } from './util/dateFormat';
  import Map from './Map.svelte';
  import BandPage from './BandPage.svelte';
  import DaySelection from './DaySelection.svelte';
  import StageList from './StageList.svelte';
  import Schedule from './Schedule.svelte';
  import Bands from './Bands.svelte';

  export let schedule: ImportSchedule = { days: [] };
  export let stages: ImportStages = {};
  export let bands: ImportBands = {};
  export let logoImg: ImageMetadata;
  export let mapImgs: Array<ImageMetadata> = [];
  export let bandImgs: Array<ImageMetadata> = [];

  const { pdays, pstages, pbands, pselectedDay } = process(
    schedule,
    stages,
    bands,
    bandImgs
  );
  const initialContext: AppCtx = {
    days: pdays(),
    stages: pstages(),
    bands: pbands(),
    selectedDayIdx: pselectedDay(),
    selectedStageKey: null,
    selectedBandKey: null,
  };
  const { state, send } = useMachine(appMachine, { context: initialContext });

  const [sendBandImg, receiveBandImg] = crossfade({});

  $: days = $state.context.days;
  $: allStages = $state.context.stages;
  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayStages =
    selectedDay?.stageKeys.map(
      (stageKey: string) => $state.context.stages[stageKey]
    ) || [];
  $: dayBands =
    selectedDay?.bandKeys.map(
      (bandKey: string) => $state.context.bands[bandKey]
    ) || [];
  $: dayCoordinates = selectedDay?.coordinates || [];
  $: selectedStageKey = $state.context.selectedStageKey;
  $: selectedStage = selectedStageKey
    ? $state.context.stages[selectedStageKey]
    : null;
  $: selectedBandKey = $state.context.selectedBandKey;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;
  $: mapImg = mapImgs[selectedDayIdx];

  $: allBands = $state.context.bands;

  const selectDay = (event: { detail: number }) => {
    send('SELECT_DAY', { dayIdx: event.detail });
  };

  const selectStage = (event: { detail: string }) => {
    drawerStore.close();
    send('SELECT_STAGE', { stageKey: event.detail });
  };

  const selectBand = (event: { detail: string }) => {
    send('SELECT_BAND', { bandKey: event.detail });
  };

  const viewMap = () => {
    send('VIEW_MAP');
  };

  const viewStage = () => {
    send('VIEW_STAGE');
  };

  const viewBandSchedule = () => {
    drawerStore.open();
  };

  const viewDayBands = () => {
    send('VIEW_BANDS');
  };

  const viewDayStages = () => {
    drawerStore.open();
  };

  const hideDayStages = () => {
    drawerStore.close();
  };
</script>

<Drawer position="bottom" bgDrawer="bg-surface-800" height="h-fit">
  <div class="pb-4 px-4">
    {#if $state.value === 'viewingMap'}
      <div class="w-full text-center p-4">
        <span class="text-2xl text-on-surface-token">Stages</span>
      </div>
      <StageList {dayStages} on:selectStage={selectStage} />
    {:else if $state.value === 'viewingBand' && selectedBand}
      <Schedule
        schedule={selectedBand.scheduleByDay[selectedDayIdx]}
        items={allStages}
        on:selectStage={selectStage}
      />
    {/if}
  </div>
</Drawer>
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
    <div class="bg-primary-500">
      <div
        class="flex justify-end px-3 py-2 gap-2 text-primary-50 font-bold items-center max-w-2xl mx-auto"
      >
        {#if $state.value === 'viewingMap'}
          <h2 class="text-right">
            <a
              class="unstyled flex flex-col items-end"
              href={selectedDay.mapUrl}
            >
              <span class="text-2xl">{selectedDay.location}</span>
              <span class="text-lg"
                >{timeRange(selectedDay.startTime, selectedDay.endTime)}
              </span>
            </a>
          </h2>
          <a
            href={selectedDay.mapUrl}
            class="btn-icon bg-surface-600 p-2 mx-3 sm:mr-0 rounded-xl flex-0 border-2 border-surface-400 text-surface-50"
          >
            <FaMapMarkedAlt />
          </a>
        {:else if $state.value === 'viewingStage' && selectedStage}
          <button
            type="button"
            class="btn btn-icon p-2 flex-0"
            on:click={viewMap}><IoMdArrowRoundBack /></button
          >
          <h2 class="flex-1 text-right">
            <a class="unstyled text-3xl" href={selectedStage.mapUrl}
              >{selectedStage.name}</a
            >
          </h2>
          <a
            href={selectedStage.mapUrl}
            class="btn-icon bg-surface-600 p-2 mx-3 sm:mr-0 rounded-xl flex-0 border-2 border-surface-400 text-surface-50"
          >
            <FaMapMarkedAlt />
          </a>
        {:else if $state.value === 'viewingBand' && selectedBand && selectedStage}
          <button
            type="button"
            class="btn btn-icon p-2 flex-0"
            on:click={viewStage}><IoMdArrowRoundBack /></button
          >
          <h2 class="flex-1 text-right">
            <a class="unstyled text-3xl" href={selectedBand.url}
              >{selectedBand.name}</a
            >
          </h2>
        {:else if $state.value === 'viewingBand' && selectedBand && !selectedStage}
          <button
            type="button"
            class="btn btn-icon p-2 flex-0"
            on:click={viewDayBands}><IoMdArrowRoundBack /></button
          >
          <h2 class="flex-1 text-right">
            <a class="unstyled text-3xl" href={selectedBand.url}
              >{selectedBand.name}</a
            >
          </h2>
        {:else if $state.value === 'viewingBands'}
          <button
            type="button"
            class="btn btn-icon p-2 flex-0"
            on:click={viewMap}><IoMdArrowRoundBack /></button
          >
          <h2 class="flex-1 text-right">
            <span class="text-3xl">
              {formatLongDay(selectedDay.date)} Bands
            </span>
          </h2>
        {/if}
      </div>
    </div>
  </div>
  {#if $state.value === 'viewingMap'}
    <div
      class="h-full"
      out:fly={{ x: -200, duration: 200 }}
      in:fade={{ duration: 200 }}
    >
      <Map
        stages={dayStages}
        imageMetadata={mapImg}
        coordinates={dayCoordinates}
        on:selectStage={selectStage}
      />
    </div>
  {:else if $state.value === 'viewingStage' && selectedStage}
    <div
      class="h-full"
      in:fade={{ duration: 200 }}
      out:fly={{
        x: $state.event?.type === 'SELECT_BAND' ? -200 : 200,
        duration: 200,
      }}
    >
      <Schedule
        schedule={selectedStage.schedule}
        items={allBands}
        smartMer={true}
        on:selectBand={selectBand}
      />
    </div>
  {:else if $state.value === 'viewingBand' && selectedBand}
    <div
      class="h-full"
      in:fade={{ duration: 200 }}
      out:fly={{ x: 200, duration: 200 }}
    >
      <BandPage band={selectedBand} />
    </div>
  {:else if $state.value === 'viewingBands'}
    <div
      class="h-full p-4"
      in:fade={{ duration: 200 }}
      out:fly={{
        x: $state.event?.type === 'SELECT_BAND' ? -200 : 200,
        duration: 200,
      }}
    >
      <Bands on:selectBand={selectBand} bands={dayBands} />
    </div>
  {/if}

  <div slot="sidebarLeft" class="hidden sm:block">
    {#key selectedStageKey}
      {#if $state.value === 'viewingMap'}
        <div
          transition:slide={{
            delay: 0,
            duration: 200,
            easing: quintOut,
            axis: 'x',
          }}
          class="p-4 bg-surface-900"
        >
          <StageList {dayStages} on:selectStage={selectStage} />

          <hr class="mb-4 border-2 opacity-60 rounded" />

          <button
            type="button"
            on:click={viewDayBands}
            class="w-full border-2 border-surface-400 bg-surface-700 rounded-lg text-on-surface-token flex px-3 py-2 items-center gap-4"
          >
            <span class="w-6 h-6 bg-primary-500 p-1 rounded ml-1">
              <FaDrum />
            </span>
            <span class="block text-xl">Bands</span>
          </button>
        </div>
      {/if}
    {/key}
    {#if $state.value === 'viewingBand' && selectedBand}
      <Schedule
        schedule={selectedBand.scheduleByDay[selectedDayIdx]}
        items={allStages}
        on:selectStage={selectStage}
      />
    {/if}
  </div>

  <div slot="footer" class="text-on-surface-token sm:hidden">
    {#if $state.value === 'viewingMap'}
      <div class="flex gap-4 bg-surface-800 p-4">
        <button
          type="button"
          on:click={viewDayBands}
          class="w-1/2 border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
        >
          <span class="w-6 h-6 bg-primary-500 p-1 rounded">
            <FaDrum />
          </span>
          <span class="block text-xl">Bands</span>
        </button>
        <button
          type="button"
          on:click={viewDayStages}
          class="w-1/2 border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
        >
          <span class="w-6 h-6 bg-primary-500 p-1 rounded">
            <FaMusic />
          </span>
          <span class="block text-xl">Stages</span>
        </button>
      </div>
    {:else if $state.value === 'viewingBand'}
      <div class="flex gap-4 bg-surface-800 p-4">
        <button
          type="button"
          on:click={viewBandSchedule}
          class="w-full border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
        >
          <span class="block text-2xl">Schedule</span>
        </button>
      </div>
    {/if}
  </div>
</AppShell>
