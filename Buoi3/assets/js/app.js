window.onscroll = function () {scrollFunction()};

function scrollFunction() {
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        document.getElementById("header").style.padding = "20px 100px";
        document.getElementById("header").style.fontSize = "20px6";
    } else {
        document.getElementById("header").style.padding = "70px 100px";
        document.getElementById("header").style.fontSize = "20px";
    }
}

console.log("hello")