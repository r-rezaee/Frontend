const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 1;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
const clearbtn = document.querySelector('.clear');

let blndOption = document.querySelector(".select");
/*
const blndmods = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
    'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
    'exclusion', 'hue', 'saturation', 'color', 'luminosity'
];
*/
const blndmods = ['normal', 'multiply', 'screen', 'overlay', 'darken',
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
    'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',
    'lighter', 'copy', 'xor', 'source-over', 'source-in', 'source-out', 'source-atop',
    'destination-over', 'destination-in', 'destination-out', 'destination-atop'

];


function draw(e) {
    if (!isDrawing) return;
    //console.log(ctx.lineWidth + ' ' + hue)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) { hue = 0 };

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}




canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

function blndmodHandler() {
    console.log(this.value);
    ctx.globalCompositeOperation = this.value;

}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

blndmods.map(function(e) {

    let newOption = document.createElement("option");

    newOption.value = e;
    newOption.innerHTML = e;

    blndOption.appendChild(newOption);

});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

blndOption.addEventListener('change', blndmodHandler);
clearbtn.addEventListener('click', clearCanvas);