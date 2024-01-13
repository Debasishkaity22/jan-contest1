console.log("hi");
let hourText=document.querySelector(".hours-text");
    let minuteText=document.querySelector(".minutes-text");
    let secondsText=document.querySelector(".seconds-text");
let timers = [];
function startNewTimer(){
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    

    let timerId = setInterval(() => {
        if (totalTimeInSeconds <= 0) {
            clearInterval(timerId);
            handleTimerEnd(timerId);
        } else {
            totalTimeInSeconds--;
            updateTimerDisplay(timerId, totalTimeInSeconds);
           
        }
    }, 1000);

    timers.push({ id: timerId, totalTimeInSeconds });
    updateActiveTimersDisplay();
    console.log(hours,minutes,seconds,totalTimeInSeconds,timers);
}
function updateTimerDisplay(timerId, remainingTime) {
    const timerElement = document.getElementById(timerId);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    
    console.log(hourText,minuteText,secondsText);
    hourText.innerText=formatTime(hours);
    minuteText.innerText=formatTime(minutes);
    secondsText.innerText=formatTime(seconds);
    // timerElement.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}
function handleTimerEnd(timerId) {
    const timerIndex = timers.findIndex(timer => timer.id === timerId);
    timers.splice(timerIndex, 1);

    updateActiveTimersDisplay();
    const endedTimerElement = document.getElementById(timerId);
    endedTimerElement.classList.add('timer-end');
}
function updateActiveTimersDisplay() {
    const activeTimersSection = document.getElementById('active-timer');
    activeTimersSection.innerHTML = '';

    timers.forEach(timer => {
        let timerElement = document.createElement('div');
        let timerElement1 = document.createElement('div');
        let timerElement2 = document.createElement('div');
        timerElement.classList.add('timer-task');
        timerElement1.classList.add("set-time")
        timerElement.id = timer.id;
        updateTimerDisplay(timer.id, timer.totalTimeInSeconds);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Timer';
        stopButton.onclick = () => handleTimerEnd(timer.id);

        timerElement.appendChild(stopButton);
        activeTimersSection.appendChild(timerElement);
    });
}
function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}