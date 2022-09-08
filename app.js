const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#16D9E3', '#cd5c5c', '#32cd32', '#8b0000', '#2e8b57', '#c71585', '#ff4500', '#ffff00' , '#c0c0c0', '#00ff00']

let time = 0
let score = 0

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        setTime(current)
    }
}

function setTime(value) {
    let minuts = Math.floor(value / 60)
    let seconds = value % 60

    if (minuts < 10 && seconds < 10) {
        timeEl.innerHTML =`0${minuts}:0${seconds}`
    } else {
        timeEl.innerHTML =`0${minuts}:${seconds}`
    }
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(5, 25)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.background = `linear-gradient(${getRandomNumber(0, 100)}deg, ${getRandomColor()} ${getRandomNumber(0, 100)}%, ${getRandomColor()} ${getRandomNumber(0, 100)}%, ${getRandomColor()} ${getRandomNumber(0, 100)}%)`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function finishGame() {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

//     --- Hack the game ---

// function winTheGame() {
//     function kill() {
//         const circle = document.querySelector('.circle')

//         if (circle) {
//             circle.click()
//         }
//     }

//     setInterval(kill, 100)
// }
