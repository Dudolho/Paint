const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const inputColor = document.querySelector('.input__color')
const tools = document.querySelectorAll('.button__tool')
const sizeButtons = document.querySelectorAll('.button__size')
const buttonClear = document.querySelector('.button__clear')

let brushSize = 10


let isPainting = false

let activeTool = 'brush'

inputColor.addEventListener("change", ({target}) => {
    ctx.fillStyle = target.value
})

canvas.addEventListener("mousedown", (event) => {
    const {clientX, clientY} = event
    isPainting = true

    if (activeTool == 'brush') {
        draw(clientX, clientY)
    }
    else if (activeTool == 'rubber') {
        erase(clientX, clientY)
    }
})

canvas.addEventListener("mousemove", (event) => {
    if(isPainting) {
        const {clientX, clientY} = event
        if(activeTool == 'brush') {
            draw(clientX, clientY)
        }
        else if (activeTool == 'rubber') {
            erase(clientX, clientY)
        }
    }
})

canvas.addEventListener("mouseup", () => {
    isPainting = false   
})



const draw = (x, y) => {

    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2*Math.PI)
    ctx.fill()
}

const erase = (x, y) => {

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2*Math.PI)
    ctx.fill()
}

const selectTool = ({target}) => {
    const selected_tool = target.closest('button')
    const action = selected_tool.getAttribute("data-action")
    
    if (action == 'rubber' || action == 'brush') {

        tools.forEach((tool) => {
            tool.classList.remove("active")
        })

        activeTool = action
        selected_tool.classList.add("active")
    }
}

tools.forEach((tool) => {
    tool.addEventListener('click', selectTool)
})

const size_brush = ({target}) => {
    const selected_size = target.closest('button')
    const size = selected_size.getAttribute("data-size")

    sizeButtons.forEach((tool) => {
        tool.classList.remove("active")
    })
    selected_size.classList.add('active')
    
    brushSize = size
}

sizeButtons.forEach((size) => {
    size.addEventListener("click", size_brush)
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0 , canvas.width, canvas.height)
})

