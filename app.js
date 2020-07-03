const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const range = document.getElementById("jsRange");
const clearBtn = document.getElementById("jsClear");
const fillBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const Colors = document.getElementsByClassName("jsColor");

const INITIAL_COLOR = "#2c2c2c";
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
                        // can see attributes by cursor moves.
                        // but all we need is location of cursor in canvas. = offset
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        //console.log("creating path in", x, y); // there is no line, but starting point is keep tracking cursor.
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //console.log("creating line in", x, y); // now there is actual line, conenct current point of cursor from starting point.
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function onMouseDown(event) {
    painting = true;

}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
}

function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeChange(event) {
    if (!filling){
        filling = true;
        fillBtn.innerText = "Paint";
    } else{
        filling = false;
        fillBtn.innerText = "Fill";
    }
}
function fillCanvas(event) {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function clearCanvas(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function controlCM(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", controlCM);
}

Array.from(Colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", changeRange);
}

if(fillBtn) {
    fillBtn.addEventListener("click", modeChange);
}

function saveCanvas(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}
if (saveBtn){
    saveBtn.addEventListener("click", saveCanvas);
}


if (clearBtn){
    clearBtn.addEventListener("click", clearCanvas);
}
