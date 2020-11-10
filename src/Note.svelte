<script>
  import {createEventDispatcher } from "svelte";
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import ClickedOrNot from "./ClickedOrNot.svelte";
  import ColorsChoser from "./ColorsChoser.svelte";

  export let id, title, body, bgColor; 

  const dispatch = createEventDispatcher();

  function triggerUpdate(){
    dispatch("update", {id, title, body, bgColor});
  }

  function deleteNote(){
    const yes = confirm("Sei sicuro di voler cancellare la nota?");
    if(yes){
      dispatch("delete", id)
    }
  }

  const [send, receive] = crossfade({
		  duration: d => Math.sqrt(d * 200),

		  fallback(node, params) {
			  const style = getComputedStyle(node);
			  const transform = style.transform === 'none' ? '' : style.transform;

			    return {
				  duration: 500,
				  easing: quintOut,
				  css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
			    `
			    };
	  	}
    });
</script>

<div class="note" in:receive out:fade style="background-color:{bgColor}">
  <div class="note-title">
    <input 
      class="title-textarea" 
      type="text"
      bind:value={title}
      on:keyup={({key, target}) => key === 'Enter' && target.blur()}
      on:change={() => triggerUpdate()}/>
    <hr style="height:1px;border-width:0;color:black;background-color:black">
  </div>
  <div class="tools">
    <ClickedOrNot let:clicked={active}>
      <div>
        <button  class="colour-button"><i class="material-icons">color_lens</i></button>
          {#if active}
            <ColorsChoser on:update={() => triggerUpdate()} bind:selectedColor={bgColor}></ColorsChoser>
          {/if}
      </div>
    </ClickedOrNot>
    <div>
      <button class="delete-button" on:click={deleteNote}><i class="material-icons">delete</i></button>
    </div>
  </div>
    <textarea class="main-textarea" bind:value={body} on:change={() => triggerUpdate()}/>
</div>

<style>
  .note{
    order: 5;
	  border-radius: 20px;
    background: white;
    margin: 20px;
    margin-top: 0%;
    height: 250px;
    width: 250px;
    margin-left: 5%;
    position: relative;
    -webkit-box-shadow: 0px 0px 3px 1px rgba(99,99,99,1);
    -moz-box-shadow: 0px 0px 3px 1px rgba(99,99,99,1);
    box-shadow: 0px 0px 3px 1px rgba(99,99,99,1);
    transition: all 0.3s;
  }

  .note-title{
    position: absolute;
    height: 10%;
    width: 100%;
    background-color: transparent;
  }
  
  .note hr{
    margin-top: 0px;
    margin-bottom: 0px;
    opacity: 40%;
  }
  
  .title-textarea{
    outline: none;
    border: none;
    resize: none;
    overflow: hidden;
    margin-top: 0px;
    padding: 20px;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .main-textarea{
    margin-top: 30px;
    outline: none;
    border: none;
    height: 85%;
    width: 100%;
    padding: 20px;
    resize: none;
    overflow: hidden;
    background-color: transparent;
  }
</style>