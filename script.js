/* declaration */
const up = document.querySelectorAll(".up"); // Get all up button
const down = document.querySelectorAll(".down"); // Get all down button
const text = document.querySelector(".playPause"); // Get play button
const sirenAudio = document.querySelector(".siren"); // Get siren audio
let productive = true; // to decide when productive or rest
let play = false; // to decide when to play or pause based on play button
let total = false; // to decide when to play or pause based on total time
let sequence = []; // array to remember start time for productive (0 - 3) and rest (4 - 7)

/* main function */

function plus(button, max) { // Increase number in clock with specific number (max)
    const change = document.querySelector(`.${button.classList[0]} + p`);
    if(parseInt(change.innerHTML) < max) {
        change.innerHTML = parseInt(change.innerHTML) + 1;
    }
    else {
        change.innerHTML = "0";
    }
}

function minus(button, max) { // Decrease number in clock with specific number (max)
    const change = document.querySelector(`.${button.classList[0]} + p`);
    if(parseInt(change.innerHTML) > 0) {
        change.innerHTML = parseInt(change.innerHTML) - 1;
    }
    else {
        change.innerHTML = max;
    }
    return change.innerHTML; //Return current number for interval
}

function playPause(text) { // play/pause activate by play button
    if(text.innerHTML == "Start") {
        sequence = getTime();
        text.innerHTML = "Pause";
    }
    else if(text.innerHTML == "Pause") {
        text.innerHTML = "Play";
    }
    else {
        text.innerHTML = "Pause";
    }
    play =  negation(true, play);
}

function reset() { // reset when called
    play = false;
    productive = true;
    down.forEach(toBeDelete => toZero(toBeDelete));
    text.innerHTML = "Start";
}

function decrease(d, c, b, a, f, e) { // decreased clock (a = secondonce, b = secondtens, c = minuteonce, d = minutetens, e = houronce, f = hourtens)
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

function setTime(time, productive) { //set time to before start time
    let j, to;
    if(!productive) {
        time = lastRoundCheck(time);
        j = 6;
        to = 9;
    }
    else {
        j = 10;
        to = 13;
    }
    for(let i = j; i <= to; i++) {
        document.querySelector(`.${down[i].classList[0]} + p`).innerHTML = time[i];
    }
}

function lastRoundCheck(time) { // get saved time sequence and return a new time (productive time + rest time) for productive if it is the last round
    CurrentTime = getTime();
    const total = (parseInt(CurrentTime[2] + CurrentTime[3]) * 60) + parseInt(CurrentTime[4] + CurrentTime[5]);
    const productive = (parseInt(time[6] + time[7]) * 60) + parseInt(time[8]+ time[9]);
    const rest = (parseInt(time[10] + time[11]) * 60) + parseInt(time[12] + time[13]);

    answer = [];
    let tens = twoDigits(Math.floor((total - rest) / 60));
    let once = twoDigits((total - rest) % 60);
    for(let i = 0; i < 4; i++) {
        if(i < 2) {
            answer.push(tens[i]);
        }
        else {
            answer.push(once[i - 2]);
        }
    }

    if(total - rest <= productive + rest) {
        for(let i = 2; i < 6; i++) {
            time[i + 4] = answer[i - 2];
        }
    }
    return time;
}

/* supporting function */

function toZero(time) { // replace with zero (main function: reset)
    const remove = document.querySelector(`.${time.classList[0]} + p`);
    remove.innerHTML = "0";
}

function check(button) {  // check value of the clock
    const change = document.querySelector(`.${button.classList[0]} + p`);
    return change.innerHTML; 
}

function negation(answer, swap) { // swap boolean value (main function: playPause)
    if(answer) {
        swap = !swap;
    }
    return swap;
}

function getTime() { // return an array of time (productive time: 0 - 3, rest time: 4 - 7 ) 
    let time = [];
    for(let i = 0; i < 14; i++) {
        time.push(check(down[i]));
    }
    return time;
}

function twoDigits(digit) { //get a number and convert it to two digits number
    digit = digit.toString();
    if(digit.length == 1) {
        return "0" + digit;
    }
    else {
        return digit;
    }
}
/* execution */

up.forEach(button => button.addEventListener("click", function(){ // if up button is clicked, increase the number
    if(this.classList[0].match(/[1-6]1/)) {
        plus(this, 5);
    }
    else {
        plus(this, 9);
    }
}));

down.forEach(button => button.addEventListener("click", function() { /// if up button is clicked, decrease the number
    if(this.classList[0].match(/[1-9]1/)) {
        minus(this, 5);
    }
    else {
        minus(this, 9);
    }
}));

setInterval(function(){ // run the code for every one second
    if(check(down[0]) == 0 && // if the total time timer is zero, then stop all timer
       check(down[1]) == 0 && 
       check(down[2]) == 0 && 
       check(down[3]) == 0 && 
       check(down[4]) == 0 && 
       check(down[5]) == 0 ) {
        if(play == true) { 
            reset();
        }
    }
    else {
        total = true;
    }

    if(play && total) { // if play button is clicked and total timer is not zero, then play the timer
        total = decrease(down[2], down[3], down[4], down[5], down[0], down[1]); // play total timer 

        if(productive == true) { // if productive time, play productive timer
            productive = negation(decrease(down[6], down[7], down[8], down[9]), productive);
            if(!productive) {
                setTime(sequence, productive);
                sirenAudio.play();
            }
        }
        else { // if rest time, play rest timer 
            productive = negation(decrease(down[10], down[11], down[12], down[13]), productive);
            if(productive) {
                setTime(sequence, productive);
                sirenAudio.play();
            }
        }
    }
},1000);


