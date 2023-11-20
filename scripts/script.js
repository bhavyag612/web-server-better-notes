window.onload=function(){

    /* Variable Declarations */
    const save = document.querySelector('.save');
    const sidebar = document.querySelector('aside');
    const cancel = document.querySelector('.cancel');
    const deleteBtn = document.querySelector('.delete');
    const newNote = document.querySelector('.newNote');
    const textArea = document.querySelector('textarea');
    const notesList = document.querySelector('aside ul');
    const darkTheme = document.querySelector('.darkTheme');
    const notesListItems = notesList.childNodes;
    const notesArray = [];
    let current_note=null;
    
    fetchNotes();
    function fetchNotes() {
        fetch('http://146.190.145.38:80/notes')
            .then(response => response.json())
            .then(data => {
                notesArray.push(...data);
                console.log(notesArray)
                data.forEach(note => {
                    appendListItem(note);
                });
            })
            .catch(error => console.error('Error fetching notes:', error));
        

    /* Cancel Button Click Events */
    cancel.addEventListener("click", cancelBTN);
    function cancelBTN() {
        save.classList.add('hide');
        cancel.classList.add('hide');
        textArea.classList.add('hide');
    }
    /*Delete Button Click Events */
    deleteBtn.addEventListener("click",deleteNote);
    function deleteNote(){
        const noteToDelete=current_note;
        fetch(`http://146.190.145.38:80/notes/${noteToDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Note Deleted!');
            const deletedIndex = notesArray.findIndex(note => note.id === noteToDelete);
            if (deletedIndex !== -1) {
                notesArray.splice(deletedIndex, 1);
            }
            removeListItemFromUI(noteToDelete);
        })
        .catch(error => console.error('Error deleting note:', error));
        textArea.value='';
    }
    }
    function removeListItemFromUI(noteId) {
        console.log(noteId)
        const listItem = document.querySelector(`[data-note-id="${noteId}"]`);
        console.log(listItem)
        if (listItem) {
            listItem.remove();
        }
    }
    /* New Note Button Click Events */
    newNote.addEventListener("click", newNoteBTN);
    function newNoteBTN() {
        save.classList.remove('hide');
        cancel.classList.remove('hide');
        textArea.classList.remove('hide');
        textArea.value = '';
        textArea.focus();
    }
    
    /* Save Button Click Events */
    save.addEventListener("click", saveBTN);
    function saveBTN() {
        getTitleInput();
        noteBody = textArea.value;
        noteExists = notesArray.some(note => note.title === noteTitle);
        if (noteExists) {
            const noteToUpdate = notesArray.find(note => note.title === noteTitle);

            fetch(`http://146.190.145.38:80/notes/${noteToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note: noteBody }),
            })
                .then(response => response.json())
                .then(data => {
                    noteToUpdate.content = data.content;
                    alert(`Existing Note "${noteToUpdate.title}" Has Been Updated!`);
                })
                .catch(error => console.error('Error updating note:', error));
        }else {
            fetch('http://146.190.145.38:80/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: noteTitle,content: textArea.value }),
                })
                .then(response => response.json())
                .then(data => {
                    notesArray.push({ title: noteTitle, content: data.content, id: data.id });
                    alert("New Note Successfully Added!");
                    note = notesArray.find(note => note.title === noteTitle)
                    appendListItem(note);
                })
                .catch(error => console.error('Error creating new note:', error));
        }
        textArea.value = '';
        textArea.focus();
    }

    function getTitleInput() {
        do {
            noteTitle = prompt("Please enter a title for this note: ");
        } while (noteTitle.length < 1||noteTitle.trim().length === 0)
    }

    function appendListItem(note) {
        let listItem = document.createElement("li");
        listItem.textContent = note.title;
        listItem.setAttribute('data-note-id', note.id);
        notesList.appendChild(listItem);
    }

    /* List Item Click Events */
    notesList.addEventListener("mouseover", displayNote);
    function displayNote() {
        notesListItems.forEach(function(item) {
            item.onclick = function() {
                clickedLi = this.innerText;
                for (let note of notesArray) {   
                    if (note.title === clickedLi){
                        textArea.value = note.content;
                        current_note=note.id;
                        console.log(current_note)
                    }     
                };
            }
        });
    }


    /* Dark Theme Button Click Events */
    darkTheme.addEventListener("click", darkThemeBTN);
    function darkThemeBTN() {
        changeBTNtext();
        save.classList.toggle('saveDark');
        cancel.classList.toggle('cancelDark');
        newNote.classList.toggle('newNoteDark');
        darkTheme.classList.toggle('themeDark');
        sidebar.classList.toggle('darkThemeBG1');
        textArea.classList.toggle('darkThemeBG1');
        document.body.classList.toggle('darkThemeBG2');
        document.body.classList.toggle('textDarkTheme');
        textArea.focus();
    }
    function changeBTNtext() {
        if (darkTheme.textContent === 'Dark Theme') {
            darkTheme.textContent = 'Light Theme';
            textArea.style.color = 'white';
        } else {
            darkTheme.textContent = 'Dark Theme';
            textArea.style.color = 'black';
        }
    }
}