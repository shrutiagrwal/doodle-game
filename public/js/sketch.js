const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
// socket = io();
// ctx.fillStyle = "blue";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// console.log("entering canvas")
// ctx.beginPath()
// ctx.rect(20, 40, 19, 30)
// ctx.fillStyle = "red"
// ctx.fill();

let coord = { x: 0, y: 0 };
let paint = false;
// set canvas width and height
function resize() {
    ctx.canvas.width = window.innerWidth - 800;
    ctx.canvas.height = window.innerHeight - 200;
}

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
    let data = { x: coord.x, y: coord.y }
        // sends the position to server
    socket.emit('positions', data)
}

function startPainting(event) {
    paint = true;
    getPosition(event);
}

function stopPainting() {
    paint = false;
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    ctx.lineWidth = 5;

    // Sets the end of the lines drawn 
    // to a round shape. 
    ctx.lineCap = 'round';

    ctx.strokeStyle = 'green';

    // The cursor to start drawing 
    // moves to this coordinate 
    ctx.moveTo(coord.x, coord.y);
    // console.log(coord.x, coord.y)
    // The position of the cursor 
    // gets updated as we move the 
    // mouse around. 
    getPosition(event);

    // A line is traced from start 
    // coordinate to this coordinate 
    ctx.lineTo(coord.x, coord.y);
    // Draws the line.
    ctx.stroke();
}

//main function for drawing
window.addEventListener('load', () => {

    resize(); // Resizes the canvas once the window loads 
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

//receiving positions during drawing
ctx.moveTo(0, 0)

socket.on('positions', data => {

    ctx.beginPath();
    ctx.lineWidth = 10;
    // ctx.moveTo(0, 0)
    // // Sets the end of the lines drawn 
    // // to a round shape. 
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'green';
    ctx.lineTo(data.x, data.y);
    ctx.moveTo(data.x, data.y)

    // x()
    // ctx.moveTo(0, 0)


    ctx.stroke();
})