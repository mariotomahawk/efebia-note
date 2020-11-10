<script>
    import { onMount } from "svelte";
    import { notes } from "./stores";
    import Note from "./Note.svelte";
    import NotesApi from "./NotesApi";

    function handleDelete(e){
      $notes = $notes.filter(note => note.id !== e.detail);
      NotesApi.save($notes);
    }

    function handleUpdate(e){
      const index = $notes.findIndex(note => note.id === e.detail.id);
      $notes[index] = e.detail;
      NotesApi.save($notes);
    }

    onMount(async() => {
        $notes = await NotesApi.getAll();
    });
</script>

<div class="list">
    {#each $notes as note (note.id)}
        <Note {...note} on:update={handleUpdate} on:delete={handleDelete}/>
    {:else}
        <p class="note-status">Non ci sono note da visualizzare</p>
    {/each}
</div>

<style>
    .list{
        padding: 15px;
        display: flex;
        flex-flow: row wrap;
    }

    .note-status{
        padding: 15px;
        text-align: center;
        color: white;
        font-weight: bold;
        font-size: 1.1em;
    }
</style>