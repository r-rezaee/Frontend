const secondHand = document.querySelector('.sec-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');


function setDate() {
    /* get the date/time for now */
    const now = new Date();

    const seconds = now.getSeconds();
    /* if seconds is zero so disable transition*/
    if (seconds == 0) {
        secondHand.style.transition = "all 0s";
    }

    /* seconds rotation */
    const secondDegrees = (seconds * 6) + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    /* minutes rotation */
    const minutes = now.getMinutes();
    const minuteDegrees = (minutes * 6) + (seconds / 10) + 90;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

    /* hours rotation */
    const hours = now.getHours();
    const hourDegrees = (hours * 30) + (minutes * 0.5) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    /* display digital clock and put a zeor befor min or sec if they are less than 10 */
    let min = checkTime(minutes);
    let sec = checkTime(seconds);
    document.getElementById('timeNow').innerHTML = hours + ':' + min + ':' + sec;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

setInterval(setDate, 1000);