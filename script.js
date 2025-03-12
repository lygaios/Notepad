let notes = [];
let trashNotes = [];

function init() {
  getFromLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function renderNotes() {
  document.getElementById("content").innerHTML = "";
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    content.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  document.getElementById("trash").innerHTML = "";
  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    trash.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `
      <div class="note-box">
          <p>${indexNote + 1}: ${notes[indexNote]} </p>
          <button class="button" id="delete" onclick="deleteNote(${indexNote})">Delete</button>
      </div>
  `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `
        <div class="trash-box">
            <p>${indexTrashNote + 1}: ${trashNotes[indexTrashNote]}</p>
            <button class="button" id="restore" onclick="permaDeleteNote(${indexTrashNote})">Delete permanently</button>
        </div>
    `;
}

function addNote(indexNote) {
  let noteInput = document.getElementById("note-input");
  if (noteInput.value != "") {
    notes.push(noteInput.value);
    saveToLocalStorage(indexNote);
  }
  renderNotes(indexNote);
  noteInput.value = "";
}

function deleteNote(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote[0]);
  saveToLocalStorage();
  renderNotes();
  renderTrashNotes();
}

function permaDeleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  saveToLocalStorage();
  renderTrashNotes();
}

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
  if (localStorage.getItem("notes")) {
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    notes = storedNotes;
  };
  if (localStorage.getItem("notes")) {
    let storedTrash = JSON.parse(localStorage.getItem("trashNotes"));
    trashNotes = storedTrash;
  }
}
