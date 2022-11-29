window.onload=function(){
    const textArea = document.querySelector('textarea');
    const newNote = document.querySelector('.newNote');
    const darkTheme = document.querySelector('.darkTheme');
    const cancel = document.querySelector('.cancel');
    const save = document.querySelector('.save');

    function cancelBTN() {
        save.style.display = 'none';
        cancel.style.display = 'none';
        textArea.style.display = 'none';
    }
    cancel.addEventListener("click", cancelBTN)

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
    newNote.addEventListener("click", newNoteBTN)
}