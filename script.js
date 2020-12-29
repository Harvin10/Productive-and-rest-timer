const up = document.querySelectorAll(".up"); //Get all up button
const down = document.querySelectorAll(".down"); //Get all down button

function plus(button, max) { //Increase number in clock with specific number (max)
    const change = document.querySelector(`.${button.classList[0]} + p`);
    if(parseInt(change.innerHTML) < max) {
        change.innerHTML = parseInt(change.innerHTML) + 1;
    }
    else {
        change.innerHTML = "0";
    }
}

function minus(button, max) { //Decrease number in clock with specific number (max)
    const change = document.querySelector(`.${button.classList[0]} + p`);
    if(parseInt(change.innerHTML) > 0) {
        change.innerHTML = parseInt(change.innerHTML) - 1;
    }
    else {
        change.innerHTML = max;
    }
    return change.innerHTML; //Return current number for interval
}

up.forEach(button => button.addEventListener("click", function(){ //listen to button click to increase the number
    if(this.classList[0].match(/[2-6]1/)) {
        plus(this, 5);
    }
    else {
        plus(this, 9);
    }
}));
down.forEach(button => button.addEventListener("click", function() { //listen to button click to decrease the number
    if(this.classList[0].match(/[1-9]1/)) {
        minus(this, 5);
    }
    else {
        minus(this, 9);
    }
}));


/* Play/Pause */
let play = false;

function playPause() {
    play = !play;
}


/* total */
const hourdowntens = document.querySelector(".up01");
const hourdownonce = document.querySelector(".up02");
const minutedowntens = document.querySelector(".up11");
const minutedownonce = document.querySelector(".up12");
const seconddowntens = document.querySelector(".up21");
const seconddownonce = document.querySelector(".up22");
setInterval(function(){
    if(play) {
        let secondonce = minus(seconddownonce, 9);
        if(secondonce == 9) {
            let secondtens = minus(seconddowntens, 5);
            if(secondtens == 5) {
                let minuteonce = minus(minutedownonce, 9);
                if(minuteonce == 9) {
                    let minutetens = minus(minutedowntens, 5);
                    if(minutetens == 5) {
                        let houronce = minus(hourdownonce, 9);
                        if(houronce == 9) {
                            minus(hourdowntens, 9);
                        }
                    }
                }
            }
        }
    }
},1000);