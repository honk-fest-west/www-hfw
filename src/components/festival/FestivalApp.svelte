<script lang="ts">
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@skeletonlabs/skeleton/themes/theme-modern.css';

  import { setContext } from 'svelte';

  import { AppShell } from '@skeletonlabs/skeleton';
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';
  import { useMachine } from '@xstate/svelte';

  import Blank from './Blank.svelte';

  import MapHeader from './headers/MapHeader.svelte';
  import StageScheduleHeader from './headers/StageScheduleHeader.svelte';
  import BandHeader from './headers/BandHeader.svelte';
  import BandIndexHeader from './headers/BandIndexHeader.svelte';

  import MapContent from './content/MapContent.svelte';
  import StageScheduleContent from './content/StageScheduleContent.svelte';
  import BandContent from './content/BandContent.svelte';
  import BandIndexContent from './content/BandIndexContent.svelte';

  import BandSidebar from './sidebar/BandSidebar.svelte';
  import MapSidebar from './sidebar/MapSidebar.svelte';

  import BandsAndStagesFooter from './footers/BandsAndStagesFooter.svelte';

  import DaySelection from './DaySelection.svelte';

  import { process } from './util/import.js';
  import {
    appMachine,
    type AppCtx,
    type AppStateSend,
  } from './machines/app.machine.js';
  import BandScheduleFooter from './footers/BandScheduleFooter.svelte';

  // Data Location: www-hfw/src/pages/festival/*.toml
  export let schedule: ImportSchedule = { days: [] };
  export let stages: ImportStages = {};
  export let bands: ImportBands = {};
  export let logoImg: ImageMetadata;
  export let mapImgs: Array<ImageMetadata> = [];
  export let bandImgs: Array<ImageMetadata> = [];

  const { pdays, pstages, pbands, pselectedDayIdx } = process(
    schedule,
    stages,
    bands,
    bandImgs
  );

  const initialContext: AppCtx = {
    days: pdays(),
    stages: pstages(),
    bands: pbands(),
    selectedDayIdx: pselectedDayIdx(),
    selectedStageKey: null,
    selectedBandKey: null,
    flyX: 200,
  };

  const { state, send } = useMachine(appMachine, { context: initialContext });
  setContext<AppStateSend>('app', { state, send });

  $: days = $state.context.days;
  $: selectedDayIdx = $state.context.selectedDayIdx;

  const headerRoutes = {
    '/': Blank, // 'Home
    '/:day': MapHeader,
    '/:day/stages/:stage': StageScheduleHeader,
    '/:day/bands': BandIndexHeader,
    '/:day/bands/:band': BandHeader,
  };

  const contentRoutes = {
    '/:day': wrap({
      component: MapContent,
      props: { mapImgs },
    }),
    '/:day/bands': BandIndexContent,
    '/:day/bands/:band': BandContent,
    '/:day/stages/:stage': StageScheduleContent,
  };

  const sidebarRoutes = {
    '/:day': MapSidebar,
    '/:day/bands/:band': BandSidebar,
  };

  const footerRoutes = {
    '/:day': BandsAndStagesFooter,
    '/:day/stages/:stage': BandsAndStagesFooter,
    '/:day/bands/:band': BandScheduleFooter,
  };

  function routeLoaded(event: any) {
    if (!event) {
      return;
    } else if (event.detail.route === '/:day/bands') {
      send('VIEW_BANDS');
    } else if (event.detail.params === null) {
      send('GOTO_DAY', { dayIdx: selectedDayIdx });
    } else if (event.detail.params.band) {
      send('SELECT_BAND', { bandKey: event.detail.params.band });
    } else if (event.detail.params.stage) {
      send('SELECT_STAGE', { stageKey: event.detail.params.stage });
    } else {
      send('SELECT_DAY', { dayIdx: parseInt(event.detail.params.day) });
    }
  }

  function gotoDay(event: { detail: number }) {
    send('GOTO_DAY', { dayIdx: event.detail });
  }
</script>

<AppShell title="FestivalApp" class="bg-surface-900">
  <div slot="header">
    {#key selectedDayIdx}
      <DaySelection {selectedDayIdx} {days} {logoImg} on:selectDay={gotoDay} />
    {/key}
    <div class="bg-primary-500 border-primary-600 border-b-2 shadow-lg">
      <div
        class="flex justify-end px-3 py-2 gap-2 text-primary-50 font-bold items-center max-w-2xl mx-auto"
      >
        <Router routes={headerRoutes} on:routeLoaded={routeLoaded} />
      </div>
    </div>
  </div>
  <Router routes={contentRoutes} />
  <div slot="sidebarLeft" class="hidden sm:block">
    <Router routes={sidebarRoutes} />
  </div>
  <div
    slot="footer"
    class="text-on-surface-token border-t-2 border-surface-700 sm:hidden"
  >
    <Router routes={footerRoutes} />
  </div>
</AppShell>
