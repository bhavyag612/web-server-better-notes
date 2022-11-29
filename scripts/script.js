window.onload=function(){
    const textArea = document.querySelector('textarea');
    const newNote = document.querySelector('.newNote');
    const darkTheme = document.querySelector('.darkTheme');
    const cancel = document.querySelector('.cancel');
    const save = document.querySelector('.save');


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
    }
    newNote.addEventListener("click", newNoteBTN);
    
    /* Dark Theme Button Click Events */
    function darkThemeBTN () {
        if (darkTheme.textContent === 'Dark Theme') {
            darkTheme.textContent = 'Light Theme';
            textArea.style.color = 'white'
        } else {
            darkTheme.textContent = 'Dark Theme';
            textArea.style.color = 'black'
        }
        textArea.focus();
        document.querySelector('aside').classList.toggle('darkThemeBG1');
        document.querySelector('textarea').classList.toggle('darkThemeBG1');
        document.body.classList.toggle('textDarkTheme');
        document.body.classList.toggle('darkThemeBG2');
    }
    darkTheme.addEventListener("click", darkThemeBTN);

    /* Cancel Button Click Events */
    function cancelBTN () {
        save.style.display = 'none';
        cancel.style.display = 'none';
        textArea.style.display = 'none';
    }
    cancel.addEventListener("click", cancelBTN);
}