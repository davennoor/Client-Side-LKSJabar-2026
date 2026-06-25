let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

lebar = canvas.width;
tinggi = canvas.height;
//fillrect 
// context.fillRect()

context.beginPath()
context.closePath();
context.fill();
context.strokeStyle = "lightgray";
for (let i = 0; i < lebar &tinggi; i++) {
    context.moveTo(i * 20, 0);
    context.lineTo(i * 20, 300);
    context.moveTo(0, i * 20);
    context.lineTo(lebar & tinggi, i * 20);
    context.stroke();
  }
