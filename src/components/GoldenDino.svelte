<script>
	import { onMount } from 'svelte';
	const Sprites = {
		WALK_LFT: ['0 0', '-40px 0'],
		WALK_RGT: ['0 -40px', '40px -40px'],
		RAWR_LFT: ['0 -80px', '0 -80px', '0 0'],
		RAWR_RGT: ['40px -80px','40px -80px','0 -40px']
	};
	let dino, dinoInitLeft, rawrInterval;
	let animateState = 0;
	onMount(() => {
		dinoInitLeft = dino.getBoundingClientRect().left
		dino.style.top = '0px' 
		dino.style.left = '0px'
		dino.style.position = 'relative'
	})
	function animateDinoLeft() {
		const dinoX = dino.getBoundingClientRect().left
		dino.style.left = ((dinoX - dinoInitLeft) - 4) + 'px'
		if (dinoX % 5 < 1) {
			animateState = (animateState === 0 ? 1 : 0)
			dino.style.backgroundPosition = Sprites.WALK_LFT[animateState]
		}
	}
	function animateDinoRight() {
		const dinoX = dino.getBoundingClientRect().left
		dino.style.left = ((dinoX - dinoInitLeft) + 4) + 'px'
		if (dinoX % 5 < 1) {
			animateState = (animateState === 0 ? 1 : 0)
			dino.style.backgroundPosition = Sprites.WALK_RGT[animateState]
		}
	}
	function animateDinoCorneredLeft() {
		dino.style.backgroundPosition = Sprites.RAWR_RGT[0]
	}
	function animateDinoCorneredRight() {
		dino.style.backgroundPosition = Sprites.RAWR_LFT[0]
	}
	function dinoCornered(e) {
		const viewWidth = e.view.innerWidth
		const dinoX = dino.getBoundingClientRect().left
		dinoX < viewWidth / 2 
			? dino.style.backgroundPosition = Sprites.WALK_RGT[0] 
			: dino.style.backgroundPosition = Sprites.WALK_LFT[0]
	}
	function dinoCorneredRawr(e) {
		const viewWidth = e.view.innerWidth
		const dinoX = dino.getBoundingClientRect().left
		clearInterval(rawrInterval)
		dinoX < viewWidth / 2 ? animateDinoCorneredLeft() : animateDinoCorneredRight() 
	}
	function chaseDino(e) {
		if (dino === undefined) return;
		const viewWidth = e.view.innerWidth
		const mouseX = e.clientX
		const mouseY = e.clientY
		const dinoX = dino.getBoundingClientRect().left
		const dinoY = dino.getBoundingClientRect().top
		const corneredLeft = dinoX < 20
		const corneredRight = dinoX > viewWidth - 80
		const inChaseZone = mouseY > dinoY - 20 && mouseY < dinoY + 60 && !corneredLeft && !corneredRight
		const chaseFromLeft = mouseX < dinoX + 20 && mouseX > dinoX - 40
		const chaseFromRight = mouseX >= dinoX + 20 && mouseX < dinoX + 80
		if (inChaseZone && chaseFromLeft) animateDinoRight()
		if (inChaseZone && chaseFromRight) animateDinoLeft()
	}
</script>

<svelte:body on:mousemove={chaseDino} />

<!-- svelte-ignore a11y-missing-content -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a 
	id="golden-dino" 
	href="https://thegoldendino.com/"
	bind:this={dino}
	on:mouseenter={dinoCorneredRawr}
	on:mouseleave={dinoCornered}
>
</a>
<slot/>

<style>
	#golden-dino {
		position: static;
		display: block;
		width: 40px;
		height: 40px;
		background-position: 0 0;
		border-radius: 100%;
		background-image: url(https://ik.imagekit.io/thegoldendino/goldendino/golden-dino_z85T8PzN3.png?updatedAt=1629418622105);
	}
</style>