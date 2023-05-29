import { createMachine, type EventObject, type MachineConfig } from "xstate";
import { actions } from './app.actions.js';

export type AppCtx = {
	days: Days,
	stages: Stages;
	bands: Bands;
	selectedDayIdx: number;
	selectedStageKey: string | null;
	selectedBandKey: string | null;
	flyX: number;
}

export type AppEvt =
	| { type: "SELECT_DAY"; dayIdx: number }
	| { type: "SELECT_STAGE"; stageKey: string }
	| { type: "SELECT_BAND"; bandKey: string }
	| { type: "VIEW_MAP" }
	| { type: "VIEW_STAGE" }
	| { type: "VIEW_BAND" }
	| { type: "VIEW_BANDS" }
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
		flyX: 0
	},
	states: {
		viewingMap: {
			on: {
				SELECT_DAY: {
					actions: "selectDay",
				},
				SELECT_STAGE: {
					actions: ["selectStage", "animateForward"],
					target: "viewingStage",
				},
				VIEW_BANDS: {
					actions: ["animateBackward"],
					target: "viewingBands"
				}
			},
		},
		viewingStage: {
			on: {
				SELECT_DAY: {
					actions: ["selectDay", "clearStage", "animateBackward"],
					target: "viewingMap",
				},
				SELECT_BAND: {
					actions: ["selectBand", "animateForward"],
					target: "viewingBand",
				},
				VIEW_MAP: {
					actions: ["clearStage", "animateBackward"],
					target: "viewingMap",
				},
				SELECT_STAGE: {
					actions: "selectStage",
					target: "viewingStage",
				},
				VIEW_BANDS: {
					actions: ["animateBackward", "clearStage"],
					target: "viewingBands"
				}
			},
		},
		viewingBand: {
			entry: "scrollToTop",
			on: {
				SELECT_DAY: {
					actions: ["selectDay", "clearBand", "animateBackward"],
					target: "viewingMap"
				},
				SELECT_STAGE: {
					actions: ["selectStage", "animateBackward"],
					target: "viewingStage"
				},
				VIEW_STAGE: {
					actions: ["clearBand", "animateBackward"],
					target: "viewingStage",
				},
				VIEW_BANDS: {
					actions: ["clearBand", "animateForward"],
					target: "viewingBands"
				},
			},
		},
		viewingBands: {
			on: {
				SELECT_DAY: {
					actions: ["selectDay", "animateForward"],
					target: "viewingMap"
				},
				SELECT_BAND: {
					actions: ["selectBand", "animateBackward"],
					target: "viewingBand"
				},
				VIEW_MAP: {
					actions: "animateForward",
					target: "viewingMap"
				}
			}
		}
	},
}, {
	actions
})
