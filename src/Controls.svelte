<script>
    import { createEventDispatcher } from 'svelte';
    import { students } from './stores.js';

    let calculateN = true;
    let allowMore = true;
    let n = 2;
    let perGroup = 2;

    const dispatch = createEventDispatcher();

    const requestCreate = () => {
        dispatch('createRequested', {
            calculateN: calculateN,
            allowMore: allowMore,
            num: (calculateN ? perGroup : n)
        });
    };
</script>

<style>
    button {
        font-size: 1.5em;
    }
    button:not(:disabled) {
        background-color: #035397;
        color: white;
    }

    .action {
        padding-left: 1em;
    }

    input:disabled + span {
        color: #ccc;
    }
</style>

<div class="component">

    <p>Sett sammen grupper slik at det blir</p>
    
    <label>
        <input type="radio" bind:group={calculateN} value={true}>
        <select bind:value={allowMore} disabled={!calculateN}>
            <option value={true}>minst</option>
            <option value={false}>høyst</option>
        </select>
        <input type="number" bind:value={perGroup} min="2" size="1" disabled={!calculateN}>
        <span>elever per gruppe</span>
    </label>

    <label>
        <input type="radio" bind:group={calculateN} value={false}>
        <input type="number" bind:value={n} min="2" size="1" disabled={calculateN}>
        <span>grupper</span>
    </label>

    <p class="action">
        <button on:click={requestCreate} disabled={$students.length == 0}>Lag grupper</button>
    </p>

</div>