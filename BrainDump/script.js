const notesContainer = document.querySelector(".notes-container");
const btn = document.querySelector(".create-note-btn");
let notes = document.querySelectorAll(".input-box");

// When the page reloads, display the notes
function showNotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
    }
}
showNotes();

// Update localStorage with current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Add a new note
btn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "bin.png";
    img.className = "delete-icon";
    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage();
});

// Handle note deletion and updating
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove(); // Remove the parent note
        updateStorage(); // Update localStorage after removal
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(note => {
            note.onkeyup = function () {
                updateStorage(); // Update localStorage on text changes
            };
        });
    }
});
