<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	const width = 984;
	const height = 430;
	export let slides;	

	function transform(image_url) {
		return`${image_url}&tr=w-${width},h-${height},f-jpg,pr-true`;
	}
</script>

<Splide options={ { type: 'loop', autoplay: true, interval: 3000 } } aria-label="HONK! Fest West 2022">
	{#each slides as { image_url, description }}
		<SplideSlide>
			<img src={transform(image_url)} alt={description} />
		</SplideSlide>
	{/each}
</Splide>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>