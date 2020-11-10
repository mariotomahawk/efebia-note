<script>
	import {createEventDispatcher } from "svelte";
	import { fly } from 'svelte/transition';

	export let selectedColor = '';
	export const buttons = [{
		id: 1,
		name: 'aqua',
		bgColor: '#7FFFD4'},
		{id: 2,
		name: 'salmon',
		bgColor: '#ff966f'},
		{id: 3,
		name: 'yellow',
		bgColor: '#F0E68C'},
		{id: 4,
		name: 'green',
		bgColor: '#90EE90'},
		{id: 5,
		name: 'pink',
		bgColor: '#FFB6C1'},
		{id: 6,
		name: 'white',
		bgColor: 'white'}
		];
	
	const dispatch = createEventDispatcher();

	function triggerUpdate(){
    	dispatch("update", {selectedColor});
  	}
	
</script>

<div class="color-buttons" transition:fly>
	{#each buttons as {id, name, bgColor} (id)}
		<button style="background-color:{bgColor}" on:click={() => {selectedColor = bgColor; triggerUpdate()}}></button>
	{/each}
</div>

<style>
	.color-buttons{
        background-color: white;
		height: 100px;
		width: 150px;
		border-radius: 10px;
		position: absolute;
		display: flex;
		flex-wrap: wrap;
		border: 1px solid rgba(0, 0, 0, 0.856);
		align-content: space-evenly;
		justify-content: space-evenly;
		padding: 5px;
	}

	button{
		display: flex;
		flex-direction: row;
		width: 20px;
		height: 20px;
		outline: none;
		cursor: pointer;
		size: 50rem;
		padding: 14px;
		margin: 5px;
		border-radius: 50px;
		border: 1px solid rgb(194, 194, 194);
	}
	button:hover {
		border:solid 1px #000000d2;
	}
	button:active {
		transform: scale(1.1);
		transition: all 0.1s;
	}
</style>