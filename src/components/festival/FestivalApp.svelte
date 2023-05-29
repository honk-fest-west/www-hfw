<script lang="ts">
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@skeletonlabs/skeleton/themes/theme-modern.css';

  import { slide, fade, fly, scale } from 'svelte/transition';
  import { quintOut, elasticOut } from 'svelte/easing';
  import { AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton';
  import { useMachine } from '@xstate/svelte';

  import FaMapMarkedAlt from 'svelte-icons/fa/FaMapMarkedAlt.svelte';
  import FaDrum from 'svelte-icons/fa/FaDrum.svelte';
  import IoMdArrowRoundBack from 'svelte-icons/io/IoMdArrowRoundBack.svelte';
  import FaMusic from 'svelte-icons/fa/FaMusic.svelte';
  import FaQuestion from 'svelte-icons/fa/FaQuestion.svelte';
  import FaClock from 'svelte-icons/fa/FaRegClock.svelte';

  import { appMachine, type AppCtx } from './machines/app.machine.js';
  import { process } from './util/import.js';
  import { formatLongDay, formatShortDay, timeRange } from './util/dateFormat';
  import Map from './Map.svelte';
  import BandPage from './BandPage.svelte';
  import DaySelection from './DaySelection.svelte';
  import StageList from './StageList.svelte';
  import Schedule from './Schedule.svelte';
  import Bands from './Bands.svelte';
  import Info from './Info.svelte';

  // Data Location: www-hfw/src/pages/festival/*.toml
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
    flyX: 200,
  };
  const { state, send } = useMachine(appMachine, { context: initialContext });

  let drawerView: 'stages' | 'info' = 'stages';

  $: days = $state.context.days;
  $: allStages = $state.context.stages;
  $: selectedDayIdx = $state.context.selectedDayIdx;
  $: selectedDay = $state.context.days[selectedDayIdx];
  $: dayStages =
    selectedDay?.stageKeys.map(
      (stageKey: string) => $state.context.stages[stageKey]
    ) || [];
  $: dayBands = [...selectedDay?.bandKeys, ...selectedDay?.allDayKeys].map(
    (bandKey: string) => $state.context.bands[bandKey]
  );
  $: selectedStageKey = $state.context.selectedStageKey;
  $: selectedStage = selectedStageKey
    ? $state.context.stages[selectedStageKey]
    : null;
  $: selectedBandKey = $state.context.selectedBandKey;
  $: selectedBand = selectedBandKey
    ? $state.context.bands[selectedBandKey]
    : null;

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
    drawerView = 'stages';
    drawerStore.open();
  };

  const viewInfo = () => {
    drawerView = 'info';
    drawerStore.open();
  };
</script>

