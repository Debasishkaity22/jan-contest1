let timerId;
let timers = [];
let form=document.querySelector("form");
form.addEventListener("submit",function(e){
    e.preventDefault();
    startNewTimer();
    form.reset();
})
function startNewTimer(){
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    

     timerId = setInterval(() => {
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
}
function updateTimerDisplay(timerId, remainingTime) {
    const timerElement = document.getElementById(timerId);
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    let hourText=document.querySelector(".hours-text");
    let minuteText=document.querySelector(".minutes-text");
    let secondsText=document.querySelector(".seconds-text");
    hourText.innerText=formatTime(hours)+":";
    minuteText.innerText=formatTime(minutes)+":";
    secondsText.innerText=formatTime(seconds);
}
function handleTimerEnd(timerId) {
    const timerIndex = timers.findIndex(timer => timer.id === timerId);
    timers.splice(timerIndex, 1);

    updateActiveTimersDisplay();
    playAudioAlert();
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
        timerElement1.classList.add("set-time");
        timerElement1.innerText="Time Left : ";
        timerElement2.classList.add("timer-count");
        let para1 = document.createElement('p');
        let para2 = document.createElement('p');
        let para3 = document.createElement('p');
        para1.classList.add("hours-text");
        para2.classList.add("minutes-text");
        para3.classList.add("seconds-text");
        timerElement2.append(para1,para2,para3);
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText="Delete";
        deleteBtn.classList.add("btn");
        timerElement.id = timer.id;
        timerElement.append(timerElement1,timerElement2,deleteBtn);
        let curentTimer1=document.querySelector(".curent-timer");
        curentTimer1.appendChild(timerElement);
        updateTimerDisplay(timer.id, timer.totalTimeInSeconds);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop audio';
        // deleteBtn.onclick = () => handleTimerEnd(timer.id);
        timerElement2.appendChild(stopButton);
        curentTimer1.appendChild(timerElement);
        stopButton.addEventListener("click",function(){
            audio.pause();
        })
        deleteBtn.addEventListener("click",function(){
            audio.pause();
            clearInterval(timerId);
            timerElement.remove();
        });
    });
}
function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}
const audio = new Audio('./audio/zero-action-trailer-teaser-146679.mp3');
function playAudioAlert() {
   
    audio.play();
}