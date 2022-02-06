<script>
	const countDownDate = new Date("June 3, 2022 06:00:00 PM PST").getTime();

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	setInterval(function() {
		const now = new Date().getTime();
		const distance = countDownDate - now;
		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor(distance / (1000 * 60 * 60)) - days * 24;
		minutes = Math.floor(distance / (1000 * 60)) - days * 24 * 60 - hours * 60;
		seconds = Math.floor(distance / 1000) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
	}, 1000);
</script>

<div class="grid grid-cols-4">
	<div class="text-3xl">{days}</div>
	<div class="text-3xl">{hours}</div>
	<div class="text-3xl">{minutes}</div>
	<div class="text-3xl">{seconds}</div>
	<div>Days</div>
	<div>Hours</div>
	<div>Minutes</div>
	<div>Seconds</div>
</div>