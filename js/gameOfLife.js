let canvas = document.getElementById('grid');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasContext = canvas.getContext('2d')

let grid = new Grid(1000, 1000, 10);
grid.drawGrid(canvasContext, 0, 0);