export function shortTime(time: Date, smartMer: boolean = false): string {
	const formatted = time.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	let [hours, minutes, meridiem] = splitTime(formatted)

	return smartMer
		? `${hours}:${minutes} ${eitherGtZero(minutes, '', meridiem)}`
		: `${hours}:${minutes} ${meridiem}`;
}

export function formatShortDay(date: Date) {
	return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export function formatLongDay(date: Date) {
	return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const formatDate = (date: Date) => {
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'numeric',
	});
};

export const timeRange = (from: Date, to: Date) => {
	const formattedFrom = from.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});
	const formattedTo = to.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	let [hrFrom, minFrom, _] = splitTime(formattedFrom)
	let [hrTo, minTo, merTo] = splitTime(formattedTo)

	return `${hrFrom}${eitherGtZero(minFrom, ':' + minFrom)} - ${hrTo}${eitherGtZero(minTo, ':' + minTo)} ${merTo}`
}

function eitherGtZero(number: string, either: string = '', or: string = ''): string {
	return parseInt(number) > 0 ? either : or
}

function splitTime(timeString: string): [string, string, string] {
	let [time, meridiem] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	return [hours, minutes, meridiem];
}
