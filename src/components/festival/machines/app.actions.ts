import { assign } from 'xstate';
import type { AppCtx, AppEvt } from './app.machine.js'

export const actions = {
	selectDay: assign<AppCtx, AppEvt>({
		selectedDayIdx: (ctx: AppCtx, evt: AppEvt) => {
			if (evt.type !== "SELECT_DAY") return ctx.selectedDayIdx;
			return evt.dayIdx;
		}
	}),
	selectStage: assign<AppCtx, AppEvt>({
		selectedStageKey: (ctx: AppCtx, evt: AppEvt) => {
			if (evt.type !== "SELECT_STAGE") return ctx.selectedStageKey;
			return evt.stageKey;
		}
	}),
	selectBand: assign<AppCtx, AppEvt>({
		selectedBandKey: (ctx: AppCtx, evt: AppEvt) => {
			if (evt.type !== "SELECT_BAND") return ctx.selectedBandKey;
			return evt.bandKey;
		}
	}),
};