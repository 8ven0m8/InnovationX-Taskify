let number = document.getElementById("number");
let counter = 0;
setInterval(()=>{
    if (counter == 30){
        clearInterval();
    }
    else{
    counter += 1;
    number.innerHTML = "Day "+counter
}
},2000);