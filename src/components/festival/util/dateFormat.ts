export function shortTime(time: string, smartMer: boolean = false): string {
	const date = new Date(Date.parse('1970-01-01T' + time));

	const formatted = date.toLocaleTimeString('en-US', {
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

export const timeRange = (from: string, to: string) => {
	const fromDate = new Date(Date.parse('1970-01-01T' + from));
	const toDate = new Date(Date.parse('1970-01-01T' + to));

	const formattedFrom = fromDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});
	const formattedTo = toDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	let [hrFrom, minFrom, merFrom] = splitTime(formattedFrom)
	let [hrTo, minTo, merTo] = splitTime(formattedTo)

	return `${hrFrom}${eitherGtZero(minFrom, ':' + minFrom, '')} - ${hrTo}${eitherGtZero(minTo, ':' + minTo, '')}${merTo}`
}

function eitherGtZero(number: string, either: string, or: string): string {
	return parseInt(number) > 0 ? either : or
}

function splitTime(timeString: string): [string, string, string] {
	let [time, meridiem] = timeString.split(' ');
	let [hours, minutes] = time.split(':');

	return [hours, minutes, meridiem];
}
