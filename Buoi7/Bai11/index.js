let text = sessionStorage.getItem('text');
if (text === null) {

    text = prompt("What is your name?");
    while(text == '' || text == null){
        text = prompt("What is your name?");
    }     

}

if (text != null) {
    document.write("Hello " + text + "!");
    sessionStorage.setItem('text', text);
}










