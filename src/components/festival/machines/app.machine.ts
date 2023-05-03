import { createMachine, type EventObject, type MachineConfig } from "xstate";
import { actions } from './app.actions.js';

export type AppCtx = {
	days: Days,
	stages: Stages;
	bands: Bands;
	selectedDayIdx: number;
	selectedStageKey: string | null;
	selectedBandKey: string | null;
}

export type AppEvt =
	| { type: "SELECT_DAY"; dayIdx: number }
	| { type: "SELECT_STAGE"; stageKey: string }
	| { type: "SELECT_BAND"; bandKey: string }
	| { type: "VIEW_MAP" }
	| { type: "VIEW_STAGE" }
	| { type: "VIEW_BAND" }
	;

// const config: MachineConfig<AppCtx, any, AppEvt> = {
export const appMachine = createMachine<AppCtx, AppEvt>({
	id: "app",
	predictableActionArguments: true,
	schema: {
		context: {} as AppCtx,
		events: {} as AppEvt,
		actions: {} as any,
	},
	initial: "viewingMap",
	context: {
		days: [],
		stages: {},
		bands: {},
		selectedDayIdx: 0,
		selectedStageKey: null,
		selectedBandKey: null,
	},
	states: {
		viewingMap: {
			on: {
				SELECT_DAY: {
					actions: "selectDay",
				},
				SELECT_STAGE: {
					actions: "selectStage",
					target: "viewingStage",
				},
				VIEW_BAND: {
					target: "viewingBand"
				}
			},
		},
		viewingStage: {
			on: {
				SELECT_DAY: {
					actions: "selectDay",
					target: "viewingMap",
				},
				SELECT_BAND: {
					actions: "selectBand",
					target: "viewingBand",
				},
				VIEW_MAP: {
					target: "viewingMap",
				}
			},
		},
		viewingBand: {
			on: {
				SELECT_DAY: {
					actions: "selectDay",
					target: "viewingMap"
				},
				VIEW_STAGE: {
					target: "viewingStage",
				},
			},
		},
	},
}, {
	actions
})
