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
    if(this.classList[0].match(/[1-6]1/)) {
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

function playPause() { //button on or off
    play = !play;
}

/* Productive/Rest */
let productive = true;

function productiveRest() {
    productive = !productive;
}

/* total */
const total = document.querySelectorAll(".down");

function check(button) { 
    const change = document.querySelector(`.${button.classList[0]} + p`);
    return change.innerHTML; 
}

function decrease(d, c, b, a, f, e) { //decreased clock (a = secondonce, b = secondtens, c = minuteonce, d = minutetens, e = houronce, f = hourtens)
    let secondtens = check(b), minuteonce = check(c), minutetens = check(d);
    let secondonce = minus(a, 9);
        if(secondonce == 9) {
            secondtens = minus(b, 5);
            if(secondtens == 5) {
                minuteonce = minus(c, 9);
                if(minuteonce == 9) {
                    minutetens = minus(d, 5);
                    if(minutetens == 5) {
                        let houronce = minus(e, 9);
                        if(houronce == 9) {
                            minus(f, 9);
                        }
                    }
                }
            }
        }
    if(secondonce == 0 && secondtens == 0 && minuteonce == 0 && minutetens == 0) {
        return true;
    }
    else {
        return false;
    }
}

let x = false;
setInterval(function(){
    if(play) {
        decrease(total[2], total[3], total[4], total[5], total[0], total[1]); // decrease total clock

        if(productive == true) {
            x = decrease(total[6], total[7], total[8], total[9]);
            console.log(x);
            if(x) {
                productive = !productive;
            }
        }
        else {
            x = decrease(total[10], total[11], total[12], total[13]);
            if(x) {
                productive = !productive;
            }
        }
    }
},1000);