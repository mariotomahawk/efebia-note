export default class NotesApi {
    static async getAll(){
        return JSON.parse(localStorage.getItem("notes-list") || "[]");
    }

    static async save(notes){
        localStorage.setItem("notes-list", JSON.stringify(notes));
    }
}