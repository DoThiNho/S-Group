
function handleInfor (event) {
    console.log(event);
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const uniClass = document.querySelector('#uniClass').value;
    
    setInfor(name, age, uniClass);
}

function setInfor(name, age, uniClass){
    document.querySelector('#name-infor').innerText = name;
    document.querySelector('#age-infor').innerText = age;
    document.querySelector('#uniClass-infor').innerText = uniClass;
}

document.querySelector("#introduce-info").addEventListener("submit",handleInfor);



