<script>
    import { v4 as uuidv4 } from "uuid";
    import WriteNote from './WriteNote.svelte';
    import List from './List.svelte';
    import { notes } from "./stores";
    import NotesApi from "./NotesApi";

    function handleNewNote(e){
      $notes = [
        {
          id: uuidv4(),
          title: e.detail.newNoteTitle,
          body: e.detail.newNoteMain,
          bgColor: ""
        },
      ...$notes
      ];
      NotesApi.save($notes); 
    }

</script>

<div class="s-home">
    <video autoplay muted loop id="myVideo">
        <source src="background_video.mp4" type="video/mp4">
    </video>
    <div class="overlay"></div>
    <div class="shadow-overlay"></div>
    <WriteNote on:newNote={handleNewNote}/>  
    <div class="home-content">
      <List/>
    </div>
</div>
