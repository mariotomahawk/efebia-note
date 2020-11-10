<script>
    import ClickedOrNot from './ClickedOrNot.svelte';
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    let newNoteMain = "";
    let newNoteTitle = "";
    
    function clearNote(){
        newNoteTitle = "";
        newNoteMain = "";
    }

    function newNoteHandler(){
        dispatch("newNote", {newNoteTitle, newNoteMain});
        newNoteTitle = "";
        newNoteMain = "";
    }
    
</script>

<div class="write-note-container">
    <div class="write-note" >
        <ClickedOrNot id="colorbox" let:clicked={active}>
            <textarea class="write-main" bind:value={newNoteMain} placeholder="Scrivi la tua nota..." class:active></textarea>
            {#if active}
            <textarea class="write-title" placeholder="Titolo" bind:value={newNoteTitle}></textarea>
            <br>
        {/if}
        </ClickedOrNot>
    </div> 
        <div class="tools">
            <div>
                <button class="add-button" on:click={newNoteHandler}><i class="material-icons">add</i></button> 
            </div>
            <div>
                <button class="clear-button" on:click={clearNote} ><i class="material-icons">clear</i></button>
            </div>     
        </div>   
</div>

<style>
    .write-note-container{
  top: 10%;
  border-radius: 20px;
  width: 20%;
  margin: auto;
  background-color: white;
  display: flex;
  position: relative;
}

.write-note{
  position: relative;
  display: grid;
  width: 70%;
  height: 50px;
}

.write-note textarea{
  min-width: 100px;
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  padding: 8px;
  resize: none;
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}
    .write-note .write-title{
        height: 30px;
    }
    .write-note .write-main{
        height: 50px;
    }
</style>