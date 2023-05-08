import { assign } from 'xstate';
import type { AppCtx, AppEvt } from './app.machine.js'
import { claim_text } from 'svelte/internal';

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
	clearStage: assign<AppCtx, AppEvt>({
		selectedStageKey: () => {
			return null;
		}
	}),
	clearBand: assign<AppCtx, AppEvt>({
		selectedBandKey: () => {
			return null;
		}
	}),
	animateBackward: assign<AppCtx, AppEvt>({
		flyX: (ctx: AppCtx) => {
			return ctx.flyX > 0
				? ctx.flyX
				: ctx.flyX * -1
		}
	}),
	animateForward: assign<AppCtx, AppEvt>({
		flyX: (ctx: AppCtx) => {
			return ctx.flyX > 0
				? ctx.flyX * -1
				: ctx.flyX
		}
	}),
};