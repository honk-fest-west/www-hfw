/// <reference types="svelte-gestures" />

declare type Days = Array<Day>

declare interface Day {
	date: Date
	startTime: Date;
	endTime: Date;
	slotDuration: number;
	location: string
	mapUrl: string
	stageKeys: Array<string>
	bandKeys: Array<string>
	allDayKeys: Array<string>
	coordinates: Coordinates
}

declare interface Coordinates {
	[key: string]: [number, number]
}

declare interface Stages {
	[key: string]: Stage
}

declare interface Stage {
	key: string;
	name: string;
	mapUrl: string;
	schedule: Schedule
	x: number;
	y: number;
	pinEl: HTMLButtonElement | null;
}

declare interface Bands {
	[key: string]: Band
}

declare interface Band {
	key: string;
	name: string;
	location: string;
	url: string;
	image: ImageMetadata | undefined;
	description: string;
	scheduleByDay: Array<Schedule>
}

// Schedule 
declare type Schedule = Array<TimeSlot>

declare interface TimeSlot {
	time: Date;
	bandKey?: string;
	stageKey?: string;
}

// Import types
declare interface ImportStages {
	[key: string]: {
		name: string;
		mapUrl: string;
		x: number;
		y: number;
	};
}

declare interface ImportBands {
	[key: string]: {
		name: string;
		location: string;
		url: string;
		description: string;
	};
}

declare interface ImportSchedule {
	days: Array<{
		date: string;
		startTime: string;
		endTime: string;
		slotDuration: number;
		location: string;
		mapUrl: string;
		stages: Array<string>;
		coordinates: Coordinates;
		schedule: {
			[time: string]: Array<string>;
		};
		allday: {
			[type: string]: Array<string>;
		}
	}>;
}

// Image metadata types
declare interface ImageMetadata {
	src: string;
	width: number;
	height: number;
	format: ImageMetadatInputFormat;
}

type ImageMetadatInputFormat =
	| 'avif'
	| 'gif'
	| 'heic'
	| 'heif'
	| 'jpeg'
	| 'jpg'
	| 'png'
	| 'tiff'
	| 'webp'
	| 'svg';