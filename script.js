let currentColor = "black"

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d')
let canDraw = false
let mouseX = 0
let mouseY = 0

document.querySelectorAll(".colorArea .color").forEach(item => {
    item.addEventListener("click", colorClickEvent)
})
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
screen.addEventListener('touchstart', touchStartEvent)
screen.addEventListener('touchmove', touchMoveEvent)
screen.addEventListener('touchend', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScreen)

function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color')
    currentColor = color

    document.querySelector(".color.active").classList.remove("active")
    e.target.classList.add("active")
}


function mouseDownEvent (e) {
   canDraw = true
   mouseX = e.pageX - screen.offsetLeft
   mouseY = e.pageY - screen.offsetTop
}
function mouseMoveEvent(e) {
   if(canDraw) {
    draw(e.pageX, e.pageY)
   }
}
function mouseUpEvent() {
    canDraw = false
}

// Eventos de toque (mobile)
function touchStartEvent(e) {
    e.preventDefault() // Para evitar o comportamento padrão de rolagem
    canDraw = true
    let touch = e.touches[0]
    mouseX = touch.pageX - screen.offsetLeft
    mouseY = touch.pageY - screen.offsetTop
 }
 
 function touchMoveEvent(e) {
    if(canDraw) {
     let touch = e.touches[0]
     draw(touch.pageX, touch.pageY)
    }
 }
 
function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.lineJoin = "round" // formato da linha redonda
    ctx.moveTo(mouseX, mouseY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = currentColor // cor da linha
    ctx.stroke()

    mouseX = pointX
    mouseY = pointY
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}