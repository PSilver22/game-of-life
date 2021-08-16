// setup HTML canvas
let canvas = document.getElementById('grid');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasContext = canvas.getContext('2d')

// get the size of the cells
let cellSize = 0;
while (isNaN(cellSize) || cellSize <= 0) {
	cellSize = parseInt(prompt("How big should the cells be? "));
}

// setup the grid
let grid = new Grid(Math.round(canvas.width/cellSize), Math.round(canvas.height/cellSize), cellSize);
grid.initGrid(canvasContext, 0, 0);


addEventListener('click', event => {grid.onClick(event, canvasContext)}, false);
addEventListener('keypress', event => {
	if (event.key == "2") {
		document.title = "PAUSED - The Game of Life"
	}
	else {
		document.title = "The Game of Life"
	}

	grid.onKeypress(event);
}, false);