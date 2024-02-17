let timerId = `timer_${Date.now()}`;
let timers = [];
let timer1 = [];
let num=1;
let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    startNewTimer();
    form.reset();
})
function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;


    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    timers[timerId] = {
        totalTimeInSeconds: totalTimeInSeconds,
        inteveralId: null,

    }
    IntervalFn(totalTimeInSeconds)
}
function IntervalFn(totalTimeInSeconds) {
    let timer5 = timers[timerId];

    timer5.inteveralId = setInterval(() => {
        if (timer5.totalTimeInSeconds <= 0) {
            clearInterval(timer5.inteveralId);
            handleTimerEnd(timer5.inteveralId, timer5.totalTimeInSeconds);
        } else {
            timer5.totalTimeInSeconds--;
            updateTimerDisplay(timer5.inteveralId, timer5.totalTimeInSeconds);

        }
    }, 1000);
    num++;
    timer1.push(num);
    updateActiveTimersDisplay(timer5.inteveralId, timer5.totalTimeInSeconds);
}

function updateTimerDisplay(timeId, remainingTime) {
    const timerElement = document.getElementById(timeId);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    let hourText = timerElement.children[1].children[1];
    let minuteText = timerElement.children[1].children[2];
    let secondsText = timerElement.children[1].children[3];
    hourText.innerText = formatTime(hours) + ":";
    minuteText.innerText = formatTime(minutes) + ":";
    secondsText.innerText = formatTime(seconds);

}
function handleTimerEnd(timeId, totalTimeInSeconds) {
    
    let timerTask = document.getElementById(timeId);
    timerTask.children[0].style.display = "flex";
    timerTask.children[1].style.display = "none";
    timerTask.children[2].children[0].style.display = "flex";
    playAudioAlert();
    const endedTimerElement = document.getElementById(timeId);
    endedTimerElement.classList.add('timer-end');
}
function updateActiveTimersDisplay(timeId, totalTimeInSeconds) {
    let activeTimersSection = document.getElementById('active-timer');
    let activeTimerText = document.querySelector(".active-timer-text");
    activeTimerText.style.display = "none";

    activeTimersSection.innerHTML += `
        <div class="timer-task"id="${timeId}">
                            <div class="time-up">Timer Is Up !</div>
                            <div class="timer-count">
                                <div class="set-time">Time Left : </div>
                                <p class="hours-text">00 : </p>
                                <p class="minutes-text">00 : </p>
                                <p class="seconds-text">00</p>
                            </div>
                            <div class="stop-delete">
                                <button class="stop-btn"  onclick="StopTask()">Stop</button>
                                <button id="btn1"  onclick="deleteTask(this,${timeId})">Delete</button>
                            </div>
                        </div>
        
        `
    updateTimerDisplay(timeId, totalTimeInSeconds);

}
function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}
const audio = new Audio('./audio/zero-action-trailer-teaser-146679.mp3');
function playAudioAlert() {

    audio.play();
}
function deleteTask(e,timeId) {
    let timerElement = e.parentNode.parentNode;
    audio.pause();
    clearInterval(timeId);
    timerElement.remove();
    num--;
    timer1.pop();
    let activeTimerText = document.querySelector(".active-timer-text");
    if (timer1.length === 0) {
        activeTimerText.style.display = "block";
    }
}
function StopTask() {
    audio.pause();
}