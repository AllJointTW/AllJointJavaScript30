let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  const now = Date.now()
  const then = now + seconds * 1000

  clearInterval(countdown)
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)

    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  })
}

function leftPad(value) {
  return `${value < 10 ? '0': ''}${value}`
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${leftPad(remainderSeconds)}`

  document.title = display
  timerDisplay.textContent = display
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp)
  const hour = end.getHours()
  const adjustedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes()

  endTime.textContent = `Be Back At ${adjustedHour}:${leftPad(minutes)}`
}

function startTimer () {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const mins = this.minutes.value;

  timer(mins * 60);
  this.reset();
})
