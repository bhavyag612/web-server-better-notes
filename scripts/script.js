window.onload=function(){

    /* Variable Declarations */
    const textArea = document.querySelector('textarea');
    const newNote = document.querySelector('.newNote');
    const darkTheme = document.querySelector('.darkTheme');
    const cancel = document.querySelector('.cancel');
    const save = document.querySelector('.save');
    const notesList = document.querySelector('aside ul');
    const notesListItems = notesList.childNodes;
    const notesArray = [
        {title: "note one", body: "This is my first note."},
        {title: "note two", body: "This is my second note."} 
    ];

    /* Cancel Button Click Events */
    cancel.addEventListener("click", cancelBTN);
    function cancelBTN () {
        save.classList.add('hide');
        cancel.classList.add('hide');
        textArea.classList.add('hide');
    }

    /* New Note Button Click Events */
    newNote.addEventListener("click", newNoteBTN);
    function newNoteBTN () {
        save.classList.remove('hide');
        cancel.classList.remove('hide');
        textArea.classList.remove('hide');
        textArea.value = '';
        textArea.focus();
    }
    
    /* Dark Theme Button Click Events */
    function darkThemeBTN () {
        if (darkTheme.textContent === 'Dark Theme') {
            darkTheme.textContent = 'Light Theme';
            textArea.style.color = 'white';
        } else {
            darkTheme.textContent = 'Dark Theme';
            textArea.style.color = 'black';
        }
        textArea.focus();
        textArea.classList.toggle('darkThemeBG1');
        newNote.classList.toggle('newNoteDark');
        darkTheme.classList.toggle('themeDark');
        save.classList.toggle('saveDark');
        cancel.classList.toggle('cancelDark');
        document.querySelector('aside').classList.toggle('darkThemeBG1');
        document.body.classList.toggle('darkThemeBG2');
        document.body.classList.toggle('textDarkTheme');
    };
    darkTheme.addEventListener("click", darkThemeBTN);

    /* Save Button Click Events */
    save.addEventListener("click", saveBTN);
    function saveBTN () {
        getTitleInput();
        noteBody = textArea.value;
        let newNote = {title: noteTitle, body: noteBody};
        notesArray.push(newNote);
        textArea.value = '';
        textArea.focus();
        appendListItem();
    }
    function getTitleInput () {
        let noteExists = false;
        do {
            noteExists = false;
            noteTitle = prompt("Please enter a title for this note: ");
            for (let note of notesArray) {
                if (note.title === noteTitle) {
                    noteExists = true;
                    alert("This note title already exists. Please enter a new title for this note.");
                }
            }
        } while (noteTitle.length < 1||noteTitle.trim().length === 0||noteExists === true);
    }
    function appendListItem () {
        let listItem = document.createElement("li");
        notesList.appendChild(listItem);
        listItem.textContent = noteTitle;
    }

    /* List Item Click Events */
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
    notesList.addEventListener("mouseover", displayNote);
}