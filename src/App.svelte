<script>
	import { present } from './stores.js';
	import StudentSelector from './StudentSelector.svelte';
	import Controls from './Controls.svelte';
	import GroupDisplayer from './GroupDisplayer.svelte';

	let n = 0;
	let groups = [];

	const shuffle = arr => {
		let currentIndex = arr.length, randomIndex;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			let temp = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temp;
		}

		return arr;
	};

	const createGroups = event => {
		if (event.detail.calculateN) {
			n = Math.floor($present.length / event.detail.num);
			if (!event.detail.allowMore && $present.length % event.detail.num != 0) {
				n++;
			}
		} else {
			n = event.detail.num;
		}

		const shuffled = shuffle([...$present]);

		groups.length = 0;
		for (let i = 0; i < n; i++) {
			groups.push([]);
		}

		for (let i = 0; i < shuffled.length; i++) {
			groups[i % n].push(shuffled[i]);
		}
	};
</script>

<style lang="scss">
	$blue-1: #003566;
	$blue-2: #035397;
	$blue-3: #5089C6;
	$text-col: #000814;

	h1 {
		background-color: $blue-1;
		color: white;
		font-size: 2.5em;
		margin: 0;
		padding: 1.5em;
		grid-column-start: 1;
		grid-column-end: -1;
	}

	#main-container {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-gap: 0;
	}
</style>

<div id="main-container">

	<h1>Gruppegenerator</h1>

	<StudentSelector />

	<Controls on:createRequested={createGroups} />

	<GroupDisplayer groups={groups} />

</div>