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
	| { type: "GOTO_DAY"; dayIdx: number }
	| { type: "GOTO_STAGE"; stageKey: string }
	| { type: "GOTO_BANDS" }
	| { type: "GOTO_BAND"; bandKey: string }
	| { type: "GO_BACK" }
	| { type: "VIEW_MAP" }
	| { type: "VIEW_STAGE" }
	| { type: "VIEW_BAND" }
	| { type: "VIEW_BANDS" }
	;

export type AppStateSend = XStateSend<AppCtx, AppEvt>;

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
				GOTO_DAY: {
					actions: ["animateBackward", "gotoDay"]
				},
				SELECT_STAGE: {
					actions: ["selectStage",],
					target: "viewingStage",
				},
				GOTO_STAGE: {
					actions: ["animateForward", "gotoStage"]
				},
				VIEW_BANDS: {
					target: "viewingBands"
				},
				GOTO_BANDS: {
					actions: ["animateForward", "gotoBands"]
				},
				SELECT_BAND: {
					actions: "selectBand",
					target: "viewingBand"
				}
			},
		},
		viewingStage: {
			on: {
				SELECT_DAY: {
					actions: ["selectDay", "clearStage"],
					target: "viewingMap",
				},
				GOTO_DAY: {
					actions: ["animateBackward", "gotoDay"]
				},
				SELECT_BAND: {
					actions: ["selectBand"],
					target: "viewingBand",
				},
				GOTO_BAND: {
					actions: ["animateForward", "gotoBand"]
				},
				GOTO_BANDS: {
					actions: ["animateForward", "gotoBands"]
				},
				VIEW_MAP: {
					actions: ["clearStage", "animateForward"],
					target: "viewingMap",
				},
				SELECT_STAGE: {
					actions: "selectStage",
					target: "viewingStage",
				},
				GOTO_STAGE: {
					actions: ["animateForward", "gotoStage"]
				},
				VIEW_BANDS: {
					actions: ["animateForward", "clearStage"],
					target: "viewingBands"
				},
				GO_BACK: {
					actions: ["animateBackward", "goBack"]
				}
			},
		},
		viewingBand: {
			entry: "scrollToTop",
			on: {
				SELECT_DAY: {
					actions: ["selectDay", "clearBand",],
					target: "viewingMap"
				},
				GOTO_DAY: {
					actions: ["animateBackward", "gotoDay"]
				},
				SELECT_STAGE: {
					actions: ["selectStage"],
					target: "viewingStage"
				},
				VIEW_STAGE: {
					actions: ["clearBand", "animateForward"],
					target: "viewingStage",
				},
				GOTO_STAGE: {
					actions: ["animateBackward", "gotoStage"]
				},
				VIEW_BANDS: {
					actions: ["clearBand", "animateBackward"],
					target: "viewingBands"
				},
				GO_BACK: {
					actions: ["animateBackward", "goBack"]
				}
			},
		},
		viewingBands: {
			on: {
				SELECT_DAY: {
					actions: ["selectDay"],
					target: "viewingMap"
				},
				SELECT_BAND: {
					actions: ["selectBand"],
					target: "viewingBand"
				},
				SELECT_STAGE: {
					actions: ["selectStage"],
					target: "viewingStage"
				},
				GOTO_DAY: {
					actions: ["animateBackward", "gotoDay"],
				},
				GOTO_BAND: {
					actions: ["animateForward", "gotoBand"]
				},
				GO_BACK: {
					actions: ["animateBackward", "goBack"]
				}
			}
		}
	},
}, {
	actions
})
