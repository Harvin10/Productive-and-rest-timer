/* declaration */
const up = document.querySelectorAll(".up"); //Get all up button
const down = document.querySelectorAll(".down"); //Get all down button
let productive = true;
let play = false;

/* main function */

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

function playPause() { //play/pause activate by play button
    play = !play;
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

/* supporting function */

function reset() { //reset when called
    if(play) {
        playPause();
    }
    down.forEach(toBeDelete => toZero(toBeDelete));
}

function toZero(time) { //replace with zero
    const remove = document.querySelector(`.${time.classList[0]} + p`);
    remove.innerHTML = "0";
}

function check(button) {  //check value of the clock
    const change = document.querySelector(`.${button.classList[0]} + p`);
    return change.innerHTML; 
}

function negation(answer, swap) { //swap boolean value
    if(answer) {
        swap = !swap;
    }
    return swap;
}

/* execution */

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

setInterval(function(){
    if(play) {
        decrease(down[2], down[3], down[4], down[5], down[0], down[1]); // decrease total clock

        if(productive == true) {
            productive = negation(decrease(down[6], down[7], down[8], down[9]), productive);
        }
        else {
            productive = negation(decrease(down[10], down[11], down[12], down[13]), productive);
        }
        console.log(productive);
    }
},1000);


