window.onload=function(){

    /* Variable Declarations */
    const save = document.querySelector('.save');
    const sidebar = document.querySelector('aside');
    const cancel = document.querySelector('.cancel');
    const newNote = document.querySelector('.newNote');
    const textArea = document.querySelector('textarea');
    const notesList = document.querySelector('aside ul');
    const darkTheme = document.querySelector('.darkTheme');
    const notesListItems = notesList.childNodes;
    const notesArray = [
        {title: "note one", body: "This is my first note."},
        {title: "note two", body: "This is my second note."} 
    ];

    /* Cancel Button Click Events */
    cancel.addEventListener("click", cancelBTN);
    function cancelBTN() {
        save.classList.add('hide');
        cancel.classList.add('hide');
        textArea.classList.add('hide');
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

    /* Save Button Click Events */
    save.addEventListener("click", saveBTN);
    function saveBTN() {
        getTitleInput();
        noteBody = textArea.value;
        noteExists = false;
        for (let note of notesArray) {
            if (note.title === noteTitle) {
                    noteExists = true;
                    alert(`Existing Note "${note.title}" Has Been Updated!`);
                    note.body = noteBody;
            }
        }
        if (noteExists === false) {
            alert("New Note Successfully Added!");
            let newNote = {title: noteTitle, body: noteBody};
            notesArray.push(newNote);
            appendListItem();
        }
        textArea.value = '';
        textArea.focus();
    }
    function getTitleInput() {
        do {
            noteTitle = prompt("Please enter a title for this note: ");
        } while (noteTitle.length < 1||noteTitle.trim().length === 0)
    }
    function appendListItem() {
        let listItem = document.createElement("li");
        notesList.appendChild(listItem);
        listItem.textContent = noteTitle;
    }

    /* List Item Click Events */
    notesList.addEventListener("mouseover", displayNote);
    function displayNote () {
        notesListItems.forEach(function(item) {
            item.onclick = function() {
                clickedLi = this.innerText;
                for (let note of notesArray) {   
                    if (note.title === clickedLi){
                    textArea.value = note.body;
                    }     
                };
            };
        });
    }
}