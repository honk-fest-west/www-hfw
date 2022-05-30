<script lang="ts">
	export let day;
	export let bands;



	function shortTime(time: string): string {
		const date = new Date(Date.parse('1970-01-01T' + time));

		return date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
		});

	}
</script>

<div class="mt-4 flex flex-col">
	<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle">
			<div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
				<table class="w-full table-fixed content">
					<thead class="bg-accent-color">
						<tr>
							<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 w-28"></th>
							{#each day.stages as stageName}
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
									<p class="text-ellipsis overflow-clip">{stageName}</p>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y-4 divide-main-color-600 divide-dotted">
						{#each day.schedule as timeSlot}
							<tr>
								<td class="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6 lg:pl-8"><p>{shortTime(timeSlot.t)}</p></td>
								{#each timeSlot.b as bandkey}
									<td class="px-3 py-4 w-1/4">
										{#if bandkey}
											<p class="text-ellipsis overflow-clip text-main-color-600 text-sm md:text-lg pr-2"><a href={bands[bandkey].url}>{bands[bandkey].name}</a></p>
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>