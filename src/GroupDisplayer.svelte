<script>
    export let groups;
</script>

<style>
    #groups-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        grid-column-start: 1;
        grid-column-end: -1;
    }

    .group-box {
        border: 2px solid #5089C6;
        border-radius: 5px;
        margin: 0.5em;
        padding: 0.5em 1em;
        width: 12em;
    }

    h2 {
        color: #003566;
        font-size: 1.33em;
        margin: 0;
    }
</style>

<div id="groups-container"  class="component">

    {#each groups as group, i}
        <div class="group-box">
            <h2>Gruppe {i+1}</h2>
            <ul>
                {#each group as student}
                    <li>{student}</li>
                {/each}
            </ul>
        </div>
    {/each}

</div>