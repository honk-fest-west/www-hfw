<script>
	export let positions;

	let setPosition = "";
	if (!import.meta.env.SSR) {
		setPosition = window.location.search.replace(/\?position=/, '').replace(/%20/g, ' ');
		console.log({setPosition});
	}
</script>

<form name="committee-position" action="/volunteer/committee-form-success" method="POST" data-netlify="true" class="space-y-8 divide-y divide-gray-200">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
		<section class="grid grid-cols-1 gap-3">
			<div >
				<p>
					<label for="name">Name</label>
				</p>
				<div class="mt-1">
					<input type="text" name="name" id="name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md px-3 py-2" required>
				</div>
			</div>
			<div >
				<p>
					<label for="email">Email</label>
				</p>
				<div class="mt-1">
					<input type="email" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md px-3 py-2" required>
				</div>
			</div>
			<div >
				<p>
					<label for="phone">Phone</label>
				</p>
				<div class="mt-1">
					<input type="tel" name="phone" id="phone" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md px-3 py-2">
				</div>
			</div>
			<p>
				<label for="comments">
					Comments
				</label>
			</p>
			<textarea name="comments" id="comments" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md px-3 py-2"></textarea>
		</section>
		<section>
			<p class="mb-2">Position of Interest</p>
			{#each Object.keys(positions) as position}
				<p>
					<input type="radio" name="position" value={position} checked={position === setPosition}/> {position}
				</p>
			{/each}
		</section>
	</div>
	<div>
		<button
			type="submit" 
			class="block font-base text-center rounded antialiased text-gray-200 font-bold flex-none mt-3 bg-accent-color w-fit text-lg bg-opacity-80 px-3 py-2 hover:bg-opacity-90"
			>Submit</button>
	</div>
</form>