<Drawer position="bottom" bgDrawer="bg-surface-800" height="h-fit">
  <div class="py-5 px-6">
    {#if drawerView === 'stages' && ($state.value === 'viewingMap' || $state.value === 'viewingStage')}
      <h2 class="text-surface-50 w-full mb-3 -mt-2 flex justify-center">
        {formatLongDay(selectedDay.date)}
      </h2>
      <StageList {dayStages} on:selectStage={selectStage} />
    {:else if drawerView === 'info' && ($state.value === 'viewingMap' || $state.value === 'viewingStage')}
      <Info />
    {:else if $state.value === 'viewingBand' && selectedBand}
      <h2 class="text-surface-50 w-full mb-3 -mt-2 flex justify-center">
        {formatLongDay(selectedDay.date)}
      </h2>
      <Schedule
        day={selectedDay}
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
    <div class="bg-primary-500 border-primary-600 border-b-2 shadow-lg">
      <div
        class="flex justify-end px-3 py-2 gap-2 text-primary-50 font-bold items-center max-w-2xl mx-auto"
      >
        {#if $state.value === 'viewingMap'}
          <h2 class="text-right">
            <a
              class="unstyled flex flex-col items-end"
              href={selectedDay.mapUrl}
            >
              <span class="text-2xl block">{selectedDay.location}</span>
              <span class="text-lg block"
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
            <a
              class="unstyled flex flex-col items-end"
              href={selectedStage.mapUrl}
            >
              <span class="text-2xl block">{selectedStage.name}</span>
              <span class="text-lg block">{selectedDay.location}</span>
            </a>
          </h2>
          <a
            href={selectedStage.mapUrl}
            in:scale={{
              duration: 800,
              delay: 200,
              start: 0.5,
              easing: elasticOut,
            }}
            class="btn-icon bg-surface-600 p-2 mx-3 sm:mr-0 rounded-xl flex-0 border-2 border-surface-400 text-surface-50"
          >
            <FaMapMarkedAlt />
          </a>
        {:else if $state.value === 'viewingBand' && selectedBand}
          <button
            type="button"
            class="btn btn-icon p-2 flex-0"
            on:click={() => {
              selectedStage ? viewStage() : viewDayBands();
            }}
          >
            <IoMdArrowRoundBack />
          </button>
          <h2 class="flex-1 text-right mr-5">
            <a class="unstyled" href={selectedBand.url}>
              <span class="text-2xl block">{selectedBand.name}</span>
              <span class="text-lg block">{selectedBand.location}</span></a
            >
          </h2>
        {:else if $state.value === 'viewingBands'}
          <h2 class="flex-1 text-left ml-2">
            <span class="text-2xl block">
              {formatLongDay(selectedDay.date)} Bands
            </span>
          </h2>
          <button
            type="button"
            class="btn btn-icon p-2 flex-0 rotate-180"
            on:click={viewMap}
          >
            <IoMdArrowRoundBack />
          </button>
        {/if}
      </div>
    </div>
  </div>
  {#if $state.value === 'viewingMap'}
    <div
      class="h-full"
      out:fly={{ x: $state.context.flyX, duration: 200 }}
      in:fade={{ duration: 200 }}
    >
      {#each days as day, idx}
        {#if idx === selectedDayIdx}
          <Map
            {day}
            stages={day.stageKeys.map((key) => allStages[key])}
            imageMetadata={mapImgs[idx]}
            coordinates={day.coordinates}
            on:selectStage={selectStage}
          />
        {/if}
      {/each}
    </div>
  {:else if $state.value === 'viewingStage' && selectedStage}
    <div
      class="h-full px-3 py-3"
      in:fade={{ duration: 200 }}
      out:fly={{
        x: $state.context.flyX,
        duration: 200,
      }}
    >
      <Schedule
        day={selectedDay}
        schedule={selectedStage.schedule}
        items={allBands}
        smartMer={true}
        on:selectBand={selectBand}
        on:selectPerformer={selectBand}
      />
    </div>
  {:else if $state.value === 'viewingBand' && selectedBand}
    <div
      class="h-full"
      in:fade={{ duration: 200 }}
      out:fly={{ x: $state.context.flyX, duration: 200 }}
    >
      <BandPage band={selectedBand} />
    </div>
  {:else if $state.value === 'viewingBands'}
    <div
      class="h-full p-4"
      in:fade={{ duration: 200 }}
      out:fly={{
        x: $state.context.flyX,
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

          <div class="w-full flex flex-col items-center justify-center mb-4">
            <span class="text-surface-50 text-lg block mb-2 w-56 text-center"
              >Free Celebration of Music and Community</span
            >
            <a
              href="/donate"
              class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
              >Donate</a
            >
            <a
              href="/volunteer"
              class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
              >Volunteer</a
            >
            <a
              href="/supporters"
              class="unstyled text-surface-200 underline text-xs hover:text-primary-400 mb-2 block"
              >Supporters</a
            >
            <a
              href="/about"
              class="unstyled text-surface-200 underline text-xs hover:text-primary-400 block"
              >About</a
            >
          </div>

          <button
            type="button"
            on:click={viewDayBands}
            class="w-full border-2 border-surface-400 bg-surface-700 rounded-lg text-on-surface-token flex px-3 py-2 items-center gap-4"
          >
            <span class="w-6 h-6 bg-primary-500 p-1 rounded ml-1">
              <FaDrum />
            </span>
            <span class="block text-xl"
              >{formatLongDay(selectedDay.date)} Bands</span
            >
          </button>
        </div>
      {/if}
    {/key}
    {#if $state.value === 'viewingBand' && selectedBand}
      <Schedule
        day={selectedDay}
        schedule={selectedBand.scheduleByDay[selectedDayIdx]}
        items={allStages}
        on:selectStage={selectStage}
      />
    {/if}
  </div>

  <div
    slot="footer"
    class="text-on-surface-token border-t-2 border-surface-700 sm:hidden"
  >
    {#if $state.value === 'viewingMap' || $state.value === 'viewingStage'}
      <div class="flex gap-4 bg-surface-800 p-4">
        <button
          type="button"
          on:click={viewInfo}
          class="border-2 border-surface-400 bg-primary-500 rounded-xl text-on-surface-token px-1 py-2 w-10"
        >
          <FaQuestion />
        </button>
        <button
          type="button"
          on:click={viewDayBands}
          in:scale={{
            duration: 400,
            delay: 200,
            start: 0.5,
            easing: elasticOut,
          }}
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
          in:scale={{
            duration: 400,
            delay: 300,
            start: 0.5,
            easing: elasticOut,
          }}
          class="w-1/2 border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
        >
          <span class="w-6 h-6 bg-primary-500 p-1 rounded">
            <FaMusic />
          </span>
          <span class="block text-xl">Stages</span>
        </button>
      </div>
    {:else if $state.value === 'viewingBand' && selectedBand?.scheduleByDay[selectedDayIdx].length}
      <div class="flex gap-4 bg-surface-800 p-4">
        <a
          href={selectedBand.url}
          class="btn bg-primary-500 text-surface-100 font-bold border-2 border-surface-400 rounded-xl px-1 py-1"
        >
          more
          <br />
          info
        </a>
        <button
          type="button"
          on:click={viewBandSchedule}
          in:scale={{
            duration: 600,
            delay: 200,
            start: 0.5,
            easing: elasticOut,
          }}
          class="w-full border-2 border-surface-400 bg-surface-600 rounded-xl text-on-surface-token flex px-1 py-2 items-center justify-center gap-2"
        >
          <span class="w-6 h-6 bg-primary-500 p-1 rounded">
            <FaClock />
          </span>
          <span class="block text-2xl">Schedule</span>
        </button>
      </div>
    {/if}
  </div>
</AppShell>

<style>
  :root {
    --theme-rounded-base: 0.25rem;
  }
</style>
