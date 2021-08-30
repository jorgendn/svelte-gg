<script>
    import { students, absent } from './stores.js';
	import Dropzone from 'svelte-file-dropzone';

	let files = [];

	const getData = data => {
		const output = data.split('\n');
		return output;
	};

    const isWhitespace = s => {
        return s.trim() == '';
    }

	const handleFilesSelect = e => {
		files = e.detail.acceptedFiles;
		const file = files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const fileContent = reader.result;
			students.set(getData(fileContent).filter(x => !isWhitespace(x)));
		}
		reader.readAsText(file);
	};
</script>

<style>
	ul {
		column-count: 3;
	}

	input:checked + span {
		color: #ccc;
		text-decoration: line-through;
	}
</style>

<div class="component">

	{#if $students.length == 0}
		<p>
			Dra en tekstfil med navnene til elevene i klassen til feltet under,
			klikk eventuelt på feltet for å åpne en fil.
		</p>
		<Dropzone on:drop={handleFilesSelect} multiple={false} accept=".txt" />
	{:else}
		<p>Kryss av ved fraværende elever:</p>
		<ul>
			{#each $students as student}
				<li>
					<label>
						<input type="checkbox" bind:group={$absent} name="absent" value={student}>
							<span>{student}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</div>