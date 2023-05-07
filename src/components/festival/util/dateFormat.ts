export function shortTime(time: string): string {
	const date = new Date(Date.parse('1970-01-01T' + time));

	const formatted = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
	});

	return trimHours(formatted);
}

export function trimHours(timeString: string) {
	let [time, meridiem] = timeString.split(' ');
	let [_, minutes] = time.split(':');
	if (parseInt(minutes) > 0) {
		meridiem = '';
	}
	return `${time} ${meridiem}`;
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