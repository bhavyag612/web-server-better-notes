window.onload=function(){
    const textArea = document.querySelector('textarea');
    const newNote = document.querySelector('.newNote');
    const darkTheme = document.querySelector('.darkTheme');
    const cancel = document.querySelector('.cancel');
    const save = document.querySelector('.save');

    const notesArray = [
        {title: "note one", body: "This is my first note"},
        {title: "none two", body: "This is my first note"} 
    ];

    /* New Note Button Click Events */
    function newNoteBTN () {
        if (textArea.style.display === 'none') {
            save.style.display = 'block';
            cancel.style.display = 'block';
            textArea.style.display = 'block';
        } else {
            textArea.value = '';
        }
        textArea.focus();
    };
    newNote.addEventListener("click", newNoteBTN);
    
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
        document.querySelector('aside').classList.toggle('darkThemeBG1');
        document.querySelector('textarea').classList.toggle('darkThemeBG1');
        document.body.classList.toggle('textDarkTheme');
        document.body.classList.toggle('darkThemeBG2');
    };
    darkTheme.addEventListener("click", darkThemeBTN);

    /* Save Button Click Events */
    function appendListItem (item) {
        let listItem = document.createElement("li");
        notesList = document.querySelector("aside ul");
        notesList.appendChild(listItem)
        listItem.textContent = noteTitle;
    }

    function saveBTN () {
        do {
            noteTitle = prompt("Please enter a title for this note: ");
        } while (noteTitle.length < 1 || noteTitle.trim().length === 0);
        noteBody = textArea.value;
        let newNote = {title: noteTitle, body: noteBody};
        notesArray.push(newNote);
        textArea.value = '';
        textArea.focus();
        appendListItem(newNote);
    };
    save.addEventListener("click", saveBTN);

    /* Cancel Button Click Events */
    function cancelBTN () {
        save.style.display = 'none';
        cancel.style.display = 'none';
        textArea.style.display = 'none';
    };
    cancel.addEventListener("click", cancelBTN);
}